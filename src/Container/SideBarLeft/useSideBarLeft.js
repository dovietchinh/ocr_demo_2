const { useState } = require("react")

const useSideBarLeft = ()=>{
    const [activeIndex,setActiveIndex] = useState()
    const [listImages,setListImages] = useState([])
    const clickIndex = (index)=> (e) => {
        setActiveIndex(index)

    }
    const deleteImage = (index) => {
        setActiveIndex(prev=>{
            if(prev >= index){
                return Math.max(prev-1,0)
            }
            else{
                return prev
            }
            // return Math.max(index-1,0)
        })
        setListImages(prev=>{
            let new_data = [...prev]
            new_data.splice(index,1)
            return new_data
        })
    }
    const addImage = (data) => {
        console.log('addImg')
        setActiveIndex(prev=>{
            if (!prev){
                return 0
            }
            return prev!=0 ? prev -1 : prev
        })
        setListImages(prev=>[...prev,data])
    }
    const modifyImage = (src,imgIndex) => {
        setListImages(prev=>{
            let new_data = [...prev]
            new_data[imgIndex].imageUrl = src
            return new_data
        })
    }
    return {
        activeIndex,
        listImages,
        clickIndex,
        deleteImage,
        addImage,
        modifyImage
    }
}

export default useSideBarLeft