import express from 'express';
const soapRequest = require('easy-soap-request');
const { soap } = require('strong-soap');
require('dotenv/config');

const expressApp = express();
expressApp.use(express.json());
const bodyParser = require('body-parser');

var XMLHandler = soap.XMLHandler;
var xmlHandler = new XMLHandler();
var util = require('util');

expressApp
  .use(bodyParser.json())
  .post('/webservice', (req, res) => {
    const { login, senha, matricula, cpf } = req.body;

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
  var login = process.env.LOGIN;
  var senha = process.env.SENHA;
  var matricula = process.env.MATRICULA;
  var cpf = process.env.CPF;

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
      timeout: 1000,
    }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;
    console.log(headers);
    console.log(body);
    console.log(statusCode);
  })();
  // https://medium.com/better-programming/how-to-perform-soap-requests-with-node-js-4a9627070eb6
};
