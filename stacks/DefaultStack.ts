import { Api, StackContext } from "sst/constructs";

export function DefaultStack({ stack }: StackContext) {
  const api = new Api(stack, "Api", {
    routes: {
      "GET /events": "packages/functions/src/list.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
