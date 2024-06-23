/*
import "../../css/employee/createemployee.css"
import React, {useEffect, useState} from 'react'
import {storage} from "./firebaseConfig"
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {useNavigate} from 'react-router-dom'
import {Field, ErrorMessage, Form, Formik} from 'formik'
import * as Yup from 'yup'

import * as departmentService from "../../services/DepartmentService"
import * as salaryRankService from "../../services/SalaryRankService"
import * as employeeService from "../../services/EmployeeService"

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// CROP IMAGE
import Modal from 'react-modal'
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage"


const CreateEmployee = () => {
    const [form, setForm] = useState(
        {
            code: "",
            name: "",
            dob: "",
            gender: "male",
            address: "",
            phone: "",
            email: "",
            workDate: "",
            firebaseUrl: "",
            department: 1,
            salaryRank: 1
        }
    )
    const [departments, setDepartments] = useState([])
    const [salaryRanks, setSalaryRanks] = useState([])
    const navigate = useNavigate();

    const [avatar, setAvatar] = useState();
    const [previewAvatar, setPreviewAvatar] = useState()
    const [isOpenModal, setIsOpenModal] = useState(false);
// CROP IMAGE
    const [image, setImage] = React.useState(null);
    const [croppedArea, setCroppedArea] = React.useState(null);
    const [crop, setCrop] = React.useState({x: 0, y: 0});
    const [zoom, setZoom] = React.useState(1);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };
    const afterCrop = async () => {
        const blob = await getCroppedImg(image, croppedArea);
        const previewUrl = window.URL.createObjectURL(blob);
        setPreviewAvatar(previewUrl);
        setIsOpenModal(false)
        setAvatar(blob)
    };

    /!*    useEffect(() => {
            return () => {
                previewAvatar && URL.revokeObjectURL(previewAvatar)
            }
        }, [previewAvatar])*!/
    const cancelCrop = () => {
        setIsOpenModal(false)
    }
    useEffect(() => {
        getDepartments();
        getSalaryRanks();
    }, [])
    const getDepartments = async () => {
        let temp = await departmentService.getAllDepartments();
        setDepartments(temp)
    }
    const getSalaryRanks = async () => {
        let temp = await salaryRankService.getAllSalaryRanks();
        setSalaryRanks(temp)
    }


    const handleChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener("load", () => {
                setImage(reader.result);
            });
            setIsOpenModal(true)
        }
    }
    const submit = (values) => {
        if (avatar) {
            const storageRef = ref(storage, `/avatar/${Date.now()}.jpeg`);
            const uploadTask = uploadBytesResumable(storageRef, avatar);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                () => {
                    toast.warning("Đã xãy ra lỗi trong quá trình tải ảnh lên fire base !")
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        values.firebaseUrl = url;
                        employeeService.addEmployee(values).then((success) => {
                            if (success) {
                                toast.success("Thêm mới nhân viên thành công.")
                                navigate("/employee")
                            } else {
                                toast.warning("Đã xãy ra lỗi trong quá trình thêm mới !")
                                navigate("/employee/create-employee")
                            }
                        })
                    });
                }
            );
        }
    }
    const selectAvatar = () => {
        document.getElementById('upload_avt').click();
    }
    const validate = {
        name: Yup.string().required("Vui lòng nhập tên nhân viên !")
            .max(100, "Họ và tên không được quá 100 ký tự !")
            .min(5, "Họ và tên không được ít hơn 5 ký tự !")
            .matches(/^[A-ZÀ-Ỹ][a-zà-ỹ]+(\s[A-ZÀ-Ỹ][a-zà-ỹ]+)+$/
                , "Họ và tên không được chứa ký tự đặc biệt và viết hoa chữ cái đầu tiên !"),
        dob: Yup.date().required("Vui lòng nhập ngày sinh của nhân viên !")
            .max(new Date(), "Ngày sinh phải là một ngày trong quá khứ !")
            .test('dob', 'Nhân viên phải trên 18 tuổi !',
                function (value, ctx) {
                    const valid = new Date().getFullYear() - new Date(value).getFullYear();
                    if (valid > 18) {
                        return true;
                    } else if (valid === 18) {
                        const compareMonth = new Date().getMonth() - new Date(value).getMonth();
                        if (compareMonth > 0) {
                            return true;
                        } else if (compareMonth === 0) {
                            const compareDate = new Date().getDate() - new Date(value).getDate();
                            if (compareDate >= 0) {
                                return true
                            }
                        }
                    }
                    return ctx.createError();
                }),
        phone: Yup.string().required("Vui lòng nhập số điện thoại nhân viên !")
            .matches(/^0\d{9}$/, "Số điện thoại bao gồm 10 chữ số bắt đầu bằng số 0 !"),
        email: Yup.string().required("Vui lòng nhập email !")
            .matches(/^[a-zA-Z0-9._]+@gmail.com$/, "Email không đúng định dạng: *********@gmail.com !"),
        workDate: Yup.date().required("Vui lòng nhập vào làm !"),
        address: Yup.string().required("Vui lòng nhập địa chỉ nhân  viên !")
        // firebaseUrl: Yup.string().required("Vui lòng chọn ảnh nhân viên !")

    }
    return (
        <div id="ce_main" className="shadow-inner">
            <Formik initialValues={form} onSubmit={submit} validationSchema={Yup.object(validate)}>
                {({errors, touched}) => (
                    <Form className="flex flex-wrap justify-center p-8 size-full">
                        <Field hidden name="firebaseUrl"/>
                        <Field hidden name="code"/>
                        <div className="w-full flex flex-wrap justify-around">
                            <div className="w-full md:w-1/4 lg:w-1/4 p-0 flex justify-center">
                                <img
                                    className="rounded-full bg-white transition duration-300 ease-in-out transform hover:shadow-lg hover:brightness-75 cursor-pointer w-20 h-20 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 p-0.5"
                                    src={previewAvatar ? previewAvatar : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"}
                                    alt="avatar" onClick={selectAvatar}/><br/>
                                {
                                    !previewAvatar && (
                                        <span className="mt-1 text-sm text-red-600 dark:text-red-500 p-1 errorMessage">
                                            Vui lòng chọn anhr nhân viên !
                                </span>
                                    )
                                }
                                <input type="file" hidden id="upload_avt" accept="image/!*"
                                       onChange={handleChange}/>
                            </div>
                            <div className="w-full md:w-3/4 lg:w-3/4 p-0 flex justify-center items-center">
                                <h1 className="font-bold text-center text-4xl">THÊM MỚI NHÂN VIÊN VĂN
                                    PHÒNG</h1>
                            </div>

                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="name"
                                   className="block mt-2 text-sm font-medium p-1">Họ và tên (<span
                                className="text-red-500">*</span>)</label>
                            <Field
                                className={`w-full block border text-sm rounded-lg p-2 ${touched.name ? (errors.name ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                id="name" name="name"/>

                            <ErrorMessage name="name" component="span"
                                          className="mt-1 text-sm text-red-600 dark:text-red-500 p-1 errorMessage"/>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="dob"
                                   className="block mt-2 text-sm font-medium p-1">Ngày sinh (<span
                                className="text-red-500">*</span>)</label>
                            <Field type="date"
                                   className={`w-full block border text-sm rounded-lg p-2 ${touched.dob ? (errors.dob ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                   id="dob" name="dob"/>

                            <ErrorMessage name="dob" component="span"
                                          className="mt-1 text-sm text-red-600 dark:text-red-500 p-1 errorMessage"/>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label className="block mt-2 text-sm font-medium p-1">Giới tính</label>
                            <div>
                                <div className="inline-flex items-center mr-4">
                                    <Field
                                        type="radio"
                                        name="gender"
                                        id="male"
                                        value="male"
                                        className="form-check-input"
                                        checked
                                    />
                                    <label htmlFor="male" className="ml-2">
                                        Nam
                                    </label>
                                </div>
                                <div className="inline-flex items-center mr-4">
                                    <Field
                                        type="radio"
                                        name="gender"
                                        id="female"
                                        value="female"
                                        className="form-check-input"
                                    />
                                    <label htmlFor="female" className="ml-2">
                                        Nữ
                                    </label>
                                </div>
                                <div className="inline-flex items-center">
                                    <Field
                                        type="radio"
                                        name="gender"
                                        id="other"
                                        value="other"
                                        className="form-check-input"
                                    />
                                    <label htmlFor="other" className="ml-2">
                                        Khác
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="phone"
                                   className="block mt-2 text-sm font-medium p-1">Điện thoại (<span
                                className="text-red-500">*</span>)</label>
                            <Field
                                className={`w-full block border text-sm rounded-lg p-2 ${touched.phone ? (errors.phone ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                id="phone" name="phone"/>

                            <ErrorMessage name="phone" component="span"
                                          className="mt-1 text-sm text-red-600 dark:text-red-500 p-1 errorMessage"/>
                        </div>

                        <div className="w-full md:w-full lg:w-1/3 p-2">
                            <label htmlFor="address"
                                   className="block mt-2 text-sm font-medium p-1">Địa chỉ (<span
                                className="text-red-500">*</span>)</label>
                            <Field
                                className={`w-full block border text-sm rounded-lg p-2 ${touched.address ? (errors.address ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                id="address" name="address"/>

                            <ErrorMessage name="address" component="span"
                                          className="mt-1 text-sm text-red-600 dark:text-red-500 p-1 errorMessage"/>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="email"
                                   className="block mt-2 text-sm font-medium p-1">Email (<span
                                className="text-red-500">*</span>)</label>
                            <Field
                                className={`w-full block border text-sm rounded-lg p-2 ${touched.email ? (errors.email ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                id="email" name="email" placeholder="********@gmail.com"/>

                            <ErrorMessage name="email" component="span"
                                          className="mt-1 text-sm text-red-600 dark:text-red-500 p-1 errorMessage"/>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="department"
                                   className="block mt-2 text-sm font-medium p-1">Bộ phận</label>
                            <Field component="select"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                   id="department"
                                   name="department">
                                {
                                    departments.map(dep => (
                                        <option key={dep.id} value={dep.id}>{dep.name}</option>
                                    ))
                                }
                            </Field>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="salaryRank"
                                   className="block mt-2 text-sm font-medium p-1">Cấp bậc lương</label>
                            <Field component="select"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                   id="salaryRank"
                                   name="salaryRank">
                                {
                                    salaryRanks.map(rank => (
                                        <option key={rank.id} value={rank.id}>{rank.salaryRank}</option>
                                    ))
                                }
                            </Field>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="workDate"
                                   className="block mt-2 text-sm font-medium p-1">Ngày vào làm (<span
                                className="text-red-500">*</span>)</label>
                            <Field type="date"
                                   className={`w-full block border text-sm rounded-lg p-2 ${touched.workDate ? (errors.workDate ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                   id="workDate" name="workDate"/>

                            <ErrorMessage name="workDate" component="span"
                                          className="mt-1 text-sm text-red-600 dark:text-red-500 p-1 errorMessage"/>
                        </div>

                        <div className="w-full flex flex-wrap mt-5">
                            <div
                                className="w-full sm:w-1/2 lg:w-1/2 p-2 flex justify-start items-center space-x-2"> <span>
                                <i className="fa-solid fa-bullhorn fa-shake fa-lg"/>
                            </span>
                                <span
                                    className="text-red-500"> Lưu ý: Bạn phải nhập đầy đủ các ô được đánh dấu (*)</span>
                            </div>
                            <div className="w-full sm:w-1/2 lg:w-1/2 p-2 flex justify-end items-center space-x-2">
                                <button className="btn" style={{background: "#4CAF50", marginRight: "8px"}}
                                        type={"submit"}>
                                    <span><i className="fi fi-rs-disk"/></span>
                                    <span> Lưu</span>
                                </button>
                                <button type={"reset"} className="btn btn-primary" style={{background: "#2196e3"}}
                                        onClick={() => {
                                            setPreviewAvatar(null);
                                            setAvatar(null)
                                        }}>
                                    <span><i className="fi fi-rr-eraser"/></span>
                                    <span> Làm mới</span>
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <Modal
                isOpen={isOpenModal}
                onRequestClose={() => {
                    setIsOpenModal(false)
                }}
                contentLabel="Example Modal"
                // ariaHideApp={false}
                id="ce_modal"
            >
                <div className='container'>
                    <div className='container-cropper'>
                        {image ? (
                            <>
                                <div className='cropper'>
                                    <Cropper
                                        image={image}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={1}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={onCropComplete}
                                    />
                                </div>

                                <div hidden>
                                    {/!*   <Slider
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        value={zoom}
                                        onChange={(e, zoom) => setZoom(zoom)}
                                    />*!/}
                                    <input className="slider"
                                           type="range"
                                           min={1}
                                           max={3}
                                           step={0.1}
                                           value={zoom}
                                           onChange={(e, zoom) => setZoom(zoom)}
                                    />
                                </div>
                            </>
                        ) : null}
                    </div>
                    <div className="md:w-1/2 justify-center">
                        <button className="btn" style={{background: "#4CAF50", marginRight: "8px"}}
                                onClick={afterCrop}>
                            <span> Crop</span>
                        </button>
                        <button className="btn btn-primary" style={{background: "#2196e3"}}
                                onClick={cancelCrop}>
                            Cancel
                        </button>
                    </div>
                </div>

            </Modal>
        </div>
    )
}
export default CreateEmployee;*/

