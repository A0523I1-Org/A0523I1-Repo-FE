import React from 'react';
import {formatDate} from "../utils/Utils";
import "../../../css/employee/deleteemployee.css"
import * as employeeService from "../../../services/EmployeeService"
import {toast} from 'react-toastify'
import * as authService from "../../../services/Authenticate/AuthService"

const DeleteEmployeeModal = ({employee, isOpen, onClose}) => {
    const token = authService.getToken();
    const deleteEmployee = async () => {
        await employeeService.deleteEmployeeById(employee.id, token)
            .then((success) => {
                if (success) {
                    toast.success("Bạn đã xóa thành công nhân viên: " + employee.name)
                } else {
                    toast.warning("Qúa trình xóa thất bại, vui lòng kiểm tra lại !");
                }
            })
    }
    if (!isOpen) return null;

    return (
        <div className="tw-custom-modal">
            <div className="tw-custom-div-4">
                {/* Background overlay */}
                <div className="tw-background-overlay" aria-hidden="true"></div>
                {/* Modal panel */}
                <div className="tw-custom-modal-panel">
                    <div id="de_main" className="flex flex-wrap justify-center p-8 size-full bg-red-50 shadow-md p-5">
                        <div className="mb-5">
                    <span className="flex justify-center"><i
                        className="fa-solid fa-triangle-exclamation fa-beat-fade fa-5x"
                        style={{color: "#e01f1f"}}/></span>
                            <h1 className="font-bold" style={{color: "red"}}>Xác nhận xóa nhân
                                viên</h1>
                        </div>


                        <div className="w-full relative overflow-x-auto sm:rounded-lg ">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <tr className=" border-b  hover:bg-gray-50 ">
                                    <th scope="row"
                                        className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
                                        Họ và tên
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {employee.name}
                                    </td>
                                </tr>
                                <tr className=" border-b  hover:bg-gray-50 ">
                                    <th scope="row"
                                        className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
                                        Bộ phận
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {employee.department}
                                    </td>
                                </tr>
                                <tr className=" border-b  hover:bg-gray-50 ">
                                    <th scope="row"
                                        className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
                                        Ngày vào làm
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {formatDate(employee.workDate)}
                                    </td>
                                </tr>
                            </table>
                            <div className="w-full flex flex-wrap mt-5">
                                <div
                                    className="w-full sm:w-1/2 lg:w-1/2 p-2 flex justify-start items-center space-x-2"> <span>
                                <i className="fa-solid fa-bullhorn fa-shake fa-lg"/>
                            </span>
                                    <span
                                        className="text-red-500"> Lưu ý: Hành động này không thể hoàn tác !</span>
                                </div>
                                <div className="w-full sm:w-1/2 lg:w-1/2 p-2 flex justify-end items-center space-x-2">
                                    <button className="btn bg-red-500" onClick={() => {
                                        deleteEmployee()
                                        onClose()
                                    }}>
                                        <span> Xác nhận</span>
                                    </button>
                                    <button type={"reset"} className="btn bg-blue-500" onClick={onClose}>
                                        <span>Hủy</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteEmployeeModal;