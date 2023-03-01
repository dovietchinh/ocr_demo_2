import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import { useTraining } from "../hook"
import style from './transform.module.scss'
let cx = classNames.bind(style)

const TransFormImage = () => {
    const {
        'Images': {
            listImages,
            addImage,
            deleteImage,
            setActiveIndex,
            activeIndex,
            clickIndex,
            modifyImage
        },
        "TransForm":{
            previewSrc,
            setPreviewSrc
        }
    } = useTraining()
    const [oldSrc,setOldSrc] = useState()
    useEffect(()=>{
        setPreviewSrc(null)
        setOldSrc(listImages[activeIndex].imageUrl)
    },[])
    const handleClick = (e) => {
        if(previewSrc=="" || previewSrc==null) return
        modifyImage(previewSrc,activeIndex)
    }
    const handleClickUndo = (e) => {
        modifyImage(oldSrc,activeIndex)
    }
    
    
    return(
        <div className={cx("transform-wrapper")}>
            <span className={cx("transform__head")}>
                TRANSFORM PREVIEW 
            </span>
            <div className={cx("transform__img")}>
                <img src={previewSrc}></img>
                {/* <img src="http://10.124.64.125:19000/demo/0023d0c2-1916-442d-82d4-d0751619705a.jpg"></img> */}
            </div>
            <div className={cx("transform__action")}>
                <div className={cx("transform__action__btn")} onClick={handleClick}>
                    <span>Use Image</span>
                </div>
                <div className={cx("transform__action__btn")}  onClick={handleClickUndo}>
                    <span>Undo</span>
                </div>
                
            </div>
        </div>
    )
}

export default TransFormImage