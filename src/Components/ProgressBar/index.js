import style from './ProgressBar.module.scss'
import classNames from 'classnames/bind'
import ProgressCircle from './ProgressCircle'
let cx = classNames.bind(style)



const ProgressBar = ({currentState}) => {
    
    return (
        <Container >
            <div className={cx("container")}>
                <div className={cx("progress-group")}>
                    <ProgressCircle from_percentage={0} percentage={currentPercent.genPercent} cls={cx("progress-circle--1")}>Initializing</ProgressCircle>
                    <ProgressCircle from_percentage={currentPercent.trainingPercent} percentage={currentPercent.trainingPercent}  cls={cx("progress-circle--2")}>Training</ProgressCircle>
                </div>
                <div className={cx("modelname--display")}>
                    <span className={cx("modename")}>{currentTrainingModel.replace(`${customer_ID}_`,"")}</span>
                    <span> is being trained</span>
                </div>
                <div className={cx("actions")}>
                    <Button variant='secondary' onClick={handleClickCancel} >Cancel</Button>
                    <Link to="/Testing"><Button variant="primary" onClick={handleClick}>Start test</Button></Link>
                </div>
            </div>
        </Container>
    )   
}

export default ProgressBar