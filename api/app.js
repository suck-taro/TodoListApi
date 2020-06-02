
exports.lambdaHandler = async (event, context) => {
  try {
    switch (event.httpMethod) {
      case "GET": {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "GET API Result" }),
        };
      }
      case "POST": {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "POST API Result" }),
        };
      }
      case "PUT": {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "PUT API Result" }),
        };
      }
      case "DELETE": {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "DELETE API Result" }),
        };
      }
      default:
        return {
          statusCode: 501,
        };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
