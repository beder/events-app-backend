import middy from "@middy/core";
import { AsyncLocalStorage } from "async_hooks";
import { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda";
import { getUserEvent } from "./getUserEvent";

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
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Missing id" }),
          headers: {
            "Content-Type": "application/json",
          },
        };
      }

      const userId = useUser();

      if (userId === undefined) {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: "Unauthorized" }),
          headers: {
            "Content-Type": "application/json",
          },
        };
      }

      // Check if the user owns the event
      const event = getUserEvent(id, userId);

      if (!Boolean(event)) {
        return {
          statusCode: 403,
          body: JSON.stringify({ message: "Forbidden" }),
          headers: {
            "Content-Type": "application/json",
          },
        };
      }
    },
  };
};
