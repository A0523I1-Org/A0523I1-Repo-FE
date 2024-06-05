import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as employeeService from "../../services/EmployeeService";
import * as accountService from "../../services/AccountService";
import '../../css/employee/PersonalInformation.css';
import axios from "axios";

const PersonalInformation = () => {
  const [formData, setFormData] = useState();

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswords({
      ...passwords,
      [name]: value
    });
  };

  const changePassword = async (event) => {
    event.preventDefault();
    console.log(passwords.oldPassword);
    console.log(passwords.newPassword);
    console.log(passwords.confirmPassword);

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Mật khẩu mới không khớp');
      return;
    }

    // try {
      const token = localStorage.getItem('token');
      const response = await accountService.changePassword(token, passwords.oldPassword, passwords.newPassword);

      alert(response.message)
    // }
    // catch (error) {
    //   alert('Đã xảy ra lỗi khi đổi mật khẩu.');
    //   console.error(error);
    // }
  };


  const editPersonalInformation = (e) => {
    e.preventDefault();
    alert('Chỉnh sửa thành công');
  };

  if (formData == null) {
    return ;
  }

  return (
    <div className="container personal_form">
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
                  onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Mật khẩu:</th>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <input type="password" value={"******"} className="form-control" readOnly />
                    </td>
                    <td>
                      <button className="btn btn-change" data-bs-toggle="modal" data-bs-target="#changePasswordModal">Đổi mật khẩu</button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Ngày sinh(<span style={{ color: 'red' }}>*</span>):</th>
            <td>
              <input
                type="date"
                name="dob"
                value= {formData.dob.slice(0,10)}
                className="form-control"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Giới tính:</th>
            <td>
              <div>
                <input
                  type="radio"
                  id="nam"
                  name="gender"
                  value="name"
                  checked={formData.gender === 'Nam'}
                  onChange={handleChange}
                />
                <label htmlFor="nam">Nam</label>

                <input
                  type="radio"
                  id="nu"
                  name="gender"
                  value="nu"
                  checked={formData.gender === 'Nữ'}
                  onChange={handleChange}
                />
                <label htmlFor="nu">Nữ</label>

                <input
                  type="radio"
                  id="chua"
                  name="gender"
                  value="chua"
                  checked={formData.gender === 'Chưa xác định'}
                  onChange={handleChange}
                />
                <label htmlFor="chua">Chưa xác định</label>
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <button className="btn btn-change" onClick={editPersonalInformation}>Chỉnh sửa</button>
                    </td>
                    <td>
                      <button className="btn btn-cancel">Hủy</button>
                    </td>
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
                        // value={passwords.oldPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        name="newPassword"
                        // value={passwords.newPassword}
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
                    <button type="submit" className="btn btn-change">Đổi mật khẩu</button>
                    <button type="button" className="btn btn-cancel" data-bs-dismiss="modal">Hủy</button>
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