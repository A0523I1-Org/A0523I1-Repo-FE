import React, { useEffect, useState } from 'react';
import { storage } from '../../configs/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { Field, ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import * as departmentService from '../../services/DepartmentService';
import * as salaryRankService from '../../services/SalaryRankService';
import * as employeeService from '../../services/EmployeeService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import Cropper from 'react-easy-crop';
import getCroppedImg from './crop/utils/cropImage';
import {capitalizeFirstLetter} from "./Utils";

const CreateEmployee = () => {
    const [form, setForm] = useState({
        code: '',
        name: '',
        dob: '',
        gender: 'male',
        address: '',
        phone: '',
        email: '',
        workDate: '',
        firebaseUrl: '',
        department: 1,
        salaryRank: 1,
    });

    const [departments, setDepartments] = useState([]);
    const [salaryRanks, setSalaryRanks] = useState([]);
    const [avatar, setAvatar] = useState();
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [previewAvatar, setPreviewAvatar] = useState();
    const [image, setImage] = useState(null);
    const [croppedArea, setCroppedArea] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    const afterCrop = async () => {
        const blob = await getCroppedImg(image, croppedArea);
        const previewUrl = window.URL.createObjectURL(blob);
        setPreviewAvatar(previewUrl);
        setIsOpenModal(false);
        setAvatar(blob);
    };

    const cancelCrop = () => {
        setIsOpenModal(false);
    };

    useEffect(() => {
        getDepartments();
        getSalaryRanks();
    }, []);

    const getDepartments = async () => {
        let temp = await departmentService.getAllDepartments();
        setDepartments(temp);
    };

    const getSalaryRanks = async () => {
        let temp = await salaryRankService.getAllSalaryRanks();
        setSalaryRanks(temp);
    };

    const handleChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener('load', () => {
                setImage(reader.result);
            });
            setIsOpenModal(true);
        }
    };

    const submit = (values) => {
        if (avatar) {
            const storageRef = ref(storage, `/avatar/${Date.now()}.jpeg`);
            const uploadTask = uploadBytesResumable(storageRef, avatar);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (err) => console.log('Eror at CreateEmployee/uploadfirebase and get link avatar: ' + err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        values.firebaseUrl = url;
                        const success = employeeService.addEmployee(values);
                        if (success) {
                            toast.success('Thêm mới nhân viên thành công.');
                            navigate('/employee');
                        } else {
                            toast.warning('Đã xảy ra lỗi trong quá trình thêm mới !');
                            navigate('/employee/create-employee');
                        }
                    });
                }
            );
        }
    };

    const validate = {
        name: Yup.string().required('Vui lòng nhập tên nhân viên !')
            .max(100, 'Họ và tên không được quá 100 ký tự !')
            .min(5, 'Họ và tên không được ít hơn 5 ký tự !')
            .matches(/^[A-Za-zÀ-ỹ]+(\s[A-Za-zÀ-ỹ]+)*$/, 'Họ và tên không được chứa ký tự đặc biệt và phải viết hoa chữ cái đầu tiên !'),
        dob: Yup.date().required('Vui lòng nhập ngày sinh của nhân viên !')
            .max(new Date(), 'Ngày sinh phải là một ngày trong quá khứ !')
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
                                return true;
                            }
                        }
                    }
                    return ctx.createError();
                }),
        phone: Yup.string().required('Vui lòng nhập số điện thoại nhân viên !')
            .matches(/^0\d{9}$/, 'Số điện thoại bao gồm 10 chữ số bắt đầu bằng số 0 !'),
        email: Yup.string().required('Vui lòng nhập email !')
            .matches(/^[a-zA-Z0-9._]+@gmail.com$/, 'Email không đúng định dạng: *********@gmail.com !'),
        workDate: Yup.date().required('Vui lòng nhập vào làm !'),
        address: Yup.string().required('Vui lòng nhập địa chỉ nhân viên !'),
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div>
                    <h2 className="font-semibold text-xl text-gray-600 mb-6">THÊM MỚI NHÂN VIÊN VĂN PHÒNG</h2>
                    {/*<p className="text-gray-500 mb-6">Form is mobile responsive. Give it a try.</p>*/}

                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Thông tin chi tiết</p>
                                <p>Vui lòng điền đầy đủ thông tin.</p>
                            </div>

                            <div className="lg:col-span-2">
                                <Formik initialValues={form} onSubmit={submit} validationSchema={Yup.object(validate)}>
                                    {({ errors, touched }) => (
                                        <Form className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                            <Field hidden name="firebaseUrl" />
                                            <Field hidden name="code" />

                                            <div className="md:col-span-5">
                                                <label htmlFor="name">Họ và tên <span>(*)</span></label>
                                                <Field
                                                    className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${touched.name ? (errors.name ? "border-red-500" : "border-green-500") : ""}`}
                                                    id="name" name="name" />
                                                <ErrorMessage name="name" component="span" className="text-red-500 text-xs" />
                                            </div>

                                            <div className="md:col-span-5">
                                                <label htmlFor="dob">Ngày sinh <span>(*)</span></label>
                                                <Field type="date"
                                                       className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${touched.dob ? (errors.dob ? "border-red-500" : "border-green-500") : ""}`}
                                                       id="dob" name="dob" />
                                                <ErrorMessage name="dob" component="span" className="text-red-500 text-xs" />
                                            </div>

                                            <div className="md:col-span-5">
                                                <label className="form-label">Giới tính <span>(*)</span></label>
                                                <div className="flex space-x-4">
                                                    <label className="flex items-center">
                                                        <Field type="radio" name="gender" value="male" className="form-radio" />
                                                        <span className="ml-2">Nam</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <Field type="radio" name="gender" value="female" className="form-radio" />
                                                        <span className="ml-2">Nữ</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <Field type="radio" name="gender" value="other" className="form-radio" />
                                                        <span className="ml-2">Khác</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="md:col-span-5">
                                                <label htmlFor="phone">Số điện thoại <span>(*)</span></label>
                                                <Field
                                                    className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${touched.phone ? (errors.phone ? "border-red-500" : "border-green-500") : ""}`}
                                                    id="phone" name="phone" />
                                                <ErrorMessage name="phone" component="span" className="text-red-500 text-xs" />
                                            </div>

                                            <div className="md:col-span-5">
                                                <label htmlFor="email">Email <span>(*)</span></label>
                                                <Field
                                                    className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${touched.email ? (errors.email ? "border-red-500" : "border-green-500") : ""}`}
                                                    id="email" name="email" />
                                                <ErrorMessage name="email" component="span" className="text-red-500 text-xs" />
                                            </div>

                                            <div className="md:col-span-5">
                                                <label htmlFor="address">Địa chỉ <span>(*)</span></label>
                                                <Field
                                                    className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${touched.address ? (errors.address ? "border-red-500" : "border-green-500") : ""}`}
                                                    id="address" name="address" />
                                                <ErrorMessage name="address" component="span" className="text-red-500 text-xs" />
                                            </div>

                                            <div className="md:col-span-5">
                                                <label htmlFor="workDate">Ngày vào làm <span>(*)</span></label>
                                                <Field type="date"
                                                       className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${touched.workDate ? (errors.workDate ? "border-red-500" : "border-green-500") : ""}`}
                                                       id="workDate" name="workDate" />
                                                <ErrorMessage name="workDate" component="span" className="text-red-500 text-xs" />
                                            </div>

                                            <div className="md:col-span-5">
                                                <label htmlFor="department">Phòng ban <span>(*)</span></label>
                                                <Field
                                                    as="select"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    id="department" name="department">
                                                    {departments.map((dep) => (
                                                        <option key={dep.id} value={dep.id}>{capitalizeFirstLetter(dep.name)}</option>
                                                    ))}
                                                </Field>
                                            </div>

                                            <div className="md:col-span-5">
                                                <label htmlFor="salaryRank">Bậc lương <span>(*)</span></label>
                                                <Field
                                                    as="select"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    id="salaryRank" name="salaryRank">
                                                    {salaryRanks.map((rank) => (
                                                        <option key={rank.id} value={rank.id}>{rank.salaryRank}</option>
                                                    ))}
                                                </Field>
                                            </div>

                                            <div className="md:col-span-5">
                                                <label htmlFor="firebaseUrl">Avatar</label>
                                                <input className="form-control" id="firebaseUrl" name="firebaseUrl" type="file" onChange={handleChange} />
                                            </div>

                                            {previewAvatar && (
                                                <div className="md:col-span-5">
                                                    <img src={previewAvatar} className="img-thumbnail" alt="avatar" />
                                                </div>
                                            )}

                                            <div className="md:col-span-5 text-right">
                                                <div className="inline-flex items-end">
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Lưu</button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isOpenModal}
                onRequestClose={cancelCrop}
                contentLabel="Crop Image"
                className="relative w-full max-w-lg mx-auto bg-white rounded-lg p-4"
            >
                <div className="relative h-64 w-full bg-gray-200">
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
                <div className="flex justify-between mt-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={cancelCrop}>Cancel</button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={afterCrop}>Crop</button>
                </div>
            </Modal>
        </div>
    );
};

export default CreateEmployee;
