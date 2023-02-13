import classNames from 'classnames/bind'
import style from './BlockingModal.module.scss'
import { useLocation, useNavigate } from "react-router-dom";
import Button from '~/Components/Button'
import { useIntl } from 'react-intl';
import { useContext, useRef, useCallback, useEffect, useState } from 'react';
import Modal, {useModal} from '~/Components/Modal';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
let cx = classNames.bind(style)

const BlockingModal = ({when=true}) => {
    const [title,setTile] = useState("LEAVE PAGE")
    const [content,setContent] = useState("Do you want to leave pages?")
    const navigate = useNavigate();
    const { navigator } = useContext(NavigationContext);
    const [currentPath, setCurrentPath] = useState("");
    const intl = useIntl()
    const {isShowing,toggle} = useModal()
    const push = useRef(navigator.push)
    const handleClickOk = useCallback(async () => {
        navigator.push = push.current
        navigate(currentPath)
    }, [currentPath, navigator]);

    const handleClickCancel = useCallback(async () => {
        toggle(false);
    }, [currentPath,navigator]);
    
    useEffect(() => {
        if (when) {
            navigator.push = (prompt) => {
                if(prompt.pathname=='/logout'){
                    setTile("LOGOUT")
                    setContent("Do you want to logout?")
                }
                setCurrentPath(prompt.pathname);
                toggle();
            };
        } else {
            navigator.push = push.current
        }
    
        return () => {
            navigator.push = push.current
        };
    }, [when]);


    return (
        <>
        {
        <Modal isShowing={isShowing} hide={toggle}>
            <div className={cx("container")}>
                <div className={cx("title")}>
                    <span>{title}</span>
                </div>
                <div className={cx("content")}>
                    <span>{content}</span>
                </div>
                <div className={cx("action")}>
                    <Button 
                        variant="light"
                        className={cx("btn")}
                        onClick={handleClickCancel}
                        >
                        {intl.formatMessage({id:"Cancel"})}
                    </Button>
                    <Button 
                        variant="primary"
                        className={cx("btn")}
                        onClick={handleClickOk}
                        >
                        {intl.formatMessage({id:"Ok"})}
                    </Button>
                </div>
            </div>
        </Modal>
        }
        </>
    )

}
export default BlockingModal
