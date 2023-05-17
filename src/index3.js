import express from 'express';
import crypto from 'crypto';

const app = express();
const listaRecados = [];

app.use(express.json());

app.listen(8010, () => console.log("Servidor iniciado"));

app.post('/recados', (request, response) => {
const dados = request.body;
const user = listaUsuarios.find(user => user.logado === true);

if (!user) {
return response.status(401).json({
success: false,
message: 'Necessário fazer login para criar um recado',
data: {}
});
}

const novoRecado = {
id: crypto.randomUUID(),
titulo: dados.titulo,
descricao: dados.descricao,
autor: user
};

listaRecados.push(novoRecado);

return response.status(201).json({
success: true,
message: 'Recado criado com sucesso',
data: novoRecado
});
});

app.get('/recados/:id', (request, response) => {
const { id } = request.params;
const user = listaUsuarios.find(user => user.logado === true);
const recado = listaRecados.find(recado => recado.id === id);

if (!user) {
return response.status(401).json({
success: false,
message: 'Necessário fazer login para listar seus recados',
data: {}
});
}

if (!recado) {
return response.status(404).json({
success: false,
message: 'Recado não encontrado',
data: {}
});
}

const recadoListado = {
id: recado.id,
titulo: recado.titulo,
descricao: recado.descricao,
autor: user
};

return response.status(200).json({
success: true,
message: 'Recado listado com sucesso',
data: recadoListado
});
});

app.put('/recados/:id', (request, response) => {
const { id } = request.params;
const user = listaUsuarios.find(user => user.logado === true);
const recadoIndex = listaRecados.findIndex(recado => recado.id === id);

if (!user) {
return response.status(401).json({
success: false,
message: 'Necessário fazer login para atualizar um recado',
data: {}
});
}

if (recadoIndex === -1) {
return response.status(404).json({
success: false,
message: 'Recado não encontrado',
data: {}
});
}

const recado = listaRecados[recadoIndex];
recado.titulo = request.body.titulo;
recado.descricao = request.body.descricao;

listaRecados[recadoIndex] = recado;

return response.status(200).json({
success: true,
message: 'Recado atualizado com sucesso',
data: recado
});
});

app.delete('/recados/:id', (request, response) => {
const { id } = request.params;
const user = listaUsuarios.find(user => user.logado === true);
const recadoIndex = listaRecados.findIndex(recado => recado.id === id);

if (!user) {
return response.status(401).json({
success: false,
message: 'Necessário fazer login para deletar um recado',
data: {}
});
}

if (recadoIndex === -1) {
return response.status(404).json({
success: false,

message: 'Recado não encontrado',
data: {}
});
}

listaRecados.splice(recadoIndex, 1);

return response.status(200).json({
success: true,
message: 'Recado deletado com sucesso',
});
});