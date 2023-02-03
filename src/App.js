import { Outlet,Route,Routes,BrowserRouter, redirect, useNavigate } from "react-router-dom";
import Header from "~/Components/Header";
// import classNames from "classnames/bind";
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
        </>

    )
}

export default App;


