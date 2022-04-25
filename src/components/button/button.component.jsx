import {
    BaseButton,
    InvertedButton,
    GoggleSignInButton
} from './button.styles.jsx'

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES) =>
({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoggleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
}[buttonType])


const Button = ({ children, buttonType = BUTTON_TYPE_CLASSES.base, ...otherProps }) => {
    const CustomButton = getButton(buttonType)
    return <CustomButton {...otherProps}>{children}</CustomButton >
}

export default Button

/*
<button
    className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
    {...otherProps}
>
    {children}
</button >
*/