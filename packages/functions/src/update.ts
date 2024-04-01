import { ApiHandler } from "sst/node/api";
import {
  updateEvent,
  updateEventSchema,
} from "@events-app-backend/core/src/updateEvent";
import middy from "@middy/core";
import {
  withOwnershipCheck,
  withUserStoredInContext,
} from "@events-app-backend/core/src/middleware";
import { json } from "@events-app-backend/core/src/utils/json";

export const handler = middy()
  .use([withUserStoredInContext(), withOwnershipCheck()])
  .handler(
    ApiHandler(async (apiEvent) => {
      const id = parseInt(apiEvent.pathParameters?.id ?? "");

      const result = updateEventSchema.safeParse(
        JSON.parse(apiEvent.body ?? "{}")
      );

      if (!result.success) {
        return json({
          statusCode: 400,
          body: result.error.issues,
        });
      }

      const updatedEvent = await updateEvent(id, result.data);

      return json({
        body: updatedEvent,
        statusCode: 200,
      });
    })
  );
