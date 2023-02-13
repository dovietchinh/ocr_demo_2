import classNames from 'classnames/bind'
import style from './TestingView.module.scss'
import next_img from '~/assets/images/next.png'
import prev_img from '~/assets/images/prev.png'
import { useTesting } from './hook'
import uuid from 'react-uuid'
import { useState } from 'react'

let cx = classNames.bind(style)

const TestingView = () => {
    // return (
    //     <div className={cx("container")}>
    //         <div className={cx()}></div>
    //     </div>
    // )
    const {
        "Images":{
            activeIndex,
            listImages,
            clickIndex,
            deleteImage,
            addImage
        },
        "Labels":{
            resultDicts,
            addResultDict,
            deleteResultDict
        }
    } = useTesting()
    const [scale,setScale] = useState(1)
    const [offset,setOffset] = useState({x:0,y:0})
    let [activeHoverRect,setActiveHoverRect] = useState("")
    const Draw = ()=>{
            let result = []
            if(resultDicts[activeIndex]==null) {
                return false
            }
            for (let resultDict of resultDicts[activeIndex]) {
                let cls =""
                let key = resultDict?.name
                let value = resultDict?.value
                if(key==activeHoverRect){cls="info__group--active"}
                let x = (
                    <div key={uuid()} className={cx("info__group",cls)}
                        onMouseOver={(e)=>{setActiveHoverRect(key)}}
                        onMouseLeave={(e)=>{setActiveHoverRect("")}}
                        >
                        <span className={cx("info__group__label")}>{key}</span>
                        <span className={cx("info__group__text")}>{value}</span>
                    </div>)
                result.push(x)
            }
            return result
    }
    const handleWheel = (event) => {
        const delta = event.deltaY > 0 ? 0.9 : 1.1;
        setScale(scale * delta);
    };

    const handleMouseDown = (event) => {
        event.preventDefault()
        // if(event.target !== event.currentTarget) return;
        // if(event.button==2) return
        const startX = event.clientX;
        const startY = event.clientY;

        const handleMouseMove = (event) => {
            // if(event.target !== event.currentTarget) return;
            const deltaX = event.clientX - startX;
            const deltaY = event.clientY - startY;
            setOffset({
            x: offset.x + deltaX,
            y: offset.y + deltaY
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", () => {
            window.removeEventListener("mousemove", handleMouseMove);
        });
    };
    console.log('rerender')
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
                        <div 
                            className={cx("slide__content__preview")}
                            onWheel={handleWheel}
                            onMouseDown={handleMouseDown}
                            >
                            <img src={listImages[activeIndex]?.imageUrl}
                                style={{
                                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                                    cursor: "grab",
                                    maxWidth: "100%",
                                    maxHeight: "100%"
                                }}
                                // onMouseDown={handleMouseDown}
                                atl="no cards foundedaa"
                            ></img>
                            {/* {
                                DrawRect()
                            } */}
                        </div>
                        <div className={cx("slide__content__info")}>
                        {Draw()}
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