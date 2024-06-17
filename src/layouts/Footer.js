
import '../css/home.css'
const Footer = () => {

    return (
        <>
            <Footer_child/>
        </>
    )
}
const Footer_child = () => {
    return (
        <>
            <footer id="footer">
                <div className=" h-[570px] flex max-lg:flex-col bg-[#fafafa]">
                    <div className="w-1/2 h-full flex items-center ml-10  max-sm:mx-0 max-lg:w-full max-lg:mt-10">
                        <iframe className="max-lg:h-[300px] max-lg:w-[750px] max-sm:w-full"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15337.039015682922!2d108.22261154651639!3d16.05200502368476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219d7590cbd69%3A0xee68199c5717ac79!2sFivitel%20Danang%20Hotel!5e0!3m2!1svi!2s!4v1715815696963!5m2!1svi!2s"
                                width="600" height="450"  allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div
                        className="w-2/3 max-lg:w-full flex flex-col my-5 gap-3 my-[60px] max-lg:my-[0] text-[#212529]">
                        <div className=" h-1/2 mx-10 flex gap-5 items-center ">
                            <div className="w-2/3 h-full max-lg:h-2/3 max-lg:w-1/2  flex flex-col gap-5 max-lg:flex ">
                                <div className="w-full h-1/2 max-lg:w-1/2 max-lg:h-1/2  max-lg:w-full">
                                    <h1 className="footer__title text-lg font-semibold max-sm:text-sm">Công ty cổ phần
                                        bất động sản XLS</h1>
                                    <p className="ml-5 footer_text  max-sm:ml-0 ">Địa chỉ : k18/37 Phan tứ, Bắc Mỹ An,
                                        Ngũ Hành Sơn, Đà Nẳng </p>
                                    <p className="ml-5 mt-5 footer_text max-xl:hidden">Số Giấy CNĐKDN: 0108824877, đăng
                                        kí lần đầu ngày 17/07/2019.
                                        Nơi cấp: Sở kế hoạch và đầu tư thành phố Hà Nội - Phòng đăng kí kinh doanh</p>
                                </div>
                                <div className="w-full h-1/2 max-lg:w-1/2 max-lg:h-1/2 max-lg:w-full">
                                    <h1 className="footer__title text-lg font-semibold max-sm:text-sm max-sm:mt-5">Địa
                                        chỉ văn phòng XLS</h1>
                                    <p className="ml-5 text-sm max-sm:ml-0">Địa chỉ : k18/37 Phan tứ, Bắc Mỹ An, Ngũ
                                        Hành Sơn, Đà Nẳng </p>
                                </div>

                            </div>
                            <div className="w-1/3 h-full  max-md:ml-10">
                                <div className="w-full h-1/2 max-lg:mt-[30px] ">
                                    <h1 className="footer__title font-semibold max-xl:w-[200px] ">Thông tin liên hệ -
                                        XLS</h1>
                                    <div className="flex ml-5 text-sm font-semibold max-xl:mx-0">
                        <span className="font-bold mt-1 mr-5 max-xl:mr-1 max-md:ml-5">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                               stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"/>
                            </svg>
                        </span>
                                        <span>0987552345</span>
                                    </div>
                                    <div className="flex ml-5 text-sm font-semibold max-xl:mx-0 ">
                          <span className="font-bold mt-1 mr-5 max-xl:mr-1 max-md:ml-5">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                  stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"/>
                             </svg>

                        </span>
                                        <span> CongtyXls@gamil.com</span>
                                    </div>
                                </div>
                                <div className="w-full h-1/2 max-lg:mt-[-15px] max-md:mt-1">
                                    <h1 className="footer__title font-semibold">Tổng đài hỗ trợ</h1>
                                    <div className="flex gap-5 ml-5 footer_text font-semibold max-xl:mx-0 max-md:ml-5">
                            <span className="font-bold  mr-5 max-xl:mr-1">
                              <i className="fa-solid fa-headphones-simple"></i>
                            </span>
                                        <span className="text-red-700">077.980</span>
                                    </div>
                                    <div className="flex ml-5 footer_text font-semibold  max-xl:mx-0">
                              <span className="font-bold  mr-5 max-xl:mr-2 max-md:ml-5">
                                <i className="fa-solid fa-envelope"></i>
                              </span>
                                        <span className=""> CongtyXls@gamil.com</span>
                                    </div>
                                    <div className="flex ml-5 my-5 text-4xl font-semibold gap-5 max-lg:hidden">
                            <span className="">
                                <i className="fa-brands fa-facebook" style={{color:'#0168b7'}}></i>
                            </span>
                                        <span className="">
                           <i className="fa-brands fa-square-twitter" style={{color:'#74C0FC'}}></i>
                            </span>
                                        <span className="">
                            <i className="fa-brands fa-youtube" style={{color:'#e62828'}}></i>
                            </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3 h-full hidden max-lg:inline-block max-md:hidden">
                                <div className="w-full h-2/3 my-[15px]  text-4xl font-semibold  ">
                                    <h1 className="footer__title font-semibold">Mạng xã hội </h1>
                                    <span className="">
                                <i className="fa-brands fa-facebook" style={{color:'#0168b7'}}></i>
                            </span>
                                    <span className="">
                           <i className="fa-brands fa-square-twitter"  style={{color:'#74C0FC'}}></i>
                            </span>
                                    <span className="">
                            <i className="fa-brands fa-youtube" style={{color:'#e62828'}}></i>
                            </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-1/2  border-t-[1.5px] flex gap-3  mt-5">
                            <div className="w-1/2 h-full ml-10 max-2xl:hidden max-lg:block">
                                <h1 className="footer__title mt-3">Tải mobile app : Xls.vn</h1>
                                <div className="w-full mt-3 flex gap-5 max-sm:gap-0 max-sm:ml-[-10px]">

                                </div>
                                <h4 className="mt-3 footer__title">Lĩnh vực kinh doanh </h4>
                                <div className="mt-3">
                                    <p className="footer_text">- Bán mặt bằng, căn hộ, chung cư</p>
                                    <p className="footer_text">- Cho thuê mặt bằng, căn hộ, chung cư</p>
                                </div>
                            </div>

                            <div className="w-1/2 h-full ">
                                <h1 className="footer__title mt-3">Chính sách điều khoản sử dụng</h1>
                                <div className="w-full mt-3 flex gap-5">
                         <span className="">
                             <img src="/img/dathongbaobct.png" height="60" width="130"/>
                         </span>
                                    <span>
                            <img src="/img/dadangkybct.png" height="60" width="130"/>
                        </span>
                                </div>
                                <h4 className="mt-4 footer__title">Uy tín trong thị trường </h4>
                                <div className="mt-3">
                                    <p className="footer_text">- Chính sách làm việc rõ ràng</p>
                                    <p className="footer_text">- Giấy tờ hợp đồng </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;