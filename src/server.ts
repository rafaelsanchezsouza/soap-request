import express from 'express';
const soapRequest = require('easy-soap-request');
const { soap } = require('strong-soap');
require('dotenv/config');
var xml2js = require('xml2js');

const expressApp = express();
expressApp.use(express.json());
const xmlparser = require('express-xml-bodyparser');

var util = require('util');
var parser = new xml2js.Parser();

expressApp
  .use(xmlparser())
  .post('/webservice', (req, res, body) => {
    const login =
      req.body['soap:envelope']['soap:body'][0]['autenticacaofuncionario'][0][
        'login'
      ][0];
    const senha =
      req.body['soap:envelope']['soap:body'][0]['autenticacaofuncionario'][0][
        'senha'
      ][0];
    const matricula =
      req.body['soap:envelope']['soap:body'][0]['autenticacaofuncionario'][0][
        'matricula'
      ][0];
    const cpf =
      req.body['soap:envelope']['soap:body'][0]['autenticacaofuncionario'][0][
        'cpf'
      ][0];
    invokeOperations(login, senha, matricula, cpf);
    // .then((results) => res.status(200).send('results'))
    // .catch(({ message: error }) => res.status(500).send({ error }));
    return res.json({ message: 'Requisição Recebida!' });
  })
  .listen(3333, () => console.log('Waiting for incoming requests'));

const invokeOperations = (
  login: string,
  senha: string,
  matricula: string,
  cpf: string
) => {
  // example data
  const url =
    'https://www.consigsimples.com.br/wsautenticacaofuncionario/Servicos.asmx?op=AutenticacaoFuncionario';
  const sampleHeaders = {
    'user-agent': 'sampleTest',
    'Content-Type': 'text/xml;charset=UTF-8',
    soapAction: '/AutenticacaoFuncionario',
  };

  const xml = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <AutenticacaoFuncionario>
      <login>${login}</login>
      <senha>${senha}</senha>
      <matricula>${matricula}</matricula>
      <cpf>${cpf}</cpf>
      </AutenticacaoFuncionario>
    </soap:Body>
  </soap:Envelope>`;

  // usage of module
  (async () => {
    const { response } = await soapRequest({
      url: url,
      headers: sampleHeaders,
      xml: xml,
      timeout: 2000,
    }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;
    console.log(headers);
    console.log(body);
    console.log(statusCode);
  })();
  // https://medium.com/better-programming/how-to-perform-soap-requests-with-node-js-4a9627070eb6
};
