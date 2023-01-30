import { useEffect } from "react"

const { Navigate, useNavigate } = require("react-router-dom")
const { useAuth } = require("~/auth/AuthProvider")

const Logout = () => {
    const {signOut } = useAuth()
    const navigate = useNavigate()
    useEffect(()=>{
        signOut()
        navigate('/login')
    },[])
    return (
        // <Navigate to="/login" replace={true}></Navigate>
        <div></div>
    )
}

export default Logout