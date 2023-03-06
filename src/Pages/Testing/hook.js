import { useSelector } from "react-redux"
import { useToasts } from "~/Components/Toast"
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
        addImage: addImage_old} = useSideBarLeft()
    const [resultDicts,setResultDict] = useState([])
    const addResultDict = (data)=>{
        setResultDict(prev=>[...prev,data])
    }
    const modifyResultDict = (data)=>{
        setResultDict(prev=>{
            let new_data = [...prev]
            for(let i =0; i<prev.length; i++){
                console.log('prev[i].img_uuid: ',prev[i].img_uuid)
                if(prev[i]?.img_uuid == data?.img_uuid){
                    new_data[i] = data
                }
            }
            return new_data
        })
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
        // deleteResultDict(index)
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
    const {add:addToast} = useToasts()
    const upBase64 = (data) => {
        if(selectedModel.status!=5){
            addToast('model have not been active','warning')
            return 
        }
        // else{
        inferenceImgApi({
            'image_base64': data,
            'selectedModel': selectedModel,
        })
        .then(r=>{
            modifyResultDict(r)
        })
        .catch((e)=>{
            console.log('anh nay ko infer dc')
            console.log('e: ',e)
            modifyResultDict({
                "result": null,
                'message': e.message,
                "status": -1,
                "img_uuid": data["img_uuid"]
            })
        })
        addResultDict({
            "result":null,
            "message": "wait a second!",
            "status": 0,
            "img_uuid": data["img_uuid"]
        })
        

    }
    const addImage = (data) => {
        if(selectedModel.status!=5){
            addToast('model have not been active','warning')
            return 
        }
        addImage_old(data)
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