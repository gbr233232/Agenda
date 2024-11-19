require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


//middlewares
const { middlewareGlobal, checaErro } = require('./src/middlewares/middleware')
const routes = require('./routes')

const app = express();


//conexão mongoDB

async function connectDB() {
    try {
      await mongoose.connect(process.env.CONNECTIONSTRING);
      console.log('Conectado à base de dados');
      app.emit('pronto');
    } catch (err) {
      console.error('Erro ao conectar ao MongoDB:', err);
    }
  }

connectDB();



//middleware de parsing
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname, 'public')));

//sessões e flash
const sessionOptions = session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});


app.use(sessionOptions);
app.use(flash());


//configurações de views e EJS
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs')


//roteamento e middlewares personalizados
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));
app.use(middlewareGlobal);
app.use(checaErro);
app.use(routes);
app.on('pronto', () =>{
    app.listen(3333, () => {
        console.log('Servidor executando porta 3333')
    });
})


