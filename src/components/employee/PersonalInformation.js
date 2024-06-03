import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";


function PersonalInformation() {

    const [employeeInfo, setEmployeeInfo] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchEmployeeInfo = async () => {
        try {
          const response = await axios.get('http://localhost:8080/my-info');
          setEmployeeInfo(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchEmployeeInfo();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!employeeInfo) {
      return <div>No employee information found</div>;
    }

    return (
        <div id="personalInformation">
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th colSpan="2" className="abc">Thông tin cá nhân</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Tài khoản:</th>
                        <td>{employeeInfo.username}</td>
                    </tr>
                    <tr>
                        <th>Mật khẩu:</th>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type="password" placeholder="******" className="form-control" aria-label="" aria-describedby="basic-addon1" />
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
                        <td>{employeeInfo.name}</td>
                    </tr>
                    <tr>
                        <th>Ngày sinh(<span style={{ color: 'red' }}>*</span>):</th>
                        <td>{employeeInfo.dob}</td>
                    </tr>
                    <tr>
                        <th>Giới tính:</th>
                        <td>{employeeInfo.gender}</td>   
                    </tr>
                    <tr>
                        <th>Địa chỉ(<span style={{ color: 'red' }}>*</span>):</th>
                        <td>{employeeInfo.address}</td>
                    </tr>
                    <tr>
                        <th>Điện thoại(<span style={{ color: 'red' }}>*</span>):</th>
                        <td>{employeeInfo.phone}</td>
                    </tr>
                    <tr>
                        <th>Email(<span style={{ color: 'red' }}>*</span>):</th>
                        <td>
                            <input type="email" className="form-control" aria-label="" aria-describedby="basic-addon1" placeholder="abc@gmail.com" />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <button className="btn btn-change" onClick={() => alert('editPersonalInformation')}>Chỉnh sửa</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-cancel" onClick={() => alert('menuSystem')}>Hủy</button>
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
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="oldPassword" className="form-label">Mật khẩu cũ</label>
                                            <input type="password" className="form-control" id="oldPassword" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                                            <input type="password" className="form-control" id="newPassword" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="confirmPassword" className="form-label">Nhập lại mật khẩu</label>
                                            <input type="password" className="form-control" id="confirmPassword" />
                                        </div>
                                        <button type="submit" className="btn btn-change" onClick={(e) => { e.preventDefault(); alert('thanhCong'); }}>Đổi mật khẩu</button>
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
}

export default PersonalInformation;