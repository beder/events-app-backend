import { Api, Bucket, RDS, Script, StackContext } from "sst/constructs";

export function DefaultStack({ stack }: StackContext) {
  const bucket = new Bucket(stack, "Bucket");

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
    authorizers: {
      JwtAuthorizer: {
        type: "jwt",
        identitySource: ["$request.header.authorization"],
        jwt: {
          audience: ["test"],
          issuer:
            process.env.JWT_AUTHORIZER_ISSUER ??
            "https://example.clerk.accounts.dev",
        },
      },
    },
    defaults: {
      function: {
        bind: [bucket, rds],
      },
    },
    routes: {
      "GET /events": "packages/functions/src/events/list.handler",
      "GET /events/{id}": "packages/functions/src/events/get.handler",
      "PUT /events/{id}": {
        authorizer: "JwtAuthorizer",
        function: "packages/functions/src/events/update.handler",
      },
      "POST /events": {
        authorizer: "JwtAuthorizer",
        function: "packages/functions/src/events/create.handler",
      },
      "DELETE /events/{id}": {
        authorizer: "JwtAuthorizer",
        function: "packages/functions/src/events/delete.handler",
      },
      "POST /presigned-urls": {
        authorizer: "JwtAuthorizer",
        function: "packages/functions/src/presigned-urls/create.handler",
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
