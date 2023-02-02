import classNames from "classnames/bind"
import ToolList from "~/Components/ToolList"
import style from "./MainView.module.scss"
import icon1 from "~/assets/images/tools1.svg"
import icon2 from "~/assets/images/tools2.svg"
import icon3 from "~/assets/images/tools3.svg"
let cx = classNames.bind(style)

const MainView = () => {
    return (
        <div className={cx("container")}>
            <div className={cx("view")}>
                <div className={cx("view--img")}>
                    <img src="http://10.124.64.120:9066/demo/inference_img/2023-2-2-12-21-37-2315167480-original_image.jpg"></img>
                </div>

            </div>
            <div className={cx("tool")}>
                <ToolList
                    listIcon={[{icon:icon1},{icon:icon2},{icon:icon3}]}
                    handleClick={()=>{console.log('click')}}
                    buttonLabel="Start training"
                    activeIndex={0}
                />
            </div>
        </div>

    )
}

export default MainView