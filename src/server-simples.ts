import express from 'express';

const app = express();
app.use(express.json());

app.post('/webservice', (request, response) => {
  const { login, senha, matricula, cpf } = request.body;

  console.log(request.body);
  console.log(login);

  return response.json({ message: 'Hello World!' });
});

app.listen(3333);
