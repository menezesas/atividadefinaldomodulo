import express from 'express';

const app = express();
const listaUsuarios = [];

app.use(express.json());

app.get('/', (request, response) => {
  return response.status(200).send('<h1>Sistema de cadastro de recados!</h1><p>Dê seguimento ao seu cadastro:</p>');
});

app.listen(8010, () => console.log("Servidor iniciado"));

app.post('/cadastro', (request, response) => {
  const { nome, email, senha } = request.body;

  if (!nome) {
    return response.status(400).json("O campo nome é obrigatório");
  }

  if (!email) {
    return response.status(400).json("O campo e-mail é obrigatório");
  }

  if (!senha) {
    return response.status(400).json("O campo senha é obrigatório");
  }

  const usuarioExistente = listaUsuarios.find((user) => user.email === email);

  if (usuarioExistente) {
    return response.status(400).json({
      success: false,
      message: 'Nome de usuário já existe. É necessário criar um novo usuário.',
      data: {}
    });
  }

  const novoUsuario = {
    id: new Date().getTime(),
    nome,
    email,
    senha,
    logado: false
  };

  listaUsuarios.push(novoUsuario);

  return response.status(201).json({
    success: true,
    message: 'Usuário criado com sucesso',
    data: novoUsuario
  });
});

    