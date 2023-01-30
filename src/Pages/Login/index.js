import axios from 'axios'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '~/auth/AuthProvider'
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
    const handleClick = (e)=>{
        let login_submit = async () =>{
            await signIn()
            console.log('asd')
            navigate('/')
        }
        
        // let login_submit = async () =>{
        //     let res = await axios.post('http://10.124.64.125:18001/api/v1/login',{user,pass})
        //         .then((r)=>{
        //             console.log(r.data.message)
        //             if(r.data.status){
        //                 setMessage(r.data.message)
        //                 dispatch(mode.actions.actionSetModeLoginSuccess(true))
        //                 dispatch(mode.actions.actionSetCustomerID(user))
        //             }
                    
        //             else{
        //                 setMessage(r.data.message)
        //             }
                    
        //         })
        //         .then({})
        //         .catch((error)=>{
        //             let r;
        //             if(typeof(error)=='string') {r = {message:error}}
        //             else{r = {message:'server error'}}
                    
        //             setMessage(r.message)
        //         })
                
            
            
        // }
        login_submit()
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