import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import uuid from 'react-uuid'
import style from './SelectModel.module.scss'

let cx = classNames.bind(style)

const SelectModel = ({selectedModel,setSelectedModel}) => {
    const models = useSelector(state=>state.appSlice?.resource?.models)
    return (
            <div className={cx("select")}>
                <select>
                    <option value={null} disabled selected hidden>{models?.length!=0 ? "Select Model":"No model available"}</option>
                    {
                        models?.map((ele,index)=>{
                            return (
                                <option key={uuid()} value={ele.id}>{ele.name}</option>
                            )
                        })
                    }
                </select>
            </div>
    )
}

export default SelectModel