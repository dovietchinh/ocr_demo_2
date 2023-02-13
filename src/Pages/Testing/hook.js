import { useSelector } from "react-redux"
import { inferenceImgApi } from "~/services/api"

const { createContext, useContext, useState } = require("react")
const { useSideBarLeft } = require("~/Container/SideBarLeft")
const TestingContext = createContext()
const TestingProvider = ({children}) => {
    const {        
        activeIndex,
        listImages,
        clickIndex,
        deleteImage: deleteImage_old,
        addImage} = useSideBarLeft()
    const [resultDicts,setResultDict] = useState([])
    const addResultDict = (data)=>{
        setResultDict(prev=>[...prev,data])
    }
    const deleteResultDict = (index)=>{
        setResultDict(prev=>{
            let new_data = [...prev]
            new_data.splice(index,1)
            // else new_data.splice(-1,1)
            return new_data
        })
    }
    const deleteImage = (index) => {
        deleteImage_old(index)
        deleteResultDict(index)
    }

    // const selectedModel = useSelector(state=>state.appSlice.data.selectedModel)
    const selectedModel = useSelector(state=>{
        let selectedModelID = state.appSlice?.data?.selectedModelID
        let models = state.appSlice?.data?.models
        for(let model of models){
            if(selectedModelID == model.model_id){
                return model
            }
        }
    })
    const upBase64 = (data) => {
        inferenceImgApi({
            'image_base64': data,
            'selectedModel': selectedModel,
        })
        .then(r=>{
            console.log('infer_result: ',r)
            addResultDict(r)
        })
        .catch((e)=>{
            addResultDict(null)
        })
    }
    const value = {
        "Images": {
            activeIndex,
            listImages,
            clickIndex,
            deleteImage,
            addImage,
            upBase64
        },
        "Labels":{
            resultDicts,
            addResultDict,
            deleteResultDict
        }

    }
    
    return(
        <TestingContext.Provider value={value}>{children}</TestingContext.Provider>
    )
}

export const useTesting = () => useContext(TestingContext)
export default TestingProvider