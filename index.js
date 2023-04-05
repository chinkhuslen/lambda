const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3 } = require("aws-sdk");
const s3 = new S3();
// const axios = require("axios");
// const bcrypt = require("bcryptjs");
const db = new DynamoDB();

exports.handlerPut = async (event) => {
  //   const data = await axios.get(
  //     "https://api.giphy.com/v1/gifs/search?api_key=QPHq62keOwy2IJ46dWicOPFANBwsBnK4&limit=5&offset=0&q=batman"
  //   );
  //   const datasort = data.data?.data.map((el) => el.url);
  //   const param = {
  //     userId: "123",
  //     gifname: datasort,
  //   };
  const response = await db.putItem({
    TableName: "UserID",
    // Item: marshall(param),
    Item: marshall({
      name: "bbb",
      uid: "123",
      userName: "username",
      email: "email@email.com",
      password: "123456",
    }),
  });
  return response;
};

exports.handlerGet = async () => {
  const response = await db.getItem({
    TableName: "UserID",
    Key: marshall({ name: "aaa" }),
  });
  return unmarshall(response.Item);
};

exports.handlerUpdate = async (event) => {
  //   const data = await axios.get(
  //     "https://api.giphy.com/v1/gifs/search?api_key=QPHq62keOwy2IJ46dWicOPFANBwsBnK4&limit=5&offset=0&q=superman"
  //   );
  //   const datasort = data.data?.data.map((el) => el.url);

  const response = await db.updateItem({
    TableName: "UserID",
    Key: marshall({ name: "aaa" }),
    UpdateExpression: "set uid = :p",
    ExpressionAttributeValues: {
      ":p": {
        S: "asd60",
      },
    },
  });
  return response;
};
// function put(url, data) {
//   return new Promise((resolve, reject) => {
//     const req = https.request(
//       url,
//       { method: "PUT", headers: { "Content-Length": new Blob([data]).size } },
//       (res) => {
//         let responseBody = "";
//         res.on("data", (chunk) => {
//           responseBody += chunk;
//         });
//         res.on("end", () => {
//           resolve(responseBody);
//         });
//       }
//     );
//     req.on("error", (err) => {
//       reject(err);
//     });
//     req.write(data);
//     req.end();
//   });
// }

// exports.ChBucket = async () => {
//   const REGION = "us-east-1";
//   const BUCKET = "ch-bucket-yaml";
//   const KEY = "img.png";
//   let url = null;
//   const createPresignedUrlWithClient = async ({ region, bucket, key }) => {
//     const client = new S3Client({ region });
//     const command = new PutObjectCommand({ Bucket: bucket, Key: key });
//     return getSignedUrl(client, command, { expiresIn: 3600 });
//   };

//   try {
//     const clientUrl = await createPresignedUrlWithClient({
//       region: REGION,
//       bucket: BUCKET,
//       key: KEY,
//     });
//     url = clientUrl;
//     console.log("Calling PUT using presigned URL with client");
//     // await put(clientUrl, "Hello World");
//     console.log(clientUrl);
//     console.log("\nDone. Check your S3 console.");
//   } catch (err) {
//     console.error(err);
//   }
//   return url;
// };

exports.ChBucket = async (event) => {
  const { fileType, fileName } = JSON.parse(event.body);
  const params = {
    Bucket: "ch-bucket-yaml",
    Key: fileName,
    ContentType: fileType,
  };
  let url = s3.getSignedUrl("putObject", params);
  console.log(url);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(url),
  };
};

exports.ChFilePrint = async (event) => {
  console.log(event.Records[0].s3);

  return event;
};
