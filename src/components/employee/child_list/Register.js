import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerEmployee } from '../../../services/AccountService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as authService from '../../../services/Authenticate/AuthService';

const Register = ({ employeeId, onUserRegistered }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const token = authService.getToken();
    const initialValues = {
        username: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Tên tài khoản là bắt buộc')
            .min(5, 'Tên tài khoản phải có ít nhất 5 ký tự')
            .max(30, 'Tên tài khoản không được vượt quá 30 ký tự')
            .matches(/^[a-zA-Z0-9]+$/, 'Tên tài khoản chỉ được chứa chữ cái và số'),
        password: Yup.string()
            .required('Mật khẩu là bắt buộc')
            .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
            .max(30, 'Mật khẩu không được vượt quá 30 ký tự')
            .matches(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/, 'Mật khẩu chỉ được chứa chữ cái, số và ký tự đặc biệt'),
        confirmPassword: Yup.string()
            .required('Vui lòng xác nhận mật khẩu của bạn')
            .oneOf([Yup.ref('password'), null], 'Mật khẩu phải trùng khớp')
    });

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const handleSubmit = (values, actions) => {
        registerEmployee(employeeId, values.username, values.password, token)
            .then(result => {
                if (result.success) {
                    console.log(`Success: ${result.message}`);
                    closeDialog();
                    if (onUserRegistered) {
                        onUserRegistered(employeeId, values.username);
                    }
                    toast.success(`Thêm mới tài khoản ${result.message} thành công`);
                } else {
                    console.log(`Error: ${result.message}`);
                    toast.warning(result.message);
                }
            })
            .finally(() => {
                actions.setSubmitting(false);
            });
    };

    const customInput =
        "w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 border-t-2";

    const customLabel =
        "text-xs font-normal leading-tight text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:leading-4 peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-blue-500";

    return (
        <div id="register_vu">
            <span
                className="tw-custom-span-register cursor-pointer"
                onClick={openDialog}
            >
                <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                Đăng ký tài khoản
            </span>

            {isDialogOpen && (
                <div
                    className="tw-custom-modal-overlay"
                    onClick={closeDialog}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="tw-custom-modal-content"
                    >
                        <button
                            onClick={closeDialog}
                            className="tw-custom-close-button"
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                        </button>
                        <div className="tw-custom-modal-inner">
                            <h4 className="tw-custom-h4">
                                Đăng ký tài khoản nhân viên
                            </h4>
                            <p className="tw-custom-p">
                                Nhập chi tiết tài khoản để đăng ký.
                            </p>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, resetForm, values }) => (
                                    <Form>
                                        <h6 className="tw-custom-h6">
                                            Tài khoản
                                        </h6>
                                        <div className="tw-custom-field">
                                            <Field
                                                type="text"
                                                name="username"
                                                placeholder=""
                                                className={customInput}
                                            />
                                            <div className="tw-custom-label-container">
                                                <label className={`${customLabel} ${values.username && "top-[-0.5rem] text-blue-500"}`}>
                                                    Tài khoản
                                                </label>
                                            </div>
                                            <ErrorMessage name="username" component="div" className="tw-custom-error" />
                                        </div>

                                        <h6 className="tw-custom-h6">
                                            Mật khẩu
                                        </h6>
                                        <div className="tw-custom-field">
                                            <Field
                                                type="password"
                                                name="password"
                                                placeholder=""
                                                className={customInput}
                                            />
                                            <div className="tw-custom-label-container">
                                                <label className={`${customLabel} ${values.password && "top-[-0.5rem] text-blue-500"}`}>
                                                    Mật khẩu
                                                </label>
                                            </div>
                                            <ErrorMessage name="password" component="div" className="tw-custom-error" />
                                        </div>

                                        <h6 className="tw-custom-h6">
                                            Xác nhận mật khẩu
                                        </h6>
                                        <div className="tw-custom-field">
                                            <Field
                                                type="password"
                                                name="confirmPassword"
                                                placeholder=""
                                                className={customInput}
                                            />
                                            <div className="tw-custom-label-container">
                                                <label className={`${customLabel} ${values.confirmPassword && "top-[-0.5rem] text-blue-500"}`}>
                                                    Xác nhận mật khẩu
                                                </label>
                                            </div>
                                            <ErrorMessage name="confirmPassword" component="div" className="tw-custom-error" />
                                        </div>
                                        <div className="tw-custom-button-container">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="tw-custom-submit-button"
                                            >
                                                Đăng ký
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => resetForm()}
                                                disabled={isSubmitting}
                                                className="tw-custom-reset-button ml-2"
                                            >
                                                Làm mới
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
