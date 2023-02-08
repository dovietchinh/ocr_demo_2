import style from './Items.module.scss'
import classNames from 'classnames/bind'
import uuid from 'react-uuid'
let cx = classNames.bind(style)

const LabelItems = ({ele, clickModify, clickDelete }) => {
    return(
        <div className={cx("label")}>
            <div className={cx("label-title")}>
                <span className={cx("label-title--text")}>
                    {ele?.name}
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

const ObjectItems = ({ele, clickDelete,listLabels,active,handleClick}) => {
    return(
        <div className={cx("object",active ? "object--active":null)}
            onClick={handleClick}>
            <div className={cx("object-title")}>
                <span className={cx("object-title--text")}>Object ID : {ele.indexObject}</span>
                <div className={cx("object-title--icon-x")} onClick={clickDelete}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className={cx("object-select")}>
                <select className={cx("default-value")}>
                    <option value={null} disabled selected hidden>select label</option>
                    {/* <option>heelo1</option>
                    <option>heelo2</option>
                    <option>heelo3</option> */}
                    {
                        listLabels?.map((label,index)=>{
                            let select = false
                            if(ele.labelIndex==index) select=true
                            return (
                                <option key={uuid()} selected={select} value={index}>{label.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className={cx("object-action")}>
                <div className={cx("object-action-radio")}>
                    <input type="radio"></input>
                    <span>Key</span>
                </div>
                <div className={cx("object-action-radio")}>
                    <input type="radio"></input>
                    <span>Value</span>
                </div>
            </div>
        </div>
    )
}

export {ObjectItems, LabelItems}
