import React from 'react';
import {capitalizeFirstLetter, formatDate} from "./Utils";

const EmployeeDetail = ({ employee, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                {/* Modal panel */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 py-5 sm:p-6">
                        {/* Avatar */}
                        <div className="flex items-center justify-between">
                            <div className="relative h-12 w-12">
                                <img className="h-full w-full rounded-full object-cover object-center" src={employee.firebaseUrl} alt="" />
                                <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                            </div>
                        </div>

                        {/* Employee details */}
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold leading-6 text-gray-900">{employee.name}</h3>
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="text-sm text-gray-500">
                                    <p className="mt-2"><span className="font-semibold">Mã nhân viên:</span> {employee.code}</p>
                                    <p className="mt-2"><span className="font-semibold">Email:</span> {employee.email}</p>
                                    <p className="mt-2"><span className="font-semibold">Số điện thoại:</span> {employee.phone}</p>
                                    <p className="mt-2"><span className="font-semibold">Ngày sinh:</span> {formatDate(employee.dob)}</p>
                                    <p className="mt-2"><span className="font-semibold">Giới tính:</span> {employee.gender}</p>
                                </div>
                                <div className="text-sm text-gray-500">
                                    <p className="mt-2"><span className="font-semibold">Bộ phận:</span> {capitalizeFirstLetter(employee.department)}</p>
                                    <p className="mt-2"><span className="font-semibold">Cấp bậc lương:</span> {employee.salaryRank}</p>
                                    <p className="mt-2"><span className="font-semibold">Địa chỉ:</span> {employee.address}</p>
                                    <p className="mt-2"><span className="font-semibold">Ngày vào làm:</span> {formatDate(employee.workDate)}</p>
                                    {employee.username && <p className="mt-2"><span className="font-semibold">Tài khoản:</span> {employee.username}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;
