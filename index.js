// const AWS = require("aws-sdk");
// const lambda = new AWS.Lambda();
// const nodemailer = require("nodemailer");

// module.exports.invokerFunc = async (event) => {
//   const params = {
//     FunctionName:
//       "arn:aws:lambda:us-east-1:746204573428:function:serverless-test-dev-function1",
//   };
//   const response = await lambda.invoke(params).promise();
//   return response;
// };

// module.exports.handler = async (event) => {
//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "chinkhuslen99@gmail.com", // generated ethereal user
//       pass: "ioodbtqqezwkfbwt", // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: "chinkhuslen99@gmail.com", // sender address
//     to: "chinkhuslen99@gmail.com,chinkhuslen10@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   return info.messageId;
// };
const AWS = require("aws-sdk");
const lambda = new AWS.Lambda();
const nodemailer = require("nodemailer");
const axios = require("axios");
module.exports.invokerFunc = async (event) => {
  const params = {
    FunctionName:
      "arn:aws:lambda:us-east-1:746204573428:function:serverless-test-dev-function1",
    Payload: JSON.stringify(event),
  };
  const response = await lambda.invoke(params).promise();
  return {
    body: JSON.stringify({ input: event }),
  };
};

module.exports.handler = async (event, context) => {
  const SearchCat = event["SearchCat"];
  console.log(SearchCat);
  let res = await axios.get(
    `https://api.giphy.com/v1/gifs/search?api_key=QPHq62keOwy2IJ46dWicOPFANBwsBnK4&limit=50&offset=0&q=${SearchCat}`
  );
  console.log(res);
  return res;
};
