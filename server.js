require('dotenv').config();
const express = require('express');
const app = express();

//mongodb
const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
    console.log('conectei á base de dados')
    app.emit('pronto')
})
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));
//

const { middlewareGlobal } = require('./src/middlewares/middleware') 
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const { checaErro } = require('./src/middlewares/middleware')
const routes = require('./routes')
const path = require('path')


//comentários
const { emit } = require('process');



app.use(express.urlencoded({extended:true}));

app.use(express.static(path.resolve(__dirname, 'public')));


const sessionOptions = session({
    secret: 'segredo demais()',
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



app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs')
//Nossos próprios middleware
app.use(checaErro);
app.use(middlewareGlobal)
app.use(routes);
app.on('pronto', () =>{
    app.listen(3333, () => {
        console.log('Servidor executando porta 3333')
    });
})


