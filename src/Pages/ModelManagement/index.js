import classNames from "classnames/bind";
import { useIntl } from "react-intl";
import Button from "~/Components/Button";
import style from './ModelManagement.module.scss'
import uuid from 'react-uuid'
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getListModelApi } from'~/services/api'
import { useDispatch, useSelector } from "react-redux";
import { appSlice } from "~/store";
let cx = classNames.bind(style)

const EmptyModel = () => {
    const intl = useIntl()
    const navigate = useNavigate()
    return (
        <div className={cx("empty")}>
            <span>{intl.formatMessage({id:"No model available"})}</span>
            <Button className={cx(".btn")}
                variant="primary"
                onClick={()=>navigate('/training')}
            >{intl.formatMessage({id:"Training now"})}</Button>
        </div>
    )
}

const ModelManagement = ({startTrainingClick}) => {
    // let models = [
    //     {
    //         name: "chinhdv",
    //         date: "24/05/1998",
    //     },
    //     {
    //         name: "chinhdv2",
    //         date: "24/05/1998",
    //     }
    // ]
    // models = []
    const dispatch = useDispatch()
    const intl = useIntl()
    const models = useSelector(state=>state.appSlice.data.models)
    // const { isLoading, error, data:models } = useQuery({
    //     'queryKey':'repoData', 
    //     'queryFn':() =>{
    //                 let res = getListModelApi().then(r=>{
    //                     // console.log('here')
    //                     dispatch(appSlice.actions.setModels(r))
    //                     return r
    //                 })
    //                 return res
    //             },
    //     'staleTime': 5000
    //     })
    // if (isLoading) return 'Loading...'
    // if (error) return 'An error has occurred: ' + error.message
    // console.log('models: ',models)
    return (
        <div className={cx("wrapper")}>
            
            {
            models.length!=0 ? 
            <div className={cx("container")}>  
                    <div className={cx("status-text")}>
                        <span>Total {models.length} model</span>
                    </div>
                    <div className={cx("content")}>
                        {
                            models.map((ele,index)=>{
                                return(
                                    <div className={cx("model-items")} key={uuid()}>
                                        <div className={cx("model-info")}>
                                            <span className={cx("model-info--name")}>
                                                {ele.model_name}
                                            </span>
                                            <span className={cx("model-info--meta")}>
                                                {ele.progress==1 ? 'ready':'training'} &nbsp;
                                                {ele.progress==1 ? <i className="fa-regular fa-circle-check"
                                                    style={{
                                                        color: 'green',
                                                    }}></i>: <i className="fa-solid fa-spinner"></i>}
                                            </span>
                                        </div>
                                        <div className={cx("model--action")}>
                                            <Button className={cx("btn")}
                                                variant="primary"
                                                onClick={()=>{}}
                                                >{intl.formatMessage({id:"Test"})}
                                            </Button>    
                                            <div className={cx("modal--action--delete")}>
                                                <i className="fa-regular fa-trash-can"></i>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    
                    </div>
            </div>
            :<EmptyModel/>
            }
        </div>
    )
}

export default ModelManagement