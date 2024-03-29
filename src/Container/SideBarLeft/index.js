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
            let uuid_temp = uuid()
            
            addImage({imageUrl, uuid:uuid_temp})
            if(upBase64){
                let reader = new FileReader()
                reader.readAsDataURL(files[index])
                reader.onload = (e) => {
                    upBase64({
                        'imageUrl':e.target.result,
                        'img_uuid':uuid_temp
                    })
                }
            }
        }
        
    }
    const handleKeyDown = (e) => {
        if(e.key=='Delete'){
            deleteImage(activeIndex)
        }
    } 
    const handleClickIcon = (index) => {
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
                    <span onClick={(e)=>{
                        ref.current.value = null
                        ref.current.click()
                    }}>{intl.formatMessage({id: "Add Images"})}</span>
                </div>
                
            </div>
            <div className={cx("content-wrapper")}>
                <div className={cx("content")} onKeyDown={handleKeyDown} tabIndex={-1}>
                    {
                    listImages && listImages.map((ele,index)=>{
                        return(
                            <div key={uuid()} className={cx("content--items")} 
                                onClick={(e)=>{
                                    // if(e.target != e.currentTarget) return
                                    clickIndex(index)()
                                }} 
                                // onMouseOver={handleHover}
                                >
                                <div className={cx("content--items--div-img",activeIndex==index ? "content-items--active":null)}>
                                    <img src={ele?.imageUrl}></img>
                                </div>
                                <div className={cx("content--items-icon")}
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        deleteImage(index)
                                    }}>
                                    <i className="fa-solid fa-circle-xmark"></i>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}  

export {useSideBarLeft}
export default SideBarLeft