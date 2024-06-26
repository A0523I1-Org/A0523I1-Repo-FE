import React from 'react';
import {capitalizeFirstLetter, formatDate} from "../utils/Utils";

const EmployeeDetail = ({ employee, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="tw-custom-modal">
            <div className="tw-custom-div-4">
                {/* Background overlay */}
                <div className="tw-background-overlay" aria-hidden="true"></div>

                {/* Modal panel */}
                <div className="tw-custom-modal-panel">
                    <div className="tw-custom-div-5">
                        {/* Avatar */}
                        <div className="tw-custom-div-6">
                            <div className="tw-custom-div-7">
                                <img className="tw-custom-avatar" src={employee.firebaseUrl} alt="" />
                                <span className="tw-custom-span-2"></span>
                            </div>
                        </div>

                        {/* Employee details */}
                        <div className="tw-custom-div-8">
                            <h3 className="tw-custom-div-9">{employee.name}</h3>
                            <div className="tw-custom-div-10">
                                <div className="tw-custom-div-11">
                                    <p className="tw-custom-p-1"><span className="tw-custom-span-5">Mã nhân viên:</span> {employee.code}</p>
                                    <p className="tw-custom-p-1"><span className="tw-custom-span-5">Email:</span> {employee.email}</p>
                                    <p className="tw-custom-p-1"><span className="tw-custom-span-5">Số điện thoại:</span> {employee.phone}</p>
                                    <p className="tw-custom-p-1"><span className="tw-custom-span-5">Ngày sinh:</span> {formatDate(employee.dob)}</p>
                                    <p className="tw-custom-p-1"><span className="tw-custom-span-5">Giới tính:</span> {employee.gender}</p>
                                </div>
                                <div className="tw-custom-div-11">
                                    <p className="tw-custom-p-1"><span className="tw-custom-span-5">Bộ phận:</span> {capitalizeFirstLetter(employee.department)}</p>
                                    <p className="tw-custom-p-1"><span className="tw-custom-span-5">Cấp bậc lương:</span> {employee.salaryRank}</p>
                                    <p className="tw-custom-p-1"><span className="tw-custom-span-5">Địa chỉ:</span> {employee.address}</p>
                                    <p className="tw-custom-p-1"><span className="tw-custom-span-5">Ngày vào làm:</span> {formatDate(employee.workDate)}</p>
                                    {employee.username && <p className="tw-custom-p-1"><span className="tw-custom-span-5">Tài khoản:</span> {employee.username}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="tw-custom-div-12">
                        <button type="button" className="tw-custom-close-modal" onClick={onClose}> Cancel </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;