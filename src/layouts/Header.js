import {Link} from "react-router-dom";
import {useState} from "react";
import "../css/header.css"

const Header = () => {
    const [showMenuSelect, setShowMenuSelect] = useState(false);
    const [isNavigation,setIsNavigation] = useState(false);
    const valueMenu = {
        showMenuSelect,setShowMenuSelect,isNavigation
    }

    return (
        <>
                <Header_child menu={valueMenu}/>
                <Navigate isNavigation={isNavigation}/>
        </>
    )
}
const Navigate = ({isNavigation}) => {
    return (
        <>
            <div className="absolute z-30 right-[-256px] bg-gray-800 text-white w-64 min-h-screen p-4">
                <nav>
                    <ul className="space-y-2">
                        <li className="opcion-con-desplegable">
                            <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                                <div className="flex items-center">
                                    <i className="fas fa-calendar-alt mr-2"></i>
                                    <span>Agenda</span>
                                </div>
                                <i className="fas fa-chevron-down text-xs"></i>
                            </div>
                            <ul className="desplegable ml-4 hidden">
                                <li>
                                    <a href="#" className="block p-2 hover:bg-gray-700 flex items-center">
                                        <i className="fas fa-chevron-right mr-2 text-xs"></i>
                                        Gestion de citas
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block p-2 hover:bg-gray-700 flex items-center">
                                        <i className="fas fa-chevron-right mr-2 text-xs"></i>
                                        Polizas
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="opcion-con-desplegable">
                            <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                                <div className="flex items-center">
                                    <i className="fas fa-money-bill-wave mr-2"></i>
                                    <span>Contabilidad</span>
                                </div>
                                <i className="fas fa-chevron-down text-xs"></i>
                            </div>
                            <ul className="desplegable ml-4 hidden">
                                <li>
                                    <a href="#" className="block p-2 hover:bg-gray-700 flex items-center">
                                        <i className="fas fa-chevron-right mr-2 text-xs"></i>
                                        Tratamientos
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block p-2 hover:bg-gray-700 flex items-center">
                                        <i className="fas fa-chevron-right mr-2 text-xs"></i>
                                        Gastos
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block p-2 hover:bg-gray-700 flex items-center">
                                        <i className="fas fa-chevron-right mr-2 text-xs"></i>
                                        Facturas
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="opcion-con-desplegable">
                            <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                                <div className="flex items-center">
                                    <i className="fas fa-chart-bar mr-2"></i>
                                    <span>Informes</span>
                                </div>
                                <i className="fas fa-chevron-down text-xs"></i>
                            </div>
                            <ul className="desplegable ml-4 hidden">
                                <li>
                                    <a href="#" className="block p-2 hover:bg-gray-700 flex items-center">
                                        <i className="fas fa-chevron-right mr-2 text-xs"></i>
                                        Presupuestos
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block p-2 hover:bg-gray-700 flex items-center">
                                        <i className="fas fa-chevron-right mr-2 text-xs"></i>
                                        Informe médico
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="opcion-con-desplegable">
                            <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                                <div className="flex items-center">
                                    <i className="fas fa-file-alt mr-2"></i>
                                    <span>Documentación</span>
                                </div>
                                <i className="fas fa-chevron-down text-xs"></i>
                            </div>
                            <ul className="desplegable ml-4 hidden">
                                <li>
                                    <a href="#" className="block p-2 hover:bg-gray-700 flex items-center">
                                        <i className="fas fa-chevron-right mr-2 text-xs"></i>
                                        Firmas pendientes
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block p-2 hover:bg-gray-700 flex items-center">
                                        <i className="fas fa-chevron-right mr-2 text-xs"></i>
                                        Documentos
                                    </a>
                                </li>
                            </ul>
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
                        className="w-[50%] max-xl:w-[60%] max-lg:w-[70%] max-xl:right-[40px] max-lg:hidden flex absolute text-slate-700 gap-8 font-semibold right-0 max-2xl:right-[10px] max-md:hidden  menu__home__slmh1  max-lg:right-5 ">
                        <Link to={'/'} className="menu__item menu__item__active">Trang chủ</Link>
                        <a className="menu__item max-lg:hidden">Giới thiệu</a>
                        <a className="menu__item">Sự kiện</a>
                        <button onClick={() => menu.setShowMenuSelect(!menu.showMenuSelect)}
                                className=" inline-flex items-center relative ">
                            Quản trị - hệ thống
                            <span
                                className={`ml-1 transition ${menu.showMenuSelect ? 'rotate-[180deg]' : 'rotate-[0deg]'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="w-3.5 h-3.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                                </svg>
                            </span>

                            <div
                                className={`w-[180px]  h-auto absolute  bg-white border overflow-hidden  top-12 rounded-[3px] z-30 ${menu.showMenuSelect ? '' : 'hidden'}`}>
                                <div
                                    className="w-full h-[40px] relative group flex justify-center items-center font-normal text-black text-[15px]">
                                    <Link to={'/employee'}>
                                        Nhân viên
                                    </Link>
                                    <span
                                        className="absolute w-full h-[1px] bg-yellow-500 bottom-0 left-[-180px] group-hover:left-0 transition-all duration-1000"></span>
                                </div>
                                <div
                                    className="w-full h-[40px] relative group flex justify-center items-center font-normal text-black text-[15px]">
                                    <Link to={'/contract'}>
                                        Hợp đồng
                                    </Link>
                                    <span
                                        className="absolute w-full h-[1px] bg-yellow-500 bottom-0 right-[-180px] group-hover:right-0 transition-all duration-1000"></span>
                                </div>
                                <div
                                    className="w-full h-[40px] relative group flex items-center justify-center font-normal text-black text-[15px]">
                                    <Link to={'/landing'}>
                                        Mặt bằng
                                    </Link>
                                    <span
                                        className="absolute w-full h-[1px] bg-yellow-500 bottom-0 left-[-180px] group-hover:left-0 transition-all duration-1000"></span>
                                </div>
                                <div
                                    className="w-full h-[40px] relative group flex justify-center items-center font-normal text-black text-[15px]">
                                    <Link to={'/customer'}>
                                        Khách hàng
                                    </Link>
                                    <span
                                        className="absolute w-full h-[1px] bg-yellow-500 bottom-0 right-[-180px] group-hover:right-0 transition-all duration-1000"></span>
                                </div>
                            </div>
                        </button>
                        <a className="menu__item">Liên hệ</a>

                    </div>
                    <button 
                            className="absolute hidden max-md:right-[150px] max-lg:right-[200px] max-lg:block "
                            id="btn__animation_menu_header">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"/>
                        </svg>
                    </button>

                    {/*<button*/}
                    {/*    className={"absolute w-[50px] h-[50px] transition rounded-full hover:border-[1px] flex items-center justify-center mr-[50px] right-5 "}>*/}
                    {/*    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"*/}
                    {/*         stroke="currentColor" className="size-6">*/}
                    {/*        <path strokeLinecap="round" strokeLinejoin="round"*/}
                    {/*              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>*/}
                    {/*    </svg>*/}
                    {/*    <div*/}
                    {/*        className="w-[180px]  h-auto absolute  bg-white border overflow-hidden  top-[61px] rounded-[3px] z-30">*/}
                    {/*        <div className="w-full h-[40px] relative border-b-[1px]">*/}
                    {/*            <Link to={'/contract'}>*/}
                    {/*                <button className="h-full text-[15px] w-full "> Tài khoản</button>*/}
                    {/*            </Link>*/}
                    {/*        </div>*/}
                    {/*        <div className="w-full h-[40px] relative  ">*/}
                    {/*            <Link to={'/landing'}>*/}
                    {/*                <button className="h-full w-full text-[15px]">Đăng xuất</button>*/}
                    {/*            </Link>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</button>*/}
                    <button className="absolute w-[119px] h-12 bg-[#2f2b36] hover:bg-white hover:text-black hover:border-[1px] hover:border-black rounded-[40px] flex items-center justify-center mr-[20px] right-5 text-white  button-animation
                        max-xl:right-8 max-lg:right-10 max-md:right-0"
                            id="button_open_menu_lilu">
                        <span>
                            Đăng nhập
                        </span>
                    </button>
                </nav>
            </header>
        </>
    )
}
export default Header;