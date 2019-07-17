'use strict';

const s3Service = require('./service/s3Service')
const dynamodbService = require('./service/dynamodbService')
const elasticsearchService = require('./service/elasticsearchService')

module.exports.upload = async (event, context) => {
    console.log("****** Entrando no handler de upload *****");
    console.log("****** Chamando o servios S3 para colocar o arquivo *****"); 
    //console.log(event);

    const item = await s3Service.upload(event.body);

    console.log("****** Chamando o servios do DynamoDB salvar os matadata *****");
    await dynamodbService.put(item);

    console.log("****** Retornando status 201 *****");
    return {
      statusCode: 201,
      body: JSON.stringify(item)
    }
};


// module.exports.get = async (event) => {
//   const data = await elasticsearchService.search(event.queryStringParameters.q)
//   console.log(data);
//   return {
//     statusCode: 201,
//     body: JSON.stringify(data)
//   }
// };
