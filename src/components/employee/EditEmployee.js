import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import * as authService from "../../services/Authenticate/AuthService"
import * as employeeService from "../../services/EmployeeService"
import {useNavigate} from "react-router-dom";
import * as departmentService from "../../services/DepartmentService";
import * as salaryRankService from "../../services/SalaryRankService";
import getCroppedImg from "./utils/CropImage";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../configs/fireBaseConfig"
import {toast} from "react-toastify";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Modal from "react-modal";
import Cropper from "react-easy-crop";

const EditEmployee = () => {
    const token = authService.getToken();
    const {id} = useParams();
    const [form, setForm] = useState()
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
    const [existEmail, setExistEmail] = useState([])


    useEffect(() => {
        getDepartments();
        getSalaryRanks();
    }, [])
    useEffect(() => {
        if (form && form.email && form.email !== "") {
            getExistEmail()
        }
    }, [form])

    useEffect(()=> {
        getEmployeeUpdate();
    }, [id])


    const getEmployeeUpdate = async () => {
        let temp = await employeeService.getEmployeeUpdate(id, token);
        if (temp === null) {
            navigate("/employee")
            // toast.warning("Nhân viên này không còn tồn tại nữa !")
        }else {
            setForm({
                id: temp.id,
                code: temp.code,
                name: temp.name,
                dob: temp.dob.split('T')[0],
                gender: temp.gender,
                address: temp.address,
                phone: temp.phone,
                email: temp.email,
                workDate: temp.workDate.split('T')[0],
                firebaseUrl: temp.firebaseUrl,
                department: temp.department,
                salaryRank: temp.salaryRank
            })
            if (temp && temp.firebaseUrl) {
                setPreviewAvatar(temp.firebaseUrl)
            }
        }
    }
    const getDepartments = async () => {
        let temp = await departmentService.getAllDepartments(token);
        setDepartments(temp)
    }
    const getSalaryRanks = async () => {
        let temp = await salaryRankService.getAllSalaryRanks(token);
        setSalaryRanks(temp)
    }
    const getExistEmail = async () => {
        const allEmail = (await employeeService.getAllExistEmail(token)).filter(email => email !== form.email);
        setExistEmail(allEmail)
    }
    // clear previewAvatar
    useEffect(() => {
        return () => {
            previewAvatar && URL.revokeObjectURL(previewAvatar)
        }
    }, [previewAvatar])


    const handleChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            if (!file.type.startsWith('image/')) {
                setAvatarMessage("Chỉ được chọn file ảnh !")
                return
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener("load", () => {
                setImage(reader.result);
            });
            setIsOpenModal(true)
        }
    }

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };
    const afterCrop = async () => {
        const blob = await getCroppedImg(image, croppedArea);
        const previewUrl = window.URL.createObjectURL(blob);
        setPreviewAvatar(previewUrl);
        // Đóng modal
        setIsOpenModal(false)
        setAvatar(blob)
        setAvatarMessage("")
    };
    const cancelCrop = () => {
        setImage(null)
        setIsOpenModal(false)
    }
    const checkAvatar = () => {
        if (!previewAvatar) {
            setAvatarMessage("Vui lòng chọn ảnh cho nhân viên !")
        } else {
            setAvatarMessage("")
        }
    }
    const selectAvatar = () => {
        document.getElementById('upload_avt').click();
    }

    function convertNameAvatar(text) {
        return text.trim().toLowerCase()
            .replace(/\s+/g, '_')
            .normalize('NFD')             // Chuẩn hóa Unicode về dạng NFD
            .replace(/[\u0300-\u036f]/g, ''); // Loại bỏ dấu thanh
    }

    const submit = (values) => {
        if (avatar) {
            if (avatar.size > 2 * 1024 * 1024) {
                setAvatarMessage("Ảnh không được quá 500 Kb !")
                return;
            }
            const nameFile = convertNameAvatar(values.name) + "_" + values.dob + "_" + Date.now();
            const storageRef = ref(storage, `/employee_avatar/${nameFile}.jpeg`);
            const uploadTask = uploadBytesResumable(storageRef, avatar);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setPercentUpload(percent)
                },
                () => {
                    toast.warning("Đã xãy ra lỗi trong quá trình tải ảnh lên fire base !")
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        values.firebaseUrl = url;
                        employeeService.updateEmployee(values, token).then((success) => {
                            if (success) {
                                toast.success("Cập nhật thành công.")
                                navigate("/employee")
                            } else {
                                toast.warning("Đã xãy ra lỗi trong quá trình cập nhật !")
                                navigate("/employee")
                            }
                        })
                    });
                }
            );
        } else {
            employeeService.updateEmployee(values, token).then((success) => {
                if (success) {
                    toast.success("Cập nhật thành công.")
                    navigate("/employee")
                } else {
                    toast.warning("Đã xãy ra lỗi trong quá trình cập nhật !")
                    navigate("/employee")
                }
            })
        }
    }

    const validate = {
        name: Yup.string().required("Vui lòng nhập tên nhân viên !")
            .max(100, "Tên nhân viên không được dài quá 100 ký tự !")
            .min(5, "Tên nhân viên không được ngắn hơn 5 ký tự !")
            .matches(/^[A-ZÀ-Ỹ][a-zà-ỹ]+(\s[A-ZÀ-Ỹ][a-zà-ỹ]+)+$/
                , "Tên nhân viên không chứa ký tự đặc biệt và viết hoa chữ cái đầu tiên !"),
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
                })
            .test('dob', "Tuổi không được quá 120 !",
                function (value, ctx) {
                    const valid = new Date().getFullYear() - new Date(value).getFullYear();
                    if (valid < 120) {
                        return true;
                    } else if (valid === 120) {
                        const compareMonth = new Date().getMonth() - new Date(value).getMonth();
                        if (compareMonth < 0) {
                            return true;
                        } else if (compareMonth === 0) {
                            const compareDate = new Date().getDate() - new Date(value).getDate();
                            if (compareDate <= 0) {
                                return true
                            }
                        }
                    }
                    return ctx.createError();
                }),
        phone: Yup.string().required("Vui lòng nhập số điện thoại nhân viên !")
            .matches(/^0\d{9}$/, "Số điện thoại bao gồm 10 chữ số bắt đầu bằng số 0 !"),
        email: Yup.string().required("Vui lòng nhập email !")
            .matches(/^[a-zA-Z0-9._]+@gmail\.com$/, "Email không đúng định dạng: *********@gmail.com !")
            .test('email', 'Email đã tồn tại!', function (value) {
                return !existEmail.includes(value);
            })
        ,
        workDate: Yup.date().required("Vui lòng nhập ngày vào làm của nhân viên !"),
        address: Yup.string().required("Vui lòng nhập địa chỉ nhân  viên !")
            .max(500, "Địa chỉ không được dài quá 500 ký tự !")
            .min(5, "Địa chỉ không được ngắn hơn 5 ký tự !")

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
            borderRadius: "20px",
            backgroundColor: "lightblue"
        },
    };
    if (!form) {
        return null;
    }
    return (
        <div id="ce_main" className="shadow-inner">
            {
                percentUpload > 0 && percentUpload < 100 && (
                    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75"
                         aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex items-start">
                            <div className="mx-auto mt-0 text-center">
                                <div role="status" className="flex justify-center">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"/>
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"/>
                                    </svg>
                                    <span className="ml-2">Loading...{percentUpload} %</span>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }
            <Formik initialValues={form} onSubmit={submit} validationSchema={Yup.object(validate)}>
                {({errors, touched}) => (
                    <Form className="flex flex-wrap justify-center p-8 size-full">
                        <div className="w-full flex flex-wrap justify-center">
                            <div className="w-full md:w-2/3 lg:w-2/3 p-0 flex justify-end items-center">
                                <span className="font-bold text-4xl text-center p-2 font-mono">CẬP NHẬT THÔNG TIN NHÂN VIÊN VĂN
                                    PHÒNG</span>
                            </div>

                            <div
                                className="w-full md:w-1/3 lg:w-1/3 p-0 flex flex-wrap justify-center items-center mt-3">
                                <div className="w-full flex justify-center">
                                    <img
                                        className="rounded-full bg-white transition duration-300 ease-in-out transform hover:shadow-lg hover:brightness-75 cursor-pointer w-20 h-20 rounded-full ring-2 ring-gray-300 p-0.5"
                                        src={previewAvatar ? previewAvatar : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"}
                                        alt="avatar" onClick={selectAvatar}/>
                                </div>
                                <br/>
                                <div className="w-full flex justify-center">
                                    <span
                                        className="errorMessage text-sm text-red-600 p-0">{avatarMessage}</span>
                                </div>
                            </div>
                        </div>
                        <input type="file" hidden id="upload_avt" accept="image/!*"
                               onChange={handleChange}/>

                        <Field hidden name="firebaseUrl"/>

                        <Field hidden name="code"/>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="name"
                                   className="block mt-2 text-sm font-medium p-1"><i className="fa-regular fa-user"/> Họ
                                và tên (<span
                                    className="text-red-500">*</span>)</label>
                            <Field
                                className={`w-full block border text-sm rounded-lg p-2 ${touched.name ? (errors.name ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                id="name" name="name"/>

                            <ErrorMessage name="name" component="span"
                                          className="text-sm text-red-600 errorMessage ml-2"/>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="dob"
                                   className="block mt-2 text-sm font-medium p-1"><i
                                className="fa-solid fa-cake-candles"/> Ngày sinh (<span
                                className="text-red-500">*</span>)</label>
                            <Field type="date"
                                   className={`w-full block border text-sm rounded-lg p-2 ${touched.dob ? (errors.dob ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                   id="dob" name="dob"/>

                            <ErrorMessage name="dob" component="span"
                                          className="text-sm text-red-600 errorMessage ml-2"/>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label className="block mt-2 text-sm font-medium p-1"><i
                                className="fa-solid fa-venus-mars"/> Giới tính</label>
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
                                   className="block mt-2 text-sm font-medium p-1"><i
                                className="fa-solid fa-phone"/> Điện thoại (<span
                                className="text-red-500">*</span>)</label>
                            <Field
                                className={`w-full block border text-sm rounded-lg p-2 ${touched.phone ? (errors.phone ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                id="phone" name="phone" placeholder="0xxx-xxx-xxx"/>

                            <ErrorMessage name="phone" component="span"
                                          className="text-sm text-red-600 errorMessage ml-2"/>
                        </div>

                        <div className="w-full md:w-full lg:w-1/3 p-2">
                            <label htmlFor="address"
                                   className="block mt-2 text-sm font-medium p-1"><i
                                className="fa-solid fa-map-location-dot"/> Địa chỉ (<span
                                className="text-red-500">*</span>)</label>
                            <Field
                                className={`w-full block border text-sm rounded-lg p-2 ${touched.address ? (errors.address ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                id="address" name="address"
                                placeholder="Thôn..., xã..., huyện..., tỉnh.../Số... đường..., phường..., quận..., TP..."/>

                            <ErrorMessage name="address" component="span"
                                          className="text-sm text-red-600 errorMessage ml-2"/>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="email"
                                   className="block mt-2 text-sm font-medium p-1"><i
                                className="fa-solid fa-envelope"/> Email (<span
                                className="text-red-500">*</span>)</label>
                            <Field
                                className={`w-full block border text-sm rounded-lg p-2 ${touched.email ? (errors.email ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                id="email" name="email" placeholder="********@gmail.com"/>

                            <ErrorMessage name="email" component="span"
                                          className="text-sm text-red-600 errorMessage ml-2"/>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="workDate"
                                   className="block mt-2 text-sm font-medium p-1"><i
                                className="fa-solid fa-calendar-days"/> Ngày vào làm (<span
                                className="text-red-500">*</span>)</label>
                            <Field type="date"
                                   className={`w-full block border text-sm rounded-lg p-2 ${touched.workDate ? (errors.workDate ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500") : ""}`}
                                   id="workDate" name="workDate"/>

                            <ErrorMessage name="workDate" component="span"
                                          className="text-sm text-red-600 errorMessage ml-2"/>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <label htmlFor="department"
                                   className="block mt-2 text-sm font-medium p-1"><i
                                className="fa-solid fa-building-user"/> Bộ phận</label>
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
                                   className="block mt-2 text-sm font-medium p-1"><i
                                className="fa-solid fa-dollar-sign"/> Cấp bậc lương</label>
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

                        <div className="w-full flex flex-wrap mt-5">
                            <div
                                className="w-full sm:w-1/2 lg:w-1/2 p-2 flex justify-start items-center space-x-2"> <span>
                                <i className="fa-solid fa-bullhorn fa-shake fa-lg"/>
                            </span>
                                <span
                                    className="text-red-500"> Lưu ý: Bạn phải nhập đầy đủ các ô được đánh dấu (*)</span>
                            </div>
                            <div className="w-full sm:w-1/2 lg:w-1/2 p-2 flex justify-end items-center space-x-2">
                                <button onClick={checkAvatar}
                                        className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                                        style={{backgroundColor: "#4CAF50"}}
                                        type={"submit"}>
                                    <span><i className="fi fi-rs-disk"/></span>
                                    <span> Lưu</span>
                                </button>
                                <button
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                                    onClick={() => {
                                        navigate("/employee")
                                    }}>
                                    <span><i className="fa-regular fa-circle-xmark"/></span> Hủy
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
                    <button onClick={afterCrop} className="btn btn hover:bg-green-800 bg-green-600 mr-2">
                        <i className="fa-solid fa-scissors"/> cắt ảnh
                    </button>
                    <button className="btn hover:bg-blue-800 bg-blue-500"
                            onClick={cancelCrop}>
                        <i className="fa-solid fa-ban"/> Hủy
                    </button>
                </div>

            </Modal>
        </div>
    )
}
export default EditEmployee;