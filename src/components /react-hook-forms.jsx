import ErrorMessage from "./errorMessage.jsx";
import axios from "axios";
import {useForm} from "react-hook-form";


function ReactHookForm() {
    const {register, handleSubmit, formState: {errors}} = useForm()

    function postData(url, data) {
        axios.post(url, data).then(response => console.log(response)).catch(error => console.log(error.message))
    }

    return (
        <form onSubmit={handleSubmit((data, event) => {
            postData("https://65b38aea770d43aba479fa8c.mockapi.io/users", data)
            event.target.reset()
        })
        }
        >
            <div>
                <p>{name}</p>
                <input type="text" {...register("name", {
                    required: "Ce champ est obligatoire",
                    minLength: {value: 3, message: "votre nom doit avoir au moins 3 caracteres"},
                    maxLength: {value: 25, message: "Votre nom doit avoir moins de 25 caracteres"}
                })} placeholder="Votre nom"/>
                <ErrorMessage message={errors.name?.message}/>
            </div>
            <div>
                <input type="email" {...register("email", {
                    required: "Ce champ est obligatoire",
                    pattern: {value: /(.+)@(.+){2,}\.([A-Za-z]){2,}/, message: "Votre email n'est pas valide"}
                })} placeholder="Votre email"/>
                <ErrorMessage message={errors.email?.message}/>
            </div>
            <div>
                <button type="submit">Envoyer</button>
            </div>
        </form>
    )
}

export default ReactHookForm
