import classNames from "classnames/bind"
import Button from "~/Components/Button"
import { useIntl } from "react-intl"
import style from './CreateLabel.module.scss'
import { useState } from "react"
import uuid from 'react-uuid'
let cx = classNames.bind(style)

const CreateLabel = ({toggle,addData,defaultValue,modifyLabel=()=>{},...res}) => {
    const intl = useIntl()
    
    const [labelName,setLabelName] = useState(defaultValue?.labelName || null)
    const [keyType,setKeyType] = useState(defaultValue?.keyType)
    const [valueType,setValueType] = useState(defaultValue?.valueType)
    // const [disabled,setDisabled] = useState(true)
    const handleSelect = (changeFunction) => (e)=> {
        changeFunction(e.target.value)
    }
    const handleClickOk = (e)=>{
        
        if(res.modify){
            modifyLabel(res.modifyIndex,{
                'name': labelName
            })
        }
        else{
            addData({
                'name':labelName,
                'uuid': uuid()
            })
        }

        toggle()
    }
    console.log("defaultValue: ",defaultValue)
    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <div className={cx("header-title")}>
                    { 
                    defaultValue?.labelName!=null ? 
                    <span>{intl.formatMessage({id:"Edit label"})}</span> :
                    <span>{intl.formatMessage({id:"Create new label"})}</span>
                    
                     }
                </div>
                <div className={cx("header-icon")} onClick={toggle}>
                    <i className="fa-solid fa-x"></i>
                </div>
            </div>
            <div className={cx("content")}>
                <div className={cx("content-form-list")}>
                    <div className={cx("content-form-items")}>
                        <span>{intl.formatMessage({id:"Name"})}</span>
                        <input className={cx("content-form-items-input","input--text")}
                            type="text"
                            placeholder="Enter label name"
                            value={labelName}
                            onChange={(e)=>setLabelName(e.target.value)}
                        ></input>
                    </div>
                    <div className={cx("content-form-items")}>
                        <span>{intl.formatMessage({id:"Key"})}</span>
                        <select className={cx("content-form-items-input","input--select")}
                            onChange={handleSelect(setKeyType)}>
                            <option value="Radio button">{intl.formatMessage({id:"Radio Button"})}</option>
                            <option value="Check Box">{intl.formatMessage({id:"Check Box"})}</option>
                        </select>
                    </div>
                    <div className={cx("content-form-items")}>
                        <span>{intl.formatMessage({id:"Value"})}</span>
                        <select className={cx("content-form-items-input","input--select")}
                            onChange={handleSelect(setValueType)}>
                            <option value="Radio button">{intl.formatMessage({id:"Radio Button"})}</option>
                            <option value="Check Box">{intl.formatMessage({id:"Check Box"})}</option>
                        </select>
                    </div>
                    
                </div>
                <div className={cx("content-action")}>
                    <Button
                        variant="light"
                        className={cx("btn")}
                        onClick={toggle}
                        >{intl.formatMessage({id:"Cancel"})}
                    </Button>
                    <Button
                        className={cx("btn")}
                        onClick={handleClickOk}
                        disabled={labelName==null}
                        >{intl.formatMessage({id:"OK"})}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateLabel