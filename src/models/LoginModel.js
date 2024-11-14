const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }


    async login() {
        // Verifica se existem erros anteriores
        if (this.errors.length > 0) return;
    
        // Busca o usuário pelo e-mail
        this.user = await LoginModel.findOne({ email: this.body.email });
    
        // Verifica se o usuário existe
        if (!this.user) {
            this.errors.push('Usuário inválido');
            return;
        }
    
        // Valida a senha
        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }
    }
    

    async register() {
        this.cleanUp();
        this.valida();

        if (this.errors.length > 0) return;

        await this.userExist();

        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);

    }

    async userExist(){
        this.user = await LoginModel.findOne({ email: this.body.email });
        if(this.user) this.errors.push('Usuário já existe.')
        
    }

    valida() {
        // Validação de e-mail
        if (!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido');
        }

        // Validação de senha
        if (!this.body.password || this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
        }
    }

    cleanUp() {
        // Garante que `body` sempre tenha `email` e `password` como strings
        this.body = {
            email: typeof this.body.email === 'string' ? this.body.email : '',
            password: typeof this.body.password === 'string' ? this.body.password : ''
        };
    }
}

module.exports = Login;
