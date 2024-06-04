import Footer from "./Footer";
import Header from "./Header";
import {useLocation} from "react-router-dom";
import '../layouts/FooterExtra';
import FooterExtra from "./FooterExtra";
import '../css/defaultLayout.css';


function DefaultLayout ({children})  {
    const location = useLocation();
    const listNameLocation = ['contract','customer','employee','landing'];
    console.log(location.pathname)
    return (
        <>
            {location.pathname === "/"
                ?
                <div>
                    <Header/>
                    {children}
                    <Footer/>
                </div>
                :
                <div className=" h-full ">
                    <div className=" h-screen custom-grid grid-rows-3">
                        <div className="">
                            <Header/>
                        </div>
                        <div className="mx-10 overflow-auto bg-[#f1f2f2] ">
                            <div className="w-full h-[40px]  relative">
                                <div
                                    className="absolute right-0 w-auto bg-gray-200 h-full flex items-center gap-5 justify-center">
                                    <span className={'pl-3'}>Trang chủ</span>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               strokeWidth="1.5" stroke="currentColor" className="size-4">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                    </svg>
                                    </span>
                                    <span className={''}>Mặt bằng</span>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               strokeWidth="1.5" stroke="currentColor" className="size-4">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                    </svg>
                                    </span>
                                    <span className={'pr-3'}>Mặt bằng</span>

                                </div>
                            </div>
                            <div className="h-auto ">
                                {children}
                            </div>
                        </div>
                        <div className="mx-10 footer-extra">
                            <FooterExtra/>
                        </div>
                    </div>
                </div>
            }
        </>
    )

}

export default DefaultLayout;