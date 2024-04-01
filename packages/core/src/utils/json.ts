export const json = (args: { body: unknown; statusCode: number }) => {
  const { body } = args;

  return {
    ...args,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
