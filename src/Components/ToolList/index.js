import classNames from "classnames/bind"
import Button from "~/Components/Button"
import useToolList from "./hook"
import uuid from 'react-uuid';
import style from './ToolList.module.scss'
let cx = classNames.bind(style)
const ToolList = ({children, handleClick, listIcon,buttonLabel="Start training", activeIndex,setActiveIndex,clickReset}) => {
    return (
        <div className={cx("container")}>
            <div className={cx("list-icon")}>
                {listIcon.map((ele,index)=>{
                    return (
                        <div key={uuid()} 
                            className={cx("icon-items", activeIndex==index? "icon-items--active" : null)} 
                            onClick={(e)=>{
                                
                                if(index==2){
                                    clickReset()
                                }else{
                                    setActiveIndex(index)
                                }
                            }}>
                            <img src={ele.icon}></img>
                        </div>
                    )
                })}
            </div>
            
            <Button variant="secondary" onClick={handleClick} className={cx("btn")}>{buttonLabel}</Button>
            
        </div>
    )
}

export default ToolList