import middy from "@middy/core";
import { AsyncLocalStorage } from "async_hooks";
import { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda";
import { getUserEvent } from "./getUserEvent";
import { json } from "./json";

export const userStorage = new AsyncLocalStorage();

export const useUser = () => {
  return userStorage.getStore() as string | undefined;
};

export const withUserStoredInContext = () => {
  return {
    before: (
      handler: middy.Request<APIGatewayProxyEventV2WithJWTAuthorizer>
    ) => {
      const { sub } = handler.event.requestContext.authorizer.jwt.claims;
      if (sub) {
        userStorage.enterWith(sub);
      }
    },
  };
};

export const withOwnershipCheck = () => {
  return {
    before: (
      handler: middy.Request<APIGatewayProxyEventV2WithJWTAuthorizer>
    ) => {
      const id = parseInt(handler.event.pathParameters?.id ?? "");

      if (id === undefined) {
        return json({
          statusCode: 400,
          body: { message: "Missing id" },
        });
      }

      const userId = useUser();

      if (userId === undefined) {
        return json({
          statusCode: 401,
          body: { message: "Unauthorized" },
        });
      }

      // Check if the user owns the event
      const event = getUserEvent(id, userId);

      if (!Boolean(event)) {
        return json({
          statusCode: 403,
          body: { message: "Forbidden" },
        });
      }
    },
  };
};
