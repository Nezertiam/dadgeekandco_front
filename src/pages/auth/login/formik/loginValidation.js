import * as Yup from "yup";

const loginValidation = Yup.object({
    email: Yup.string().email('Cette adresse mail est invalide').required('Veuillez renseigner votre adresse mail.'),
    password: Yup.string().required('Veuillez taper votre mot de passe.'),
})

export default loginValidation