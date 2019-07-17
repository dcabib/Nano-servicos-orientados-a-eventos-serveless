const AWS = require('aws-sdk')

AWS.config.update({
    region: 'us-east-1'
})

const sqs = new AWS.SQS()

const putMessage = message => {
    console.log("#### Entrando no SQS ####");

    return new Promise((res, rej) => {
        sqs.sendMessage({
            QueueUrl: 'https://sqs.us-east-1.amazonaws.com/226373140466/post-processing-image-queue',
            MessageBody: JSON.stringify(message)
        }, (err, data) => {
            if (err) {
                console.log("#### ERRO no SQS ####");

                return rej(err);
            }
            console.log("#### Sucesso no SQS ####");
            return res(data);
        });
    });
}

module.exports = {
    putMessage: putMessage
}