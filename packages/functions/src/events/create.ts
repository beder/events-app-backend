import { ApiHandler } from "sst/node/api";
import {
  createEvent,
  insertEventSchema,
} from "@events-app-backend/core/src/createEvent";
import {
  useUser,
  withUserStoredInContext,
} from "@events-app-backend/core/src/middleware";
import { json } from "@events-app-backend/core/src/utils/json";
import middy from "@middy/core";

export const handler = middy()
  .use(withUserStoredInContext())
  .handler(
    ApiHandler(async (apiEvent) => {
      const userId = useUser();

      const result = insertEventSchema.safeParse({
        ...JSON.parse(apiEvent.body ?? "{}"),
        userId,
      });

      if (!result.success) {
        return json({
          statusCode: 400,
          body: result.error.issues,
        });
      }

      const newEvent = await createEvent(result.data);

      return json({
        body: newEvent,
        statusCode: 200,
      });
    })
  );
