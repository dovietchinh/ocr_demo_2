import Modal, { useModal } from "~/Components/Modal"
import SideBarLeft,{useSideBarLeft} from "~/Container/SideBarLeft";
import SideBarRight,{useSideBarRight} from "~/Container/SideBarRight";
import classNames from "classnames/bind";
import style from './Training.module.scss'
import { useEffect, useContext } from "react";
import UploadFile from "~/Components/UploadFile";
import {usePrompt} from '~/Hook'
import BlockingModal from "~/Components/BlockingModal"
import MainView from "~/Pages/Training/MainView";
import TrainingProvider,{useTraining} from "./hook"
let cx = classNames.bind(style)


const Training = () => {
  const {
    'Images':{activeIndex,clickIndex, listImages, addImage,deleteImage,setActiveIndex},
    'Object':{
      listObjects,
      modifyPoint,
      addListObjects,
      deleteListObjects,
      activeObject,
      setActiveObject
    },
    'Labels':{
      listLabels,
      activeLabel,
      addListLabels,
      deleteListLabels,
      modifyLabel,
    },
    'ToolList': {
      activeToolList,
      toggleTooList:setActiveToolList
    }
  } = useTraining()
  // console.log('modifyLabel: ',modifyLabel)
    return (
        <>
        {/* <ProviderTraining> */}
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
            : <MainView listObjects={listObjects}
                        addListObjects={addListObjects}
                        modifyPoint={modifyPoint}
                        img={listImages[activeIndex]}
                        activeToolList={activeToolList}
                        setActiveToolList={setActiveToolList}
                        activeImg={activeIndex}
                
               ></MainView>
          }
          </div>
          
          <div className={cx("sidebar-right")}>
             <SideBarRight
             activeObject={activeObject}
             listObjects={listObjects}
             activeLabel={activeLabel}
             listLabels={listLabels}
             addListObjects={addListObjects}
             deleteListObjects={deleteListObjects}
             addListLabels={addListLabels}
             deleteListLabels={deleteListLabels}
             setActiveObject={setActiveObject}
             modifyLabel={modifyLabel}
             activeImg={activeIndex}
            ></SideBarRight>
          
          </div>
          <BlockingModal when={listImages.length!=0}></BlockingModal>
        </>
      );
}
export default Training


