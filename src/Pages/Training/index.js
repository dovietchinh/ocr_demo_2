import Modal, { useModal } from "~/Components/Modal"
import SideBarLeft,{useSideBarLeft} from "~/Container/SideBarLeft";
import SideBarRight,{useSideBarRight} from "~/Container/SideBarRight";
import classNames from "classnames/bind";
import style from './Training.module.scss'
import { useEffect, useContext } from "react";
import UploadFile from "~/Components/UploadFile";
import {usePrompt} from '~/Hook'
import BlockingModal from "~/Components/BlockingModal"
import MainView from "~/Container/MainView";
let cx = classNames.bind(style)


const Training = () => {
  const {activeIndex,clickIndex, listImages, addImage,deleteImage,setActiveIndex} = useSideBarLeft()
  const {
    activeObject,
    listObjects,
    addListObjects,
    deleteListObjects,
    activeLabel,
    listLabels,
    addListLabels,
    deleteListLabels
  } = useSideBarRight()
  useEffect(()=>{
    return ()=>{

    }
  },[])
  // usePrompt( 'Leave screen?', false );
    return (
        <>
          {
          listImages.length!=0 ? <div className={cx("sidebar-left")}>
            
            <SideBarLeft 
              activeIndex={activeIndex}
              listImages={listImages}
              addImage={addImage}
              clickIndex={clickIndex}
              deleteImage={deleteImage}
            ></SideBarLeft>
            
          </div>: null
          }
          <div className={cx("content")}>
          {
          listImages.length==0 ? 
            <UploadFile upURL={addImage}></UploadFile>
            : <MainView></MainView>
          }
          </div>
          
          <div className={cx("sidebar-right")}>
          
             <SideBarRight
             data={{activeObject,listObjects,activeLabel,listLabels}}
             actions={{addListObjects,deleteListObjects,addListLabels,deleteListLabels}}
            ></SideBarRight>
          
          </div>
          <BlockingModal when={listImages.length!=0}></BlockingModal>
        
        </>
      );
}
export default Training