import { Outlet,Route,Routes,BrowserRouter, redirect, useNavigate } from "react-router-dom";
import Header from "~/Components/Header";
// import classNames from "classnames/bind";
import '~/App.scss'
import { useEffect } from "react";
import { useQueries, useQuery } from "react-query";
import { getListModelApi } from "./services/api";
// let cx = classNames.bind(styles)
function App() {
    const navigate = useNavigate()
    // const results = useQueries({
    //     queries: [
    //       { queryKey: ['post', 1], queryFn: getListModelApi, staleTime: 10000},
    //       { queryKey: ['post', 2], queryFn: fetchPost, staleTime: 10000}
    //     ]
    // })
    const query = useQuery('listModels', getListModelApi);
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


