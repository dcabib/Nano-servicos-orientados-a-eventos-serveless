const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE = 'images';

const put = item => {
    console.log("****** Entrando no putItem do DynamoDB *****");

    return new Promise((res, rej) => {
        console.log("****** Dentro da Promise do DynamoDB *****");

        dynamodb.put({
            TableName: TABLE,
            Item: {
                id: item.key,
                bucket: item.bucket
            }
        }, (err, data) => {
            if (err) {
                console.log("****** Deu erro no put do DynamoDB *****");
                return rej(err);
            }
            console.log("****** Sucesso no put do DynamoDB *****");
            return res(data);
        })
    });
}

module.exports = {
    put: put
}