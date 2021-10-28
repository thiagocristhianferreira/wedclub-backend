const express = require('express');

const {
  createUser,
  getAllUsers,
  getUserById,
  editUserById,
  deleteUserById,
} = require('../controllers/registerController');

const registerRoute = express.Router();

// Criar uma rota para criar usuário
registerRoute.post('/', createUser);

// Criar uma rota para retornar usuários
registerRoute.get('/', getAllUsers);

// Criar uma rota para retornar um usuário específico
registerRoute.get('/:id', getUserById);

// Criar uma rota para atualizar usuário
registerRoute.put('/:id', editUserById);

// Criar uma rota para excluir usuário
registerRoute.delete('/:id', deleteUserById);

module.exports = {
  registerRoute,
};