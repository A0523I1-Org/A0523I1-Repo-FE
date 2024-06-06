import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

const SignUpDialog = ({ employeeId, onUserRegistered }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const initialValues = {
        username: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Tên tài khoản là bắt buộc')
            .max(30, 'Tên tài khoản không được vượt quá 30 ký tự')
            .matches(/^[a-zA-Z0-9]+$/, 'Tên tài khoản chỉ được chứa chữ cái và số'),
        password: Yup.string()
            .required('Mật khẩu là bắt buộc')
            .max(30, 'Mật khẩu không được vượt quá 30 ký tự')
            .matches(/^[a-zA-Z0-9]+$/, 'Mật khẩu chỉ được chứa chữ cái và số'),
        confirmPassword: Yup.string()
            .required('Vui lòng xác nhận mật khẩu của bạn')
            .oneOf([Yup.ref('password'), null], 'Mật khẩu phải trùng khớp')
    });

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const handleSubmit = (values, actions) => {
        axios.post(`http://localhost:8080/api/account/employee/${employeeId}`, {
            username: values.username,
            password: values.password,
        })
            .then(response => {
                console.log(response.data);
                actions.setSubmitting(false); // Đặt lại trạng thái gửi sau khi gửi
                closeDialog(); // Đóng hộp thoại sau khi gửi
                // Thêm logic sau khi đăng ký thành công (ví dụ: hiển thị thông báo, chuyển hướng, vv.)
                if (onUserRegistered) {
                    onUserRegistered(employeeId, values.username); // Gọi callback để cập nhật thông tin tài khoản đã đăng ký thành công
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                actions.setSubmitting(false); // Đặt lại trạng thái gửi sau khi gửi
            });
    };

    return (
        <div>
            <span
                className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600 transition duration-300 ease-in-out hover:bg-red-100 hover:text-green-700 hover:shadow-md cursor-pointer"
                onClick={openDialog}
            >
                <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                Đăng ký tài khoản
            </span>

            {isDialogOpen && (
                <div
                    className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
                    onClick={closeDialog}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
                    >
                        <button
                            onClick={closeDialog}
                            className="absolute top-4 right-4 flex items-center justify-center w-6 h-6 text-gray-800 dark:text-white"
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                            </svg>
                        </button>
                        <div className="flex flex-col gap-4 p-6">
                            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Đăng ký tài khoản nhân viên
                            </h4>
                            <p className="block mb-3 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                                Nhập chi tiết tài khoản để đăng ký.
                            </p>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        {/*username*/}
                                        <h6 className="block mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                            Tài khoản
                                        </h6>
                                        <div className="relative mb-4 h-11 w-full min-w-[200px]">
                                            <Field
                                                type="text"
                                                name="username"
                                                placeholder=" "
                                                className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            />
                                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Tài khoản
                                            </label>
                                            <ErrorMessage name="username" component="div" className="text-red-500" />
                                        </div>

                                        {/*password*/}
                                        <h6 className="block mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                            Mật khẩu
                                        </h6>
                                        <div className="relative mb-4 h-11 w-full min-w-[200px]">
                                            <Field
                                                type="password"
                                                name="password"
                                                placeholder=" "
                                                className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            />
                                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Mật khẩu
                                            </label>
                                            <ErrorMessage name="password" component="div" className="text-red-500" />
                                        </div>

                                        {/*confirmPassword*/}
                                        <h6 className="block mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                            Xác nhận mật khẩu
                                        </h6>
                                        <div className="relative mb-8 h-11 w-full min-w-[200px]">
                                            <Field
                                                type="password"
                                                name="confirmPassword"
                                                placeholder=" "
                                                className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            />
                                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Xác nhận mật khẩu
                                            </label>
                                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="block mb-2 w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        >
                                            Đăng ký
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignUpDialog;