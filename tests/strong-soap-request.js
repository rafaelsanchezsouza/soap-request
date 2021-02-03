'use strict';
var soap = require('strong-soap').soap;
// wsdl of the web service this client is going to invoke. For local wsdl you can use, url = './wsdls/stockquote.wsdl'
var url =
  'https://www.consigsimples.com.br/wsautenticacaofuncionario/Servicos.asmx?op=AutenticacaoFuncionario';

var requestArgs = `<?xml version="1.0" encoding="utf-8"?>
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

var clientOptions = {};
soap.createClient(url, clientOptions, function (err, client) {
  var customRequestHeader = {
    'user-agent': 'sampleTest',
    'Content-Type': 'text/xml;charset=UTF-8',
    soapAction: '/AutenticacaoFuncionario',
  };
  // Custom request header
  client.GetQuote(
    requestArgs,
    function (err, result, envelope) {
      // Result in SOAP envelope body which is the wrapper element.
      // In this case, result object corresponds to GetCityForecastByZIPResponse.
      console.log(JSON.stringify(result));
    },
    null,
    customRequestHeader
  );
});

var options = {};
soap.createClient(url, options, function (err, client) {
  var method = client['StockQuote']['StockQuoteSoap']['GetQuote'];
  method(requestArgs, function (err, result, envelope, soapHeader) {
    //response envelope
    console.log('Response Envelope: \n' + envelope);
    //'result' is the response body
    console.log('Result: \n' + JSON.stringify(result));
  });
});
