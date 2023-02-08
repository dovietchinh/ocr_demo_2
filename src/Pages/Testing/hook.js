const { createContext, useContext, useState } = require("react")
const { useSideBarLeft } = require("~/Container/SideBarLeft")

const TestingContext = createContext()
const TestingProvider = ({children}) => {
    const {        
        activeIndex,
        listImages,
        clickIndex,
        deleteImage,
        addImage} = useSideBarLeft()
    // const {} =
    const [selectedModel,setSelectedModel] = useState()
    const value = {
        "Images": {
            activeIndex,
            listImages,
            clickIndex,
            deleteImage,
            addImage
        },
        "Models":{
            selectedModel,
            setSelectedModel
        }
    }
    
    return(
        <TestingContext.Provider value={value}>{children}</TestingContext.Provider>
    )
}

export const useTesting = () => useContext(TestingContext)
export default TestingProvider