import {useState} from "react";
import ErrorMessage from "./errorMessage.jsx";

// Nom :
// Min : 3 chars
// Max : 25 chars

// Email
// Valide email : xxxx@xxxx.xx
//  /(.+)@(.+){2,}\.(.+){2,}/


function ControlledForm() {
    const [nameInput, setNameInput] = useState("");
    const [nameInputError, setNameInputError] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [emailInputError, setEmailInputError] = useState("")

    function onNameInputChange(event){
        setNameInput(event.target.value)

        if(event.target.value.length < 3){
            setNameInputError("Votre nom doit avoir au moins 3 caracteres ")
        }else if(event.target.value.length > 25){
            setNameInputError("Votre nom doit avoir moins de 25 caracteres ")
        } else {
            setNameInputError("")
        }

    }

    function onEmailInputChange(event){
        setEmailInput(event.target.value)
        if(/(.+)@(.+){2,}\.([A-Za-z]){2,}/.test(event.target.value)){
            setEmailInputError("")
        } else {
            setEmailInputError("Votre email n'est pas valide")
        }
    }

    function handleSubmit(){
        alert(`
        Votre nom est : ${nameInput}
Votre email est : ${emailInput}
        `)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input required maxLength={25} minLength={3} type="text" value={nameInput} onChange={onNameInputChange} placeholder="Votre nom"/>
                <ErrorMessage message={nameInputError} />

            </div>
            <div>
                <input type="email" value={emailInput} onChange={onEmailInputChange} placeholder="Votre email"/>
                <ErrorMessage message={emailInputError}/>
            </div>
            <div>
                <button  type="submit">Envoyer</button>
            </div>
        </form>
    )
}

export default ControlledForm
