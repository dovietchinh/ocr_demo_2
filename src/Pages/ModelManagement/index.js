import classNames from "classnames/bind";
import { useIntl } from "react-intl";
import Button from "~/Components/Button";
import style from './ModelManagement.module.scss'
import uuid from 'react-uuid'
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { activeModelApi, deleteModelApi, getListModelApi, deactiveModelApi } from'~/services/api'
import { useDispatch, useSelector } from "react-redux";
import { appSlice } from "~/store";
import Modal, { useModal } from '~/Components/Modal'
import ProgressBar from '~/Components/ProgressBar'
import { useEffect, useState } from "react";
import { useToasts } from "~/Components/Toast";



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

const STATUS_TEXT = ["error","pause","training","training","deactive","ready"]



const ModelBar = ({ele,index,toggle}) => {
    let [loadingBtn,setLoadingBtn] = useState()
    const dispatch = useDispatch()
    const intl = useIntl()
    const models = useSelector(state=>state.appSlice.data.models)
    const navigate = useNavigate()
    // const { isShowing, toggle } = useModal()
    const {add:addToast} = useToasts()
    const is_admin = useSelector(state=>state.appSlice.user.id==1)
    useEffect(()=>{
        getListModelApi().then(r=>dispatch(appSlice.actions.setModels(r))).catch(e=>console.log(e))
    },[loadingBtn])
    // console.log('model_status: ',ele.status)
    return(
        <div className={cx("model-items")} key={uuid()}>
            <div className={cx("model-info")}>
                <span className={cx("model-info--name")}>
                    {ele.model_name}
                </span>
                <span className={cx("model-info--meta")}>
                    <span>status : {STATUS_TEXT[ele.status]} &nbsp;</span>
                    {
                    [2,3].includes(ele?.status) && <div className={cx("model-info--meta-spinner","spinner-small")}></div>
                    }
                    {
                    ele?.status==4 && <div></div>
                    }
                    {
                    ele?.status==5   && <i className="fa-regular fa-circle-check"
                        style={{
                            color: 'green',
                        }}></i>
                    }
                    
                </span>
            </div>
            <div className={cx("model--action")}>
                <Button className={cx("btn")}
                    variant="secondary"
                    onClick={()=>{
                        toggle()
                        // console.log(isShowing)
                        // dispatch(appSlice.actions.setSelectedModel(ele))
                        dispatch(appSlice.actions.setSelectedModelID(ele.model_id))
                    }}
                    >{intl.formatMessage({id: "Detail"})}
                </Button>  

                <Button className={cx("btn")}
                    variant={ele?.status==4?"primary":"light"}
                    onClick={()=>{
                        setLoadingBtn(true)
                        // console.log('loadingbtn: ',loadingBtn)
                        if(ele.status==4){
                            activeModelApi({model_id:ele.model_id})
                                .then((r)=>{
                                    if(r.status=='failure'){
                                        addToast(r.message,"error")
                                    }
                                })
                                .then(()=>setLoadingBtn(false))
                                .catch(error=>{console.log(error)})
                        }
                        else{
                            deactiveModelApi({model_id:ele.model_id})
                                .then((r)=>{
                                    if(r.status=='failure'){
                                        addToast(r.message,"error")
                                    }
                                })
                                .then(()=>setLoadingBtn(false))
                                .catch(error=>{console.log(error)})
                        }
                    }}
                    style={{
                        width:"6.5rem",
                        // textAlign: "center"
                        height: "100%"
                    }}
                    disabled={![4,5].includes(ele?.status) || loadingBtn}
                    >
                    {
                    loadingBtn?<div className={cx("model-info--meta-spinner","spinner-medium")}></div>:intl.formatMessage({id: ele?.status==4 ?"Active":"Deactive"})
                    }
                </Button>  
                <Button className={cx("btn")}
                    variant="primary"
                    onClick={()=>{
                        // dispatch(appSlice.actions.setSelectedModel(ele))
                        dispatch(appSlice.actions.setSelectedModelID(ele.model_id))
                        navigate('/testing')
                    }}
                    disabled={ele.status!=5}
                    >{intl.formatMessage({id:"Test"})}
                </Button>    
                <div className={cx("modal--action--delete",(ele.is_pretrain && !is_admin) && "modal--action--delete--disabled")}

                    onClick={(e)=>{
                        if(ele.is_pretrain) return 
                        deleteModelApi({model_id:ele.model_id})
                    }}
                    >
                    <i className="fa-regular fa-trash-can"></i>
                </div>
            </div>
        </div>
    )
}


