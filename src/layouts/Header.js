
import {Link, useLocation} from "react-router-dom";
import "../css/header.css"
import React, {useEffect, useState} from "react";
// LOGIN-DatCT
import { RiUserLine, RiLockLine, RiEyeOffLine, RiEyeLine} from 'react-icons/ri';
import '../css/auth/login.css'; // Import your custom CSS
import Modal from "react-modal";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"
import * as accountService from "../services/AccountService";
import {useNavigate} from "react-router";
import * as authService from "../services/Authenticate/AuthService"

const Header = () => {
    const [showMenuSelect, setShowMenuSelect] = useState(false);
    const [isShowMenuInfoEmployee,setIsShowMenuInfoEmployee] = useState(false);
    const [isNavigation, setIsNavigation] = useState(false);
    const [isNavigationChild, setIsNavigationChild] = useState(false);
    const location = useLocation();

    // LOGIN-DatCT
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [error, setError] = useState('')
    const [account, setAccount] = useState({username: "", password: ""});
    const navigate = useNavigate()

    const validateAccount = {
        username: Yup.string().required("Vui lòng điền tên đăng nhập.").min(2).max(1000),
        password: Yup.string().required("Vui lòng điền tên mật khẩu.").min(2).max(1000)
    }

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth < 1022){
                setShowMenuSelect(false)
            }
            if(window.innerWidth > 1022){
                setIsNavigation(false)
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setIsNavigation(false)
    }, [location.pathname]);



    // Cua Dat
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const openLoginModal = () => {
        setIsNavigation(false)
        setLoginModalIsOpen(true);
    };


    useEffect(() => {
        if (localStorage.token && loginModalIsOpen) {
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

                    navigate('/employee/personal-information');

                } else {
                    setError(userData.message);
                }

            }
        } catch (error) {
            setError("Đăng nhập thất bại.")
        }
    }

    // ===================================== LOGOUT ======================================
    const handleLogoutClick = async () => {
        const token = localStorage.getItem('token');
        await authService.logout(token);

        navigate("/")
    }


    // ==================================
    const valueMenu = {
        showMenuSelect, setShowMenuSelect, setIsNavigation, isNavigation,
        openLoginModal, handleLogoutClick,isShowMenuInfoEmployee,setIsShowMenuInfoEmployee
    }
    const navigation = {
        isNavigationChild, setIsNavigationChild, isNavigation
    }

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

                                    {error && <div className="login__fail_message">{error}</div>}

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

                                <div className="form__check">
                                    <div className="form__remember">
                                        <label htmlFor="remember-me">
                                            <input type="checkbox" id="remember-me" name="remember-me"/>
                                            Ghi nhớ tôi
                                        </label>
                                    </div>
                                    {/*<a href="#" className="form__forgot">Quên mật khẩu?</a>*/}
                                </div>

                                <button type="submit" className="form__button">ĐĂNG NHẬP</button>

                            </Form>
                        </div>
                    </div>

                </Formik>
            </Modal>
            <Navigate isNavigation={navigation}/>


        </>
    )
}


// const Header_child = () => {
//     return (
//         <>
//             <header className="h-16 bg-white border overflow-hidden " id="header">
//                 <nav className="relative overflow-hidden h-full flex items-center flex-wrap antialiased menu__home"
//                      id="menu__home">
//                     <div className="absolute left-0 w-1/6  ml-[20px]">
//                         <div className=" h-auto px-24 max-sm:px-0 max-lg:px-10 max-md:px-5 max-xl:px-18 ">
//                             <a href="" className="w-[100px] rotate-45 h-[100px]  absolute  bg-white mt-[-35px] ">
//                                 <img className="rotate-[-45deg]"
//                                      src='/img/Gold_Black_Modern_Real_Estate_Logo-removebg-preview.png'
//                                      alt="anh dai dien"/>
//                             </a>
//                         </div>
//                     </div>
//                     <div
//                         className="w-[50%] max-xl:w-[60%] max-lg:w-[70%] flex absolute text-slate-700 gap-8 font-semibold right-0 max-2xl:right-[10px] max-md:hidden  menu__home__slmh1 max-xl:right-[50px] max-lg:right-0 ">
//                         <a className="menu__item menu__item__active">Trang chủ</a>
//                         <a className="menu__item max-lg:hidden">Giới thiệu</a>
//                         <a className="menu__item">Sự kiện</a>
//                         <a className="menu__item">Liên hệ</a>
//                         <a className="menu__item inline-flex items-center ">
//                             Quản trị - hệ thống
//                             <span className="ml-1">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth="1.5"
//                                      stroke="currentColor" className="w-3.5 h-3.5">
//                                   <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
//                                 </svg>
//                             </span>
//                         </a>
//                     </div>
//                     <button className="absolute hidden right-[150px] max-md:block " id="btn__animation_menu_header">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
//                              stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round"
//                                   d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"/>
//                         </svg>
//                     </button>
//
//                     <button className="absolute w-[119px] h-12 bg-[#2f2b36] rounded-[40px] flex items-center justify-center mr-[20px] right-5 text-white  button-animation
//                         max-xl:right-8 max-lg:right-10 max-md:right-0
//                     "
//                             id="button_open_menu_lilu">
//                     <span>
//                         Đăng nhập
//                     </span>
//              <Navigate isNavigation={navigation}/>
//             <Header_child menu={valueMenu}/>
//         </>
//     )
// }

