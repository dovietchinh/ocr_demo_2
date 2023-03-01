import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext, createContext } from "react"
import {useSideBarLeft} from "~/Container/SideBarLeft";

const TrainingContext = createContext(null)

const TrainingProvider = ({children}) => {
    const {activeIndex,clickIndex, listImages, addImage,deleteImage:deleteImage_old,setActiveIndex,modifyImage} = useSideBarLeft()

    const [listObjects,setListObjects] = useState([])
    const [listLabels,setListLabels] = useState([])
    const [activeObject,setActiveObject] = useState()
    const [activeLabel,setActiveLabel] = useState()
    const [activeToolList,setActiveToolList] = useState()
    const [trainingModelName,setTrainingModelName] = useState("")
    const [blockNavigate,setBlockNavigate] = useState(true)
    const [sizeImg,setSizeImg] = useState()
    const toggleTooList = (index) => {
        if(activeToolList==index){
            setActiveToolList(null)
        }
        else{
            setActiveToolList(index)
        }
    }
    const addListObjects = (data) => {
        setListObjects(prev=>[...prev,{...data,'indexObject':prev.length+1}])
    }
    const deleteListObjects = (index) => {
        if(index){
            setListObjects(prev=>{
                let new_data = [...prev]
                new_data.splice(index,1)
                return new_data
            })
        }
        else{
            setListObjects(prev=>{
                let new_data = [...prev]
                new_data.pop()
                return new_data
            })
        }
    }
    const deleteAllObjectWithImgIndex = (index) => {
        setListObjects(prev=>{
            // let new_data = [...prev]
            let new_data = []
            for(let i=0; i < prev.length;i++){
                if(prev[i].imgIndex!=index){
                    new_data.push({
                        ...prev[i],
                        imgIndex: prev[i].imgIndex<index ? prev[i].imgIndex : prev[i].imgIndex - 1
                    })
                }
            }
            return new_data
        })
    }
    const deleteImage = (index) => {
        deleteAllObjectWithImgIndex(index)
        deleteImage_old(index)
    }
    const modifyObjects = (index,data) => {
        setListObjects(prev=>{
            let new_data = [...prev]
            new_data[index] = {
                ...new_data[index],
                ...data
            }
            return new_data    
        })
    }
    
    const modifyPoint = (objectIndex,pointIndex,point) => {
        setListObjects(prev=>{
            let new_data = [...prev]
            // let old_point = new_data[objectIndex].points[pointIndex]
            if(point[0]!=null){
                new_data[objectIndex].points[pointIndex][0] = point[0]
            }
            if(point[1]!=null){
                new_data[objectIndex].points[pointIndex][1] = point[1]
            }
            // new_data[objectIndex].points[pointIndex] = point
            return new_data    
        })
    }

    const addListLabels = (data) => {
        setListLabels(prev=>[...prev,data])
    }

    const deleteListLabels = (index) => {
        if(index){
            setListLabels(prev=>{
                let new_data = [...prev]
                new_data.splice(index,1)
                return new_data
            })
        }
        else{
            setListLabels(prev=>{
                let new_data = [...prev]
                new_data.pop()
                return new_data
            })
        }
    }
    const modifyLabel = (index,data) => {
        setListLabels(prev=>{
            let new_data = [...prev]
            new_data[index] = {
                ...new_data[index],
                ...data
            }
            return new_data
        })
    }
    // addImage({imageUrl, uuid:uuid_temp})
    const [previewSrc, setPreviewSrc] = useState("")
    const [transFormPoints,setTransFormPoints] = useState([])
    useEffect(()=>{
		setPreviewSrc("")
        setActiveToolList(null)
	},[activeIndex])
    const value =  {
        'Images': {
            listImages,
            addImage,
            deleteImage,
            setActiveIndex,
            activeIndex,
            clickIndex,
            modifyImage
        },
        'Object':{
            listObjects,
            addListObjects,
            deleteListObjects,
            modifyObjects,
            modifyPoint,
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
            activeToolList,
            toggleTooList,
        },
        'Models':{
            trainingModelName,
            setTrainingModelName
        },
        "Navigation":{
            blockNavigate,
            setBlockNavigate
        },
        "TransForm":{
            setTransFormPoints,
            previewSrc,
            setPreviewSrc
        }
    }

    return (
        <TrainingContext.Provider value={value}>{children}</TrainingContext.Provider>
    )

}   

export const useTraining = () => useContext(TrainingContext)
export default TrainingProvider