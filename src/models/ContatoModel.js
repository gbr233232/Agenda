const mongoose = require('mongoose');
const validator = require('validator');


const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body){
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.buscaPorID = async function(id){
    if(typeof id !== 'string') return;
    const user = await ContatoModel.findById(id);
    return user;
}

Contato.prototype.register = async function(){
    this.cleanUp();
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body)
}

Contato.prototype.valida = function() {
    console.log('Ddados recebidos para validação:', this.body);
    // Validação de e-mail
    if (this.body.email && !validator.isEmail(this.body.email)) {
        this.errors.push('E-mail inválido');
    }

    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.')
    if(!this.body.email && !this.body.telefone){
        this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.')

    } 

}

Contato.prototype.cleanUp = function () {
    // Garante que `body` sempre tenha `email` e `password` como strings
    this.body = {
        nome: typeof this.body.nome === 'string' ? this.body.nome : '',
        sobrenome: typeof this.body.sobrenome === 'string' ? this.body.sobrenome : '',
        email: typeof this.body.email === 'string' ? this.body.email : '',
        telefone: typeof this.body.telefone === 'string' ? this.body.telefone : ''
    };
}

module.exports = Contato;