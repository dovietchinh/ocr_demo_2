import classNames from 'classnames/bind'
import style from './SideBarRight.module.scss'
import uuid from 'react-uuid'
import { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { useModal } from '~/Components/Modal'
import Button from '~/Components/Button'
import Modal from '~/Components/Modal'
import CreateLabel from './CreateLabel'
// import useSideBarRight from './hook'
import { ObjectItems, LabelItems} from './Items'
import { useTraining } from '~/Pages/Training/hook'

let cx = classNames.bind(style)

const SideBarRight = ({listLabels,deleteListLabels,activeImg,listObjects,deleteListObjects,addListLabels,activeObject,setActiveObject,modifyLabel}) => {
    const {isShowing, toggle } = useModal()
    const [mode,setMode] = useState('object')
    const [modify,setModify] = useState(false)
    const [modifyIndex, setModifyIndex] = useState(null)
    const container = {
        'object': {
            'listData': listObjects,
            'actionDelete': deleteListObjects,
            'component':  ObjectItems
        },
        'labels':{
            'listData': listLabels,
            'actionDelete': deleteListLabels,
            'component':  LabelItems
        }
    }
    const intl = useIntl()    
    // return (<div></div>)
    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <div className={cx("header-list")}>
                    <div onClick={()=>setMode("object")}
                        className={cx("header-list-items",mode=="object"?"header-list-items--active":null)}>
                        <span>{intl.formatMessage({id:"Object"})}</span>
                    </div>
                    <div onClick={()=>setMode("labels")} 
                        className={cx("header-list-items",mode=="labels"?"header-list-items--active":null)}>
                        <span>{intl.formatMessage({id:"Labels"})}</span>
                    </div>       
                </div>
            </div>
            <div className={cx("content")}>
                <div className={cx("content--list")}>
                    {
                        container[mode].listData.map((ele,index)=>{
                            let Component = container[mode].component
                            let active = false
                            if(index==activeObject){
                                active = true
                            }
                            if(mode=='object'){
                                if(ele.imgIndex!=activeImg) return
                            }
                            return (
                                <Component key={uuid()} 
                                    ele={ele}
                                    clickDelete={()=>container[mode].actionDelete(index)}
                                    active={active}
                                    clickModify={()=>{
                                        toggle()
                                        setModify(true)
                                        setModifyIndex(index)
                                    }}
                                    handleClick={(e)=>{
                                        setActiveObject(index)
                                    }}
                                    listLabels={listLabels}
                                 />
                            )
                        })
                    }
                </div>
            </div>
            <div className={cx("footer")}>
                { mode=="labels" && <Button 
                    variant="primary" 
                    className={cx("btn")}
                    onClick={()=>{
                        toggle()
                        setModify(false)
                        setModifyIndex(null)

                    }}
                    >{intl.formatMessage({id:"Create new label"})}
                </Button>
                }
            </div>
            <Modal isShowing={isShowing} hide={toggle}>
                <CreateLabel 
                    toggle={toggle}
                    addData={addListLabels}
                    modify={modify}
                    modifyIndex={modifyIndex}
                    modifyLabel={modifyLabel}
                    >
                </CreateLabel>
            </Modal>
        </div>
    )
}  

export default SideBarRight