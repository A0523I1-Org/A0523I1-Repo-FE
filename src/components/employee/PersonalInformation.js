import React, { useEffect, useState } from 'react';
import * as employeeService from "../../services/EmployeeService";
import * as accountService from "../../services/AccountService";
import * as authService from "../../services/Authenticate/AuthService";
import '../../css/employee/PersonalInformation.css';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
        const { value } = event.target;
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
        const { name, value } = event.target;
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
        <div className="personal_form container mx-auto px-4">
            <table className="table w-full mb-8 custom-spacing">
                <thead>
                <tr>
                    <th colSpan="2" className="abc text-2xl font-bold mb-4">Thông tin cá nhân</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th className="table-cell py-2 text-left pl-16">Tài khoản:</th>
                    <td className="table-cell">
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName || ''}
                            className="form-input w-full"
                            readOnly
                        />
                    </td>
                </tr>
                <tr>
                    <th className="table-cell py-2 text-left pl-16">Mật khẩu:</th>
                    <td className="table-cell">
                        <div className="flex items-center">
                            <div className="mr-3">
                                <input type="password" value="******" className="form-input" readOnly />
                            </div>
                            <button className="btn-change bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModal(true)}>Đổi mật khẩu</button>
                        </div>
                    </td>
                </tr>

                {/* Các trường thông tin khác */}

                <tr>
                    <th className="table-cell py-2" className="text-left pl-16">Họ tên(<span
                        className="text-red-500">*</span>):</th>
                    <td className="table-cell">
                        <input
                            type="text"
                            name="fullName"
                            value={formData.name || ''}
                            className="form-input w-full"
                            readOnly
                        />
                    </td>
                </tr>
                <tr>
                    <th className="table-cell py-2" class="text-left pl-16">Ngày sinh(<span className="text-red-500">*</span>):</th>
                    <td className="table-cell">
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob.slice(0, 10)}
                            className="form-input w-full"
                            readOnly
                        />
                    </td>
                </tr>
                <tr>
                    <th className="table-cell py-2" class="text-left pl-16">Giới tính:</th>
                    <td className="table-cell">
                        <div className="flex items-center">
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    id="nam"
                                    name="gender"
                                    value="nam"
                                    checked={formData.gender === 'Nam'}
                                    className="form-radio"
                                    readOnly
                                />
                                <label htmlFor="nam" className="form-check-label ml-2">Nam</label>
                            </div>
                            <div className="form-check form-check-inline ml-4">
                                <input
                                    type="radio"
                                    id="nu"
                                    name="gender"
                                    value="nu"
                                    checked={formData.gender === 'Nữ'}
                                    className="form-radio"
                                    readOnly
                                />
                                <label htmlFor="nu" className="form-check-label ml-2">Nữ</label>
                            </div>
                            <div className="form-check form-check-inline ml-4">
                                <input
                                    type="radio"
                                    id="chua"
                                    name="gender"
                                    value="chua"
                                    checked={formData.gender === 'Chưa xác định'}
                                    className="form-radio"
                                    readOnly
                                />
                                <label htmlFor="chua" className="form-check-label ml-2">Chưa xác định</label>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th className="table-cell py-2" class="text-left pl-16">Địa chỉ(<span className="text-red-500">*</span>):</th>
                    <td className="table-cell">
                        <input
                            type="text"
                            name="address"
                            value={formData.address || ''}
                            className="form-input w-full"
                            readOnly
                        />
                    </td>
                </tr>
                <tr>
                    <th className="table-cell py-2" class="text-left pl-16">Số điện thoại:</th>
                    <td className="table-cell">
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone || ''}
                            className="form-input w-full"
                            readOnly
                        />
                    </td>
                </tr>
                <tr>
                    <th className="table-cell py-2" class="text-left pl-16">Email(<span className="text-red-500">*</span>):</th>
                    <td className="table-cell">
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            className="form-input w-full"
                            readOnly
                        />
                    </td>
                </tr>

                <tr>
                    <td colSpan="2" className="text-center">
                        <button className="btn-edit bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={editPersonalInformation}>Chỉnh sửa</button>
                    </td>
                </tr>
                </tbody>
            </table>

            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowModal(false)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Đổi mật khẩu</h3>
                                        <div className="mt-2">
                                            <form onSubmit={changePassword}>
                                                <div className="mb-4">
                                                    <label htmlFor="oldPassword" className="block text-gray-700 font-bold mb-2">
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
                                                            <FontAwesomeIcon icon={showPassword.oldPassword ? faEyeSlash : faEye} />
                                                        </button>
                                                    </div>
                                                    {errors.oldPassword && <div className="text-red-500 text-sm mt-1">{errors.oldPassword}</div>}
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">
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
                                                            <FontAwesomeIcon icon={showPassword.newPassword ? faEyeSlash : faEye} />
                                                        </button>
                                                    </div>
                                                    {errors.newPassword && <div className="text-red-500 text-sm mt-1">{errors.newPassword}</div>}
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
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
                                                            <FontAwesomeIcon icon={showPassword.confirmPassword ? faEyeSlash : faEye} />
                                                        </button>
                                                    </div>
                                                    {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
                                                </div>
                                                <div className="flex justify-center mb-4">
                                                    <img src="https://t3.ftcdn.net/jpg/04/75/01/24/360_F_475012493_x7oLL5mrWTm25OCRluB2fZkn0onfSEqu.jpg" alt="Placeholder" className="modal-image w-1/2 h-1/2 object-cover" />
                                                </div>
                                                <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                                                    <button type="submit" className="modal-btn-change w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm">
                                                        Đổi mật khẩu
                                                    </button>
                                                    <button type="button" className="modal-btn-cancel mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm" onClick={() => setShowModal(false)}>
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