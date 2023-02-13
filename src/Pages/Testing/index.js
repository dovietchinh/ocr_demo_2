import classNames from 'classnames/bind'
import SideBarLeft, { useSideBarLeft } from '~/Container/SideBarLeft'
import style from './Testing.module.scss'
import UploadFile from '~/Components/UploadFile'
import SelectModel from './SelectModel'
import TestingView from './TestingView'
import { useTesting } from './hook'
let cx = classNames.bind(style)

const Testing = () =>  {
    const {
        "Images":{
            activeIndex,
            listImages,
            clickIndex,
            deleteImage,
            addImage,
            upBase64
        }
    } = useTesting()
    return(
        // <div className={cx("container")}>
        <>
            {
            listImages.length!=0 ? <div className={cx("sidebar-left")}>
                <SideBarLeft
                // listImages, activeIndex, clickIndex ,addImage,deleteImage
                listImages={listImages}
                activeIndex={activeIndex}
                clickIndex={clickIndex}
                addImage={addImage}
                deleteImage={deleteImage}
                upBase64={upBase64}
                ></SideBarLeft>
            </div>:null
            }
            <div className={cx("content")}>
            {
                listImages.length==0 ? (
                    <>
                    <SelectModel></SelectModel>
                    <UploadFile upURL={addImage} className={cx("uploadfile")} upBase64={upBase64}></UploadFile>
                    </>
                )
                : <TestingView/>
            }
            
            </div>
        </>
        // </div>
    )
}

export default Testing