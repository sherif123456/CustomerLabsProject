//import {useState} from 'react';
import './DialogBox.css';
import Button from 'react-bootstrap/Button';

function DialogBox(props){
    let modalContent = null;
    if (props.showPopup){
        modalContent = (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{props.title}</h4>
                        <button className="button" onClick={props.handleClose}>X</button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                </div>
                <div>
                    <Button variant="danger" className='btn-cancel' onClick={props.handleClose}>Cancel</Button>
                    </div>
            </div>
        );
    } else {
        modalContent = null;
    }
    return modalContent;
}

export default DialogBox;