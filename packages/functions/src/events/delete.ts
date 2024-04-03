import { ApiHandler } from "sst/node/api";
import { deleteEvent } from "@events-app-backend/core/src/deleteEvent";
import { json } from "@events-app-backend/core/src/utils/json";
import middy from "@middy/core";
import {
  withOwnershipCheck,
  withUserStoredInContext,
} from "@events-app-backend/core/src/middleware";

export const handler = middy()
  .use([withUserStoredInContext(), withOwnershipCheck()])
  .handler(
    ApiHandler(async (apiEvent) => {
      const id = parseInt(apiEvent.pathParameters?.id ?? "");

      const deletedEvent = await deleteEvent(id);

      return json({
        body: deletedEvent,
        statusCode: 200,
      });
    })
  );
