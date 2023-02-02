import classNames from "classnames/bind"
import style from './Button.module.scss'

let cx = classNames.bind(style)
const Button = ({children, variant, mode, className, ...res}) => {
    const cls = {
        'primary':'btn-primary',
        'secondary': 'btn-secondary',
        'primary-reverse': 'btn-primary-reverse',
        'light': "btn-light"
    }
    return (
        <button className={cx("button",cls[variant],className)} {...res}>
            {children}
        </button>
    )
}

export default Button