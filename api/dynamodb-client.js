const AWS = require("aws-sdk");

class DynamoDBClient {
  constructor(tableName) {
    const endpoint = process.env.DYNAMODB_ENDPOINT;
    const config =
      endpoint !== "" ? { endpoint } : { region: "ap-northeast-1" };

    this.documentClient = new AWS.DynamoDB.DocumentClient(config);
    this.tableName = tableName;
  }

  scan() {
    return this.documentClient.scan({ TableName: this.tableName }).promise();
  }

  query(userId) {
    const params = {
      TableName: this.tableName,
      ExpressionAttributeNames: { "#key": "UserId" },
      ExpressionAttributeValues: { ":val": userId },
      KeyConditionExpression: "#key = :val",
    };

    return this.documentClient.query(params).promise();
  }

  put(itemJson) {
    const params = {
      TableName: this.tableName,
      Item: itemJson,
    };

    return this.documentClient.put(params).promise();
  }

  get(userId, itemId) {
    console.log(userId);
    console.log(itemId);

    const params = {
      TableName: this.tableName,
      Key: { UserId: userId, ItemId: itemId },
    };

    console.log(params);

    return this.documentClient.get(params).promise();
  }

  update(itemJson) {
    const params = {
      TableName: this.tableName,
      Key: { UserId: itemJson.UserId, ItemId: itemJson.ItemId },
      ExpressionAttributeNames: {
        "#name": "Name",
      },
      ExpressionAttributeValues: {
        ":name": itemJson.Name,
      },
      UpdateExpression: "set #name = :name",
    };

    return this.documentClient.update(params).promise();
  }

  delete(userId, itemId) {
    const params = {
      TableName: this.tableName,
      Key: { UserId: userId, ItemId: itemId },
    };

    return this.documentClient.delete(params).promise();
  }
}

exports.DynamoDBClient = DynamoDBClient;
