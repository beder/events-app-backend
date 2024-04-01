import { json } from "./json";

export const forbidden = () => {
  return json({
    statusCode: 403,
    body: { message: "Forbidden" },
  });
};
