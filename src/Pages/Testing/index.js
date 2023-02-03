import classNames from 'classnames/bind'
import SideBarLeft, { useSideBarLeft } from '~/Container/SideBarLeft'
import style from './Testing.module.scss'
import UploadFile from '~/Components/UploadFile'
import SelectModel from './SelectModel'

let cx = classNames.bind(style)

const Testing = () =>  {
    const {
        activeIndex,
        listImages,
        clickIndex,
        deleteImage,
        addImage } = useSideBarLeft()
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
                ></SideBarLeft>
            </div>:null
            }
            <div className={cx("content")}>
            {
                listImages.length==0 ? (
                    <>
                    <SelectModel></SelectModel>
                    
                    <UploadFile upURL={addImage} className={cx("uploadfile")}></UploadFile>
                    </>
                )
                : null
            }
            
            </div>
        </>
        // </div>
    )
}

export default Testing