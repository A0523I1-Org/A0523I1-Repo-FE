import '../css/home.css'
<<<<<<< HEAD
import '../css/root_common.css'
import {useEffect, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as BuildingService from '../services/BuildingService';
import { toast} from 'react-toastify';
import * as Yup from 'yup';
import {ref,getStorage,getDownloadURL,listAll} from 'firebase/storage';
import {v4} from 'uuid';
import {storage} from "../firebase";



const Home = () => {
    const [listImageHome,setListImageHome] = useState([]);
    const imgRef = ref(storage,"/imageHomePhungPV");
    const formRef = useRef(null);

=======
import {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as LandingService from '../services/LandingService';
import { toast} from 'react-toastify';
import * as Yup from 'yup';
import {Link} from "react-router-dom";


const Home = () => {
    const [listLandingHome,setListLandingHome] = useState([]);
    const [page,setPage] = useState(0);
    const [totalPage,setTotalPage] = useState(0);
    const [objectPlanDisplay ,setObjectPlanDisplay] = useState({});

    //  Đối tượng khai báo để nhận thông tin của khách hàng cần tư vân
>>>>>>> f251697f32330ced84df97760bd60393a2eea290
    const [infoCustomer,setInfoCustomer] = useState({
        nameCustomer : "",
        emailCustomer : "",
        numberPhoneCustomer : "",
        descriptionCustomer : ""
    });

    useEffect(() => {
<<<<<<< HEAD
        listAll(imgRef).then(response => {
            response.items.forEach(item => {
                getDownloadURL(item).then(url => {
                    setListImageHome(urlImg => [...urlImg,url])
                })
            })
        })
    },[]);

=======
        showListLandingHome(page);
        return () => {
            console.log("clear")
        }
    },[page]);

    /**
     * Hiển thị danh sách các landing home dựa trên trang đã cho.
     *
     * @param {number} page Số trang cần hiển thị.
     * @returns {Promise<void>} Một promise được resolve khi danh sách được hiển thị.
     */
    const showListLandingHome = async (page) => {
        // Gọi service để lấy danh sách landing home từ server
        const temp = await LandingService.showListLandingHome(page);


        // Cập nhật tổng số trang
        setTotalPage(temp.totalPages)

        // Cập nhật danh sách landing home
        setListLandingHome(temp.content);

        // Hiển thị kế hoạch đầu tiên từ danh sách
        setObjectPlanDisplay(temp.content[0]);

    }

    /**
     * Schema Yup để kiểm tra thông tin khách hàng.
     *  validate - nameCustomer
     *  validate - emailCustomer
     *  validate - numberPhoneCustomer
     *  nếu có lỗi thì bắt và hiển thị lỗi cho khách hàng
     * @type {object}
     */
>>>>>>> f251697f32330ced84df97760bd60393a2eea290
    const validateInfoCustomer = Yup.object().shape({
        nameCustomer : Yup.string().min(1,"Tên không nhỏ hơn 1 kí tự")
            .max(100,"Tên không lớn hơn 100 kí tự")
            .required("Họ và tên là bắt buộc")
            .matches(/^[^\d`~!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+$/, {
                message: "Tên không được chứa kí tự đặc biệt và số",
<<<<<<< HEAD
                excludeEmptyString: true, // Loại bỏ chuỗi rỗng trước khi kiểm tra
                excludeEmptyArray: true, // Loại bỏ mảng rỗng trước khi kiểm tra
=======
                excludeEmptyString: true,
                excludeEmptyArray: true,
>>>>>>> f251697f32330ced84df97760bd60393a2eea290
            }),
        emailCustomer : Yup.string().matches(/^[A-Z0-9._%+-]+@gmail\.com$/i,"Định dạng email không hợp lệ")
            .required("Email là bắt buộc"),
        numberPhoneCustomer : Yup.string().min(0,"Số điện thoại lớn hơn 0")
            .max(10,"Số điện thoại không lớn hơn 10")
            .matches(/^[0-9]{10}$/, 'Số điện thoại phải gồm 10 chữ số và không nhập chữ')
    })

<<<<<<< HEAD
    const handleChangeInformationCustomer = async (value,{resetForm}) => {
        const infoCustomerSuccess = await BuildingService.SaveInfoCustomerForm(value);
        if(infoCustomerSuccess.status === 200){
            toast.success("Thêm thông tin khách hàng thành công")
            resetForm();

        }
    };

=======
    /**
     * Xử lý sự kiện thay đổi thông tin của khách hàng.
     *
     * @param {object} value Giá trị của thông tin khách hàng.
     * @param {object} resetForm Đối tượng resetForm từ formik để đặt lại giá trị của form sau khi thành công.
     * @returns {Promise<void>} Một promise được resolve khi thông tin khách hàng được lưu thành công.
     */
    const handleChangeInformationCustomer = async (value,{resetForm}) => {
        // Gọi service để lưu thông tin khách hàng vào form
        const infoCustomerSuccess = await LandingService.SaveInfoCustomerForm(value);

        // Nếu lưu thành công, hiển thị thông báo và reset form
        if(infoCustomerSuccess.status === 200){
            toast.success("Thêm thông tin khách hàng thành công")
            resetForm();
        }
    };

    /**
     *
     * Xử lý các mặt bằng hiển thị khi khách hàng lựa chọn
     */
    const handleLandingDisplay = (lading) => {
        setObjectPlanDisplay(lading);
    }

    /**
     * Xử lý sự kiện chuyển đến trang tiếp theo của danh sách landing.
     *
     * @returns {void} Không có giá trị trả về.
     */
    const handleNextPageLanding = () => {
        if(page < totalPage - 1){
            setPage(page + 1);
        }
    }
    const handlePreviousPageLanding = () => {
        if(page > 0){
            setPage(page - 1)
        }
    }

>>>>>>> f251697f32330ced84df97760bd60393a2eea290

    const valueCustomer = {
        handleChangeInformationCustomer,
        infoCustomer,
        setInfoCustomer,
        validateInfoCustomer,
<<<<<<< HEAD
        formRef
    }
    return (
        <>
            <Home_child customer={valueCustomer}/>
        </>
    )
}
const Home_child = ({customer}) => {
    return (
        <>
            <main id="main" className="overflow-hidden">
                <Home_child_introduce_company_xls/>
                <Home_child_introduce_service_xls />
                <Home_child_introduce_landing_xls/>
                <Home_child_introduce_event_xls/>
                <Home_child_introduce_enterprise_xls/>
                <Home_child_authentication/>
                <Home_child_form customer={customer}/>
            </main>
        </>
    )
}
// Component giới thiệu công ty
const Home_child_introduce_company_xls = () => {
    return (
        <>
            <div
                className="mt-10 h-auto mx-16 max-xl:mx-0 max-sm:w-full max-sm:mx-[-30px] main__part1_title flex flex-col  items-center justify-center text-center relative">
                <div className="absolute z-0 animation__m1__right"></div>
                <div className="absolute  z-0 left-0 animation__m1__left max-sm:z-0"></div>

                <div className="main__part1__distance max-lg:w-[600px]">
                    <h1><span className="max-lg:text-3xl max-sm:text-4xl">Công ty XLS</span></h1>
                </div>
                <div className="main__part1__distance max-xl:w-[600px] z-0 ">
                    <p>Công ty XLS là một trong những đơn vị hàng đầu trong lĩnh vực bất động sản và cho thuê mặt bằng
                        tại Việt
                        Nam. Với kinh nghiệm dày dặn và đội ngũ chuyên viên chuyên nghiệp, XLS cam kết mang đến cho
                        khách hàng
                        những giải pháp tối ưu và toàn diện nhất. Chúng tôi cung cấp một danh mục đa dạng các loại hình
                        bất động
                        sản cho thuê, từ văn phòng, cửa hàng, đến nhà kho và khu công nghiệp, đáp ứng mọi nhu cầu kinh
                        doanh của
                        quý khách</p>
                </div>
                <button className="w-[119px] h-12 bg-white rounded-[40px] button-animation"><span>Bắt đầu</span></button>

                <div className="absolute  max-md:block hidden w-[400px] h-[400px] border-[1px] right-[-500px] rotate-45 bg-white z-10  menu-animation">
                    <div className="w-full h-full  top-[-100px] flex flex-col rotate-[-45deg] text-center pt-[70px]  gap-3 ml-10">
                        <div className="w-1/3 h-[40px] py-2 bg-[#eee] relative">
                            <a className="menu__item menu__item__active">Trang chủ</a>
                            <div className="triangle absolute left-[-19px] top-[-5px] rotate-[-45deg]"></div>
                        </div>
                        <div className="w-3/6 h-[40px] py-2 bg-[#eee] relative ml-[-50px]">
                            <a className="menu__item inline-flex items-center pl-8">
                                Quản trị - hệ thống
                                <span className="ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth="1.5"
                                         stroke="currentColor" className="w-3.5 h-3.5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                                    </svg>
                                </span>
                            </a>
                            <div className="triangle absolute left-[-19px] top-[-5px] rotate-[-45deg]"></div>
                        </div>

                        <div className="w-3/6 h-[40px] py-2 bg-[#eee] relative ml-[-50px] ">
                            <a className="menu__item w-1/3 py-2  pl-8">Sự kiện - Giới thiệu</a>
                            <div className="triangle absolute left-[-19px] top-[16px] rotate-[-135deg]"></div>
                        </div>
                        <div className="w-1/3 h-[40px] py-2 bg-[#eee] relative  ">
                            <a className="menu__item w-1/3 py-2 ">Liên hệ</a>

                            <div className="triangle absolute left-[-19px] top-[16px] rotate-[-135deg]"></div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
// Component giới thiệu dịch vụ
const Home_child_introduce_service_xls = () => {
    return (
        <>
            <div className=" w-full h-[800px] max-sm:h-[1020px] my-[100px] relative bg-[#F2F5F4] ">
                <h1 className="text-6xl h-1/6 py-5 text-center max-sm:h-[150px] max-sm:text-5xl max-sm:py-5">Dịch
                    vụ</h1>
                <div className="h-5/6  mx-40 max-2xl:mx-30 max-xl:mx-20 max-lg:mx-2 flex  flex-col">
                    <div className="w-full h-1/2  flex max-sm:grid max-sm:grid-cols-2">
                        <div className="w-1/3 h-full max-sm:w-full">
                            <img src="/img/Screenshot%202024-05-10%20181045.png"
                                 className="w-full h-full object-cover" alt={""}/>
                        </div>
                        <div className="w-1/3 h-full max-sm:w-full max-sm:px-2">
                            <h1 className="text-3xl max-lg:text-2xl text-center pt-12 max-xl:pt-0 px-10 max-xl:px-0">Tư
                                vấn bất động
                                sản</h1>
                            <p className="pt-5 max-xl:pt-5 px-10 max-xl:px-6 max-lg:px-2">Nhóm của chúng tôi cung cấp
                                các dịch vụ tư vấn bất động sản toàn diện để giúp khách hàng đưa ra quyết định sáng suốt về khoản đầu tư của họ. Chúng tôi phân tích xu hướng thị trường,
                                đánh giá tài sản và cung cấp hướng dẫn chuyên môn để giúp khách hàng đạt được mục tiêu tài sản
                                của họ.</p>
                        </div>
                        <div className="w-1/3 h-full max-sm:hidden">
                            <img src="/img/Screenshot%202024-05-10%20181035.png"
                                 className="w-full h-full object-cover" alt={""}/>
                        </div>
                    </div>
                    <div className="w-full h-1/2  flex max-sm:grid max-sm:grid-cols-2 ">
                        <div className="w-1/3 h-full max-sm:w-full ">
                            <h1 className="text-3xl max-lg:text-2xl text-center pt-16 max-xl:pt-5 px-10 max-xl:px-0">Cho
                                thuê không
                                gian</h1>
                            <p className="pt-5 px-10 max-xl:px-5 max-lg:px-5">Chúng tôi cung cấp nhiều loại bất động sản
                                cho thuê,
                                bao gồm cả không gian thương mại và dân cư. Đội ngũ của chúng tôi cung cấp hướng dẫn
                                chuyên
                                môn để giúp khách hàng tìm được không gian hoàn hảo cho nhu cầu của họ.</p>
                        </div>
                        <div className="w-1/3 h-full  max-sm:w-full">
                            <img src="/img/Screenshot%202024-05-10%20181002.png"
                                 className="w-full h-full object-cover" alt={""}/>

                        </div>
                        <div className="w-1/3 h-full max-sm:hidden ">
                            <h1 className="text-3xl max-lg:text-2xl text-center pt-16 max-xl:pt-5  px-10 max-xl:px-0">Giới
                                thiệu địa
                                điểm</h1>
                            <p className="pt-5 px-10 max-xl:px-5 max-lg:px-5">Chúng tôi cung cấp thông tin chi tiết về các địa điểm khác nhau,
                                bao gồm nhân khẩu học, xu hướng thị trường và tiềm năng phát triển. Nhóm của chúng tôi
                                giúp khách hàng đưa ra quyết định sáng suốt về đầu tư bất động sản của họ dựa trên thông tin
                                này.
                            </p>
                        </div>
                    </div>
                    <div
                        className="h-5/6 hidden  mx-40 max-2xl:mx-30 max-xl:mx-20 max-lg:mx-2 flex max-sm:block flex-col">
                        <div className="w-full h-1/2  flex max-sm:grid max-sm:grid-cols-2">
                            <div className="w-1/3 h-full max-sm:w-full">
                                <img src="/img/Screenshot%202024-05-10%20181035.png"
                                     className="w-full h-full object-cover" alt={""}/>
                            </div>
                            <div className="w-1/3 h-full max-sm:w-full max-sm:px-2">
                                <h1 className="text-3xl max-lg:text-2xl text-center pt-16 max-xl:pt-5  px-10 max-xl:px-0">Giới
                                    thiệu
                                    địa điểm</h1>
                                <p className="pt-5 px-10 max-xl:px-5 max-lg:px-5">Chúng tôi cung cấp thông tin chi tiết
                                    về các địa
                                    điểm khác nhau,
                                    bao gồm nhân khẩu học, xu hướng thị trường và tiềm năng phát triển. Nhóm của chúng
                                    tôi
                                    giúp khách hàng đưa ra quyết định sáng suốt về đầu tư bất động sản của họ dựa trên
                                    thông tin
                                    này.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// Component giới thiệu mặt bằng hiện có
const Home_child_introduce_landing_xls = () => {
    return (
        <>
            <div className=" h-auto mt-10 max-sm:mt-0 mr-32 max-md:mr-0 max-lg:mr-5
            max-xl:mr-20 max-2xl:mr-30 bg-red-500 flex gap-5 max-sm:gap-1 max-md:flex-col">
                <div className="w-1/2 max-md:w-full h-full bg-red-500">
                    <div className="h-[250px] bg-yellow-500 m-10 "></div>
                    <div className="h-[100px] bg-yellow-500 m-10 flex gap-3">
                        <div className="w-1/4 h-full bg-black"></div>
                        <div className="w-1/4 h-full bg-black"></div>
                        <div className="w-1/4 h-full bg-black"></div>
                        <div className="w-1/4 h-full bg-black"></div>
                    </div>
                </div>
                <div className="w-1/2 max-sm:w-full max-md:w-full h-full bg-red-500">
                    <h1 className="text-4xl m-10 max-sm:my-1 ">Tiêu đề mặt bằng</h1>
                    <div className="m-10 bg-blue-500">
                        <p className="py-3">Diện tích : 100m </p>
                        <p className="py-3">Địa điểm : Tầng 5</p>
                        <p className="py-3">Chú thích : </p>
                    </div>
                    <button
                        className="absolute max-md:hidden w-[119px]  h-12 bg-[#2f2b36] rounded-[40px] flex items-center mx-10 justify-center mr-[20px] ">
                        <span className="text-white">
                            Tiếp tục
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

// Component giới thiệu các sự kiện xảy ra
const Home_child_introduce_event_xls = () => {

    return (
        <>
=======
    }

    const valueLanding = {
        handleNextPageLanding,
        handlePreviousPageLanding,
        handleLandingDisplay,
        listLandingHome,
        page,
        totalPage,
        objectPlanDisplay,
    }


    return (
        <>
            <Home_child customer={valueCustomer} landing={valueLanding} />
        </>
    )
}
const Home_child = ({customer,landing,isNavigation}) => {
    return (
        <>
            <main id="main" className="w-full h-auto relative overflow-hidden">
                <Home_child_introduce_company_xls/>
                <Home_child_introduce_service_xls />
                <Home_child_introduce_landing_xls landing={landing}/>
                <Home_child_introduce_event_xls/>
                <Home_child_introduce_enterprise_xls/>
                <Home_child_authentication/>
                <Home_child_form customer={customer}/>
            </main>
        </>
    )
}
// Component giới thiệu công ty
const Home_child_introduce_company_xls = () => {
    return (
        <>
            <div
                className="mt-10 h-auto bg-main mx-16 max-xl:mx-0 max-sm:w-full max-sm:mx-[-30px] main__part1_title flex flex-col  items-center justify-center text-center relative">
                <div className="absolute z-0 animation__m1__right"></div>
                <div className="absolute  z-0 left-0 animation__m1__left max-sm:z-0"></div>

                <div className="main__part1__distance max-lg:w-[600px]">
                    <h1><span className="max-lg:text-[50px] max-sm:text-4xl">Công ty XLS</span></h1>
                </div>
                <div className="main__part1__distance max-xl:w-[600px] z-0 ">
                    <p>Công ty XLS là một trong những đơn vị hàng đầu trong lĩnh vực bất động sản và cho thuê mặt bằng
                        tại Việt
                        Nam. Với kinh nghiệm dày dặn và đội ngũ chuyên viên chuyên nghiệp, XLS cam kết mang đến cho
                        khách hàng
                        những giải pháp tối ưu và toàn diện nhất. Chúng tôi cung cấp một danh mục đa dạng các loại hình
                        bất động
                        sản cho thuê, từ văn phòng, cửa hàng, đến nhà kho và khu công nghiệp, đáp ứng mọi nhu cầu kinh
                        doanh của
                        quý khách</p>
                </div>
                <button className="w-[119px] h-12 bg-white rounded-[40px] hover:text-white hover:bg-[#2f2b36]"><span>Bắt đầu</span></button>
            </div>
        </>
    )
}

// Component giới thiệu dịch vụ
const Home_child_introduce_service_xls = () => {
    return (
        <>
            <div className=" w-full h-[800px] max-sm:h-[1020px] my-[100px] relative bg-[#F2F5F4] z-30">
                <h1 className="text-6xl h-1/6 py-5 text-center max-sm:h-[150px] max-sm:text-5xl max-sm:py-5">Dịch
                    vụ</h1>
                <div className="h-5/6  mx-40 max-2xl:mx-30 max-xl:mx-20 max-lg:mx-2 flex  flex-col">
                    <div className="w-full h-1/2  flex max-sm:grid max-sm:grid-cols-2">
                        <div className="w-1/3 h-full max-sm:w-full">
                            <img src="/img/Screenshot%202024-05-10%20181045.png"
                                 className="w-full h-full object-cover" alt={""}/>
                        </div>
                        <div className="w-1/3 h-full max-sm:w-full max-sm:px-2">
                            <h1 className="text-3xl max-lg:text-2xl text-center pt-12 max-xl:pt-0 px-10 max-xl:px-0">Tư
                                vấn bất động
                                sản</h1>
                            <p className="pt-5 max-xl:pt-5 px-10 max-xl:px-6 max-lg:px-2">Nhóm của chúng tôi cung cấp
                                các dịch vụ tư vấn bất động sản toàn diện để giúp khách hàng đưa ra quyết định sáng suốt
                                về khoản đầu tư của họ. Chúng tôi phân tích xu hướng thị trường,
                                đánh giá tài sản và cung cấp hướng dẫn chuyên môn để giúp khách hàng đạt được mục tiêu
                                tài sản
                                của họ.</p>
                        </div>
                        <div className="w-1/3 h-full max-sm:hidden">
                            <img src="/img/Screenshot%202024-05-10%20181035.png"
                                 className="w-full h-full object-cover" alt={""}/>
                        </div>
                    </div>
                    <div className="w-full h-1/2  flex max-sm:grid max-sm:grid-cols-2 ">
                        <div className="w-1/3 h-full max-sm:w-full ">
                            <h1 className="text-3xl max-lg:text-2xl text-center pt-16 max-xl:pt-5 px-10 max-xl:px-0">Cho
                                thuê không
                                gian</h1>
                            <p className="pt-5 px-10 max-xl:px-5 max-lg:px-5">Chúng tôi cung cấp nhiều loại bất động sản
                                cho thuê,
                                bao gồm cả không gian thương mại và dân cư. Đội ngũ của chúng tôi cung cấp hướng dẫn
                                chuyên
                                môn để giúp khách hàng tìm được không gian hoàn hảo cho nhu cầu của họ.</p>
                        </div>
                        <div className="w-1/3 h-full  max-sm:w-full">
                            <img src="/img/Screenshot%202024-05-10%20181002.png"
                                 className="w-full h-full object-cover" alt={""}/>

                        </div>
                        <div className="w-1/3 h-full max-sm:hidden ">
                            <h1 className="text-3xl max-lg:text-2xl text-center pt-16 max-xl:pt-5  px-10 max-xl:px-0">Giới
                                thiệu địa
                                điểm</h1>
                            <p className="pt-5 px-10 max-xl:px-5 max-lg:px-5">Chúng tôi cung cấp thông tin chi tiết về
                                các địa điểm khác nhau,
                                bao gồm nhân khẩu học, xu hướng thị trường và tiềm năng phát triển. Nhóm của chúng tôi
                                giúp khách hàng đưa ra quyết định sáng suốt về đầu tư bất động sản của họ dựa trên thông
                                tin
                                này.
                            </p>
                        </div>
                    </div>
                    <div
                        className="h-5/6 hidden  mx-40 max-2xl:mx-30 max-xl:mx-20 max-lg:mx-2 flex max-sm:block flex-col">
                        <div className="w-full h-1/2  flex max-sm:grid max-sm:grid-cols-2">
                            <div className="w-1/3 h-full max-sm:w-full">
                                <img src="/img/Screenshot%202024-05-10%20181035.png"
                                     className="w-full h-full object-cover" alt={""}/>
                            </div>
                            <div className="w-1/3 h-full max-sm:w-full max-sm:px-2">
                                <h1 className="text-3xl max-lg:text-2xl text-center pt-16 max-xl:pt-5  px-10 max-xl:px-0">Giới
                                    thiệu
                                    địa điểm</h1>
                                <p className="pt-5 px-10 max-xl:px-5 max-lg:px-5">Chúng tôi cung cấp thông tin chi tiết
                                    về các địa
                                    điểm khác nhau,
                                    bao gồm nhân khẩu học, xu hướng thị trường và tiềm năng phát triển. Nhóm của chúng
                                    tôi
                                    giúp khách hàng đưa ra quyết định sáng suốt về đầu tư bất động sản của họ dựa trên
                                    thông tin
                                    này.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// Component giới thiệu mặt bằng hiện có
const Home_child_introduce_landing_xls = ({landing}) => {
    console.log(landing.listLandingHome)
    return (
        <>
            <div className=" h-auto mt-10 max-sm:mt-0 mr-32 max-md:mr-0 max-lg:mr-5
            max-xl:mr-20 max-2xl:mr-30  flex gap-5 max-sm:gap-1 max-md:flex-col ">
                <div className="w-1/2 max-md:w-full h-full bg-[#F2F5F4] ">
                    <div className="h-[250px] m-10 flex relative overflow-hidden">
                        <div
                            className={`w-full h-full absolute left-0 duration-300 transition-all`}>
                            <img className={"w-full h-full object-cover"} src={landing.objectPlanDisplay.firebaseUrl}
                                 alt=""/>
                        </div>
                    </div>
                    <div className="h-[100px]  m-10 flex gap-3">
                        {landing.listLandingHome.map((landings, index) => (
                            <div className={"w-1/4 h-full"} key={index}>
                                <button onClick={() => landing.handleLandingDisplay(landings)} className="w-full h-full ">
                                <img className={"w-full h-full object-cover rounded-[5px]"} src={landings.firebaseUrl} alt=""/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/2 max-sm:w-full max-md:w-full h-full bg-[#F2F5F4] ">
                    <h1 className="text-4xl m-10 max-sm:my-1 ">Mặt bằng {landing.objectPlanDisplay.id}</h1>
                    <div className="m-10">
                        <p className="py-3">Diện tích : {landing.objectPlanDisplay.area} <span className={'px-5'}>Thể Loại : {landing.objectPlanDisplay.type}</span></p>
                        <p className="py-3">Phí quản lý : {landing.objectPlanDisplay.feeManager}</p>
                        <p className="py-3">Chú thích : {landing.objectPlanDisplay.description}</p>
                    </div>
                    <div className=" h-10 flex gap-5 mx-10  mb-10">
                        <button
                            onClick={landing.handleNextPageLanding}
                            className=" w-[60px] h-10 bg-[#2f2b36] rounded-[5px]" style={(landing.page + 1 === landing.totalPage) ? {display : 'none'} : {display : 'block'}}>
                            <span className="text-white flex items-center justify-center ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                     stroke="currentColor" className="size-6">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                                </svg>
                            </span>
                        </button>
                        <button
                            onClick={landing.handlePreviousPageLanding}
                            className="w-[60px] h-10 bg-[#2f2b36] rounded-[5px]" style={landing.page === 0 ? {display : 'none'} : {display : 'block'}}>
                            <span className="text-white flex items-center justify-center ">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                   stroke="currentColor" className="size-6">
                                  <path strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

// Component giới thiệu các sự kiện xảy ra
const Home_child_introduce_event_xls = () => {

    return (
        <>
>>>>>>> f251697f32330ced84df97760bd60393a2eea290
            <div className="h-auto mx-18 my-10 bg-[#f7f7f7]">
                <div className="mx-32 max-lg:mx-10">
                    <div className="font_2 my-10">
                        <h2 className="max-sm:text-4xl max-lg:text-3xl max-sm:pt-5">Sự kiện</h2>
                    </div>
                    <div
                        className="flex max-md:grid max-md:grid-cols-1 max-lg:grid max-lg:grid-cols-2 justify-between py-10 max-xl:gap-5 max-2xl:gap-5 ">
                        <div
                            className="w-[400px] max-md:w-full max-md:h-[320px] max-lg:w-[360px] h-auto bg-white border-[1px] rounded-[20px] border-[#2f2b36]">
                            <h3 className="font-bold px-6 py-6 ">Tổ chức công ty</h3>
                            <div className="max-md:flex">
                                <div className="px-6 h-[220px] max-md:w-1/2 max-md:h-2/3 ">
                                    <img src='/img/hinh-anh-van-phong-cong-ty-rigup-2.jpg' alt=""
                                         className="w-full h-full rounded-[15px] object-cover"/>
                                </div>
                                <div className="max-md:w-1/2 ">
                                    <h4 className="px-6 pt-6 pb-3 text-2xl font-normal max-md:py-0 max-sm:text-xl">Sự
                                        kiện công
                                        ty</h4>
                                    <p className="px-6 pt-3 pb-6 max-md:text-[15px] max-md:px-1 max-sm:text-[14.5px] max-md:px-0">Sự
                                        kiện văn phòng là các hoạt động được tổ chức trong môi trường công việc nhằm
                                        tạo ra sự gắn kết và nâng cao tinh thần làm việc của nhân viên. Sự kiện này có
                                        thể bao
                                        gồm tiệc liên hoan, buổi đào tạo, hội thảo, hoạt động<span
                                            className="hidden max-sm:inline-block">...</span> <span
                                            className="max-sm:hidden">xây dựng đội nhóm hoặc các cuộc thi vui nhộn.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="w-[400px]  max-md:w-full max-md:h-[320px] max-lg:w-[360px] h-auto bg-white border-[1px] rounded-[20px] border-[#2f2b36]">
                            <h3 className="font-bold px-6 py-6">Văn Phòng</h3>
                            <div className="max-md:flex">
                                <div className="px-6 h-[220px] max-md:w-1/2 max-md:h-2/3">
                                    <img src="/img/03.jpg" alt=""
                                         className="w-full h-full rounded-[15px] object-cover"/>
                                </div>
                                <div className="max-md:w-1/2 ">
                                    <h4 className="px-6 pt-6 pb-3 text-2xl font-normal max-md:py-0 max-sm:text-xl max-sm:px-0">Sự
                                        kiện văn phòng</h4>
                                    <p className="px-6 pt-3 pb-6 max-md:text-[15px] max-sm:text-[14.5px] max-md:px-0">Sự
                                        kiện công
                                        ty là các hoạt động được tổ chức bởi các doanh nghiệp thúc đẩy tinh thần làm
                                        việc,
                                        tăng cường mối liên hệ giữa các nhân viên và củng cố văn hóa doanh nghiệp.
                                        Những sự kiện này có thể bao gồm tiệc cuối năm, hội nghị, hội thảo,<span
                                            className="hidden max-sm:inline-block">...</span>
                                        <span className="max-sm:hidden">hoạt động xây dựng nhóm, các buổi đào tạo và phát triển kỹ năng.</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div
                            className="w-[400px] max-md:w-full max-md:h-[320px] max-lg:w-[360px] h-auto bg-white border-[1px] rounded-[20px] border-[#2f2b36]">
                            <h3 className="font-bold px-6 py-6">Phòng học</h3>
                            <div className="max-md:flex">
                                <div className="px-6 h-[220px] max-md:w-1/2 max-md:h-2/3 ">
                                    <img src="/img/mau-thiet-ke-phong-hoc-tai-nha-chuan-dep-15.jpg" alt=""
                                         className="w-full h-full rounded-[15px] object-cover"/>
                                </div>
                                <div className="max-md:w-1/2">
                                    <h4 className="px-6 pt-6 pb-3 text-2xl font-normal max-md:py-0 max-sm:text-xl max-sm:px-0">Sự
                                        kiện phòng học</h4>
                                    <p className="px-6 pt-3 pb-6 max-md:text-[15px] max-md:px-1 max-sm:text-[14.5px] max-md:px-0">
                                        Sự kiện phòng học thường diễn ra trong môi trường giáo dục, như trường học,
                                        trung tâm
                                        đào tạo hoặc các lớp học ngắn hạn.
                                        Những sự kiện này có thể là buổi học chuyên đề, hội thảo học thuật, cuộc thi,
                                        hoạt động
                                        ngoại khóa <span className="hidden max-sm:inline-block">...</span> <span
                                        className="max-sm:hidden">hoặc buổi thuyết trình của các chuyên gia.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="w-[400px] hidden max-lg:block    max-md:w-full max-md:h-[320px] max-lg:w-[360px] h-auto bg-white border-[1px] rounded-[20px] border-[#2f2b36]">
                            <h3 className="font-bold px-6 py-6">Sự kiên</h3>
                            <div className="max-md:flex">
                                <div className="px-6 h-[220px] max-md:w-1/2 max-md:h-2/3 ">
                                    <img src="/img/821A0929.jpg" alt=""
                                         className="w-full h-full rounded-[15px] object-cover"/>
                                </div>
                                <div className="max-md:w-1/2">
                                    <h4 className="px-6 pt-6 pb-3 text-2xl font-normal max-md:py-0 max-sm:text-xl max-sm:px-0">Không
                                        gian sự kiên</h4>
                                    <p className="px-6 pt-3 pb-6 max-md:text-[15px] max-md:px-1 max-sm:text-[14.5px] max-md:px-0">
                                        Sự kiện phòng học thường diễn ra trong môi trường giáo dục, như trường học,
                                        trung tâm
                                        đào tạo hoặc các lớp học ngắn hạn.
                                        Những sự kiện này có thể là buổi học chuyên đề, hội thảo học thuật, cuộc thi,
                                        hoạt động
                                        ngoại khóa <span className="hidden max-sm:inline-block">...</span> <span
                                        className="max-sm:hidden">hoặc buổi thuyết trình của các chuyên gia.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// Component giới thiệu về các doạn nghiệp liên kết
const Home_child_introduce_enterprise_xls = () => {
    return (
        <>
            <div className="h-auto mx-18 my-10 ">
                <div className="mx-32 max-lg:mx-10 max-sm:mx-0">
                    <div className=" mt-10">
                        <h2 className="font_2 max-sm:text-4xl max-sm:mx-10">Doanh nghiệp</h2>
                        <p className="w-2/3 py-2 max-sm:w-full max-sm:mx-10">Chúng tôi , công ty xls với sự uy tín được
                            xây dựng từ các điều cơ
                            bản đến nâng cao
                            đã mang lại những giá trị chung cho toàn khách hàng, đó là yếu tố nhận được sự tin tưởng từ
                            các công
                            ty khác khi đã đặt niềm tin liên kết với chúng tôi.</p>
                    </div>
                    <div className="flex justify-between py-10">
                        <div className=" h-[150px] bg-white w-full">
                            <div
                                className="h-[150px] max-sm:h-[300px]  max-sm:grid max-sm:grid-cols-3 max-sm:gap-3 bg-[#F2F5F4] flex gap-5 items-center justify-center">
                          <span className="max-sm:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor"
                                 className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                            </svg>
                          </span>
                                <div
                                    className="w-[165px] h-[110px] max-sm:mx-1.5 flex items-center bg-white relative border-[0.5px]">
                                    <img src="/img/20201016153855-fa63-removebg-preview.png"
                                         className="absolute w-full h-full object-container"/>
                                </div>
                                <div className="w-[165px] h-[110px] flex items-center bg-white relative border-[0.5px]">
                                    <img src="/img/20210315115758-8278.jpg"
                                         className="absolute w-full h-full object-container"/>
                                </div>
                                <div
                                    className="w-[165px] h-[110px] max-sm:mx-[-6px] f flex items-center bg-white relative border-[0.5px]">
                                    <img src="/img/20220627161209-e035-removebg-preview.png"
                                         className="absolute w-full h-full object-container"/>
                                </div>
                                <div
                                    className="w-[165px] h-[110px] max-sm:mx-1.5 flex items-center bg-white relative border-[0.5px]">
                                    <img src="/img/20220125113950-181d.jpg"
                                         className="absolute w-full h-full object-container"/>
                                </div>
                                <div className="w-[165px] h-[110px] flex items-center bg-white relative border-[0.5px]">
                                    <img src="/img/20231013170445-bb13_wm-removebg-preview.png"
                                         className="absolute w-full h-full object-container"/>
                                </div>
                                <div
                                    className="w-[165px] h-[110px] max-sm:mx-[-6px] flex items-center bg-white relative border-[0.5px]">
                                    <img src="/img/20220818133706-50e7_wm.jpg"
                                         className="absolute w-full h-full object-container"/>
                                </div>
                                <span className="max-sm:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor"
                             className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                        </svg>
                    </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// Component lời chứng thực
const Home_child_authentication = () => {

    return (
        <>
            <div className="h-auto mx-18 max-sm:my-32 my-10 bg-[#f7f7f7]">
                <div className="mx-32 max-lg:mx-10">
                    <div className="font_2 my-10 max-lg:my-5 max-sm:pt-5">
                        <h2>Lời chứng thực</h2>
                    </div>
                    <div className="flex max-md:flex-col justify-between py-10 max-xl:gap-5 max-2xl:gap-5 max-lg:gap-3">
                        <div
                            className="w-[400px] h-[250px] max-sm:h-[200px]  max-md:w-full max-md:h-[180px] max-lg:w-[440px] max-2xl:h-[275px]  max-xl:h-[300px]  bg-white border-[1px] rounded-[20px] border-[#2f2b36]">
                            <p className="py-6 px-4  max-lg:py-3  ">
                                XLS Consulting đã giúp tôi tìm được không gian văn phòng hoàn hảo cho doanh nghiệp của
                                mình.
                                Nhóm của họ đã cung cấp hướng dẫn chuyên môn và khiến toàn bộ quá trình trở nên liền
                                mạch,tạo nên sự an toàn tuyệt đối.
                            </p>
                            <div className="flex items-center px-4 ">
                                <img src="/img/nen-mac-quan-ao-gi-khi-di-phong-van-news-80.jpg" alt=""
                                     className="border-2  rounded-full w-[70px] h-[70px] max-lg:w-[45px] max-lg:h-[45px] max-2xl:w-[60px] max-2xl:h-[60px] max-xl:w-[50px] max-xl:h-[50px]"/>
<<<<<<< HEAD
                                    <p className="px-4 text-yellow-800">Nguyễn Hoàng Nam </p>
=======
                                <p className="px-4 text-yellow-800">Nguyễn Hoàng Nam </p>
>>>>>>> f251697f32330ced84df97760bd60393a2eea290
                            </div>
                        </div>
                        <div
                            className="w-[400px] h-[250px] max-sm:h-[200px] max-md:w-full max-md:h-[180px] max-lg:w-[440px] max-2xl:h-[275px] max-xl:h-[300px] bg-white border-[1px] rounded-[20px] border-[#2f2b36]">
                            <p className="py-6 px-4  max-lg:py-3">
                                Dịch vụ tư vấn bất động sản tại XLS Consulting rất có giá trị. Nhóm của họ đã cung cấp
                                phân
                                tích chi tiết và giúp tôi đưa ra quyết định sáng suốt về khoản đầu tư bất động sản của
                                mình
                                , luôn tin tưởng XLS.
                            </p>
                            <div className="flex items-center px-4 ">
                                <img src="/img/hinh-anh-dep-ve-co-giao_015649501.jpg" alt=""
                                     className="border-2 rounded-full w-[70px] h-[70px] max-lg:w-[45px] max-lg:h-[45px] max-2xl:w-[60px] max-2xl:h-[60px] max-xl:w-[50px] max-xl:h-[50px]"/>
<<<<<<< HEAD
                                    <p className="px-4 text-yellow-800">Trương Lan Trinh</p>
=======
                                <p className="px-4 text-yellow-800">Trương Lan Trinh</p>
>>>>>>> f251697f32330ced84df97760bd60393a2eea290
                            </div>
                        </div>
                        <div
                            className="w-[400px] h-[250px] max-sm:h-[200px] max-md:w-full max-md:h-[180px] max-lg:w-[440px] max-2xl:h-[275px] max-xl:h-[300px] bg-white border-[1px] rounded-[20px] border-[#2f2b36]">
                            <p className="py-6 px-4  max-lg:py-3   ">
                                XLS Consulting đã cung cấp cho tôi thông tin chi tiết về các địa điểm khác nhau, giúp
                                tôi
                                đưa ra quyết định đúng đắn cho doanh nghiệp của mình. Đội ngũ của họ rất chuyên nghiệp
                                và
                                hiểu biết, và tôi đánh giá cao dịch vụ của họ
                            </p>
                            <div className="flex items-center px-4 ">
                                <img
                                    src="/img/pngtree-portrait-of-beautiful-women-in-suits-at-workplace-picture-image_1557470.jpg"
                                    alt=""
                                    className="border-2 rounded-full  w-[70px] h-[70px] max-lg:w-[45px] max-lg:h-[45px] max-2xl:w-[60px] max-2xl:h-[60px]  max-xl:w-[50px] max-xl:h-[50px]"/>
<<<<<<< HEAD
                                    <p className="px-4 text-yellow-800">Ngọc Lê </p>
=======
                                <p className="px-4 text-yellow-800">Ngọc Lê </p>
>>>>>>> f251697f32330ced84df97760bd60393a2eea290
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Home_child_form = ({customer}) => {

    return (
        <>
<<<<<<< HEAD
            <div className="h-auto mx-18 my-10 bg-[#f7f7f7] flex items-center max-sm:flex-col max-sm:mx-0 ">
=======
            <div id={"#heading-lh"} className="h-auto mx-18 my-10 bg-[#f7f7f7] flex items-center max-sm:flex-col max-sm:mx-0 ">
>>>>>>> f251697f32330ced84df97760bd60393a2eea290
                <div className="ml-32 h-full w-1/3 max-lg:ml-10  max-sm:w-full ">
                    <h3 className="font_2 max-sm:py-5 max-sm:mx-10">Đăng kí thông tin</h3>
                    <p className="max-sm:mx-10">Đây là không gian để chia sẻ thông tin liên hệ của doanh nghiệp. Hãy cho
                        mọi
                        người biết khi nào
                        doanh nghiệp sẵn sàng, mất bao lâu để nhận được phản hồi và cách tốt nhất để liên hệ. Nhắc nhở
                        người
                        đọc rằng doanh nghiệp sẵn lòng trả lời các câu hỏi của họ và khuyến khích họ liên hệ.</p>
                </div>

                <div className=" h-full w-2/3 max-lg:w-2/3 ml-32 max-lg:ml-10 max-sm:ml-0 max-sm:w-full">
                    <div className="w-[640px] max-lg:w-[450px] max-sm:w-full max-sm:px-3 my-10 h-full bg-white ">
                        <Formik
                            initialValues={customer.infoCustomer}
                            onSubmit={customer.handleChangeInformationCustomer}
                            validationSchema={customer.validateInfoCustomer}
                        >
                            {({
                                  resetForm
                              }) => (
                                <Form  className={"w-full h-full flex flex-col justify-between form-action"}>
                                    <div className="h-[115px] px-10 pt-10 ">
                                        <p className="pl-1 py-2 text-sm">Họ và tên <span className="text-red-500">*</span></p>
                                        <Field type="text" name={'nameCustomer'}  className="w-full h-[45px] border rounded-[5px] pl-3" required/>
                                        <ErrorMessage name={"nameCustomer"} component={"p"} className={"text-red-500 text-[10px] pt-2 pl-2"}/>
                                    </div>
                                    <div className="h-[115px] px-10 pt-6">
                                        <p className="pl-1 py-2 text-sm">Email <span className="text-red-500">*</span></p>
                                        <Field type="text" name={'emailCustomer'}  className="w-full h-[45px] border rounded-[5px] pl-3" required/>
                                        <ErrorMessage name={"emailCustomer"} component={"p"} className={"text-red-500 text-[10px] pt-2 pl-2"}/>

                                    </div>
                                    <div className="h-[115px] px-10 pt-2.5">
                                        <p className="pl-1 py-2 text-sm">Số điện thoại <span className="text-red-500">*</span>
                                        </p>
                                        <Field type="text" name="numberPhoneCustomer" className="w-full h-[45px] border rounded-[5px] pl-3" required/>
                                        <ErrorMessage name={'numberPhoneCustomer'} component={"p"} className={"text-red-500 text-[10px] pt-2 pl-2"}/>

                                    </div>
                                    <div className="h-[115px] px-10 ">
                                        <p className="pl-1 py-2 text-sm">Chú thích</p>
                                        <Field as={"textarea"} name={'descriptionCustomer'} className="w-full border rounded-[5px] h-[80px] pl-3">
                                        </Field>
                                    </div>
                                    <div className="h-[115px] px-10 pt-10 ">
                                        <button type={"submit"} className="bg-[#2f2b36] w-full h-[40px] rounded-[15px] text-white">Đăng kí
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Home;