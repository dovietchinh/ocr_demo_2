import classNames from 'classnames/bind';
import React from 'react';
import ReactDOM from 'react-dom';
import useModal from './hook';
import style from './Modal.module.scss'

let cx = classNames.bind(style)


const Modal = ({ isShowing, hide, children }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
	<div className={cx("modal-overlay")}/>
	<div className={cx("modal-wrapper")}>
		<div className={cx("modal")}>
			{children}
		</div>
	</div>
  </React.Fragment>, document.body
) : null;



export { useModal }
export default Modal;