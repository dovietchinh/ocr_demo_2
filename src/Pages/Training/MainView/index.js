import classNames from "classnames/bind"
import ToolList from "~/Components/ToolList"
import style from "./MainView.module.scss"
import icon1 from "~/assets/images/tools1.svg"
import icon2 from "~/assets/images/tools2.svg"
import icon3 from "~/assets/images/tools3.svg"
import InputForm from "~/Container/InputForm"
import { useState, useRef, useEffect, useCallback } from "react"
import Modal,{ useModal } from "~/Components/Modal"
import ProgressBar from "~/Components/ProgressBar"
import ImageViewer from './ImageViewer'
let cx = classNames.bind(style)

const MainView = ({img,listObjects, modifyPoint,activeToolList,setActiveToolList,addListObjects}) => {
    const [text,setText] = useState("")
    const { isShowing, toggle } = useModal()
    const { isShowing:isShowing2, toggle:toggle2 } = useModal()
    return (
        <div className={cx("container")}>
            {/* <div className={cx("view")}>
                <div className={cx("view--img")}>
                    <img src="http://10.124.64.120:9066/demo/inference_img/2023-2-2-12-21-37-2315167480-original_image.jpg"></img>
                </div>
            </div> */}
            <div className={cx("view")}>
                <div className={cx("view--img")}>
                    <ImageViewer 
                    // src={"http://10.124.64.120:9066/demo/inference_img/2023-2-2-12-21-37-2315167480-original_image.jpg"}
                    src={img}
                    listObjects={listObjects}
                    modifyPoint={modifyPoint}
                    activeToolList={activeToolList}
                    setActiveToolList={setActiveToolList}
                    addListObjects={addListObjects}
                    ></ImageViewer>
                </div>
            </div>
            <div className={cx("tool")}>
                <ToolList
                    listIcon={[{icon:icon1},{icon:icon2},{icon:icon3}]}
                    handleClick={toggle}
                    buttonLabel="Start training"
                    activeIndex={activeToolList}
                    setActiveIndex={setActiveToolList}
                />
            </div>
            <Modal hide={toggle} isShowing={isShowing}>
                <InputForm 
                    text={text}
                    setText={setText}
                    toggle={toggle}
                    clickNext={()=>{toggle();toggle2()}}
                ></InputForm>
            </Modal>
            <Modal hide={toggle2} isShowing={isShowing2}>
                <ProgressBar handleClickCancel={toggle2}></ProgressBar>
            </Modal>
        </div>

    )
}

export default MainView