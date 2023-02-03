import style from './ProgressBar.module.scss'
import classNames from 'classnames/bind'
import ProgressCircle from './ProgressCircle'
import Button from '~/Components/Button'
let cx = classNames.bind(style)



const ProgressBar = ({currentState,handleClickCancel,handleClickOK}) => {
    
    return (
        // <Container >
            <div className={cx("container")}>
                <div className={cx("X")} onClick={handleClickCancel}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <div className={cx("progress-group")}>
                    {/* <ProgressCircle from_percentage={0} percentage={.30} cls={cx("progress-circle--1")}>Initializing</ProgressCircle> */}
                    
                    <ProgressCircle 
                        from_percentage={0} 
                        percentage={1}  
                        cls={cx("progress-circle--2")}
                        title={"Training"}
                        ></ProgressCircle>
                </div>
                <div className={cx("modelname--display")}>
                    <span className={cx("modename")}>{"chinhdv"}</span>
                    <span> is being trained</span>
                </div>
                <div className={cx("actions")}>
                    <Button variant='light' onClick={handleClickCancel} >Cancel</Button>
                    <Button variant='secondary' onClick={handleClickCancel}>Stop</Button>
                    <Button variant="primary" onClick={handleClickOK}>Start test</Button>
                </div>
            </div>
        
    )   
}

export default ProgressBar
