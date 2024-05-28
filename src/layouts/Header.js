
const Header = () => {

    return (
        <>
            <Header_child/>
        </>
    )
}
const Header_child = () => {
    return (
        <>
            <header className="h-16 bg-white border overflow-hidden " id="header">
                <nav className="relative overflow-hidden h-full flex items-center flex-wrap antialiased menu__home"
                     id="menu__home">
                    <div className="absolute left-0 w-1/6  ml-[20px]">
                        <div className=" h-auto px-24 max-sm:px-0 max-lg:px-10 max-md:px-5 max-xl:px-18 ">
                            <a href="" className="w-[100px] rotate-45 h-[100px]  absolute  bg-white mt-[-35px] ">
                                <img className="rotate-[-45deg]"
                                     src='/img/Gold_Black_Modern_Real_Estate_Logo-removebg-preview.png'
                                     alt="anh dai dien"/>
                            </a>
                        </div>
                    </div>
                    <div
                        className="w-[50%] max-xl:w-[60%] max-lg:w-[70%] flex absolute text-slate-700 gap-8 font-semibold right-0 max-2xl:right-[10px] max-md:hidden  menu__home__slmh1 max-xl:right-[50px] max-lg:right-0 ">
                        <a className="menu__item menu__item__active">Trang chủ</a>
                        <a className="menu__item max-lg:hidden">Giới thiệu</a>
                        <a className="menu__item">Sự kiện</a>
                        <a className="menu__item">Liên hệ</a>
                        <a className="menu__item inline-flex items-center ">
                            Quản trị - hệ thống
                            <span className="ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth="1.5"
                                     stroke="currentColor" className="w-3.5 h-3.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                                </svg>
                            </span>
                        </a>
                    </div>
                    <button className="absolute hidden right-[150px] max-md:block " id="btn__animation_menu_header">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"/>
                        </svg>
                    </button>

                    <button className="absolute w-[119px] h-12 bg-[#2f2b36] rounded-[40px] flex items-center justify-center mr-[20px] right-5 text-white  button-animation
                        max-xl:right-8 max-lg:right-10 max-md:right-0
                    "
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