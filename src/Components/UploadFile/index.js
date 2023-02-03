import classNames from "classnames/bind"
import { useRef, useState } from "react"
import { useIntl } from "react-intl"
import style from './UploadFile.module.scss'
import icon_upload from '~/assets/images/icon.png'
import Button from "~/Components/Button"
let cx = classNames.bind(style)
const UploadFile = ({upURL,upBase64,className}) => {
    const intl = useIntl()
    const ref = useRef()
    const [filesNames,setFileNames] = useState()
    const handleFileOnLoad = (e) => {
        let files = e.target.files
        for(let index = 0 ; index < files.length;index++){
            let imageUrl = URL.createObjectURL(files[index]);
            upURL(imageUrl)
            if(upBase64){
                let fileReader = new FileReader()
                fileReader.readAsDataURL(files[index])
                fileReader.onload = (e) => {
                    upBase64(e.target.result)
                }
            }
        }       
    }
    return (
        <div className={cx("container",className)}>
            <title className={cx("title")}>
                <span>{intl.formatMessage({id:"UPLOAD IMAGE"})}</span>
            </title>
            <div className={cx("drop-area")}>
                <div className={cx("content")}>
                    <div className={cx("icon-upload")}>
                        <img src={icon_upload}></img>
                    </div>
                    <div className={cx("text-upload")}>
                        <span className={cx("text-upload-title")}>Upload a file</span>
                        <span className={cx("text-upload-subtitle")}>PNG, JPG up to 20MB</span>
                    </div>
                    <Button variant='primary'  
                            className={cx("btn")}
                            onClick={e=>ref.current.click()}
                        >
                        {intl.formatMessage({id:"Browse a file"})}
                    </Button>
                    <span className={cx("file-name")}>{
                        filesNames
                    }</span>
                    <input type="file" 
                        ref={ref}
                        multiple 
                        accept=".jpg,.jpeg,.png"
                        style={{display:"none"}}
                        onChange={handleFileOnLoad}
                    ></input>
                </div>
                
            </div>
        </div>
    )    
}
export default UploadFile