const Navigate = ({isNavigation}) => {

    return (
        <>

            <div className={`max-lg:block hidden ${isNavigation.isNavigation ? "-translate-x-0" : "-translate-x-[-256px]"} right-0 ease-in-out duration-300 
            transition absolute z-30 bg-[#2f2b36] text-white w-64 min-h-screen p-4`}>
                <nav>
                    <ul className="space-y-2">
                        <li className="opcion-con-desplegable">
                            <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                                <div className="flex items-center">
                                    <i className="fa-solid fa-house"></i>
                                    <Link to={"/"} className={"px-2 text-white "}>Trang chủ</Link>
                                </div>
                            </div>
                        </li>
                        <li className="opcion-con-desplegable">
                            <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                                <div className="flex items-center">
                                    <i className="fas fa-money-bill-wave mr-2"></i>
                                    <span>Giới thiệu</span>
                                </div>
                            </div>
                        </li>
                        <li className="opcion-con-desplegable">
                            <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                                <div className="flex items-center">
                                    <i className="fa-solid fa-calendar-days"></i>
                                    <span className={"px-2"}>Sự kiện</span>
                                </div>
                            </div>
                        </li>
                        {authService.isAuthenticated() &&
                            <li className="opcion-con-desplegable">
                                <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                                    <button className={"flex items-center"}
                                            onClick={() => isNavigation.setIsNavigationChild(!isNavigation.isNavigationChild)}>
                                        <div>
                                            <i className="fas fa-file-alt mr-2"></i>
                                            <span>Quản trị - hệ thống</span>
                                        </div>
                                        {/*<i className="fas fa-chevron-down text-xs"></i>*/}
                                    </button>

                                </div>
                                <ul className={`${isNavigation.isNavigationChild ? "block" : "hidden"} m-0 `}>
                                    <li>
                                        <Link to={'/employee'}
                                              className="block  p-2 text-white hover:bg-gray-700 flex items-center">
                                            <i className="fas fa-chevron-right mr-2 text-xs"></i>
                                            Nhân viên
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/contract"}
                                              className="block text-white p-2 hover:bg-gray-700 flex items-center">
                                            <i className="fas fa-chevron-right mr-2 text-xs"></i>
                                            Hợp đồng
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/landing"}
                                              className="block text-white p-2 hover:bg-gray-700 flex items-center">
                                            <i className="fas fa-chevron-right mr-2 text-xs"></i>
                                            Mặt bằng
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/customer"}
                                              className="block text-white p-2 hover:bg-gray-700 flex items-center">
                                            <i className="fas fa-chevron-right mr-2 text-xs"></i>
                                            Khách hàng
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        }

                        <li className="opcion-con-desplegable">
                            <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                                <div className="flex items-center">
                                    <i className="fa-solid fa-headphones"></i>
                                    <span className={"px-2"}> Liên hệ</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>


        </>
    )
}

