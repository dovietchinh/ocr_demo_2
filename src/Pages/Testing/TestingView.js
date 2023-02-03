import classNames from 'classnames/bind'
import style from './TestingView.module.scss'

let cx = classNames.bind(style)

const TestingView = () => {
    return (
        <div className={cx("container")}>
            <div className={cx()}></div>
        </div>
    )
}