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
import Form from 'react-bootstrap/Form';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import "./a.scss"

let cx = classNames.bind(style)

const EmptyModel = () => {
    const intl = useIntl()
    const navigate = useNavigate()
    return (
        <div className={cx("empty")}>
            <span>{intl.formatMessage({id:"No model available"})}</span>
            <Button className={cx(".btn")}
                variant="primary"
                onClick={()=>navigate('/app/fast_ocr/training')}
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
    return(
        <div className={cx("model-items")} key={uuid()}>
            <div className={cx("model-info")}>
                <span className={cx("model-info--name")}>
                    {ele.model_name}
                </span>
                <span className={cx("model-info--meta")}>
                    <span>{intl.formatMessage({id:"status"})} : {STATUS_TEXT[ele.status]} &nbsp;</span>
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
                        // dispatch(appSlice.actions.setSelectedModel(ele))
                        dispatch(appSlice.actions.setSelectedModelID(ele.model_id))
                    }}
                    >{intl.formatMessage({id: "Detail"})}
                </Button>  

                {/* <Button className={cx("btn")}
                    variant={ele?.status==4?"primary":"light"}
                    onClick={()=>{
                        setLoadingBtn(true)
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
                </Button>   */}
                {/* <div className={cx("switch-btn")}>
                    <div style={{
                        opacity: loadingBtn ? .3: 1
                    }}>
                    <BootstrapSwitchButton 
                        checked={ele?.status!=4}
                        // offstyle="secondary"
                        onlabel={"Activated"}
                        // offlabel={" deactivated"}
                        width={120}
                        // height={10}
                        // size="sm"
                        disabled={![4,5].includes(ele?.status) || loadingBtn}
                        onChange={()=>{
                            setLoadingBtn(true)
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
                        >
                        
                    </BootstrapSwitchButton>
                    </div>
                    {
                        loadingBtn?<div className={cx("model-info--meta-spinner2","spinner-medium")}></div>:null
                    }
                </div> */}
                <div role="group" aria-labelledby="id-group-label"
                    className={cx("switch-btn")}
                    style={{
                        opacity: loadingBtn ? .2 : 1
                    }}>
                    <button type="button" role="switch" 
                        disabled={![4,5].includes(ele?.status) || loadingBtn}
                        aria-checked={ele?.status!=4}
                        style={{
                            
                        }}
                        onClick={(e)=>{
                            setLoadingBtn(true)
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
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="40">
                            <rect className="container" x="1" y="1" width="30" height="18" rx="4"></rect>
                            <rect className="off" x="4" y="4" width="12" height="12" rx="4"></rect>
                            <rect className="on" x="25" y="4" width="12" height="12" rx="4"></rect>
                        </svg>
                        <span className="on" aria-hidden="true">Activated</span>
                        <span className="off" aria-hidden="true">Off</span>
                    </button>
                </div>
                <Button className={cx("btn")}
                    variant="primary"
                    onClick={()=>{
                        // dispatch(appSlice.actions.setSelectedModel(ele))
                        dispatch(appSlice.actions.setSelectedModelID(ele.model_id))
                        navigate('/app/fast_ocr/testing')
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
                        <span>{intl.formatMessage({id:"Total"})} {models.length} model</span>
                    </div>
                    <div className={cx("content")}>
                        {
                            models.map((ele,index)=><ModelBar ele={ele} index={index} toggle={toggle}></ModelBar>
                                

                            )
                        }
                    </div>
            </div>
            :<EmptyModel/>
            }
            <Modal hide={toggle} isShowing={isShowing}>
                <ProgressBar handleClickCancel={toggle} isLoading={false}
                handleClickOK={()=>navigate('/app/fast_ocr/testing')}
                // handleClickActivate={(e)=>{
                //     setLoadingBtn(true)
                //             if(ele.status==4){
                //                 activeModelApi({model_id:ele.model_id})
                //                     .then((r)=>{
                //                         if(r.status=='failure'){
                //                             addToast(r.message,"error")
                //                         }
                //                     })
                //                     .then(()=>setLoadingBtn(false))
                //                     .catch(error=>{console.log(error)})
                //             }
                //             else{
                //                 deactiveModelApi({model_id:ele.model_id})
                //                     .then((r)=>{
                //                         if(r.status=='failure'){
                //                             addToast(r.message,"error")
                //                         }
                //                     })
                //                     .then(()=>setLoadingBtn(false))
                //                     .catch(error=>{console.log(error)})
                //             }
                // }}
                ></ProgressBar>
            </Modal>
        </div>
    )
}

export default ModelManagement