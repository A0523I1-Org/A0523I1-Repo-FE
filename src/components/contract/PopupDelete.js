import React, {useEffect, useState} from 'react';
import  '../../css/popupStyle.css'
import {deleteContract} from '../../services/ContractService'
import ErrorNotFound from "./ErrorNotFound";
import {toast} from "react-toastify";
const PopupDelete = ({id,handleDeleteConfirm,handleClosePopup}) => {
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [error,setError] = useState(null);
    useEffect(() => {
        const section = document.querySelector('.section')
        if(section){
            setTimeout(() => {
                section.classList.add('active');
            },100)

        }

    },[]);
    useEffect(() => {
        const section = document.querySelector('.section'),
            success = document.querySelector('.success-btn'),
            overlay = document.querySelector('.overlay');

        const handleOverlayClick = () => {
            section.classList.remove('active');
            setTimeout(handleClosePopup,200)
        }
        const handleSuccessClick = () => {
            section.classList.remove('active');
            setTimeout(handleClosePopup,200)
        }
        success.addEventListener('click',handleSuccessClick);
        overlay.addEventListener('click',handleOverlayClick);

        return () => {
            success.removeEventListener('click',handleSuccessClick);
            overlay.removeEventListener('click',handleOverlayClick);
        }
    },[handleClosePopup])

    const handleDeleteContract = async () => {
        try {
            const  token = localStorage.getItem('token');
            await deleteContract(id,token);
            handleDeleteConfirm();
            toast.success("Hợp đồng xóa thành công")

        }catch (e) {
            console.log(e)
            setError(e);
            const  section = document.querySelector('.section');
            if (section){
                section.classList.remove('active');
                setShowErrorPopup(true)
            }
        }
    };
    console.log('show',showErrorPopup)
    return(
        <>
            <section className="section">
                <div className="overlay"/>
                <div className="modal-box ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{width:'70px',height: '70px',fill:'#dd3933'}}><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                    <h2> Xóa hợp đồng !!!</h2>
                    <h3>Bạn có chắc chắn xóa hợp đồng số <span style={{color : 'red'}}>{id}</span> này không ?</h3>
                    <div className="buttons">
                        <button className="btns delete-btn" onClick={handleDeleteContract}> Xóa </button>
                        <button className="btns success-btn" > Quay lại </button>
                    </div>
                </div>
            </section>
            {showErrorPopup && <ErrorNotFound message={error} handleClosePopup={handleClosePopup}/>}
        </>
    )
}
export default PopupDelete;