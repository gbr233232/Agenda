//const HomeModel = require('../models/HomeModel');

//HomeModel.find()
//    .then(dados => console.log(dados))
//    .catch(e => console.log(e));

const Contato = require('../models/ContatoModel')

exports.index = async (req, res) => {
    try {
        const contatos = await Contato.buscaContatos();
        console.log('Contatos:', contatos); // Exibe os dados no terminal
        res.render('index', { contatos });
    } catch (e) {
        console.error('Erro no controlador index:', e);
        res.render('404'); // Renderiza página de erro em caso de falha
    }
};

