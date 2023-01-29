import { Outlet,Route,Routes,BrowserRouter, redirect } from "react-router-dom";
import Header from "~/Components/header";
import SideBar from "~/Components/SideBar"
import classNames from "classnames/bind";
import '~/global.scss'
// let cx = classNames.bind(styles)
function App() {
    return(
        <>
        <div className="header">
            <Header></Header>
        </div>
        <div className="content">
            <Outlet></Outlet>
        </div>
        <div className="sidebar">
            <SideBar></SideBar>
        </div>
        </>

    )
}

export default App;


