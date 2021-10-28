const express = require('express');

const registerController = require('../controllers/registerController');

const registerRoute = express.Router();

// Criar uma rota para criar usuário
registerRoute.post('/', registerController.createUser);

// Criar uma rota para retornar usuários
registerRoute.get('/', registerController.getAllUsers);

// Criar uma rota para retornar um usuário específico
registerRoute.get('/:id', registerController.getUserById);

// Criar uma rota para atualizar usuário
registerRoute.put('/:id', registerController.editUserById);

// Criar uma rota para excluir usuário
registerRoute.delete('/:id', registerController.deleteUserById);

module.exports = {
  registerRoute,
};