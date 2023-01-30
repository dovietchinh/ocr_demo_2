import { Outlet,Route,Routes,BrowserRouter, redirect, useNavigate } from "react-router-dom";
import Header from "~/Components/header";
import SideBar from "~/Components/SideBar"
import classNames from "classnames/bind";
import '~/global.scss'
import '~/App.scss'
import { useEffect } from "react";
// let cx = classNames.bind(styles)
function App() {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/training')
    },[])
    return(
        <>
        <div className="header">
            <Header></Header>
        </div>
        <div className="content">
            <Outlet></Outlet>
        </div>
        <div className="sidebarLeft">
            <SideBar></SideBar>
        </div>
        <div className="sidebarRight">
            <SideBar></SideBar>
        </div>
        </>

    )
}

export default App;


