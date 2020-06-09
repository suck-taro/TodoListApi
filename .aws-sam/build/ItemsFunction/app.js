const DynamoDB = require("./dynamodb-client");
const dbClient = new DynamoDB.DynamoDBClient("Item");
const userId = "User1";

exports.lambdaHandler = async (event, context) => {
  try {
    switch (event.httpMethod) {
      case "GET": {
        let dbOutput;

        if (event.pathParameters) {
          const itemId = Number(event.pathParameters.itemId);
          dbOutput = await dbClient.get(userId, itemId);
        } else {
          dbOutput = await dbClient.query(userId);
        }

        return {
          statusCode: 200,
          body: JSON.stringify(dbOutput),
        };
      }
      case "POST": {
        const body = JSON.parse(event.body);
        const dbOutput = await dbClient.put(body);

        return {
          statusCode: 200,
          body: JSON.stringify(dbOutput),
        };
      }
      case "PUT": {
        const body = JSON.parse(event.body);
        const dbOutput = await dbClient.update(body);

        return {
          statusCode: 200,
          body: JSON.stringify(dbOutput),
        };
      }
      case "DELETE": {
        const itemId = Number(event.pathParameters.itemId);
        const dbOutput = await dbClient.delete(userId, itemId);

        return {
          statusCode: 200,
          body: JSON.stringify(dbOutput),
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
