import classNames from "classnames/bind";
import style from "./ImageViewer.module.scss"
import { useState, useRef, useEffect, useCallback } from "react"
import uuid from "react-uuid";

let cx = classNames.bind(style)


const ImageViewer = ({ src,listObject }) => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const [points,setPoints] = useState([[200,10],[250,190],[160,210]])
    let x = ""
    for( let i of points){
        x = x + `${i[0]},${i[1]} `
    }
  const handleWheel = (event) => {
    const delta = event.deltaY > 0 ? 0.9 : 1.1;
    setScale(scale * delta);
  };

  const handleMouseDown = (event) => {
    if(event.target !== event.currentTarget) return;
    const startX = event.clientX;
    const startY = event.clientY;

    const handleMouseMove = (event) => {
        if(event.target !== event.currentTarget) return;
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

  return (
    <div className={cx("container")}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow:"hidden"
      }}
      onWheel={handleWheel}
    >
      <img
        ref={imageRef}
        src={src}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          cursor: "grab",
          maxWidth: "100%",
          maxHeight: "100%"
        }}
        onMouseDown={handleMouseDown}
      />
      <svg className={cx("svg")}
        style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
        }}
      >
        <polygon 
            points={x}
            style={{
                fill:"red",
                stroke:"purple",
                strokeWidth:1,
                opacity:0.5,
            }} 
        onClick={()=>{console.log('click')}}
        />
        
      </svg>
      <div className={cx("draw-polygon")}
      onMouseDown={handleMouseDown}
        style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            // cursor:"grab"
        }}
        >
            {
                points.map((ele,index)=>{
                    let x = ele[0]
                    let y = ele[1]
                    let pos1,pos2,pos3,pos4
                    let enableDrag = false
                    return (
                        <div className={cx("moveable-points")} key={uuid()}
                            style={{
                                left:ele[0] +"px",
                                top:ele[1] +"px"
                            }}
                            onMouseDown={(e)=>{
                                if(e.target !== e.currentTarget) return;
                                pos3 = e.pageX;
                                pos4 = e.pageY;
                                let mousemove = (myevent)=>{
                                    pos1 = pos3 - myevent.pageX;
                                    pos2 = pos4 - myevent.pageY;
                                    pos3 = myevent.pageX;
                                    pos4 = myevent.pageY;
                                    e.target.style.top = parseInt(e.target.style.top.replace('px','')) - pos2+ 'px'
                                    e.target.style.left = parseInt(e.target.style.left.replace('px','')) - pos1+ 'px'
                                    setPoints(prev=>{
                                        let new_data = [...prev]
                                        new_data[index] = [
                                            
                                            parseInt(e.target.style.left.replace('px','')) - pos1,
                                            parseInt(e.target.style.top.replace('px','')) - pos2,
                                        
                                        ]
                                        // console.log('e.target.style.left: ',e.target.style.left)
                                        // console.log('e.target.style.top: ',e.target.style.top)
                                        return new_data
                                    })
                                }
                                let mouseup = (myevent)=>{
                                    document.removeEventListener('mousemove', mousemove, false);
                                    document.removeEventListener('mouseup',mouseup,false)
                                }
                                document.addEventListener('mousemove',mousemove,false)
                                document.addEventListener('mouseup',mouseup,false)
                            }}
                        ></div>
                    )    
                })
            }
      </div>
    </div>
  );
};

export default ImageViewer;