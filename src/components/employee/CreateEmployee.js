import "bootstrap/dist/css/bootstrap.css"
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
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import getCroppedImg from "./crop/utils/cropImage"
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
    const [avatar, setAvatar] = useState();
    const [firebaseAvt, setFirebaseAvt] = useState("");
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState(false);

    // ------------------------------

    useEffect(() => {
        getDepartments();
        getSalaryRanks();
    }, [])
    const getDepartments = async () => {
        let temp = await departmentService.getDepartmentList();
        setDepartments(temp)
    }
    const getSalaryRanks = async () => {
        let temp = await salaryRankService.getSalaryRankList();
        setSalaryRanks(temp)
    }

    const handleChange = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setAvatar(file)
        setIsOpenModal(true)


    }

    useEffect(() => {
        if (avatar) {
            console.log("tai leen firebase va lay url")
            const storageRef = ref(storage, `/avatar/${avatar.name}`);
            const uploadTask = uploadBytesResumable(storageRef, avatar);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setFirebaseAvt(url)
                    });
                }
            );
        }
    }, [avatar])

    const validate = {
        name: Yup.string().required("Vui lòng nhập tên nhân viên !")
            .max(100, "Họ và tên không được quá 100 ký tự !")
            .min(5, "Họ và tên không được it hơn 5 ký tự !")
            .matches(/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/, "Họ và tên không được chứa ký tự đặc biệt và phải viết hoa chữ cái đầu tiên !"),
        dob: Yup.date().required("Vui lòng nhập Ngày sinh !")
            .test('dob', 'Ngày sinh phải là một ngày trong quá khứ và phải trên 18 tuổi',
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
            .matches(/^[a-zA-Z0-9]+@gmail.com$/, "Email không đúng định dạng: *********@gmail.com !"),
        workDate: Yup.date().required("Vui lòng nhập vào làm !"),
        address: Yup.string().required("Vui lòng nhập địa chỉ nhân  viên !")
    }
    const submit = async (values) => {
        values.firebaseUrl = firebaseAvt;
        await employeeService.addEmployee(values)
        toast.success("Thêm mơi Thành công @@")
        navigate("/employee/create-employee")
    }

    const customStyles = {
        /*        content: {
                    background: 'red',
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                },*/
    };

    return (
        <div id="main" className="box__shadow row justify-content-center  ">
            <div className="row justify-content-around">
                <div id="avatarFrame" className="col-md-3">
                    <div>
                        <div className="center-content">
                            <img className="avatar_preview"
                                // src={avatar && avatar.preview ? avatar.preview : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"}
                                 src={avatar && avatar.preview ? avatar.preview : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"}
                                 alt=""/><br/>
                        </div>
                        <div className="center-content">
                            <label htmlFor="upload_avt" className="btn btn-primary"
                                   style={{background: "#2196e3"}}>Chọn avatar</label>
                            <input type="file" hidden id="upload_avt" accept="image/*"
                                   onChange={handleChange}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 center-content">
                    <h2><strong>THÊM MỚI NHÂN VIÊN VĂN PHÒNG</strong></h2>
                </div>
            </div>
            <Formik initialValues={form} onSubmit={submit} validationSchema={Yup.object(validate)}>
                {({errors, touched}) => (
                    <Form className="row justify-content-center">
                        <Field hidden type="text" name="firebaseUrl"/>

                        <div className="col-md-4" hidden>
                            <label htmlFor="code" className="form-label">Mã nhân viên <span>(*)</span></label>
                            <Field
                                className={`form-control ${(touched.code && errors.code) ? "is-invalid" : "is-valid"}`}
                                name="code" id="code"/>
                            <ErrorMessage name="code" component="span" className="invalid-feedback errorMessage"/>
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="name" className="form-label">Họ và Tên <span>(*)</span></label>
                            <Field
                                className={`form-control ${(touched.name && errors.name) ? "is-invalid" : "is-valid"}`}
                                id="name" name="name"/>
                            <ErrorMessage name="name" component="span" className="invalid-feedback errorMessage"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="dob" className="form-label">Ngày sinh <span>(*)</span></label>
                            <Field type="date"
                                   className={`form-control ${(touched.dob && errors.dob) ? "is-invalid" : "is-valid"}`}
                                   id="dob" name="dob"/>
                            <ErrorMessage name="dob" component="span" className="invalid-feedback errorMessage"/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Giới tính <span>(*)</span></label>
                            <div>
                                <div className="form-check form-check-inline">
                                    <Field type="radio" name="gender" id="male" value="male"
                                           className="form-check-input"
                                           checked/>
                                    <label htmlFor="male" className="form-check-label">Nam</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <Field type="radio" name="gender" id="female" value="female"
                                           className="form-check-input"/>
                                    <label htmlFor="female" className="form-check-label">Nữ</label>

                                </div>
                                <div className="form-check form-check-inline">
                                    <Field type="radio" name="gender" id="other" value="other"
                                           className="form-check-input"/>
                                    <label htmlFor="other" className="form-check-label">Khác</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="address" className="form-label">Địa chỉ<span>(*)</span></label>
                            <Field
                                className={`form-control ${(touched.address && errors.address) ? "is-invalid" : "is-valid"}`}
                                id="address" name="address"/>
                            <ErrorMessage name="address" component="span" className="invalid-feedback errorMessage"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="phone" className="form-label">Điện thoại <span>(*)</span></label>
                            <Field
                                className={`form-control ${(touched.phone && errors.phone) ? "is-invalid" : "is-valid"}`}
                                id="phone" name="phone"/>
                            <ErrorMessage name="phone" component="span" className="invalid-feedback errorMessage"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="email" className="form-label">Email <span>(*)</span></label>
                            <Field
                                className={`form-control ${(touched.email && errors.email) ? "is-invalid" : "is-valid"}`}
                                id="email" name="email"/>
                            <ErrorMessage name="email" component="span" className="invalid-feedback errorMessage"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="workDate" className="form-label">Ngày vào làm <span>(*)</span></label>
                            <Field type="date"
                                   className={`form-control ${(touched.workDate && errors.workDate) ? "is-invalid" : "is-valid"}`}
                                   id="workDate" name="workDate"/>
                            <ErrorMessage name="workDate" component="span" className="invalid-feedback errorMessage"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="department" className="form-label">Bộ phận</label>
                            <Field component="select" className="form-select" id="department"
                                   aria-describedby="departmentFeedback"
                                   name="department">
                                {
                                    departments.map(dep => (
                                        <option key={dep.id} value={dep.id}>{dep.name}</option>
                                    ))
                                }
                            </Field>
                            <ErrorMessage id="departmentFeedback" name="department" component="span"
                                          className="invalid-feedback errorMessage"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="salaryRank" className="form-label">Cấp bậc lương</label>
                            <Field component="select" className="form-select" id="salaryRank"
                                   aria-describedby="salaryRankFeedback"
                                   name="salaryRank">
                                {
                                    salaryRanks.map(rank => (
                                        <option key={rank.id} value={rank.id}>{rank.salaryRank}</option>
                                    ))
                                }
                            </Field>
                            <ErrorMessage id="salaryRankFeedback" name="salaryRank" component="span"
                                          className="invalid-feedback errorMessage"/>
                        </div>


                        <div className="col-md-4 center-content">
                            <button className="btn" style={{background: "#4CAF50", marginRight: "8px"}} type={"submit"}>
                                <span><i className="fi fi-rs-disk"></i></span>
                                <span>Lưu</span>
                            </button>
                            <button type={"reset"} className="btn btn-primary" style={{background: "#2196e3"}}>
                                <span><i className="fi fi-rr-eraser"></i></span>
                                <span onClick={() => {
                                    setAvatar()
                                }}>Làm mới</span>
                            </button>
                        </div>
                        <p className="mt-2"> Bạn phải nhập tất các các trường được đánh dấu (*)</p>
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
                                        aspect={3 / 4}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={onCropComplete}
                                    />
                                </div>

                                <div className='slider'>
                                    <Slider
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

                    <div className='container-buttons'>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={cancelCrop}
                            style={{marginRight: "10px"}}
                        >
                            Cancel
                        </Button>
                        <Button variant='contained' color='secondary' onClick={uploadFirebase}>
                            Crop
                        </Button>
                    </div>
                </div>

            </Modal>
        </div>
    )
}
export default CreateEmployee;

/*


export default function App() {



    const inputRef = React.useRef();
    const triggerFileSelectPopup = () => inputRef.current.click();

    const [image, setImage] = React.useState(null);
    const [croppedArea, setCroppedArea] = React.useState(null);
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
    const [zoom, setZoom] = React.useState(1);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener("load", () => {
                setImage(reader.result);
            });
        }
    };

    const onDownload = () => {
        generateDownload(image, croppedArea);
    };

    return (
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

                        <div className='slider'>
                            <Slider
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

            <div className='container-buttons'>
                <input
                    type='file'
                    accept='image/!*'
                    ref={inputRef}
                    onChange={onSelectFile}
                    style={{ display: "none" }}
                />
                <Button
                    variant='contained'
                    color='primary'
                    onClick={triggerFileSelectPopup}
                    style={{ marginRight: "10px" }}
                >
                    Choose
                </Button>
                <Button variant='contained' color='secondary' onClick={onDownload}>
                    Download
                </Button>
            </div>
        </div>
    );
}
*/
