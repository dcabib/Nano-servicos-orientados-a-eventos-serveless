'use strict';

const thumbnailService = require('./service/thumbnailService')

module.exports.thumbnail = async (event) => {
  console.log("#### Entrando no handler do SNS ####");

  console.log('Evento do SNS recebido com sucesso:', JSON.stringify(event))
  await thumbnailService.thumbnail(event)

  console.log("#### Saindo no handler do SNS ####");

  return { message: 'Thumbnail gerado com sucesso!', event };
};
