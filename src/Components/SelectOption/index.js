import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import uuid from 'react-uuid'
import style from './SelectOption.module.scss'

let cx = classNames.bind(style)

const SelectModel = ({selectedModel,setSelectedModel}) => {
    const models = useSelector(state=>state.appSlice?.data?.models)
    console.log('models: 10', models)
    return (
            <div className={cx("select")} value={0}>
                <select>
                    <option disabled value={0} hidden>{models?.length!=0 ? "Select Model":"No model available"}</option>
                    {
                        models.map((ele,index)=>{
                            console.log('ele: ',ele)
                            return (
                                <option key={uuid()} value={ele?.id}>{ele?.model_name}</option>
                            )
                        })
                    }
                </select>
            </div>
    )
}

export default SelectModel