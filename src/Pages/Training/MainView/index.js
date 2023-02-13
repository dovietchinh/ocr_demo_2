import classNames from "classnames/bind"
import ToolList from "~/Components/ToolList"
import style from "./MainView.module.scss"
import icon1 from "~/assets/images/tools1.svg"
import icon2 from "~/assets/images/tools2.svg"
import icon3 from "~/assets/images/tools3.svg"
import InputForm from "~/Container/InputForm"
import uuid from 'react-uuid'
import { useState, useRef, useEffect, useCallback } from "react"
import Modal,{ useModal } from "~/Components/Modal"
import ProgressBar from "~/Components/ProgressBar"
import ImageViewer from './ImageViewer'
import { useTraining } from "../hook"
import { startTrainingApi } from "~/services/api"
import { useToasts } from "~/Components/Toast"
import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
let cx = classNames.bind(style)

const MainView = ({img,listObjects,activeImg, modifyPoint,activeToolList,setActiveToolList,addListObjects}) => {
    // const [text,setText] = useState("")
    const {
        'Images': {
            listImages,
            addImage,
            deleteImage,
            setActiveIndex,
            activeIndex,
            clickIndex,
        },
        'Object':{
            
            deleteListObjects,
            modifyObjects,
            activeObject,
            setActiveObject
        },
        'Labels':{
            listLabels,
            addListLabels,
            deleteListLabels,
            modifyLabel
        },
        'ToolList':{
            toggleTooList,
        },
        'Models':{
            trainingModelName,
            setTrainingModelName
        },
        "Navigation":{
            blockNavigate,
            setBlockNavigate,
        }
    } = useTraining()
    const [isLoading,setIsLoading] = useState(true)
    const { isShowing, toggle } = useModal()
    const { isShowing:isShowing2, toggle:toggle2 } = useModal()
    const [scale,setScale] = useState(1)
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const { add: addToast } = useToasts()
    const intl = useIntl()
    // const [sizeImg,setSizeImg] = useState()
    let imageRef = document.getElementById("imageRef")
    const navigate = useNavigate()
    return (
        <div className={cx("container")}>

            <div className={cx("view")}>
                <div className={cx("view--img")}>
                    <ImageViewer 
                    src={img?.imageUrl}
                    listObjects={listObjects}
                    modifyPoint={modifyPoint}
                    activeToolList={activeToolList}
                    setActiveToolList={setActiveToolList}
                    addListObjects={addListObjects}
                    activeImg={activeImg}
                    scale={scale}
                    setScale={setScale}
                    offset={offset}
                    setOffset={setOffset}
                    ></ImageViewer>
                </div>
            </div>
            <div className={cx("tool")}>
                <ToolList
                    listIcon={[{icon:icon1},{icon:icon2},{icon:icon3}]}
                    handleClick={()=>{
                        // validate training info before trigger training
                        let validate_info = true
                        if(listObjects.length==0) {
                            validate_info=false
                            addToast(intl.formatMessage({id:"please draw some labels!"}),'error')
                        }
                        
                        listObjects.forEach((object_label,objectIndex) => {
                            if(!listLabels[object_label.labelIndex]){
                                addToast(`Object ID :${objectIndex+1} in img ${object_label.imgIndex+1} have no label`,'warning')
                                validate_info = false
                            }
                        });
                        if(!validate_info) return;
                        toggle()
                    }}
                    buttonLabel={intl.formatMessage({id:"Start training"})}
                    activeIndex={activeToolList}
                    setActiveIndex={setActiveToolList}
                    clickReset={()=>{
                        setScale(1)
                        setOffset({x:0,y:0})
                    }}
                />
            </div>
            <Modal hide={toggle} isShowing={isShowing}>
                <InputForm 
                    text={trainingModelName}
                    setText={setTrainingModelName}
                    toggle={toggle}
                    clickNext={()=>{
                        setBlockNavigate(false)
                        toggle();
                        setIsLoading(true)
                        const readingFile = (file,img_uuid) => {
                            let reader = new FileReader()
                            return new Promise(
                                function (resolve, reject) {
                                    reader.onload = function (event) {
                                        resolve({
                                            'data': event.target.result,
                                            'img_uuid': img_uuid
                                        })
                                    }
                                    reader.readAsDataURL(file)
                                })
                        }
                        let tempFunction = (blobUrl,img_uuid) => fetch(blobUrl)
                                .then(res => res.blob())
                                .then(blob=>readingFile(blob,img_uuid))

                        Promise.all(listImages.map((ele)=>{
                                return tempFunction(ele?.imageUrl,ele?.uuid)
                            }))
                            .then((listBase64)=>{
                                let listAnnotation = []
                                
                                for(let i of listBase64){
                                    let temp = {
                                        'id': 0,
                                        'image_name': i.img_uuid +'.jpg',
                                        'field': []
                                    }
                                    for(let object_label of listObjects){
                                        if(object_label.img_uuid==i.img_uuid){
                                            temp.field.push({
                                                "label": listLabels[object_label.labelIndex].name,
                                                "points": object_label.points,
                                                "attribute": []
                                            })
                                        }
                                        
                                    }
                                    listAnnotation.push(temp)
                                }
                                return startTrainingApi({
                                    'model_name': trainingModelName,
                                    'listBase64': listBase64,
                                    'listAnnotation': listAnnotation,
                                    'view': {
                                        'height': imageRef.height,
                                        'width': imageRef.width,
                                    },
                                    'naturalView': {
                                        'height': imageRef.naturalHeight,
                                        'width': imageRef.naturalWidth
                                    }
                                })
                            })
                            .then((r)=>{
                            })
                            .catch(e=>{
                                setIsLoading(false)
                            })
                        
                        
                            //          'type': 'polygon',
                            //         'points': [[200,10],[250,190],[160,210]],
                            //         'imgIndex': 0,
                            //         'labelIndex': 0,
                            //          'img_uuid' :2,
                            
                        // setTimeout(()=>{
                        //     setIsLoading(false)
                        // },5000)
                        // toggle2()
                        navigate('/models-management')
                        setBlockNavigate(true)
                    }}
                ></InputForm>
            </Modal>
            <Modal hide={toggle2} isShowing={isShowing2}>
                <ProgressBar handleClickCancel={toggle2} isLoading={isLoading}></ProgressBar>
            </Modal>
        </div>

    )
}

export default MainView