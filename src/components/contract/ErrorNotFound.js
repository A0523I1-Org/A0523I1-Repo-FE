import React, {useEffect} from 'react';
import  '../../css/popupStyle.css'
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
const PopupUpdate = ({message,handleClosePopup}) => {
    const  navigate = useNavigate();

    useEffect(() => {
        const section = document.querySelector('.section')
        if(section){
            setTimeout(() => {
                section.classList.add('active');
            },1000)

        }

    },[]);
    useEffect(() => {
        const section = document.querySelector('.section'),
            success = document.querySelector('.success-btn')

        const handleSuccessClick = () => {
            section.classList.remove('active');
            navigate("/contract")
            toast.error("Lỗi, vui lòng kiểm tra lại các bước đã thực hiện !!!")

        }
        success.addEventListener('click',handleSuccessClick);

        return () => {
            success.removeEventListener('click',handleSuccessClick);
        }
    },[handleClosePopup])
    console.log(message)
    return(
        <>
            <section className="section active">
                <div className="overlay"/>
                <div className="modal-box ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{width:'70px',height: '70px', fill :"#f31700"}}>
                        <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>
                    <h2> Thất Bại !!!</h2>
                    <h3> {message} !!!</h3>
                    <div className="buttons">
                        <button className="btns success-btn" onClick={handleClosePopup}>Xác Nhận</button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default PopupUpdate;