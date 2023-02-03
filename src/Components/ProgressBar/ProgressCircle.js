import styles from './ProgressBar.module.scss'
import classNames from 'classnames/bind'
import { useEffect } from 'react'
let cx = classNames.bind(styles)
function ProgressCircle({from_percentage,percentage,title,cls}){
    useEffect(()=>{
        let r = document.querySelector(':root');
        let right_stop,right_start,left_stop,left_start;
        if(percentage < 0.5){
            right_stop = parseInt(percentage*360) + "deg"
            left_stop = "0deg"
        }
        else{
            right_stop = "180deg"
            left_stop = parseInt(percentage*360-180) + "degf"
        }

        if(from_percentage < 0.5){
            right_start = parseInt(from_percentage*360) + "deg"
            left_start = "0deg"
        }
        else{
            right_start = "180deg"
            left_start = parseInt(from_percentage*360-180) + "deg"
        }

        if(cls==cx("progress-circle--1"))
        {   
            
            r.style.setProperty("--value_start_left_1",left_start)
            r.style.setProperty("--value_stop_left_1",left_stop)
            r.style.setProperty("--value_start_right_1",right_start)
            r.style.setProperty("--value_stop_right_1",right_stop)
        }
        else
        {
            
            r.style.setProperty("--value_start_left_2",left_start)
            r.style.setProperty("--value_stop_left_2",left_stop)
            r.style.setProperty("--value_start_right_2",right_start)
            r.style.setProperty("--value_stop_right_2",right_stop)
        }
    },[from_percentage,percentage])
    
    return (
        <div className={cx("progress-circle",cls)}>
            <div className={cx("progress","blue")}>
                <span className={cx("progress-left")}>
                    <span className={cx("progress-bar")}></span>
                </span>
                <span className={cx("progress-right")}>
                    <span className={cx("progress-bar")}></span>
                </span>
            </div>
            <div className={cx("title")}>{title}</div>
            <div className={cx("percent-text")}>{String(percentage*100).slice(0,5)+"%"}</div>
        </div>
    )
}

export default ProgressCircle