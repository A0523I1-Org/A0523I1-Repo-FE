import React, {useEffect} from 'react';
import  '../../css/popupStyle.css'
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

const PopupUpdate = ({handleClosePopup}) => {
    const  navigate = useNavigate();

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
            navigate("/contract")
            toast.success("Hợp đồng cập nhật thành công")

        }
        const handleSuccessClick = () => {
            section.classList.remove('active');
            navigate("/contract")
            toast.success("Hợp đồng cập nhật thành công")
        }
        success.addEventListener('click',handleSuccessClick);
        overlay.addEventListener('click',handleOverlayClick);

        return () => {
            success.removeEventListener('click',handleSuccessClick);
            overlay.removeEventListener('click',handleOverlayClick);
        }
    },[handleClosePopup])
    return(
        <>
            <section className="section">
                <div className="overlay"/>
                <div className="modal-box ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{width:'70px',height: '70px',fill :"#28c900"}}>
                        <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
                    </svg>
                    <h2> Cập nhật thành công !!!</h2>
                    <h3>Những hành động trước đó sẽ không quay trở lại được !!!</h3>

                    <div className="buttons">

                        <button className="btns success-btn">Xác Nhận</button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default PopupUpdate;
