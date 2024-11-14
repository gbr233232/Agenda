//const HomeModel = require('../models/HomeModel');

//HomeModel.find()
//    .then(dados => console.log(dados))
//    .catch(e => console.log(e));

exports.index = (req,res) =>{
    //console.log(req.flash('error'), req.flash('info'), req.flash('sucess'))
    console.log('Respondendo ao cliente');
    res.render('index');
    return;
};

