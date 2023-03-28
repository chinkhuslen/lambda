const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const axios = require("axios");
const db = new DynamoDB();
const bcrypt = require("bcrypt");
const helper = password;
exports.handlerPut = async (event) => {
  const data = await axios.get(
    "https://api.giphy.com/v1/gifs/search?api_key=QPHq62keOwy2IJ46dWicOPFANBwsBnK4&limit=5&offset=0&q=batman"
  );
  const datasort = data.data?.data.map((el) => el.url);
  const param = {
    userId: "123",
    gifname: datasort,
  };
  const response = await db.putItem({
    TableName: "UserID",
    // Item: marshall(param),
    Item: marshall({
      userId: "123",
      userName: "username",
      email: "email@email.com",
      password: "",
    }),
  });
  return response;
};
exports.handlerGet = async () => {
  const response = await db.getItem({
    TableName: "UserID",
    Key: marshall({ userId: "aaa" }),
  });
  return unmarshall(response.Item);
};
exports.handlerUpdate = async () => {
  const data = await axios.get(
    "https://api.giphy.com/v1/gifs/search?api_key=QPHq62keOwy2IJ46dWicOPFANBwsBnK4&limit=5&offset=0&q=superman"
  );
  const datasort = data.data?.data.map((el) => el.url);
  const response = await db.updateItem({
    TableName: "UserID",
    Key: marshall({ userId: "aaa" }),
    UpdateExpression: "set gifname = :superman",
    ExpressionAttributeValues: {
      ":superman": {
        L: datasort.map((el) => {
          return { S: el };
        }),
      },
    },
  });
  return response;
};
