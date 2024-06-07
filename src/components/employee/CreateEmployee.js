import "bootstrap/dist/css/bootstrap.css"
import "../../css/employee/createemployee.css"
import React, {useEffect, useState} from 'react'
import {storage} from "./firebaseConfig"
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {useNavigate, useLocation} from 'react-router-dom'
import {Field, ErrorMessage, Form, Formik} from 'formik'
import * as Yup from 'yup'

import * as departmentService from "../../services/DepartmentService"
import * as salaryRankService from "../../services/SalaryRankService"
import * as employeeService from "../../services/EmployeeService"

const CreateEmployee = () => {
    const [form, setForm] = useState(
        {
            code: "",
            name: "",
            dob: "",
            gender: "",
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


    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    const navigate = useNavigate();
    const {state} = useLocation();
    useEffect(() => {
        if (state) {
            setForm(state)
        }
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
        setFile(e.target.files[0]);
    }

    const handleUpload = () => {
        // if (!file) {
        //     alert("Please upload an image first!");
        // }
        const storageRef = ref(storage, `/avatar/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    document.getElementById("avatarDisplay").setAttribute("src", url)
                });
            }
        );
    };

    const validate = {
        code: Yup.string().required("Vui lòng nhập mã nhân viên").matches(/^NVVP-[0-9]{4}$/, "Format: NVVP-XXXX")
        /*        code: Yup.string().required("not null").matches(/^BO-[0-9]{4}$/, "Format: BO-XXXX"),
                name: Yup.string().required("Name cannot be blank !!")
                    .matches(/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/, "The name must be not contain special character anh capitalize the first letter")
                    .max(100),
                date: Yup.date().required("Day of birth cannot be blank")
                    .test('dob', 'Ngay nhap phai truoc ngay hien tai',
                        function (value, ctx) {
                            const valid = new Date().getFullYear() - new Date(value).getFullYear() >= 0;
                            return !valid ? ctx.createError() : valid;
                        })
                ,
                quantity: Yup.number().min(0)*/
    }
    const submit = async (values) => {
        if (!state) {
            const success = employeeService.addEmployee(values)
            // if (success) {
            //     toast.success("book added ")
            // }
        }/* else {
            const success = bookService.updateBook(state.id, values)
            if (success) {
                toast.success("book updated ")
            }
        }*/
        navigate("/employee/create-employee")
    }
    return (
        <div id="main" className="box__shadow row justify-content-center  ">
            <div className="row g-3 justify-content-center">
                <div id="avatarFrame" className="col-md-3">
                    <div>
                        <div className="center-content">
                            <img id="avatarDisplay"
                                 src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                                 alt=""/><br/>
                        </div>
                        <div className="center-content">
                            <label htmlFor="upload_avt" className="btn btn-primary"
                                   style={{background: "#2196e3"}}>Chọn avatar</label>
                            <input type="file" hidden id="upload_avt" name="firebaseUrl" accept="image/*"
                                   onChange={handleChange}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 center-content">
                    <h2><strong>THÊM MỚI NHÂN VIÊN VĂN PHÒNG</strong></h2>
                </div>
            </div>
            <Formik initialValues={form} onSubmit={submit} validationSchema={Yup.object(validate)}>
                <Form className="row g-3 justify-content-center">
                    <div className="col-md-4">
                        <label htmlFor="code" className="form-label">Mã nhân viên <span>(*)</span></label>
                        <Field className="form-control is-valid is-invalid" name="code" id="code"/>
                        <ErrorMessage name="code" component="span" className="invalid-feedback"/>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="name" className="form-label">Họ và Tên <span>(*)</span></label>
                        <Field className="form-control is-valid" id="name" name="name"/>
                        <ErrorMessage name="name" component="span" className="invalid-feedback"/>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="dob" className="form-label">Ngày sinh <span>(*)</span></label>
                        <Field type="date" className="form-control is-valid" id="dob" name="dob"/>
                        <ErrorMessage name="dob" component="span" className="invalid-feedback"/>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Giới tính <span>(*)</span></label>
                        <div>
                            <div className="form-check form-check-inline">
                                <Field type="radio" name="gender" id="male" value="male" className="form-check-input"
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
                        <Field className="form-control is-valid" id="address" name="address"/>
                        <ErrorMessage name="address" component="span" className="invalid-feedback"/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="phone" className="form-label">Điện thoại <span>(*)</span></label>
                        <Field className="form-control is-valid is-invalid" id="phone" name="phone"/>
                        <ErrorMessage name="phone" component="span" className="invalid-feedback"/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="email" className="form-label">Email <span>(*)</span></label>
                        <Field className="form-control is-valid" id="email" name="email"/>
                        <ErrorMessage name="email" component="span" className="invalid-feedback"/>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="workDate" className="form-label">Ngày vào làm <span>(*)</span></label>
                        <Field type="date" className="form-control is-valid" id="workDate" name="workDate"/>
                        <ErrorMessage name="workDate" component="span" className="invalid-feedback"/>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="department" className="form-label">Bộ phận</label>
                        <Field component="select" className="form-select is-invalid" id="department"
                               aria-describedby="departmentFeedback"
                               name="department">
                            {
                                departments.map(dep => (
                                    <option key={dep.id} value={dep.id}>{dep.name}</option>
                                ))
                            }
                        </Field>
                        <ErrorMessage id="departmentFeedback" name="department" component="span"
                                      className="invalid-feedback"/>
                    </div>


                    <div className="col-md-4">
                        <label htmlFor="salaryRank" className="form-label">Cấp bậc lương</label>
                        <Field component="select" className="form-select is-valid" id="salaryRank"
                               aria-describedby="salaryRankFeedback"
                               name="salaryRank">
                            {
                                salaryRanks.map(rank => (
                                    <option key={rank.id} value={rank.id}>{rank.salaryRank}</option>
                                ))
                            }
                        </Field>
                        <ErrorMessage id="salaryRankFeedback" name="salaryRank" component="span"
                                      className="invalid-feedback"/>
                    </div>


                    <div className="col-md-4 center-content">
                        <button className="btn" style={{background: "#4CAF50", marginRight: "8px"}}
                                onClick={handleUpload}>
                            <span><i className="fi fi-rs-disk"></i></span>
                            <span>Lưu</span>
                        </button>
                        <button type={"reset"} className="btn btn-primary" style={{background: "#2196e3"}}>
                            <span><i className="fi fi-rr-eraser"></i></span>
                            <span>Làm mới</span>
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
export default CreateEmployee;

