import middy from "@middy/core";
import { AsyncLocalStorage } from "async_hooks";
import { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda";
import { getEvent } from "./getEvent";
import { forbidden } from "./utils/forbidden";

const userStorage = new AsyncLocalStorage();

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
    before: async (
      handler: middy.Request<APIGatewayProxyEventV2WithJWTAuthorizer>
    ) => {
      const userId = useUser();

      if (userId === undefined) {
        return forbidden();
      }

      const id = parseInt(handler.event.pathParameters?.id ?? "");

      if (id === undefined) {
        return forbidden();
      }

      const event = await getEvent(id);

      if (event?.userId !== userId) {
        return forbidden();
      }
    },
  };
};
