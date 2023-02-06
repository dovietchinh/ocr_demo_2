import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext, createContext } from "react"
import {useSideBarLeft} from "~/Container/SideBarLeft";

const TrainingContext = createContext(null)

const TrainingProvider = ({children}) => {
    const {activeIndex,clickIndex, listImages, addImage,deleteImage,setActiveIndex} = useSideBarLeft()

    const [listObjects,setListObjects] = useState([])
    const [listLabels,setListLabels] = useState([])
    const [activeObject,setActiveObject] = useState()
    const [activeLabel,setActiveLabel] = useState()
    const [activeToolList,setActiveToolList] = useState()
    const toggleTooList = (index) => {
        if(activeToolList==index){
            setActiveToolList(null)
        }
        else{
            setActiveToolList(index)
        }
    }
    const addListObjects = (data) => {
        setListObjects(prev=>[...prev,data])
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

    const modifyObjects = (index,data) => {
        setListObjects(prev=>{
            let new_data = [...prev]
            new_data[index] = data
            return new_data    
        })
    }

    const modifyPoint = (objectIndex,pointIndex,point) => {
        setListObjects(prev=>{
            let new_data = [...prev]
            new_data[objectIndex].points[pointIndex] = point
            return new_data    
        })
    }

    const addListLabels = (data) => {
        setListLabels(prev=>[...prev,...data])
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

    useEffect(()=>{
        addListObjects({
            'type': 'polygon',
            'points': [[200,10],[250,190],[160,210]],
            'imgIndex': 0,
            'labelIndex': 0,
        })
        addListLabels(['asd','zxc'])
    },[])



    const value =  {
        'Images': {
            listImages,
            addImage,
            deleteImage,
            setActiveIndex,
            activeIndex,
            clickIndex,
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
            deleteListLabels
        },
        'ToolList':{
            activeToolList,
            toggleTooList,
        }
    }

    return (
        <TrainingContext.Provider value={value}>{children}</TrainingContext.Provider>
    )

}   

export const useTraining = () => useContext(TrainingContext)
export default TrainingProvider