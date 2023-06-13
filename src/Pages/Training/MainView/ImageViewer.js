import classNames from "classnames/bind";
import style from "./ImageViewer.module.scss"
import { useState, useRef, useEffect, useCallback } from "react"
import uuid from "react-uuid";
import { useTraining } from "../hook";
import { object } from "prop-types";
import { transFormApi } from "~/services/api";
import { useToasts } from "~/Components/Toast";
import { MINIO_PUBLIC_URL } from "~/utils/constants";

let cx = classNames.bind(style)

const ImageViewer = ({ src,listObjects, addListObjects, modifyPoint,activeToolList,setActiveToolList,scale,setScale,offset,setOffset}) => {
  const imageRef = useRef(null);
	const {
		'Images': {
			listImages,
			activeIndex:activeImg,
			
		},
		'Object':{
			activeObject
		},
		"TransForm":{
			setTransFormPoints,
			previewSrc,
            setPreviewSrc
		}
		
	} = useTraining()
	const {add: addToast} = useToasts()
	const [transformState,setTransformState] = useState(false)
	const [tempPoints,setTempPoints] = useState([])   // for polygon
	const [tempPoints2,setTempPoints2] = useState([]) // for rectangle
	const [tempPoints3,setTempPoints3] = useState([])   // for transform
	let temp_point_string = ""
	for(let i of tempPoints){
		temp_point_string = temp_point_string + `${i[0]},${i[1]} `
	}
	let temp_point_string3 = ""
	for(let i of tempPoints3){
		temp_point_string3 = temp_point_string3 + `${i[0]},${i[1]} `
	}
	let x_temp,y_temp,width_temp,height_temp
	// let point1_temp = temp
	// let point2_temp = ele.points[3]
	// let x = Math.min(point1[0],point2[0])
	// let y = Math.min(point1[1],point2[1])
	// let width = Math.abs(point1[0] - point2[0])
	// let height = Math.abs(point1[1] - point2[1])
	if(tempPoints2.length==2){
		let point1_temp = tempPoints2[0]
		let point2_temp = tempPoints2[1]
		x_temp = Math.min(point1_temp[0],point2_temp[0])
		y_temp = Math.min(point1_temp[1],point2_temp[1])
		width_temp = Math.abs(point1_temp[0] - point2_temp[0])
		height_temp = Math.abs(point1_temp[1] - point2_temp[1])
	}
	else{
		x_temp = 0
		y_temp = 0
		width_temp = 0
		height_temp = 0
	}
	const handleWheel = (event) => {
		const delta = event.deltaY > 0 ? 0.9 : 1.1;
		setScale(scale * delta);
	};
	const ref_draw = useRef()
	useEffect(()=>{
		const handleKeyPress = (e) => {
			if(e.key=='n'){
				if(activeToolList==null){
					setActiveToolList(1)
				}
				if(activeToolList==1){
					setTempPoints([])
					setActiveToolList(null)
					if(tempPoints.length>=3){
						addListObjects({
							'type': 'polygon',
							'points': tempPoints.slice(0,-1),
							'imgIndex': activeImg,
							'labelIndex': null,
							'img_uuid': listImages[activeImg].uuid
						})
					}
				}
			}
			if(e.key=='m'){
				if(activeToolList==null){
					setActiveToolList(3)
				}
				if(activeToolList==3){
					setTempPoints2([])
					setActiveToolList(null)
				}
			}
			
		}
		document.addEventListener("keypress",handleKeyPress)
		return ()=>document.removeEventListener("keypress",handleKeyPress)
	},[activeToolList,tempPoints,listImages,activeImg])
	useEffect(()=>{
		if(activeToolList==0){
			setTransformState(true)
		}
		setTempPoints3([])

	},[activeToolList])
	useEffect(()=>{
		
		setTransformState(false)
		setTempPoints3([])

	},[src])
	
  	const handleMouseDown = (event) => {
    if(event.target !== event.currentTarget) return;
		if(event.button==2) return
    const startX = event.clientX;
    const startY = event.clientY;

    const handleMouseMove = (event) => {
			// if(event.target !== event.currentTarget) return;
	  if(activeToolList==1) return
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
	  	id="imageRef"
        ref={imageRef}
        src={src}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          cursor: "grab",
          maxWidth: "100%",
          maxHeight: "100%"
        }}
		onError={(e)=>e.target.src="https://cdn.pixabay.com/photo/2012/04/13/00/22/red-31226_960_720.png"}
        // onMouseDown={handleMouseDown}
      />
      <svg className={cx("svg")} 
        style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
        }}
      >
				{
					listObjects.map((ele,index)=>{
						if(ele.imgIndex!=activeImg) return
						if(ele.type=='polygon'){
							let point_string = ""
							for(let i of ele.points){
								point_string = point_string + `${i[0]},${i[1]} `
							}
							
							// if(ele.imgIndex!=activeImg) return
							let cls;
							if(activeObject==index) cls=cx("polygon--active")
							return (
								<polygon 
										key={uuid()}
										points={point_string}
										className={cls}
								/>
							)
						}
						else{

							let point1 = ele.points[0]
							let point2 = ele.points[2]
							let x = Math.min(point1[0],point2[0])
							let y = Math.min(point1[1],point2[1])
							let width = Math.abs(point1[0] - point2[0])
							let height = Math.abs(point1[1] - point2[1])
							let cls
							if(activeObject==index) cls=cx("rect--active")
							return (
								<>
								<rect 
									key={uuid()}
									x={x}
									y={y}
									width={width}
									height={height}
									className={cls}
									
									>
								</rect>
								</>
							)
						}
						
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
				{
					activeToolList==0 && <polygon
					points={temp_point_string3}
					style={{
						fill:"yellow",
						stroke:"purple",
						strokeWidth:1,
						opacity:0.3,
					}} 
				/>}
				<rect
					x={x_temp}
					y={y_temp}
					width={width_temp}
					height={height_temp}
					// style={{
					// 	'fill':'blue',
					// 	'stroke':'purple',
					// 	'strokeWidth':1,
					// 	'opacity':0.2,
					// }}
					>
				</rect>
				
      </svg>
      <div className={cx("draw-polygon")}
	  		ref={ref_draw}
			onClick={(e)=>{
				let x = e.pageX - imageRef.current.getBoundingClientRect().left;
				let y = e.pageY - imageRef.current.getBoundingClientRect().top;
				if(activeToolList==0 && transformState){
					setTempPoints3(prev=>[...prev,[x/scale,y/scale]])
				}
				if(activeToolList==1){
					// let x = e.pageX - imageRef.current.getBoundingClientRect().left;
					// let y = e.pageY - imageRef.current.getBoundingClientRect().top;
					setTempPoints(prev=>[...prev,[x/scale,y/scale]])
				}
				// else{
				// }
				if(activeToolList==3){
					if(tempPoints2.length==0) {
						setTempPoints2(prev=>[...prev,[x/scale,y/scale]])
					}
					else{
						setTempPoints2([])
						setActiveToolList(null)
						
						addListObjects({
							'type': 'rectangle',
							'points': [tempPoints2[0],[x/scale,tempPoints2[0][1]],[x/scale, y/scale],[tempPoints2[0][0],y/scale]],
							'imgIndex': activeImg,
							'labelIndex': null,
							'img_uuid': listImages[activeImg].uuid
						})
					}
					
				}
			}}
			onMouseMove={(e)=>{
				if(activeToolList==0 && transformState){
					let x = (e.pageX - imageRef.current.getBoundingClientRect().left);
					let y = (e.pageY - imageRef.current.getBoundingClientRect().top);
					if(tempPoints3.length==1){
						setTempPoints3(prev=>[...prev,[x/scale,y/scale]])
					}
					setTempPoints3(prev=>{
						let new_data = [...prev]
						new_data[new_data.length - 1] = [x/scale,y/scale]
						return new_data
					})
				}

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
				if(activeToolList==3){
					let x = (e.pageX - imageRef.current.getBoundingClientRect().left);
					let y = (e.pageY - imageRef.current.getBoundingClientRect().top);
					if(tempPoints2.length==1){
						setTempPoints2(prev=>[...prev,[x/scale,y/scale]])
					}
					setTempPoints2(prev=>{
						let new_data = [...prev]
						new_data[new_data.length - 1] = [x/scale,y/scale]
						return new_data
					})
				}
			}}
			onContextMenu={(e)=>{
				e.preventDefault()
				if(activeToolList==0 && transformState==true){
					
					setTransformState(false)
					// setActiveToolList(null)
					if(tempPoints3.length>=4){
						setTempPoints3(prev=>prev.slice(0,4))
						const readingFile = (file) => {
                            let reader = new FileReader()
                            return new Promise(
                                function (resolve, reject) {
                                    reader.onload = function (event) {
                                        resolve({
                                            'data': event.target.result,
                                        })
                                    }
                                    reader.readAsDataURL(file)
                                })
                        }
                        let tempFunction = fetch(src)
                                .then(res => res.blob())
                                .then(blob=>readingFile(blob))
								.then(r=>{
									
									return transFormApi({
										'image_base64': r.data,
										'points': tempPoints3.slice(0,4),
										'view': {
											'height': imageRef.current.height,
											'width': imageRef.current.width,
										},
										'naturalView': {
											'height': imageRef.current.naturalHeight,
											'width': imageRef.current.naturalWidth
										}
										
									})
									
								})
								.then(r=>{
									setPreviewSrc(MINIO_PUBLIC_URL+r)
								})
								
						
					}
					else{
						addToast("please draw 4 points to align image!",'warning')
					}
				}
				if(activeToolList==1){
					setTempPoints([])
					setActiveToolList(null)
					if(tempPoints.length>=3){
						addListObjects({
							'type': 'polygon',
							'points': tempPoints.slice(0,-1),
							'imgIndex': activeImg,
							'labelIndex': null,
							'img_uuid': listImages[activeImg].uuid
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
				listObjects?.map((ojbect_label,indexObject)=>{
					if(ojbect_label.imgIndex!=activeImg) return
					if(ojbect_label.type!='polygon') return
					return ojbect_label.points.map((ele,indexPoint)=>{
						let pos1,pos2,pos3,pos4
						return (
							<div className={cx("moveable-points")} key={uuid()}
								style={{
									left:ele[0] +"px",
									top:ele[1] +"px",
									cursor: "grab"
								}}
								onMouseDown={(e)=>{
									if(activeToolList==1 || activeToolList==3) return
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
			{
				listObjects?.map((ojbect_label,indexObject)=>{
					if(ojbect_label.imgIndex!=activeImg) return
					if(ojbect_label.type=='polygon') return
					return ojbect_label.points.map((ele,indexPoint)=>{
						let pos1,pos2,pos3,pos4
						let cursor = ["se-resize","ne-resize","se-resize","ne-resize"][indexPoint]
						return (
							<div className={cx("moveable-points")} key={uuid()}
								style={{
									left:ele[0] +"px",
									top:ele[1] +"px",
									cursor: cursor
								}}
								onMouseDown={(e)=>{
									if(activeToolList==1 || activeToolList==3) return
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
										if(indexPoint==0){
											modifyPoint(indexObject,1,[
												null,
												parseInt(e.target.style.top.replace('px','')) - pos2/scale,
											])	
											modifyPoint(indexObject,3,[
												parseInt(e.target.style.left.replace('px','')) - pos1/scale,
												null,
											])	
										}
										if(indexPoint==2){
											modifyPoint(indexObject,1,[
												parseInt(e.target.style.left.replace('px','')) - pos1/scale,
												null,
											])	
											modifyPoint(indexObject,3,[
												null,
												parseInt(e.target.style.top.replace('px','')) - pos2/scale,
											])	
										}
										if(indexPoint==1){
											modifyPoint(indexObject,0,[
												null,
												parseInt(e.target.style.top.replace('px','')) - pos2/scale,
											])	
											modifyPoint(indexObject,2,[
												parseInt(e.target.style.left.replace('px','')) - pos1/scale,
												null,
											])	
										}
										if(indexPoint==3){
											modifyPoint(indexObject,0,[
												parseInt(e.target.style.left.replace('px','')) - pos1/scale,
												null,
											])	
											modifyPoint(indexObject,2,[
												null,
												parseInt(e.target.style.top.replace('px','')) - pos2/scale,
											])	
										}
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