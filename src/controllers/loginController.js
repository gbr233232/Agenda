const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado')
    res.render('login');
}
//REGISTRO
exports.register = async function(req, res) {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                // Redireciona para o referrer ou para a raiz caso não exista referrer
                return res.redirect(req.get('Referrer') || '/');
            });
            return;
        }
        
        req.flash('success', 'Seu usuário foi cadastrado');
        req.session.save(function() {
            // Redireciona para o referrer ou para a raiz caso não exista referrer
            return res.redirect(req.get('Referrer') || '/');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}


//LOGIN
exports.login = async function(req, res) {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                // Redireciona para o referrer ou para a raiz caso não exista referrer
                return res.redirect(req.get('Referrer') || '/');
            });
            return;
        }
        


        req.flash('success', 'Você entrou no sistema.');
        req.session.user = login.user;
        req.session.save(function() {
            // Redireciona para o referrer ou para a raiz caso não exista referrer
            return res.redirect(req.get('Referrer') || '/');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}


//LOGOUT
exports.logout = async function(req, res) {
    req.session.destroy();
    res.redirect('/');
}
