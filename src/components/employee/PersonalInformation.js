import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
import * as employeeService from "../../services/EmployeeService";
import * as accountService from "../../services/AccountService";
import '../../css/employee/PersonalInformation.css';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const PersonalInformation = () => {

    const [formData, setFormData] = useState();

    const notify = () => {
        toast.success("Đổi mật khẩu thành công");
        setPasswords({
            ...passwords,
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };


    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await employeeService.getMyProfile(token);
            setFormData(response);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [passwordError, setPasswordError] = useState('');


    const validatePassword = (pwd) => {
        if (pwd === '') {
            return 'Mật khẩu không được để trống';
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,18}$/;
        if (!passwordRegex.test(pwd)) {
            return 'Mật khẩu bắt đầu bằng chữ in hoa, 6 - 8 kí tự và có ít nhất 1 chữ số.';
        }
        return '';
    };


    const handleChangeOldPassword = (event) => {
        const { value } = event.target;
        setPasswords({
            oldPassword: value
        });
    };

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setPasswords({
            ...passwords,
            [name]: value
        });

        const validationError = validatePassword(value);
        setPasswordError(validationError);
    };

    const changePassword = async (event) => {
        event.preventDefault();
        setPasswordError('');

        if (passwords.newPassword !== passwords.confirmPassword) {
            setPasswordError('Mật khẩu mới không khớp');
            return;
        } else if (passwords.newPassword === passwords.oldPassword) {
            setPasswordError('Mật khẩu mới trùng với mật khẩu hiện tại');
            setPasswords({
                ...passwords,
                newPassword: '',
                confirmPassword: ''
            });
            return;
        }

        // Kiểm tra passwordError trước khi đổi mật khẩu
        const validationError = validatePassword(passwords.newPassword);
        if (validationError) {
            setPasswordError(validationError);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await accountService.changePassword(token, passwords.oldPassword, passwords.newPassword);
            if (response.message === "Đổi mật khẩu thất bại.") {
                setPasswordError("Mật khẩu cũ không khớp");
            } else {
                notify();
                closeModal();
            }
        } catch (error) {
            console.log(error)
            setPasswordError('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    const editPersonalInformation = (e) => {
        e.preventDefault();
        alert('Chỉnh sửa thành công');
    };

    const closeModal = () => {
        const modalElement = document.getElementById('changePasswordModal');
        // const modal = bootstrap.Modal.getInstance(modalElement);
        // modal.hide();
    };


    if (formData == null) {
        return null;
    }

    return (
        <div className="container">
            <table className="table table-borderless">
                <thead>
                <tr>
                    <th colSpan="2" className="abc">Thông tin cá nhân</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Tài khoản:</th>
                    <td>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName || ''}
                            className="form-control"
                            // onChange={handleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Mật khẩu:</th>
                    <td>
                        <div className="row g-3">
                            <div className="col-auto">
                                <input type="password" value={"******"} className="form-control" readOnly />
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-change" data-bs-toggle="modal" data-bs-target="#changePasswordModal">Đổi mật khẩu</button>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>Họ tên(<span style={{ color: 'red' }}>*</span>):</th>
                    <td>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.name || ''}
                            className="form-control"
                            // onChange={handleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Ngày sinh(<span style={{ color: 'red' }}>*</span>):</th>
                    <td>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob.slice(0,10)}
                            className="form-control"
                            // onChange={handleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Giới tính:</th>
                    <td>
                        <div>
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    id="nam"
                                    name="gender"
                                    value="nam"
                                    checked={formData.gender === 'Nam'}
                                    className="form-check-input"
                                    // onChange={handleChange}
                                />
                                <label htmlFor="nam" className="form-check-label">Nam</label>
                            </div>
                            <div className="form-check form-check-inline ms-3">
                                <input
                                    type="radio"
                                    id="nu"
                                    name="gender"
                                    value="nu"
                                    checked={formData.gender === 'Nữ'}
                                    className="form-check-input"
                                    // onChange={handleChange}
                                />
                                <label htmlFor="nu" className="form-check-label">Nữ</label>
                            </div>
                            <div className="form-check form-check-inline ms-3">
                                <input
                                    type="radio"
                                    id="chua"
                                    name="gender"
                                    value="chua"
                                    checked={formData.gender === 'Chưa xác định'}
                                    className="form-check-input"
                                    // onChange={handleChange}
                                />
                                <label htmlFor="chua" className="form-check-label">Chưa xác định</label>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>Địa chỉ(<span style={{ color: 'red' }}>*</span>):</th>
                    <td>
                        <input
                            type="text"
                            name="address"
                            value={formData.address || ''}
                            className="form-control"
                            // onChange={handleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Điện thoại(<span style={{ color: 'red' }}>*</span>):</th>
                    <td>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            className="form-control"
                            // onChange={handleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Email(<span style={{ color: 'red' }}>*</span>):</th>
                    <td>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            className="form-control"
                            // onChange={handleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td><button className="btn btn-change" onClick={editPersonalInformation}>Chỉnh sửa</button></td>
                                <td className="table-cell"><button className="btn btn-cancel">Hủy</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>

            {/* Modal */}
            <div className="modal fade" id="changePasswordModal" tabIndex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="changePasswordModalLabel">Đổi mật khẩu</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <form onSubmit={changePassword}>
                                        <div className="mb-3">
                                            <label htmlFor="oldPassword" className="form-label">Mật khẩu cũ</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="oldPassword"
                                                name="oldPassword"
                                                value={passwords.oldPassword}
                                                onChange={handleChangeOldPassword}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="newPassword"
                                                name="newPassword"
                                                value={passwords.newPassword}
                                                onChange={handlePasswordChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="confirmPassword" className="form-label">Nhập lại mật khẩu</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={passwords.confirmPassword}
                                                onChange={handlePasswordChange}
                                            />

                                        </div>
                                        {passwordError && <div className="alert alert-danger" role="alert">{passwordError}</div>}

                                        <table>
                                            <tr>
                                                <td><button type="submit" className="btn btn-change">Đổi mật khẩu</button></td>
                                                <td className="table-cell"><button type="button" className="btn btn-cancel" data-bs-dismiss="modal">Hủy</button></td>
                                            </tr>
                                        </table>
                                    </form>
                                </div>
                                <div className="col-md-4 d-flex align-items-center">
                                    <img src="https://t3.ftcdn.net/jpg/04/75/01/24/360_F_475012493_x7oLL5mrWTm25OCRluB2fZkn0onfSEqu.jpg" alt="Placeholder" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};



export default PersonalInformation;