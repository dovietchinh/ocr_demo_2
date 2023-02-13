import { Outlet,Route,Routes,BrowserRouter, redirect, useNavigate } from "react-router-dom";
import Header from "~/Components/Header";
// import classNames from "classnames/bind";
import '~/App.scss'
import { useEffect } from "react";
import { useQueries, useQuery } from "react-query";
import { getListModelApi } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { appSlice } from "./store";
import { useToasts } from "./Components/Toast";
// let cx = classNames.bind(styles)
function App() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const models = useSelector(state=>state.appSlice.data.models)
    const state = useSelector(state=>state)
    const {add: addToast, remove: removeToast} = useToasts()
    useEffect(()=>{
        navigate('/training')
        getListModelApi()
        .then(r=>dispatch(appSlice.actions.setModels(r)))
        .catch(e=>console.log(e))
        // const updateRedux = setInterval(()=>{
        //     getListModelApi().then(
        //         r=>{
        //             dispatch(appSlice.actions.setModels(r))
        //             for(let i of r){
        //                 for(let j of models){
        //                     if(i.id==j.id){
        //                         if(i?.status=='ready' && j?.status!='ready'){
        //                             addToast(`model ${i.mode_name} is available`,'success')
        //                         }
        //                     }
        //                 }
        //             }
        //         })
            
        // },100000)
        // return ()=>clearInterval(updateRedux)
    },[])
    return(
        <>
        <div className="header">
            <Header></Header>
        </div>
        <div className="content">
            <Outlet></Outlet>
        </div>
        </>

    )
}

export default App;