import "../../css/employee/createemployee.css"
import React, {useEffect, useState} from 'react'
import {storage} from "./firebaseConfig"
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {useNavigate} from 'react-router-dom'
import {Field, ErrorMessage, Form, Formik} from 'formik'
import * as Yup from 'yup'

import * as departmentService from "../../services/DepartmentService"
import * as salaryRankService from "../../services/SalaryRankService"
import * as employeeService from "../../services/EmployeeService"

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// CROP IMAGE
import Modal from 'react-modal'
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage"


const CreateEmployee = () => {
    const [form, setForm] = useState(
        {
            code: "",
            name: "",
            dob: "",
            gender: "male",
            address: "",
            phone: "",
            email: "",
            workDate: "",
            firebaseUrl: "",
            department: 1,
            salaryRank: 1
        }
    )
    const [departments, setDepartments] = useState([])
    const [salaryRanks, setSalaryRanks] = useState([])
    const navigate = useNavigate();

    const [avatar, setAvatar] = useState();
    const [previewAvatar, setPreviewAvatar] = useState()
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [avatarMessage, setAvatarMessage] = useState("")
    const [percentUpload, setPercentUpload] = useState(0)

// CROP IMAGE
    const [image, setImage] = React.useState(null);
    const [croppedArea, setCroppedArea] = React.useState(null);
    const [crop, setCrop] = React.useState({x: 0, y: 0});
    const [zoom, setZoom] = React.useState(1);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };
    const afterCrop = async () => {
        const blob = await getCroppedImg(image, croppedArea);
        const previewUrl = window.URL.createObjectURL(blob);
        setPreviewAvatar(previewUrl);
        setIsOpenModal(false)
        setAvatar(blob)
        setAvatarMessage("")
    };
