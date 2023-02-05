import { useState } from "react"
import {useSideBarLeft} from "~/Container/SideBarLeft";

const useTraining = () => {
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
      
    const [listPolygons,setListPolygons] = useState([])
    const addPolygon = (polygon) =>{
        setListPolygons(prev=>[...prev,setListPolygons])
    }
    const deletePolygon = (index) => {
        setListPolygons(prev=>{
            let new_data = [...prev]
            new_data.splice(index,1)
            return new_data    
        })
    }
 
    const modifyPolygon = (index,polygon) => {
        setListPolygons(prev=>{
            let new_data = [...prev]
            new_data[index] = polygon
            return new_data    
        })
    }

    const modifyPoint = (polygonIndex,pointIndex,point) => {
        setListPolygons(prev=>{
            let new_data = [...prev]
            new_data[polygonIndex].points[pointIndex] = point
            return new_data    
        })
    }

    useEffect(()=>{
        [[200,10],[250,190],[160,210]]

        addListObjects({
            'type': 'object',
            'points': [[200,10],[250,190],[160,210]]
        })
    },[])
    
    return {
        activeIndex,
        clickIndex,
        listImages,
        addImage,
        deleteImage,
        setActiveIndex,

        listPolygons,
        addPolygon,
        deletePolygon,
        modifyPolygon,
        modifyPoint,

        listLabels,
        addListLabels,
        deleteListLabels

    }

}   