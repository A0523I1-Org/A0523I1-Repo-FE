import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const PersonalInformation = () => {
  const [formData, setFormData] = useState({
    fullName: 'Nguyen Thi T',
    dob: '',
    gender: 'nu',
    address: '123 abc',
    phone: '123456',
    email: 'abc@gmail.com',
    password: '******',
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const editPersonalInformation = (e) => {
    e.preventDefault();
    alert('Chỉnh sửa thành công');
  };

  const menuSystem = (e) => {
    e.preventDefault();
    window.location.href = 'MenuSystem.html';
  };

  const changePassword = (e) => {
    e.preventDefault();
    alert('Đổi mật khẩu thành công');
  };

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
            <td>ThucNT</td>
          </tr>
          <tr>
            <th>Mật khẩu:</th>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <input type="password" value={formData.password} className="form-control" readOnly />
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
                value={formData.fullName}
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
                value={formData.dob}
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
                  value="nam"
                  checked={formData.gender === 'nam'}
                  onChange={handleChange}
                />
                <label htmlFor="nam">Nam</label>
                <input
                  type="radio"
                  id="nu"
                  name="gender"
                  value="nu"
                  checked={formData.gender === 'nu'}
                  onChange={handleChange}
                />
                <label htmlFor="nu">Nữ</label>
                <input
                  type="radio"
                  id="chua"
                  name="gender"
                  value="chua"
                  checked={formData.gender === 'chua'}
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
                value={formData.address}
                className="form-control"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Điện thoại(<span style={{ color: 'red' }}>*</span>):</th>
            <td>
              <input
                type="number"
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
                      <button className="btn btn-cancel" onClick={menuSystem}>Hủy</button>
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
                        value={passwords.oldPassword}
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
                    <button type="submit" className="btn btn-change">Đổi mật khẩu</button>
                    <button type="button" className="btn btn-cancel" data-bs-dismiss="modal">Hủy</button>
                  </form>
                </div>
                <div className="col-md-4 d-flex align-items-center">
                  <img src="https://via.placeholder.com/150" alt="Placeholder" className="img-fluid" />
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