// clear previewAvatar
    useEffect(() => {
        return () => {
            previewAvatar && URL.revokeObjectURL(previewAvatar)
        }
    }, [previewAvatar])
    const cancelCrop = () => {
        setIsOpenModal(false)
    }
    useEffect(() => {
        getDepartments();
        getSalaryRanks();
    }, [])
    const getDepartments = async () => {
        let temp = await departmentService.getAllDepartments();
        setDepartments(temp)
    }
    const getSalaryRanks = async () => {
        let temp = await salaryRankService.getAllSalaryRanks();
        setSalaryRanks(temp)
    }


    const handleChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener("load", () => {
                setImage(reader.result);
            });
            setIsOpenModal(true)
        }
    }
    const submit = (values) => {
        if (avatar) {
            const storageRef = ref(storage, `/avatar/${Date.now()}.jpeg`);
            const uploadTask = uploadBytesResumable(storageRef, avatar);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setPercentUpload((prevState => {
                        return prevState +1;
                    }))
                },
                () => {
                    toast.warning("Đã xãy ra lỗi trong quá trình tải ảnh lên fire base !")
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        values.firebaseUrl = url;
                        employeeService.addEmployee(values).then((success) => {
                            if (success) {
                                toast.success("Thêm mới nhân viên thành công.")
                                navigate("/employee")
                            } else {
                                toast.warning("Đã xãy ra lỗi trong quá trình thêm mới !")
                                navigate("/employee/create-employee")
                            }
                        })
                    });
                }
            );
        }
    }

    const checkAvatar = () => {
        if (!previewAvatar || !avatar) {
            setAvatarMessage("Vui lòng chọn ảnh cho nhân viên !")
        } else {
            setAvatarMessage("")
        }
    }
    const selectAvatar = () => {
        document.getElementById('upload_avt').click();
    }
    const validate = {
        name: Yup.string().required("Vui lòng nhập tên nhân viên !")
            .max(100, "Họ và tên không được quá 100 ký tự !")
            .min(5, "Họ và tên không được ít hơn 5 ký tự !")
            .matches(/^[A-ZÀ-Ỹ][a-zà-ỹ]+(\s[A-ZÀ-Ỹ][a-zà-ỹ]+)+$/
                , "Họ và tên không được chứa ký tự đặc biệt và viết hoa chữ cái đầu tiên !"),
        dob: Yup.date().required("Vui lòng nhập ngày sinh của nhân viên !")
            .max(new Date(), "Ngày sinh phải là một ngày trong quá khứ !")
            .test('dob', 'Nhân viên phải trên 18 tuổi !',
                function (value, ctx) {
                    const valid = new Date().getFullYear() - new Date(value).getFullYear();
                    if (valid > 18) {
                        return true;
                    } else if (valid === 18) {
                        const compareMonth = new Date().getMonth() - new Date(value).getMonth();
                        if (compareMonth > 0) {
                            return true;
                        } else if (compareMonth === 0) {
                            const compareDate = new Date().getDate() - new Date(value).getDate();
                            if (compareDate >= 0) {
                                return true
                            }
                        }
                    }
                    return ctx.createError();
                }),
        phone: Yup.string().required("Vui lòng nhập số điện thoại nhân viên !")
            .matches(/^0\d{9}$/, "Số điện thoại bao gồm 10 chữ số bắt đầu bằng số 0 !"),
        email: Yup.string().required("Vui lòng nhập email !")
            .matches(/^[a-zA-Z0-9._]+@gmail.com$/, "Email không đúng định dạng: *********@gmail.com !"),
        workDate: Yup.date().required("Vui lòng nhập ngày vào làm của nhân viên !")
            .test('workDate', 'Ngày vào làm chỉ được trước hoặc sau 1 tháng kể từ ngày làm hồ sơ !',
                function (value, ctx) {
                    const today = new Date();
                    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
                    const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

                    if (value < startDate || value > endDate) {
                        return ctx.createError();
                    }
                    return true;
                }),
        address: Yup.string().required("Vui lòng nhập địa chỉ nhân  viên !")

    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: "60%",
            height: "80%",
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            justifyContent: "center",
            borderRadius: "20px"
        },
    };
    return (
        <div id="ce_main" className="shadow-inner">
            {
                percentUpload > 0 && (
                    <span className="text-center w-full">
                        Uploading: {percentUpload} %
                    </span>)
            }
            <Formik initialValues={form} onSubmit={submit} validationSchema={Yup.object(validate)}>
                {({errors, touched}) => (
                    <Form className="flex flex-wrap justify-center p-8 size-full">
                        <div className="w-full flex flex-wrap justify-center">
                            <div className="w-full md:w-2/3 lg:w-2/3 p-0 flex justify-end items-center">
                                <span className="font-bold text-4xl text-center">THÊM MỚI NHÂN VIÊN VĂN
                                    PHÒNG</span>
                            </div>

                            <div className="w-full md:w-1/3 lg:w-1/3 p-0 flex flex-wrap justify-center items-center">
                                <div className="w-full flex justify-center">
                                    <img
                                        className="rounded-full bg-white transition duration-300 ease-in-out transform hover:shadow-lg hover:brightness-75 cursor-pointer w-20 h-20 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 p-0.5"
                                        src={previewAvatar ? previewAvatar : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"}
                                        alt="avatar" onClick={selectAvatar}/>
                                </div>
                                <br/>
                                <div className="w-full flex justify-center">
                                    <span
                                        className="errorMessage text-sm text-red-600 dark:text-red-500 p-0">{avatarMessage}</span>
                                </div>
                            </div>
                        </div>
                        <input type="file" hidden id="upload_avt" accept="image/!*"
                               onChange={handleChange}/>

                        <Field hidden name="firebaseUrl"/>

                        <Field hidden name="code"/>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="name"
                                   className="block mt-2 text-sm font-medium p-1">Họ và tên (<span
                                className="text-red-500">*</span>)</label>
                            <Field
                                className={`w-full block border text-sm rounded-lg p-2 ${touched.name ? (errors.name ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                id="name" name="name"/>

                            <ErrorMessage name="name" component="span"
                                          className="mt-1 text-sm text-red-600 dark:text-red-500 p-1 errorMessage"/>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="dob"
                                   className="block mt-2 text-sm font-medium p-1">Ngày sinh (<span
                                className="text-red-500">*</span>)</label>
                            <Field type="date"
                                   className={`w-full block border text-sm rounded-lg p-2 ${touched.dob ? (errors.dob ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                   id="dob" name="dob"/>

                            <ErrorMessage name="dob" component="span"
                                          className="mt-1 text-sm text-red-600 dark:text-red-500 p-1 errorMessage"/>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label className="block mt-2 text-sm font-medium p-1">Giới tính</label>
                            <div>
                                <div className="inline-flex items-center mr-4">
                                    <Field
                                        type="radio"
                                        name="gender"
                                        id="male"
                                        value="male"
                                        className="form-check-input"
                                        checked
                                    />
                                    <label htmlFor="male" className="ml-2">
                                        Nam
                                    </label>
                                </div>
                                <div className="inline-flex items-center mr-4">
                                    <Field
                                        type="radio"
                                        name="gender"
                                        id="female"
                                        value="female"
                                        className="form-check-input"
                                    />
                                    <label htmlFor="female" className="ml-2">
                                        Nữ
                                    </label>
                                </div>
                                <div className="inline-flex items-center">
                                    <Field
                                        type="radio"
                                        name="gender"
                                        id="other"
                                        value="other"
                                        className="form-check-input"
                                    />
                                    <label htmlFor="other" className="ml-2">
                                        Khác
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="phone"
                                   className="block mt-2 text-sm font-medium p-1">Điện thoại (<span
                                className="text-red-500">*</span>)</label>
                            <Field
                                className={`w-full block border text-sm rounded-lg p-2 ${touched.phone ? (errors.phone ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                id="phone" name="phone"/>

                            <ErrorMessage name="phone" component="span"
                                          className="mt-1 text-sm text-red-600 dark:text-red-500 p-1 errorMessage"/>
                        </div>

                        <div className="w-full md:w-full lg:w-1/3 p-2">
                            <label htmlFor="address"
                                   className="block mt-2 text-sm font-medium p-1">Địa chỉ (<span
                                className="text-red-500">*</span>)</label>
                            <Field
                                className={`w-full block border text-sm rounded-lg p-2 ${touched.address ? (errors.address ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                id="address" name="address"/>

                            <ErrorMessage name="address" component="span"
                                          className="mt-1 text-sm text-red-600 dark:text-red-500 p-1 errorMessage"/>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="email"
                                   className="block mt-2 text-sm font-medium p-1">Email (<span
                                className="text-red-500">*</span>)</label>
                            <Field
                                className={`w-full block border text-sm rounded-lg p-2 ${touched.email ? (errors.email ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                id="email" name="email" placeholder="********@gmail.com"/>

                            <ErrorMessage name="email" component="span"
                                          className="mt-1 text-sm text-red-600 dark:text-red-500 p-1 errorMessage"/>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="department"
                                   className="block mt-2 text-sm font-medium p-1">Bộ phận</label>
                            <Field component="select"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                   id="department"
                                   name="department">
                                {
                                    departments.map(dep => (
                                        <option key={dep.id} value={dep.id}>{dep.name}</option>
                                    ))
                                }
                            </Field>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="salaryRank"
                                   className="block mt-2 text-sm font-medium p-1">Cấp bậc lương</label>
                            <Field component="select"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                   id="salaryRank"
                                   name="salaryRank">
                                {
                                    salaryRanks.map(rank => (
                                        <option key={rank.id} value={rank.id}>{rank.salaryRank}</option>
                                    ))
                                }
                            </Field>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="workDate"
                                   className="block mt-2 text-sm font-medium p-1">Ngày vào làm (<span
                                className="text-red-500">*</span>)</label>
                            <Field type="date"
                                   className={`w-full block border text-sm rounded-lg p-2 ${touched.workDate ? (errors.workDate ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                   id="workDate" name="workDate"/>

                            <ErrorMessage name="workDate" component="span"
                                          className="mt-1 text-sm text-red-600 dark:text-red-500 p-1 errorMessage"/>
                        </div>

                        <div className="w-full flex flex-wrap mt-5">
                            <div
                                className="w-full sm:w-1/2 lg:w-1/2 p-2 flex justify-start items-center space-x-2"> <span>
                                <i className="fa-solid fa-bullhorn fa-shake fa-lg"/>
                            </span>
                                <span
                                    className="text-red-500"> Lưu ý: Bạn phải nhập đầy đủ các ô được đánh dấu (*)</span>
                            </div>
                            <div className="w-full sm:w-1/2 lg:w-1/2 p-2 flex justify-end items-center space-x-2">
                                <button onClick={checkAvatar} className="btn"
                                        style={{background: "#4CAF50", marginRight: "8px"}}
                                        type={"submit"}>
                                    <span><i className="fi fi-rs-disk"/></span>
                                    <span> Lưu</span>
                                </button>
                                <button type={"reset"} className="btn btn-primary" style={{background: "#2196e3"}}
                                        onClick={() => {
                                            setPreviewAvatar(null);
                                            setAvatar(null)
                                            setAvatarMessage("")
                                        }}>
                                    <span><i className="fi fi-rr-eraser"/></span>
                                    <span> Làm mới</span>
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <Modal
                isOpen={isOpenModal}
                onRequestClose={() => {
                    setIsOpenModal(false)
                }}
                style={customStyles}
                contentLabel="Example Modal"
                id="ce_modal"
            >
                <div className='container-cropper'>
                    {image ? (
                        <>
                            <div className='cropper'>
                                <Cropper
                                    image={image}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                            </div>
                            <div hidden>
                                {/*                      <Slider
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        value={zoom}
                                        onChange={(e, zoom) => setZoom(zoom)}
                                    />*/}
                                <input className="slider"
                                       type="range"
                                       min={1}
                                       max={3}
                                       step={0.1}
                                       value={zoom}
                                       onChange={(e, zoom) => setZoom(zoom)}
                                />
                            </div>
                        </>
                    ) : null}
                </div>
                <div className="flex justify-center">
                    <button className="btn" style={{background: "#4CAF50", marginRight: "8px"}}
                            onClick={afterCrop}>
                        <span> Crop</span>
                    </button>
                    <button className="btn btn-primary" style={{background: "#2196e3"}}
                            onClick={cancelCrop}>
                        Cancel
                    </button>
                </div>

            </Modal>
        </div>
    )
}
export default CreateEmployee;