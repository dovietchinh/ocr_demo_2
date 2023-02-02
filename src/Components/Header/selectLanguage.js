import { useState } from "react"
import { useIntl } from "react-intl"
import { US, VN } from 'country-flag-icons/react/3x2'
import classNames from "classnames/bind"
import style from './SelectLanguage.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { appSlice } from "~/store"
let cx = classNames.bind(style)

const SelectLanguage = () => {
    const [toggle,setToggle] = useState(false)
    const intl = useIntl()
    const listLanguage = [
        {
            'label': "English",
            'icon': US,
            'language': 'en',
        },
        {
            'label': "Tiếng Việt",
            'icon': VN,
            'language': 'vi'
        }

    ]
    const [cls,setCls] = useState("icon--deactive")
    const dispatch = useDispatch()
    const language = useSelector(state=>state.appSlice.language)
    const handleClick = (e) => {
        if(toggle) setCls("icon--active");
        else setCls("icon--deactive")
        setToggle(!toggle)
    }
    return (
        
        <div className={cx("language--header")} onClick={handleClick}>
            <span >
                {intl.formatMessage({id:"language"})}
            </span>
            <i className={cx("icon",cls)+ " fa-solid fa-caret-up"}></i>
            {toggle && <div className={cx("language--list")}>
        
                {listLanguage.map((ele,index)=>{
                    return (
                        <div key={"language--items " + index} 
                            className={cx("language--items")}
                            onClick={(e)=>{
                                dispatch(appSlice.actions.setLanguage(listLanguage[index].language))
                            }}>
                            <span className={cx("language--label")}>{ele.label}</span>
                            <ele.icon className={cx("language--flag")}></ele.icon>
                        </div>
                    )
                })}
                
            </div>}
        </div>
        
    )
}

export default SelectLanguage