const Header_child = ({menu}) => {

    return (
        <>
            <header className="h-16 bg-white border " id="header">
                <nav className="relative  h-full flex items-center fixed top-0   flex-wrap antialiased menu__home"
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
                        className="w-[50%] max-xl:w-[60%] max-lg:w-[70%] 2xl:right-10 max-2xl:right-20 max-xl:right-[40px] max-lg:hidden flex absolute text-slate-700 gap-8 font-semibold
                        right-0">
                        <Link to={'/'} className="menu__item menu__item__active header-title">Trang chủ</Link>
                        <a className="menu__item max-lg:hidden header-title">Giới thiệu</a>
                        <a className="menu__item header-title">Sự kiện</a>
                        {authService.isAuthenticated() &&
                            <button onClick={() => menu.setShowMenuSelect(!menu.showMenuSelect)}
                                    className=" inline-flex items-center relative header-title">
                                Quản trị - hệ thống
                                <span
                                    className={`ml-1 transition ${menu.showMenuSelect ? 'rotate-[180deg]' : 'rotate-[0deg]'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22"
                                             strokeWidth="1.5"
                                             stroke="currentColor" className="w-3.5 h-3.5">
                                          <path strokeLinecap="round" strokeLinejoin="round"
                                                d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                                        </svg>
                                    </span>

                                <div
                                    className={`w-[180px]  h-auto absolute  bg-white border overflow-hidden  top-[49px] rounded-[3px] z-30 ${menu.showMenuSelect ? '' : 'hidden'}`}>
                                    <div
                                        className="w-full h-[40px] relative group flex justify-center items-center font-normal text-black text-[15px]">
                                        <Link to={'/employee'} className={"header-title"}>
                                            Nhân viên
                                        </Link>
                                        <span
                                            className="absolute w-full h-[1px] bg-yellow-500 bottom-0 left-[-180px] group-hover:left-0 transition-all duration-1000"></span>
                                    </div>
                                    <div
                                        className="w-full h-[40px] relative group flex justify-center items-center font-normal text-black text-[15px]">
                                        <Link to={'/contract'} className={"header-title"}>
                                            Hợp đồng
                                        </Link>
                                        <span
                                            className="absolute w-full h-[1px] bg-yellow-500 bottom-0 right-[-180px] group-hover:right-0 transition-all duration-1000"></span>
                                    </div>
                                    <div
                                        className="w-full h-[40px] relative group flex items-center justify-center font-normal text-black text-[15px]">
                                        <Link to={'/landing'} className={"header-title"}>
                                            Mặt bằng
                                        </Link>
                                        <span
                                            className="absolute w-full h-[1px] bg-yellow-500 bottom-0 left-[-180px] group-hover:left-0 transition-all duration-1000"></span>
                                    </div>
                                    <div
                                        className="w-full h-[40px] relative group flex justify-center items-center font-normal text-black text-[15px]">
                                        <Link to={'/customer'} className={"header-title"}>
                                            Khách hàng
                                        </Link>
                                        <span
                                            className="absolute w-full h-[1px] bg-yellow-500 bottom-0 right-[-180px] group-hover:right-0 transition-all duration-1000"></span>
                                    </div>
                                </div>

                            </button>
                        }
                        <a className="menu__item header-title">Liên hệ</a>
                    </div>


                {!authService.isAuthenticated() &&
                    <button className="absolute w-[119px] h-12 bg-[#2f2b36] hover:text-slate-900 hover:bg-white  hover:border-[1px] hover:border-black
                    rounded-[40px] flex items-center justify-center mr-[20px] right-5 text-slate-50  button-animation
                        max-xl:right-8 max-lg:right-10 max-md:right-0" onClick={menu.openLoginModal}>
                            Đăng nhập
                    </button>
                }

                <button onClick={() => menu.setIsNavigation(!menu.isNavigation)}
                            className="absolute hidden max-md:right-[150px] max-lg:right-[200px] max-lg:block "
                            id="btn__animation_menu_header">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"/>
                        </svg>
                </button>

                    {authService.isAuthenticated() &&
                        <button onClick={() => (
                            menu.setIsShowMenuInfoEmployee(!menu.isShowMenuInfoEmployee),
                            menu.setIsNavigation(false)
                        )}
                                className={"absolute w-[119px] h-12 border-black border transition rounded-[40px]  flex items-center justify-center mr-[50px] right-5 "}>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                            <span className="pl-1">Phan Phùng</span>
                            <div
                                className={`${menu.isShowMenuInfoEmployee ? "block" : "hidden"} w-[180px] h-auto absolute  bg-white border overflow-hidden  top-[61px] rounded-[3px] z-30`}>
                                <div className="w-full h-[40px] relative border-b-[1px]">
                                    <Link to={'/contract'}>
                                        <button className="h-full text-[15px] w-full header-title "> Tài khoản</button>
                                    </Link>
                                </div>
                                <div className="w-full h-[40px] relative  ">
                                    <Link to={'/landing'}>
                                        <button onClick={menu.handleLogoutClick}
                                                className="h-full w-full text-[15px] header-title">Đăng xuất
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </button>

                    }
                </nav>
            </header>
        </>
    )
}
export default Header;