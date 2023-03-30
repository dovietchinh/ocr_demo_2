import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { appSlice } from "~/store"

const { Navigate, useNavigate } = require("react-router-dom")
const { useAuth } = require("~/auth/AuthProvider")

const Logout = () => {
    const {signOut } = useAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(()=>{
        signOut()
        dispatch(appSlice.actions.resetState())
        navigate('/app/fast_ocr/login')

    },[])
    return (
        <div></div>
    )
}

export default Logout