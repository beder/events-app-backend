import { ApiHandler } from "sst/node/api";
import { withUserStoredInContext } from "@events-app-backend/core/src/middleware";
import { json } from "@events-app-backend/core/src/utils/json";
import middy from "@middy/core";
import crypto from "crypto";
import { Bucket } from "sst/node/bucket";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const handler = middy()
  .use(withUserStoredInContext())
  .handler(
    ApiHandler(async () => {
      const command = new PutObjectCommand({
        ACL: "public-read",
        Key: crypto.randomUUID(),
        Bucket: Bucket.Bucket.bucketName,
      });

      const url = await getSignedUrl(new S3Client({}), command);

      return json({
        body: { url },
        statusCode: 200,
      });
    })
  );
