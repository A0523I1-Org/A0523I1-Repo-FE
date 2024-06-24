import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "../css/header.css"

// LOGIN-DatCT
import { RiUserLine, RiLockLine, RiEyeOffLine, RiEyeLine, RiFacebookLine, RiGoogleLine } from 'react-icons/ri';
import '../css/auth/login.css'; // Import your custom CSS
import Modal from "react-modal";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"
import {useNavigate} from "react-router";
import * as authService from "../services/Authenticate/AuthService"

const Header = () => {
    const [showMenuSelect, setShowMenuSelect] = useState(false);

    // LOGIN-DatCT
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [error, setError] = useState('')
    const [account, setAccount] = useState({username:"", password:""});
    const navigate = useNavigate()

    const validateAccount = {
        username : Yup.string().required("Vui lòng điền tên đăng nhập.").min(2).max(1000),
        password : Yup.string().required("Vui lòng điền tên mật khẩu.").min(2).max(1000)
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const openLoginModal = () => {
        setLoginModalIsOpen(true);
    };


    useEffect(() => {
        if(localStorage.token && loginModalIsOpen) {
            navigate('/employee/personal-information')
        }
    }, [loginModalIsOpen])

    // ===================================== LOGIN ======================================
    const login = async (account) => {
        try {
            const userData = await authService.login(account.username, account.password)

            if (userData.authenticated === true) {

                if (userData.access_token) {

                    localStorage.setItem('token', userData.access_token);
                    localStorage.setItem('role', JSON.stringify(userData.roles));

                    navigate('/employee/personal-information');

                } else {
                    setError(userData.message);
                }

            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) setError("Tài khoản KHÔNG tồn tại.")
                if (error.response.status === 401) setError("Mật khẩu KHÔNG trùng khớp.")
            }
        }
    }

    // ===================================== LOGOUT ======================================
    const handleLogoutClick = async () => {
        const token = localStorage.getItem('token');
        await authService.logout(token);

        navigate("/")
    }


    const valueMenu = {
        showMenuSelect,setShowMenuSelect,
        openLoginModal
    }

    const styles = {
        container: {
            backgroundColor: '#FFF5F5',
            border: '1px solid #EB5757',
            borderRadius: '4px',
            padding: '10px', // Giảm khoảng cách
            marginBottom: '10px', // Giảm khoảng cách dưới
            maxWidth: '300px', // Độ rộng tối đa
        },
        message: {
            color: '#EB5757',
            fontSize: '14px', // Kích thước chữ
        }
    };

    return (
        <>
            <Header_child menu={valueMenu}/>

            {/*    LOGIN - DatCT*/}
            <Modal
                appElement={document.getElementById('root')}
                isOpen={loginModalIsOpen}
                onRequestClose={() => setLoginModalIsOpen(false)}
                className="modal-content z-100"
            >
                <Formik initialValues={account}
                        onSubmit={login}
                        validationSchema={Yup.object(validateAccount)}>

                    <div className="l-form">
                        <div className="shape1"/>
                        <div className="shape2"/>

                        <div className="form">
                            <Form className="form__content">
                                <h1 className="form__title">Đăng nhập</h1>

                                <div className="form__div form__div-one">

                                    {error &&<div style={styles.container} className="login__fail_message">
                                        <div style={styles.message}>
                                            {error}
                                        </div>
                                    </div>}

                                    <div className="form__icon">
                                        <RiUserLine />
                                    </div>
                                    <div className="form__div-input">
                                        <label htmlFor="" className="form__label"/>
                                        <Field type="text" className="form__input" placeholder="Tên đăng nhập" name="username"/>
                                        <ErrorMessage className="error__message" name="username" component="div"/>
                                    </div>
                                </div>

                                <div className="form__div">
                                    <div className="form__icon">
                                        <RiLockLine />
                                    </div>
                                    <div className="form__div-input">
                                        <label htmlFor="" className="form__label"/>
                                        <Field type={passwordVisible ? "text" : "password"} placeholder="Mật khẩu" className="form__input" id="password" name="password"/>
                                        <div className="form__icon login__eye" onClick={togglePasswordVisibility}>
                                            {passwordVisible ? <RiEyeLine /> : <RiEyeOffLine />}
                                        </div>
                                        <ErrorMessage className="error__message" name="password" component="div"/>
                                    </div>
                                </div>

                                {/*<div className="form__check">*/}
                                {/*    <div className="form__remember">*/}
                                {/*        <label htmlFor="remember-me">*/}
                                {/*            <input type="checkbox" id="remember-me" name="remember-me"/>*/}
                                {/*            Ghi nhớ tôi*/}
                                {/*        </label>*/}
                                {/*    </div>*/}
                                {/*    /!*<a href="#" className="form__forgot">Quên mật khẩu?</a>*!/*/}
                                {/*</div>*/}

                                <button type="submit" className="form__button">ĐĂNG NHẬP</button>

                            </Form>
                        </div>
                    </div>

                </Formik>
            </Modal>

            {authService.isAuthenticated() && <button className="btn btn-danger" onClick={handleLogoutClick}>
                Logout
            </button>}

        </>
    )
}
const Header_child = ({menu}) => {


    return (
        <>
            <header className="h-16 bg-white border  " id="header">
                <nav className="relative  h-full flex items-center flex-wrap antialiased menu__home"
                     id="menu__home">
                    <div className="absolute left-0 w-1/6  ml-[20px]">
                        <div className=" h-auto px-24 max-sm:px-0 max-lg:px-10 max-md:px-5 max-xl:px-18 ">
                            <Link to={'/'} className="w-[100px] rotate-45 h-[100px]  absolute  bg-white mt-[-35px] ">
                                <img className="rotate-[-45deg]"
                                     src='/img/Gold_Black_Modern_Real_Estate_Logo-removebg-preview.png'
                                     alt="anh dai dien"/>
                            </Link>
                        </div>
                    </div>
                    <div
                        className="w-[50%] max-xl:w-[60%] max-lg:w-[70%] flex absolute text-slate-700 gap-8 font-semibold right-0 max-2xl:right-[10px] max-md:hidden items-center max-xl:right-[50px] max-lg:right-0 ">
                        <Link to={'/'} className="menu__item menu__item__active">Trang chủ</Link>
                        <a className="menu__item max-lg:hidden">Giới thiệu</a>
                        <a className="menu__item">Sự kiện</a>
                        <a className="menu__item">Liên hệ</a>

                        {authService.isAuthenticated() && <button onClick={() => menu.setShowMenuSelect(!menu.showMenuSelect)} className=" inline-flex items-center relative ">
                            Quản trị - hệ thống
                            <span className={`ml-1 transition ${menu.showMenuSelect ? 'rotate-[180deg]' : 'rotate-[0deg]'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth="1.5"
                                     stroke="currentColor" className="w-3.5 h-3.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                                </svg>
                            </span>

                            <div className={`w-[180px]  h-auto absolute  bg-white border overflow-hidden  top-12 rounded-[3px] z-30 ${menu.showMenuSelect ? '' : 'hidden'}`}>
                                <div className="w-full h-[40px] relative group ">
                                    <Link to={'/employee'}>
                                        <button className="h-full text-[15px] w-full ">Nhân viên</button>
                                    </Link>
                                    <span
                                        className="absolute w-full h-[1px] bg-yellow-500 bottom-0 left-[-180px] group-hover:left-0 transition-all duration-1000"></span>
                                </div>
                                <div className="w-full h-[40px] relative group">
                                    <Link to={'/contract'}>
                                        <button className="h-full text-[15px] w-full ">Hợp đồng</button>
                                    </Link>
                                    <span
                                        className="absolute w-full h-[1px] bg-yellow-500 bottom-0 right-[-180px] group-hover:right-0 transition-all duration-1000"></span>
                                </div>
                                <div className="w-full h-[40px] relative group ">
                                    <Link to={'/landing'}>
                                        <button className="h-full w-full text-[15px]">Mặt bằng</button>
                                    </Link>
                                    <span
                                        className="absolute w-full h-[1px] bg-yellow-500 bottom-0 left-[-180px] group-hover:left-0 transition-all duration-1000"></span>
                                </div>
                                <div className="w-full h-[40px] relative group">
                                    <Link to={'/customer'}>
                                        <button className="h-full w-full text-[15px]">Khách hàng</button>
                                    </Link>
                                    <span
                                        className="absolute w-full h-[1px] bg-yellow-500 bottom-0 right-[-180px] group-hover:right-0 transition-all duration-1000"></span>
                                </div>
                            </div>
                        </button>}

                    </div>
                    <button className="absolute hidden right-[150px] max-md:block " id="btn__animation_menu_header">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"/>
                        </svg>
                    </button>

                    {!authService.isAuthenticated() && <button className="absolute w-[119px] h-12 bg-[#2f2b36] hover:bg-white hover:text-black hover:border-[1px] hover:border-black rounded-[40px] flex items-center justify-center mr-[20px] right-5 text-white  button-animation
                        max-xl:right-8 max-lg:right-10 max-md:right-0" onClick={menu.openLoginModal}
                            id="button_open_menu_lilu open-login-modal">
                        <span>
                            Đăng nhập
                        </span>
                    </button>}


                </nav>
            </header>
        </>
    )
}
export default Header;