const ModelManagement = ({startTrainingClick}) => {
    const dispatch = useDispatch()
    const intl = useIntl()
    const models = useSelector(state=>state.appSlice.data.models)
    const navigate = useNavigate()
    const { isShowing, toggle } = useModal()
    const {add:addToast} = useToasts()
    const selectedModel = useSelector(state=>{
        let selectedModelID = state.appSlice?.data?.selectedModelID
        let models = state.appSlice?.data?.models
        for(let model of models){
            if(selectedModelID == model.model_id){
                return model
            }
        }
    })
    useEffect(()=>{
        getListModelApi().then(r=>dispatch(appSlice.actions.setModels(r))).catch(e=>console.log(e))
        const updateRedux = setInterval(()=>{
            getListModelApi()
            .then(r=>{
                    dispatch(appSlice.actions.setModels(r))
                    for(let i of r){
                        for(let j of models){
                            if(i.id==j.id){
                                if(i?.status=='ready' && j?.status!='ready'){
                                    addToast(`model ${i.mode_name} is available`,'success')
                                }
                            }
                        }
                    }
                })
            .catch(e=>console.log(e))

            
        },1000)
        return ()=>clearInterval(updateRedux)
    },[])
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
                            models.map((ele,index)=><ModelBar ele={ele} index={index} toggle={toggle}></ModelBar>
                                
                                // return(
                                //     <div className={cx("model-items")} key={uuid()}>
                                //         <div className={cx("model-info")}>
                                //             <span className={cx("model-info--name")}>
                                //                 {ele.model_name}
                                //             </span>
                                //             <span className={cx("model-info--meta")}>
                                //                 <span>status : {STATUS_TEXT[ele.status]} &nbsp;</span>
                                //                 {
                                //                 [2,3].includes(ele?.status) && <div className={cx("model-info--meta-spinner")}></div>
                                //                 }
                                //                 {
                                //                 ele?.status==4 && <div></div>
                                //                 }
                                //                 {
                                //                 ele?.status==5   && <i className="fa-regular fa-circle-check"
                                //                     style={{
                                //                         color: 'green',
                                //                     }}></i>
                                //                 }
                                                
                                //             </span>
                                //         </div>
                                //         <div className={cx("model--action")}>
                                //             <Button className={cx("btn")}
                                //                 variant="secondary"
                                //                 onClick={()=>{
                                //                     toggle()
                                //                     // dispatch(appSlice.actions.setSelectedModel(ele))
                                //                     dispatch(appSlice.actions.setSelectedModelID(ele.model_id))
                                //                 }}
                                //                 >{intl.formatMessage({id: "Detail"})}
                                //             </Button>  

                                //             <Button className={cx("btn")}
                                //                 variant="primary"
                                //                 onClick={()=>{
                                //                     loading_btn=true
                                //                     if(ele.status==4){
                                //                         activeModelApi({model_id:ele.model_id}).then(loading_btn=false)
                                //                     }
                                //                     else{
                                //                         deactiveModelApi({model_id:ele.model_id}).then(loading_btn=false)
                                //                     }
                                //                 }}
                                //                 disabled={![4,5].includes(ele?.status)}
                                //                 >
                                //                 {
                                //                 loading_btn?'aaaaaaaa':intl.formatMessage({id: ele?.status==4 ?"Active":"Deactive"})
                                //                 }
                                //             </Button>  
                                //             <Button className={cx("btn")}
                                //                 variant="primary"
                                //                 onClick={()=>{
                                //                     // dispatch(appSlice.actions.setSelectedModel(ele))
                                //                     dispatch(appSlice.actions.setSelectedModelID(ele.model_id))
                                //                     navigate('/testing')
                                //                 }}
                                //                 disabled={ele.status!=5}
                                //                 >{intl.formatMessage({id:"Test"})}
                                //             </Button>    
                                //             <div className={cx("modal--action--delete",ele.is_pretrain && "modal--action--delete--disabled")}

                                //                 onClick={(e)=>{
                                //                     if(ele.is_pretrain) return 
                                //                     deleteModelApi({model_id:ele.model_id})
                                //                 }}
                                //                 >
                                //                 <i className="fa-regular fa-trash-can"></i>
                                //             </div>
                                //         </div>
                                //     </div>
                                // )
                            )
                        }
                    </div>
            </div>
            :<EmptyModel/>
            }
            <Modal hide={toggle} isShowing={isShowing}>
                <ProgressBar handleClickCancel={toggle} isLoading={false}
                handleClickOK={()=>navigate('/testing')}
                ></ProgressBar>
            </Modal>
        </div>
    )
}

export default ModelManagement