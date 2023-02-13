import axios from 'axios'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '~/auth/AuthProvider'
import { useToasts } from '~/Components/Toast'
import styles from './Login.module.scss'
// import mode,{login} from '~/myredux/mode'

let cx = classNames.bind(styles)
function Login(){
    const [user,setUser] = useState("")
    const [pass,setPass] = useState("")
    const [message,setMessage] = useState("")
    let dispatch = useDispatch()
    const navigate = useNavigate()
    const { token, signIn, signOut, getNewAccessToken} = useAuth()
    const {add:addToast,remove:removeToast} = useToasts()
    const handleClick = (e)=>{
        let login_submit = async () =>{
            try{
                let res = await signIn({
                    "account": user,
                    "password": pass,
                })
                if(res?.message=='login success!'){
                    addToast(res.message,'success')
                    navigate('/')
                }
                else{
                    // addToast(res.message,'error')
                    setMessage(res.message)
                    setTimeout(()=>setMessage(""),3000)
                }
            }
            catch{
                // addToast("network error!","error")
                setMessage("network error!")
                setTimeout(()=>setMessage(""),3000)
            }

            
            
        }
        login_submit()
        if(localStorage.getItem('access_token')){
            navigate('/')
        }
        
    }
    const ref = useRef()
    const refBtn = useRef()
    useEffect(()=>{
        ref.current.focus()
        // document.addEventListener('')
        let myEvent = (e)=>{
            if(e.key=='Enter'){
                refBtn.current.click()
            }
        }
        document.addEventListener('keydown',myEvent)
        return ()=>{document.removeEventListener('keydown',myEvent)}
    },[])
    return(
        <div className={cx("container")}>
            <form className={cx("container__inner")} id="form1" method="post" onSubmit={handleClick}>
                <title className={cx("title")}><span>Log in</span></title>
                <div className={cx("fields")}>
                    <div className={cx("fields__content")}>
                        <label className={cx("fields__label")}>Username</label>
                        <input  className={cx("fields__input")}
                                ref={ref}
                                type='text' 
                                placeholder='Enter your username'
                                value={user}
                                onChange={(e)=>setUser(e.target.value)}
                                tabIndex="10"
                                ></input>
                        {/* <span>invalid user</span> */}
                    </div>
                    <div className={cx("fields__content")}>
                        <label className={cx("fields__label")}>Password</label>
                        <input className={cx("fields__input")}
                                type='password' 
                                placeholder='Enter your password'
                                value={pass}
                                onChange={(e)=>setPass(e.target.value)}
                                tabIndex="11"
                                ></input>
                    </div>
                </div>
                <Button className={cx("button")} variant="primary" onClick={handleClick} ref={refBtn}
                >Login</Button>
            </form>
            <span className={cx("message")}>{message}</span>
        </div>
    )
}
export default Login