import classNames from "classnames/bind";
import style from "./ImageViewer.module.scss"
import { useState, useRef, useEffect, useCallback } from "react"
import uuid from "react-uuid";
import { useTraining } from "../hook";
import { object } from "prop-types";

let cx = classNames.bind(style)

// 'type': 'object',
// 'points': [[200,10],[250,190],[160,210]],
// 'imgIndex': 0,
// 'labelIndex': 0,
const ImageViewer = ({ src,listObjects, addListObjects, modifyPoint,activeToolList,setActiveToolList,scale,setScale,offset,setOffset}) => {
  // const [scale, setScale] = useState(1);
  // const [offset, setOffset] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

	const {
		'Images': {
			activeIndex:activeImg,
		},
		'Object':{
			activeObject
		}
		
	} = useTraining()
	const [tempPoints,setTempPoints] = useState([])
	let temp_point_string = ""
	for(let i of tempPoints){
		temp_point_string = temp_point_string + `${i[0]},${i[1]} `
	}
  const handleWheel = (event) => {
    const delta = event.deltaY > 0 ? 0.9 : 1.1;
    setScale(scale * delta);
  };

  const handleMouseDown = (event) => {
    if(event.target !== event.currentTarget) return;
		if(event.button==2) return
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
        // onMouseDown={handleMouseDown}
      />
      <svg className={cx("svg")} 
				onClick={()=>{console.log('click')}}
        style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
        }}
				
      >
				{
					listObjects.map((ele,index)=>{
						let point_string = ""
						for(let i of ele.points){
							point_string = point_string + `${i[0]},${i[1]} `
						}
						
						if(ele.imgIndex!=activeImg) return
						let cls;
						if(activeObject==index) cls=cx("polygon--active")
						return (
							<polygon 
									key={uuid()}
									points={point_string}
									
									className={cls}
									onClick={()=>{console.log(`click polygin ${index}`)}}
									
							/>
						)
					})
				}
				<polygon
					points={temp_point_string}
					style={{
						fill:"red",
						stroke:"purple",
						strokeWidth:1,
						opacity:0.3,
					}} 
				/>
				
      </svg>
      <div className={cx("draw-polygon")}
			onClick={(e)=>{
				let x = e.pageX - imageRef.current.getBoundingClientRect().left;
				let y = e.pageY - imageRef.current.getBoundingClientRect().top;
				if(activeToolList==1){
					// let x = e.pageX - imageRef.current.getBoundingClientRect().left;
					// let y = e.pageY - imageRef.current.getBoundingClientRect().top;
					setTempPoints(prev=>[...prev,[x/scale,y/scale]])
				}
				else{
				}
			}}
			onMouseMove={(e)=>{
				if(activeToolList==1){
					
					let x = (e.pageX - imageRef.current.getBoundingClientRect().left);
					let y = (e.pageY - imageRef.current.getBoundingClientRect().top);
					if(tempPoints.length==1){
						setTempPoints(prev=>[...prev,[x/scale,y/scale]])
					}
					setTempPoints(prev=>{
						let new_data = [...prev]
						new_data[new_data.length - 1] = [x/scale,y/scale]
						return new_data
					})
				}
			}}
			onContextMenu={(e)=>{
				e.preventDefault()
				if(activeToolList==1){
					setTempPoints([])
					setActiveToolList(null)
					if(tempPoints.length>=3){

					
						addListObjects({
							'type': 'polygon',
							'points': tempPoints.slice(0,-1),
							'imgIndex': activeImg,
							'labelIndex': null,
						})
					}
				}
				
				
			}}
      onMouseDown={handleMouseDown}
        style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
        }}
        >
            {
							listObjects?.map((ojbect,indexObject)=>{
								// if(object.imgIndex!=activeImg) return
								console.log('object: ',object)
								console.log('activeImg: ',activeImg)
								return ojbect.points.map((ele,indexPoint)=>{
                    let pos1,pos2,pos3,pos4
                    return (
                        <div className={cx("moveable-points")} key={uuid()}
                            style={{
                                left:ele[0] +"px",
                                top:ele[1] +"px"
                            }}
                            onMouseDown={(e)=>{
																if(activeToolList==1) return
																if(e.button==2) return
                                if(e.target !== e.currentTarget) return;
                                pos3 = e.pageX;
                                pos4 = e.pageY;
                                let mousemove = (myevent)=>{
                                    pos1 = pos3 - myevent.pageX;
                                    pos2 = pos4 - myevent.pageY;
                                    pos3 = myevent.pageX ;
                                    pos4 = myevent.pageY ;
                                    e.target.style.top = parseInt(e.target.style.top.replace('px','')) - pos2/scale+ 'px'
                                    e.target.style.left = parseInt(e.target.style.left.replace('px','')) - pos1/scale+ 'px'
																		// e.target.offsetTop = e.target.offsetTop - pos2/scale
																		// e.target.offsetLeft = e.target.offsetLeft - pos1/scale
																		modifyPoint(indexObject,indexPoint,[
																			parseInt(e.target.style.left.replace('px','')) - pos1/scale,
																			parseInt(e.target.style.top.replace('px','')) - pos2/scale,
																			
																		])
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
							})
            }
      </div>
    </div>
  );
};

export default ImageViewer;