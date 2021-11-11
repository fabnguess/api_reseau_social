exports.signUpErrors = (error) => {
    let errors = {pseudo: '', email: '', password: ''}

    if (error.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect ou déjà pris"

    if (error.message.includes('email'))
        errors.email = "Email incorrect"

    if (error.message.includes('password'))
        errors.password = "Le mot de passe doit faire 6 caractères minimum"

    if (error.code === 11000)
        errors.email = "Cet email est déjà enregistré"


    return errors


}