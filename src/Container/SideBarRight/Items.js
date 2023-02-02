import style from './Items.module.scss'
import classNames from 'classnames/bind'

let cx = classNames.bind(style)

const LabelItems = ({ele, className, clickModify, clickDelete,...res }) => {
    return(
        <div className={cx("label")}
        {...res}>
            <div className={cx("label-title")}>
                <span className={cx("label-title--text")}>
                    {ele}
                </span>
                <div className={cx("label-title--icon-pen")} onClick={clickModify}>
                    <i className="fa-solid fa-pen"></i>
                </div>
                <div className={cx("label-title--icon-x")} onClick={clickDelete}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className={cx("label-action")}>
                <div className={cx("label-action-radio")}>
                    <input type="radio"></input>
                    <span>Key</span>
                </div>
                <div className={cx("label-action-radio")}>
                    <input type="radio"></input>
                    <span>Value</span>
                </div>
            </div>
        </div>
    )
}

const ObjectItems = ({ele, ...res}) => {
    return(
        <div></div>
    )
}

export {ObjectItems, LabelItems}
