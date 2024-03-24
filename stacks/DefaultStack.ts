import { Api, RDS, Script, StackContext } from "sst/constructs";

export function DefaultStack({ stack }: StackContext) {
  const rds = new RDS(stack, "DB", {
    engine: "postgresql13.9",
    defaultDatabaseName: "eventsapp",
  });

  new Script(stack, "migrations", {
    defaults: {
      function: {
        bind: [rds],
        timeout: 300,
        copyFiles: [
          {
            from: "packages/core/migrations",
            to: "migrations",
          },
        ],
      },
    },
    onCreate: "packages/functions/src/migrate.handler",
    onUpdate: "packages/functions/src/migrate.handler",
  });

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [rds],
      },
    },
    routes: {
      "GET /events": "packages/functions/src/list.handler",
      "GET /events/{id}": "packages/functions/src/get.handler",
      "PUT /events/{id}": "packages/functions/src/update.handler",
      "POST /events": "packages/functions/src/create.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
