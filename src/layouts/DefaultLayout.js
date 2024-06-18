import Footer from "./Footer"
import Header from "./Header"
import {useLocation} from "react-router-dom";
import '../layouts/FooterExtra';
import FooterExtra from "./FooterExtra";
import '../css/defaultLayout.css';


function DefaultLayout ({children})  {
    const location = useLocation();

    return (
        <>
            {location.pathname === "/"
                ?
                <div className={"overflow-hidden w-full h-auto  relative"}>
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
<<<<<<< HEAD
                        <div className="mx-10 mt-5">
                            <FooterExtra nameLocation={location.pathname}/>
                            <div className="h-auto mt-5 bg-red-500">
=======
                        <div  className="mx-10 overflow-auto mt-5 ">
                            
                            <div className="w-full h-[40px]  relative">
                                <div className="absolute py-2 left-0 top-2.5">
                                    <FooterExtra nameLocation={location.pathname.trim()}/>
                                </div>
                                <div className="absolute right-0 w-auto bg-gray-200 h-full flex items-center gap-2 justify-center">
                                    <span className={'pl-3 text-yellow-600'}>Trang chủ</span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                        </svg>
                                    </span>
                                    <span className={`${locationPresentOperation === "" ? 'pr-3' : ''}`}>{locationPresent}</span>
                                    {locationPresentOperation !== "" ?
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="1.5" stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                                </svg>
                                            </span>
                                        : ""
                                    }
                                    {locationPresentOperation !== "" ?
                                        <span className={'pr-3'}>{locationPresentOperation}</span>
                                        : ""
                                    }

                                </div>
                            </div>

                            <div className="h-auto mt-5 ">
>>>>>>> List/CreateContract-HoaiNT
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default DefaultLayout;