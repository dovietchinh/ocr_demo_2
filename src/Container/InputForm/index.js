import style from './InputForm.module.scss'
import classNames from 'classnames/bind'
import Button from '~/Components/Button'
import { useIntl } from 'react-intl'

let cx = classNames.bind(style)
const InputForm = ({toggle,clickNext,text,setText}) => {
    const intl = useIntl()
    return (
        <div className={cx("container")}>
            <div className={cx("title")}>
                <span>Modal Name</span>
            </div>
            <div className={cx("content")}>
                <input placeholder="What is your model name?"
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    ></input>
            </div>
            <div className={cx("action")}>
                <Button variant="secondary"
                    onClick={toggle}
                    >{intl.formatMessage({id:"Close"})}
                </Button>
                <Button variant="primary"
                    onClick={clickNext}
                    >{intl.formatMessage({id:"Next"})}
                </Button>
            </div>
        </div>
    )    
}

export default InputForm