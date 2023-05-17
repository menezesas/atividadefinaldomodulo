import express from 'express';

const app = express();

app.use(express.json());

app.listen(8010, () => console.log("Servidor iniciado"));

app.post('/login', (request, response) => {
const data = request.body;

const usuario = listaUsuarios.find((user) => user.email === data.email && user.senha === data.senha);

if (!usuario) {
return response.status(400).json({
success: false,
message: 'E-mail ou senha incorretos',
data: {}
});
}

listaUsuarios.forEach((usuario) => (usuario.logado = false));

usuario.logado = true;

return response.status(200).json({
success: true,
message: 'Login realizado com sucesso'
});
});

