// @flow

import classNames from "classnames/bind";
import { useState, useEffect, useContext, createContext } from "react";
import style from './Toast.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let cx = classNames.bind(style)
const Ctx = createContext();

// Styled Components
// ==============================

const listBgColor = {
	'success': "#36B37E",
	'error': '#FF5630',
	'warning': "#FFAB00"
}
const listColor = {
	'success': "#E3FCEF",
	'error': '#FFEBE6',
	'warning': "#FFFAE6"
}
const listIcon = {
	'success': "fa-solid fa-check",
	'error': "fa-solid fa-exclamation",
	'warning': "fa-solid fa-triangle-exclamation"
}
const ToastContainer = props => (
  <div style={{ position: "fixed", right: 0, top: 0 }} {...props} />
);
const Toast = ({ children, onDismiss,mode }) => {
  useEffect(()=>{
    const myTimeout = setTimeout(()=>onDismiss(), 10000);
    return ()=>clearTimeout(myTimeout)
  },[])
  return (
    <div className={cx("toast-message")}
		style={{
			// background: "LemonChiffon",
			cursor: "pointer",
			fontSize: 14,
			margin: 10,
			padding: 10
		}}
		onClick={onDismiss}
    >
		<div className={cx("toast-header")} 
			style={{
				"backgroundColor": listBgColor[mode]
			}}
		>
			<i className={listIcon[mode]}></i>
		</div>	
		<div className=	{cx("toast-content")}
			style={{
				"backgroundColor": listColor[mode],
			}}
		>
			<span style={{
				// "color": listColor[mode]
			}}>{children}</span>
		</div>
		
    </div>
  )
};

// Provider
// ==============================

let toastCount = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const add = (content,mode) => {
	if(!['success','error','warning'].includes(mode)){
		mode = 'success'
	}
    const id = toastCount++;
    const toast = { content, id, mode };
    setToasts([...toasts, toast]);
  };
  const remove = id => {
    const newToasts = toasts.filter(t => t.id !== id);
    setToasts(newToasts);
  };
  // avoid creating a new fn on every render
  const onDismiss = id => () => remove(id);

  return (
    <Ctx.Provider value={{ add, remove }}>
      {children}
      <ToastContainer>
        {toasts.map(({ content, id, mode }) => (
          <Toast key={id} Toast={Toast} onDismiss={onDismiss(id)} mode={mode}>
              {content}
          </Toast>
        ))}
      </ToastContainer>
    </Ctx.Provider>
  );
}

// Consumer
// ==============================

export const useToasts = () => useContext(Ctx);
