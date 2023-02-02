import { useState } from "react"

const useSideBarRight = () => {
    const [listObjects,setListObjects] = useState(['test object'])
    const [listLabels,setListLabels] = useState(['test label'])
    const [activeObject,setActiveObject] = useState()
    const [activeLabel,setActiveLabel] = useState()

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

    return {
        activeObject,
        listObjects,
        addListObjects,
        deleteListObjects,
        activeLabel,
        listLabels,
        addListLabels,
        deleteListLabels
    }
}

export default useSideBarRight