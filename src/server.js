const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();


mongoose.connect('mongodb://localhost:27017/campeonato', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set('strictQuery', false)
app.use(cors());
app.use(express.json());
app.use(routes);



app.listen(3000, () => {
 console.log('Servidor de api  iniciado na porta 3000');
});
