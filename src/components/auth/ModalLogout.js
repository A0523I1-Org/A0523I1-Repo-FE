import Modal from "react-modal";
import "../../css/auth/popupLogout.css"

const ModalLogout = ({ isOpen, onRequestClose, onConfirm }) => {
    return (

        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirm Logout"
            className="modal-logout"
        >

                    <h2>Confirm Logout</h2>
                    <p>Are you sure you want to logout?</p>
                    <div className="buttons">
                        <button style={{backgroundColor : 'red'}} onClick={onConfirm}>Yes</button>
                        <button style={{backgroundColor : 'blue'}} onClick={onRequestClose}>No</button>
                    </div>

        </Modal>


    );
};

export default ModalLogout;