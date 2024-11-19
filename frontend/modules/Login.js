import validator from "validator";

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.validate();
        });
    }

    validate() {
        const emailInput = this.form.querySelector('input[name="email"]');
        const passwordInput = this.form.querySelector('input[name="password"]');
        let error = false;

        // Validação do e-mail
        if (!validator.isEmail(emailInput.value)) {
            alert("E-mail inválido");
            error = true;
        }

        // Validação da senha
        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            alert("Senha inválida. A senha deve ter entre 3 e 50 caracteres.");
            error = true;
        }

        // Caso não haja erros, enviar o formulário ou executar outra ação
        if (!error) {
            console.log("Formulário válido!");
            console.log("E-mail:", emailInput.value, "Senha:", passwordInput.value);
            this.form.submit(); // Caso deseje submeter o formulário
        }
    }
}
