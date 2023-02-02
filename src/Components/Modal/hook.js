import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle(data=null) {
    
    if(![true,false].includes(data)){
      setIsShowing(!isShowing)
    }
    else{
      setIsShowing(data)
    }
    
    
  }

  return {
    isShowing,
    toggle,
  }
};

export default useModal;