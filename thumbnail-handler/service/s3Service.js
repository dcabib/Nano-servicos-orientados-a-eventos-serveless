const AWS = require('aws-sdk')

AWS.config.update({
    region: 'us-east-1'
})

const BUCKET = 'nanoservices-imagens-thumbnail-dca';

const s3 = new AWS.S3();

const getObject = (bucket, key) => {
    console.log("#### Entrando no getObject ####");

    return new Promise((res, rej) => {
        s3.getObject({
            Bucket: bucket,
            Key: key
        }, (err, data) => {
            if (err) {
                console.log("#### ERRO no getObject ####");
                return rej(err);
            }
            console.log("#### Sucesso no getObject ####");
            return res(data.Body);
        })
    });
}

const putObject = (buffer, filename) => {
    console.log("#### Entrando no putObject ####");

    return new Promise((res, rej) => {
        s3.putObject({
            Bucket: BUCKET,
            Key: filename,
            Body: buffer
        }, (err, data) => {
            if (err) {
                console.log("#### Erro no putObject ####");
                return rej(err);
            }
            console.log("#### Sucesso no putObject ####");
            return res({
                bucket: BUCKET,
                key: filename
            });
        })
    });
}

module.exports = {
    getObject: getObject,
    putObject: putObject
}