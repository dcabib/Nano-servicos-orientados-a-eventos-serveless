const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const uuid = require('uuid/v4');

const s3 = new AWS.S3();

const BUCKET = 'nanoservices-imagens-dca';

const upload = body => {
    console.log("****** Entrando no upload do S3 *****");

    const id = uuid();
    return new Promise((res, rej) => {
        console.log("****** Dentro da Promise do S3 *****");

        s3.putObject({
            Bucket: BUCKET,
            Key: id + '.jpg',
            Body: new Buffer(body.replace(/^data:image\/\w+;base64,/, ""),'base64'),
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        }, (err) => {
            if (err) {
                console.log("****** Deu erro no put do S3 *****");
                return rej(err);
            }
            console.log("****** Sucesso no put do S3 *****");
            return res({
                bucket: BUCKET,
                key: id + '.jpg'
            });
        });
    });
    
}

module.exports = {
    upload: upload
}

