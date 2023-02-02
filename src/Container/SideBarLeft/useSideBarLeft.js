const { useState } = require("react")

const useSideBarLeft = ()=>{
    const [activeIndex,setActiveIndex] = useState()
    const [listImages,setListImages] = useState([])
    const clickIndex = (index)=> (e) => {
        setActiveIndex(index)
    }
    const deleteImage = (index) => {
        setActiveIndex(prev=>{
            return prev!=0 ? prev -1 : prev
        })
        setListImages(prev=>{
            let new_data = [...prev]
            new_data.splice(index,1)
            return new_data
        })
    }
    const addImage = (data) => {
        setActiveIndex(prev=>{
            return prev!=0 ? prev -1 : prev
        })
        setListImages(prev=>[...prev,data])
    }
    return {
        activeIndex,
        listImages,
        clickIndex,
        deleteImage,
        addImage,
    }
}

export default useSideBarLeft