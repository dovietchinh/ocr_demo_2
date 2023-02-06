import classNames from 'classnames/bind'
import style from './SideBarLeft.module.scss'
import uuid from 'react-uuid'
import { useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import useSideBarLeft from './useSideBarLeft'
let cx = classNames.bind(style)

const SideBarLeft = ({listImages, activeIndex, clickIndex ,addImage,deleteImage,upBase64}) => {
    const ref = useRef()
    const intl = useIntl()
    const handleClickInput = (e) =>{
        let files = e.target.files
        let length = files.length
        for(let index=0; index< length;index++){
            let imageUrl = URL.createObjectURL(files[index]);
            addImage(imageUrl)
            if(upBase64){
                let reader = new FileReader()
                let base64 = reader.readAsDataURL(files[index])
                base64.splice()
                upBase64(base64)
            }
        }
    }
    const handleKeyDown = (e) => {
        if(e.key=='Delete'){
            deleteImage(activeIndex)
        }
    } 
    const handleClickIcon = (index) => (e) => {
        deleteImage(index)
    }
    return (
        <div className={cx("wrapper")}>
            <input type='file' 
                    style={{display:"none"}} 
                    multiple
                    accept='.jpg,.jpeg,.png'
                    ref={ref}
                    onChange={handleClickInput}
                    ></input>
            <div className={cx("header")}>
                <div className={cx("header--images")}>
                    <span>{intl.formatMessage({id: "Images"})}</span>
                </div>
                <div className={cx("header--add-images")}>
                    <span onClick={(e)=>ref.current.click()}>{intl.formatMessage({id: "Add Images"})}</span>
                </div>
                
            </div>
            <div className={cx("content")} onKeyDown={handleKeyDown} tabIndex={-1}>
                {
                listImages && listImages.map((ele,index)=>{
                    return(
                        <div key={uuid()} className={cx("content--items")} onClick={clickIndex(index)} 
                            // onMouseOver={handleHover}
                            >
                            <div className={cx("content--items--div-img",activeIndex==index ? "content-items--active":null)}>
                                <img src={ele}></img>
                            </div>
                            <div className={cx("content--items-icon")}
                                onClick={handleClickIcon(index)}>
                                <i className="fa-solid fa-circle-xmark"></i>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}  

export {useSideBarLeft}
export default SideBarLeft