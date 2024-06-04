import Footer from "./Footer";
import Header from "./Header";
import {useLocation} from "react-router-dom";
import '../layouts/FooterExtra';
import FooterExtra from "./FooterExtra";
import '../css/defaultLayout.css';
import {useEffect, useState} from "react";


function DefaultLayout ({children})  {
    const location = useLocation();
    const listNameLocation = ['contract','customer','employee','landing'];
    const [locationPresent,setLocationPresent] = useState("");
    const [locationPresent1,setLocationPresent1] = useState("");


    useEffect(() => {
        handleLocation();
    },[location])

    const handleLocation = ()=>{
        const parts = location.pathname.split('/');
        const firstPart = parts[1]; // "employee"
        const secondPart = parts[2]; // "create-employee"
    
        listNameLocation.forEach(e => {
            if(firstPart === e && firstPart === "contract" ){
                setLocationPresent('Hợp đồng')
            }
            if(firstPart === e && firstPart === "customer" ){
                setLocationPresent('Khách hàng')
            }
            if(firstPart === e && firstPart === "employee" ){
                setLocationPresent('Nhân viên')
            }
            if(firstPart === e && firstPart === "landing" ){
                setLocationPresent('Mặt bằng')
            }
        })

       if(secondPart !== undefined){
           if(secondPart !== "" && secondPart.split('-')[0] === "create"){
               setLocationPresent1("Thêm mới")
           }
           if(secondPart !== "" && secondPart.split('-')[0] === "edit"){
               setLocationPresent1("Cập nhật")
           }
           if(secondPart !== "" && secondPart.split('-')[0] === "register"){
               setLocationPresent1("Chi tiết")
           }
       }
    }

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
                                    className="absolute right-0 w-auto bg-gray-200 h-full flex items-center gap-2 justify-center">
                                    <span className={'pl-3'}>Trang chủ</span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                        </svg>
                                    </span>
                                    <span className={`${locationPresent1 === "" ? 'pr-3' : ''}`}>{locationPresent}</span>
                                    {locationPresent1 !== "" ?
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="1.5" stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                                </svg>
                                            </span>
                                        : ""
                                    }
                                    {locationPresent1 !== "" ?
                                        <span className={'pr-3'}>{locationPresent1}</span>
                                        : ""
                                    }

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