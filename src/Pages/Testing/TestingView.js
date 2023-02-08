import classNames from 'classnames/bind'
import style from './TestingView.module.scss'
import next_img from '~/assets/images/next.png'
import prev_img from '~/assets/images/prev.png'
let cx = classNames.bind(style)

const TestingView = () => {
    // return (
    //     <div className={cx("container")}>
    //         <div className={cx()}></div>
    //     </div>
    // )
    return (
        <div className={cx("main-section")}>
            <div className={cx("main__title")}>
                <span>PREVIEW</span>
            </div>
            <div className={cx("slide_main")}>
                <div className={cx("slide__btn","slide__btn--prev")}>
                    <img src={prev_img}></img>
                </div>
                <div className={cx("slide__center")}>
                    <div className={cx("slide__content")}>
                        <div className={cx("slide__content__preview")}>
                            <img src={"blob:http://localhost:3000/8aa84234-2d26-43a9-b833-d3aa31934c6d"}
                                atl="no cards foundedaa"
                            ></img>
                            {/* {
                                DrawRect()
                            } */}
                        </div>
                        <div className={cx("slide__content__info")}>
                        {/* {Draw()} */}
                        </div>
                    </div>
                    <div className={cx("carouse__list")}>
                        {
                            // imageViews.images.map((ele,index)=>{
                            //     let cls=""
                            //     if(index==viewIndex) cls="carouse__thumbnail--active"
                            //     return(
                            //         <div key={"carouse_thumbnail_"+index} 
                            //             className={cx("carouse__thumbnail",cls)}
                            //             onClick={(e)=>{actionSetViewIndex(index)}}
                            //             >
                            //             <img src={ele}></img>
                            //         </div>
                            //     )
                            // })
                        }
                    </div>
                </div>
                <div className={cx("slide__btn","slide__btn--next")}>
                    <img src={next_img}></img>
                </div>

            </div>
            
        </div>
    )
}

export default TestingView