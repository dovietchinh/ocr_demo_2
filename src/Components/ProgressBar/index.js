import style from './ProgressBar.module.scss'
import classNames from 'classnames/bind'
import ProgressCircle from './ProgressCircle'
import Button from '~/Components/Button'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { activeModelApi, deactiveModelApi, getModelStatusApi } from '~/services/api';
import { useToasts } from '../Toast';


let cx = classNames.bind(style)
export const Spin = ({...res}) => {
    console.log('res: ',res)
    return (
    <Spinner animation="border" role="status" {...res}>
         <span className="visually-hidden">Loading...</span>
    </Spinner>
    )
}

const ProgressBar = ({currentState,handleClickCancel,handleClickOK,handleClickActivate,isLoading}) => {
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
    const dispatch = useDispatch()
    const [percentage,setPercentage] = useState({
                                        "circle_1": {
                                            "prev": 0,
                                            "current":0
                                        },
                                        "circle_2": {
                                            "prev": 0,
                                            "current":0
                                        }
                                    })
    useEffect(()=>{
        setPercentage(prev=>{
            return {
                "circle_1":{
                    "prev": prev.circle_1.current,
                    "current": selectedModel?.ocr_percentage /100
                },
                "circle_2":{
                    "prev": prev.circle_2.current,
                    "current": selectedModel?.train_percentage / 100
                }
            }
        })
    },[selectedModel])
    const {add:addToast} = useToasts()
    const [loadingBtn,setLoadingBtn] = useState(false)
    return (
        // <Container >
            isLoading ? <Spin/>:(<div className={cx("container")}>
                <div className={cx("X")} onClick={handleClickCancel}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className={cx("progress-group")}>
                    <ProgressCircle 
                        from_percentage={percentage.circle_1.prev} 
                        percentage={percentage.circle_1.current}  
                        cls={cx("progress-circle--1")}
                        title={"Initializing"}
                        ></ProgressCircle>
                    <ProgressCircle 
                        from_percentage={percentage.circle_2.prev} 
                        percentage={percentage.circle_2.current}  
                        cls={cx("progress-circle--2")}
                        title={"Training"}
                        ></ProgressCircle>
                </div>
                <div className={cx("modelname--display")}>
                    <span>model </span>
                    <span className={cx("modename")}>{selectedModel.model_name}</span>
                    <span>{percentage.circle_2.current!=1 ? "is being trained": " ready for testing "}</span>
                </div>
                <div className={cx("actions")}>
                    <Button variant='light' onClick={handleClickCancel} >Cancel</Button>
                    {/* <Button variant='secondary' onClick={handleClickCancel} disabled>Stop</Button> */}
                    <div
                        style={{
                            position: "relative"
                        }}>
                    <Button variant="primary" 
                        
                        onClick={()=>{                    
                            setLoadingBtn(true)
                            if(selectedModel.status==4){
                                activeModelApi({model_id:selectedModel.model_id})
                                    .then((r)=>{
                                        if(r.status=='failure'){
                                            addToast(r.message,"error")
                                        }
                                    })
                                    .then(()=>setLoadingBtn(false))
                                    .catch(error=>{console.log(error)})
                            }
                            // else{
                            //     deactiveModelApi({model_id:selectedModel.model_id})
                            //         .then((r)=>{
                            //             if(r.status=='failure'){
                            //                 addToast(r.message,"error")
                            //             }
                            //         })
                            //         .then(()=>setLoadingBtn(false))
                            //         .catch(error=>{console.log(error)})
                            // }
                        }} 
                    disabled={selectedModel.status==5 || loadingBtn }>
                        Activate model
                    </Button>
                    {
                        loadingBtn?<div className={cx("model-info--meta-spinner2","spinner-medium")}></div>:null
                    }
                    </div>
                    <Button variant="primary" onClick={handleClickOK} disabled={selectedModel.status==4 || loadingBtn}>Start Test</Button>
                </div>
            </div>)
        
    )   
}

export default ProgressBar
