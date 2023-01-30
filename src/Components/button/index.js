import classNames from "classnames/bind"
import style from './Button.module.scss'

let cx = classNames.bind(style)
const Button = ({children, variant, mode, ...res}) => {
    const cls = {
        'primary':'btn-primary',
        'primary-reverse': 'btn-primary-reverse'
    }
    console.log("cls[variant]: ",cls[variant])
    return (
        <button className={cx("button",cls[variant])} {...res}>
            {children}
        </button>
    )
}

export default Button