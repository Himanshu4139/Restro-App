import ReactDOM from "react-dom";
import React from "react";



function Model({onClose, children}){

   return ReactDOM.createPortal(
 <div>
        <div className="fixed inset-0 bg-gray-300 opacity-80" onClick={onClose}></div>
        <div className="inset-60 h-max absolute top-[5%] lg:top-10 lg:w-[30%] lg:left-[35%] w-[100%] left-0"> 
        {children}
        </div>
    </div>,
    document.querySelector('.modal-container')
   );
}

export default Model;