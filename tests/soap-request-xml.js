const soapRequest = require('easy-soap-request');
const { soap } = require('strong-soap');

const expressApp = require('express')();
const bodyParser = require('body-parser');

var XMLHandler = soap.XMLHandler;
var xmlHandler = new XMLHandler();

expressApp
  .use(bodyParser.json())
  .post('/parallel-soap-invoke', (req, res) => {
    console.log(req.body.login);
    // const { login, senha, matricula, cpf } = req.body;
    // console.log(login);
    // console.log(senha);
    // console.log(matricula);
    // console.log(cpf);
    // invokeOperations( login, senha, matricula , cpf )
    .then((results) => res.status(200).send(results))
    // .catch(({ message: error }) => res.status(500).send({ error }));
  })
  .listen(3000, () => console.log('Waiting for incoming requests'));

const invokeOperations = (login, senha, matricula, cpf) => {
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

  var xmlToJson = xmlHandler.xmlToJson(null, xml, null);

  console.log('xmlToJson: ');
  console.log(xmlToJson);

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
};
// https://medium.com/better-programming/how-to-perform-soap-requests-with-node-js-4a9627070eb6
