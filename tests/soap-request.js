const soapRequest = require('easy-soap-request');
const fs = require('fs');

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
      <login>${process.env.LOGIN}</login>
      <senha>${process.env.SENHA}</senha>
      <matricula>${process.env.MATRICULA}</matricula>
      <cpf>${process.env.CPF}</cpf>
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
