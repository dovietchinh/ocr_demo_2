import classNames from "classnames/bind"
import { useTraining } from "../hook"
import style from './transform.module.scss'
let cx = classNames.bind(style)

const TransFormImage = () => {
    const {
        "TransForm":{
            previewSrc,
            setPreviewSrc
        }
    } = useTraining()
    console.log('previewSrc: ',previewSrc)
    return(
        <div className={cx("transform-wrapper")}>
            <span className={cx("transform__head")}>
                TRANSFORM PREVIEW 
            </span>
            <div className={cx("transform__img")}>
                <img src={previewSrc}></img>
            </div>
            <div className={cx("transform__action")}>
                <div className={cx("transform__action__btn")}>
                    <span>Use Image</span>
                </div>
                <div className={cx("transform__action__btn")}>
                    <span>Align</span>
                </div>
                
            </div>
        </div>
    )
}

export default TransFormImage