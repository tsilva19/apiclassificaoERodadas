'use strict';

const times = require('../models/times');
const rodadas = require('../models/rodadas');

module.exports =  {
    async consultaTabela(req, res) {

        // Buscar todos os times na tabela de campeonato e ordená-los pelos pontos
        const campeonato = await times.find().sort({ vitoria: -1 });
        res.json(campeonato);
    },

    async cadastrarTime(req, res) {
       // Criar um novo time na tabela de campeonato
       const novoTime = new times(req.body);
       await novoTime.save();
       res.status(201).send();

    },

    async atualizarTime(req, res) {

     // Buscar o time na tabela de campeonato pelo nome
      const time = await times.findOne({ nome: req.params.nome });
      if (!time) {
        return res.status(404).send();
      }

     // Atualizar as vitorias do time
     // atualizar quantidade de jogos
     // atualizar derrotas
     if(req.body.emblema) {
      time.vitoria = req.body.emblema;
     }

     time.vitoria = req.body.vitoria;
     time.jogos = req.body.jogos;
     time.derrota = req.body.derrota;
     await time.save();
     res.send();

     },

    async deletarTime(req, res) {

       // Buscar o time na tabela de campeonato pelo nome
      const time = await times.findOne({ nome: req.params.nome });
      if (!time) {
        return res.status(404).send();
      }

    // Excluir o time
    await time.remove();
    res.send();

     },

    async consultaRodada(req, res) {

      // Buscar todas as rodadas
       const rodadasAll = await rodadas.find();
       res.json(rodadasAll);
    },

    async cadastrarRodada(req, res) {
      // atualizar vitorias ou derrotas time 1 
      const time1 = await times.findOne({ nome: req.body.time1 });
      
     // Atualizar as vitorias do time
     // atualizar quantidade de jogos
     // atualizar derrotas
       time1.jogos = time1.jogos + 1
       if (req.body.placar1 == 1){
        time1.vitoria = time1.vitoria + 1;
        
       }
       else {
        time1.derrota = time1.derrota + 1;
        
       }

       await time1.save();

       // atualizar vitorias ou derrotas time 1 
      const time2 = await times.findOne({ nome: req.body.time2 });
      
      // Atualizar as vitorias do time
      // atualizar quantidade de jogos
      // atualizar derrotas
        time2.jogos = time2.jogos + 1
        if (req.body.placar2 == 1){
         time2.vitoria = time2.vitoria + 1;
         
        }
        else {
         time2.derrota = time2.derrota + 1;
         
        }
 
        await time2.save();
      


       // Criar uma nova rodada
        const novaRodada = new rodadas(req.body);
        await novaRodada.save();
        res.status(201).send();

   },

   async atualizarRodada(req, res) {


    const rodada = await rodadas.findById(req.params.id);
    if (!rodada) {
      return res.status(404).send();
    }


    // atualizar vitorias ou derrotas time 1 
    const t1 = await times.findOne({ nome: rodada.time1 });
    
   // Atualizar as vitorias do time
   // atualizar quantidade de jogos
   // atualizar derrotas
     if (req.body.placar1 == 1){
      t1.vitoria = t1.vitoria + 1;
      
     }
     else {
      t1.derrota = t1.derrota + 1;
      
     }

     await t1.save();

     // atualizar vitorias ou derrotas time 1 
    const t2 = await times.findOne({ nome: rodada.time2 });
    
    // Atualizar as vitorias do time
    // atualizar quantidade de jogos
    // atualizar derrotas
      if (req.body.placar2 == 1){
       t2.vitoria = t2.vitoria + 1;
       
      }
      else {
       t2.derrota = t2.derrota + 1;
       
      }

      await t2.save();
    


     /// Atualizar os dados da rodada
       rodada.time1 = req.body.time1
       rodada.time2 = req.body.time2 
       rodada.placar1 = req.body.placar1
       rodada.placar2 = req.body.placar2
       await rodada.save();
       res.send();

 },

 async deletarRodada(req, res)  {
      // Buscar a rodada pelo ID
      const rodada = await rodadas.findById(req.params.id);
      if (!rodada) {
        return res.status(404).send();
      }

       // atualizar vitorias ou derrotas time 1 
       console.log("time1 :", rodada.time1)
    const t1 = await times.findOne({ nome: rodada.time1 });

     if(t1){

        console.log("vallor de jogo:", t1.jogos)
    // Atualizar as vitorias do time
    // atualizar quantidade de jogos
    // atualizar derrotas
      if (t1.jogos !=  null){
        t1.jogos = t1.jogos - 1
      }
      
      if (rodada.time1 == 1){
       t1.vitoria = t1.vitoria - 1;
       
      }
      else {
       t1.derrota = t1.derrota - 1;
       
      }
 
      await t1.save();
 
      // atualizar vitorias ou derrotas time 1 
    }
      
     const t2 = await times.findOne({ nome: rodada.time2 });
     
     // Atualizar as vitorias do time
     // atualizar quantidade de jogos
     // atualizar derrotas
    if (t2){

    
     if (t2.jogos !=  null){
      t2.jogos = t2.jogos - 1
    }
     
       if (rodada.time2 == 1){
        t2.vitoria = t2.vitoria - 1;
        
       }
       else {
        t2.derrota = t2.derrota - 1;
        
       }
 
       await t2.save();
     
    }

      // Excluir a rodada
      await rodada.remove();
      res.send();
    }


}
