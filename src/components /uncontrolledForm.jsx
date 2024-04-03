import {useState} from "react";
import ErrorMessage from "./errorMessage.jsx";
import axios from "axios";

function UncontrolledForm() {

    const [nameInputError, setNameInputError] = useState("")
    const [emailInputError, setEmailInputError] = useState("")

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const errors = {}

        if (name.length < 3) {
            errors.name = "votre nom doit avoir au moins 3 caracteres"
        } else if (name.length > 25) {
            errors.name = "Votre nom doit avoir moins de 25 caracteres"
        } else {
            errors.name = ""
        }

        if (/(.+)@(.+){2,}\.([A-Za-z]){2,}/.test(email)) {
            errors.email = ""
        } else {
            errors.email = "Votre email n'est pas valide"
        }

        setNameInputError(errors.name)
        setEmailInputError(errors.email)

        if (errors.email.length === 0 && errors.name.length === 0) {
            postData("https://65b38aea770d43aba479fa8c.mockapi.io/users", Object.fromEntries(formData.entries()))
            event.target.reset()
        }
    }

    function postData(url, data) {
        axios.post(url, data).then(response => console.log(response)).catch(error => console.log(error.message))
    }


    return (<form onSubmit={handleSubmit}>
        <div>
            <input type="text" name="name" placeholder="Votre nom"/>
            <ErrorMessage message={nameInputError}/>
        </div>
        <div>
            <input type="email" name="email" placeholder="Votre email"/>
            <ErrorMessage message={emailInputError}/>
        </div>
        <div>
            <button type="submit">Envoyer</button>
        </div>

    </form>)
}

export default UncontrolledForm
