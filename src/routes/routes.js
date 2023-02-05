'use strict';

const express = require('express');
const CampeonatoController = require('../controllers/CampeonatoController')


const routes = express.Router();

routes.get('/tabela', CampeonatoController.consultaTabela);

routes.post('/tabela', CampeonatoController.cadastrarTime);

routes.put('/tabela/:nome', CampeonatoController.atualizarTime);

routes.delete('/tabela/:nome', CampeonatoController.deletarTime);

routes.get('/rodadas', CampeonatoController.consultaRodada);

routes.post('/rodadas', CampeonatoController.cadastrarRodada);

routes.put('/rodadas/:id', CampeonatoController.atualizarRodada);

routes.delete('/rodadas/:id', CampeonatoController.deletarRodada);




module.exports = routes;