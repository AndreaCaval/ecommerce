import { useState } from "react";
import {
    signInWithGooglePopup,
    signInAuthWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await signInAuthWithEmailAndPassword(email, password)
            resetFormFields()
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    alert("no user associated with this email")
                    console.log("Error loggin in, user not found");
                    break;
                case "auth/wrong-password":
                    alert("incorrect password for email")
                    console.log("Error loggin in, wrong password");
                    break;
                default:
                    console.log("Error logging in", error.message);
                    break;
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={() => { }}>

                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name='email'
                    value={email} />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name='password'
                    value={password} />

                <div className="buttons-container">
                    <Button type="submit" onClick={handleSubmit}>Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;
