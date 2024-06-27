import React, {useEffect, useState} from 'react';
import * as employeeService from "../../services/EmployeeService";
import * as accountService from "../../services/AccountService";
import * as authService from "../../services/Authenticate/AuthService";
import '../../css/employee/PersonalInformation.css';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const PersonalInformation = () => {
    const [formData, setFormData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const notify = () => {
        toast.success("Đổi mật khẩu thành công");
        setPasswords({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setShowModal(false);
    };

    const fetchProfileInfo = async () => {
        try {
            const token = authService.getToken();
            const response = await employeeService.getMyProfile(token);
            setFormData(response);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    const editPersonalInformation = (e) => {
        e.preventDefault();
        alert('Chỉnh sửa thành công');
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevShowPassword) => ({
            ...prevShowPassword,
            [field]: !prevShowPassword[field],
        }));
    };

    const validatePassword = (pwd) => {
        if (pwd === '') {
            return 'Mật khẩu không được để trống';
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,18}$/;
        if (!passwordRegex.test(pwd)) {
            return 'Mật khẩu bắt đầu bằng chữ in hoa, 6 - 18 kí tự và có ít nhất 1 chữ số và không chứa kí tự đặc biệt.';
        }
        return '';
    };

    const handleChangeOldPassword = (event) => {
        const {value} = event.target;
        setPasswords({
            ...passwords,
            oldPassword: value
        });
        setErrors({
            ...errors,
            oldPassword: value === '' ? 'Mật khẩu cũ không được để trống' : ''
        });
    };

    const handlePasswordChange = (event) => {
        const {name, value} = event.target;
        setPasswords({
            ...passwords,
            [name]: value
        });

        if (name === 'newPassword') {
            const validationError = validatePassword(value);
            setErrors({
                ...errors,
                newPassword: validationError,
                confirmPassword: value !== passwords.confirmPassword ? 'Nhập lại mật khẩu không khớp' : ''
            });
        } else if (name === 'confirmPassword') {
            setErrors({
                ...errors,
                confirmPassword: value !== passwords.newPassword ? 'Nhập lại mật khẩu không khớp' : ''
            });
        }
    };

    const changePassword = async (event) => {
        event.preventDefault();
        let newErrors = {
            oldPassword: passwords.oldPassword === '' ? 'Mật khẩu cũ không được để trống' : '',
            newPassword: validatePassword(passwords.newPassword),
            confirmPassword: passwords.newPassword !== passwords.confirmPassword ? 'Nhập lại mật khẩu không khớp' : ''
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error !== '')) {
            return;
        }

        if (passwords.newPassword === passwords.oldPassword) {
            setErrors({
                ...newErrors,
                newPassword: 'Mật khẩu mới trùng với mật khẩu hiện tại'
            });
            return;
        }

        try {
            const token = authService.getToken();
            const response = await accountService.changePassword(token, passwords.oldPassword, passwords.newPassword);
            if (response.message === "Đổi mật khẩu thất bại.") {
                setErrors({
                    ...newErrors,
                    oldPassword: "Mật khẩu cũ không đúng"
                });
            } else {
                notify();
                await authService.logout(token);
            }
        } catch (error) {
            console.log(error);
            setErrors({
                ...newErrors,
                newPassword: 'Có lỗi xảy ra. Vui lòng thử lại.'
            });
        }
    };

    if (formData == null) {
        return null;
    }

    return (
        <div id="TanPN">
            <div className="bg-white mx-16 overflow-hidden shadow rounded-lg border box">
                <div className="px-4 py-5 sm:px-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Thông tin tài khoản
                        </h3>
                        <button className="text-sm font-medium text-gray-500 mx-4">
                            X
                        </button>
                    </div>
                    <p className="mt-1 max-w-2xl text-sm text-red-600">
                        **Không chia sẻ** thông tin tài khoản và mật khẩu của bạn với bất kỳ ai. Việc tiết lộ thông tin này có thể dẫn đến việc truy cập trái phép và rủi ro bảo mật nghiêm trọng.

                    </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                Tài khoản <br/>
                                <span>{formData.userName.toUpperCase()}</span>
                            </dd>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                <br/>
                            </dd>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                <br/>
                            </dd>

                            <button className="text-2xl font-medium text-green-700">
                                <i className='bx bx-check'></i>
                            </button>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                Mật khẩu <br/>

                                <div className="flex items-center ">
                                    <div className="mr-3 ">
                                        <input type="password" value="******" className="form-input rounded-[4px]" readOnly/>
                                    </div>
                                </div>
                            </dd>
                            <div className="w-full flex justify-center h-10 mt-5 ">
                                <button
                                    className=" bg-blue-700 hover:bg-blue-700 text-white px-5 py-2.5 font-bmedium  rounded"
                                    onClick={() => setShowModal(true)}>Đổi mật khẩu
                                </button>
                            </div>

                        </div>
                        <div className="py-3 sm:py-5 sm:grid  sm:grid-cols-4 sm:gap-4 sm:px-6">
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                Họ và tên<br/>
                                {formData.name || ""}
                            </dd>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                Ngày sinh<br/>
                                {formData.dob.slice(0, 10) || ""}
                            </dd>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                Giới tính<br/>
                                {formData.gender || ""}
                            </dd>
                            <button className="text-2xl font-medium text-green-700">
                                <i className='bx bx-check'></i>
                            </button>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                Địa chỉ <br/>
                                {formData.address || ''}
                            </dd>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                <br/>
                            </dd>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                <br/>
                            </dd>
                            <button className="text-2xl font-medium text-green-700">
                                <i className='bx bx-check'></i>
                            </button>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                Số điện thoại <br/>
                                {formData.phone || ''}
                            </dd>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                Số điện thoại <br/>
                                {formData.email || ''}
                            </dd>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                <br/>
                            </dd>
                            <button className="text-2xl  font-medium text-green-700">
                                <i className='bx bx-check'></i>
                            </button>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                            <div className="w-full h-10 ">
                                <button
                                    className=" sm:col-span-1   bg-blue-700 hover:bg-blue600 text-white font-medium py-2 px-4 rounded"
                                    onClick={editPersonalInformation}>Chỉnh sửa
                                </button>
                            </div>
                        </div>

                    </dl>
                </div>
            </div>


                {showModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div
                            className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                 aria-hidden="true" onClick={() => setShowModal(false)}></div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                  aria-hidden="true">&#8203;</span>
                            <div
                                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900"
                                                id="modal-title">Đổi mật khẩu</h3>
                                            <div className="mt-2">
                                                <form onSubmit={changePassword}>
                                                    <div className="mb-4">
                                                        <label htmlFor="oldPassword"
                                                               className="block text-gray-700 font-bold mb-2">
                                                            Mật khẩu cũ <span className="text-red-500">*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type={showPassword.oldPassword ? "text" : "password"}
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                id="oldPassword"
                                                                name="oldPassword"
                                                                value={passwords.oldPassword}
                                                                onChange={handleChangeOldPassword}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="absolute right-2 top-2 text-gray-600"
                                                                onClick={() => togglePasswordVisibility("oldPassword")}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={showPassword.oldPassword ? faEyeSlash : faEye}/>
                                                            </button>
                                                        </div>
                                                        {errors.oldPassword && <div
                                                            className="text-red-500 text-sm mt-1">{errors.oldPassword}</div>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="newPassword"
                                                               className="block text-gray-700 font-bold mb-2">
                                                            Mật khẩu mới <span className="text-red-500">*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type={showPassword.newPassword ? "text" : "password"}
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                id="newPassword"
                                                                name="newPassword"
                                                                value={passwords.newPassword}
                                                                onChange={handlePasswordChange}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="absolute right-2 top-2 text-gray-600"
                                                                onClick={() => togglePasswordVisibility("newPassword")}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={showPassword.newPassword ? faEyeSlash : faEye}/>
                                                            </button>
                                                        </div>
                                                        {errors.newPassword && <div
                                                            className="text-red-500 text-sm mt-1">{errors.newPassword}</div>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="confirmPassword"
                                                               className="block text-gray-700 font-bold mb-2">
                                                            Nhập lại mật khẩu <span className="text-red-500">*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type={showPassword.confirmPassword ? "text" : "password"}
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                id="confirmPassword"
                                                                name="confirmPassword"
                                                                value={passwords.confirmPassword}
                                                                onChange={handlePasswordChange}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="absolute right-2 top-2 text-gray-600"
                                                                onClick={() => togglePasswordVisibility("confirmPassword")}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={showPassword.confirmPassword ? faEyeSlash : faEye}/>
                                                            </button>
                                                        </div>
                                                        {errors.confirmPassword && <div
                                                            className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
                                                    </div>
                                                    <div className="flex justify-center mb-4">
                                                        <img
                                                            src="https://t3.ftcdn.net/jpg/04/75/01/24/360_F_475012493_x7oLL5mrWTm25OCRluB2fZkn0onfSEqu.jpg"
                                                            alt="Placeholder"
                                                            className="modal-image w-1/2 h-1/2 object-cover"/>
                                                    </div>
                                                    <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                                                        <button type="submit"
                                                                sty
                                                                className=" w-full inline-flex bg-[#4CAF50] justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm">
                                                            Đổi mật khẩu
                                                        </button>
                                                        <button type="button"
                                                                className=" mt-3 w-full inline-flex justify-center rounded-md border border-gray-500 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                                                                onClick={() => setShowModal(false)}>
                                                            Hủy
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default PersonalInformation;