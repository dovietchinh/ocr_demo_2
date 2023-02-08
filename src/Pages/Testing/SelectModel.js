import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import uuid from 'react-uuid'
import { useTesting } from './hook'
import style from './SelectModel.module.scss'

let cx = classNames.bind(style)

const SelectModel = () => {
    const {
        "Models":{
            selectedModel,
            setSelectedModel
        }
    } = useTesting()
    const models = useSelector(state=>state.appSlice?.data?.models)
    return (
            <div className={cx("select")}>
                <select defaultValue={-1}
                    onChange={(e)=>{
                        // setSelectedModel(e.target.value)
                        for(let i of models){
                            console.log('i: ',i)
                            console.log('e.target.value: ',e.target.value)
                            if(e.target.value == i.model_name){
                                console.log('e.target.value_true:')
                                console.log(i)
                                setSelectedModel(i)
                            }
                        }    
                        
                    }}
                    >
                    <option value={-1} disabled hidden>{models?.length!=0 ? "Select Model":"No model available"}</option>
                    {
                        models?.map((ele,index)=>{
                            let selected = false
                            if(ele.model_name==selectedModel?.model_name){
                                selected = true
                            }
                            console.log('ele: ',ele)
                            console.log(selectedModel)
                            return (
                                <option key={uuid()} selected={selected} value={ele.id}>{ele.model_name}</option>
                            )
                        })
                    }
                </select>
            </div>
    )
}

export default SelectModel