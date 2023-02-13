import classNames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'
import uuid from 'react-uuid'
import { useTesting } from './hook'
import style from './SelectModel.module.scss'
import { appSlice } from '~/store'
import { getListModelApi } from '~/services/api'
let cx = classNames.bind(style)

const SelectModel = () => {
    const dispatch = useDispatch()
    const selectedModel = useSelector(state=>{
        let selectedModelID = state.appSlice?.data?.selectedModelID
        let models = state.appSlice?.data?.models
        for(let model of models){
            if(selectedModelID == model.model_id){
                return model
            }
        }
    })
    const models = useSelector(state=>state.appSlice?.data?.models)
    return (
            <div className={cx("select")}>
                <select
                    onChange={(e)=>{
                        for(let i of models){
                            if(e.target.value == i.model_name){
                                // dispatch(appSlice.actions.setSelectedModel(i))
                                dispatch(appSlice.actions.setSelectedModelID(i.model_id))

                            }
                        }    
                    }}
                    onFocus={()=>{
                        
                        getListModelApi().then(r=>dispatch(appSlice.actions.setModels(r))).catch(e=>console.log(e))
                    }}
                    >
                    <option disabled selected hidden>{models?.length!=0 ? "Select Model":"No model available"}</option>
                    {
                        models?.map((ele,index)=>{
                            let selected = false
                            if(ele.model_name==selectedModel?.model_name){
                                selected = true
                            }
                            return (
                                <option key={uuid()} selected={selected} value={ele.model_name} disabled={ele.status!=5}>
                                    {ele.model_name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
    )
}

export default SelectModel