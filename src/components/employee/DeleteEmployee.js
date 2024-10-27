// import "../../css/employee/deleteemployee.css"
// import {useParams} from 'react-router-dom'
// import React, {useEffect, useState} from "react";
// import {useNavigate} from 'react-router-dom'
// import * as employeeService from "../../services/EmployeeService"
// import {toast} from 'react-toastify'
// import routes from "../../configs/routes";
// import {formatDate} from "./utils/Utils";
// import * as authService from "../../services/Authenticate/AuthService"
//
// export default function DeleteEmployee() {
//     const {id} = useParams();
//     const [employeeDel, setEmployeeDel] = useState();
//     const navigate = useNavigate();
//     const token = authService.getToken();
//
//     useEffect(() => {
//         getEmployeeDel(id);
//     }, [id])
//
//     const getEmployeeDel = async () => {
//         let temp = await employeeService.findEmployeeById(id, token);
//         setEmployeeDel(temp)
//     }
//     const cancelDelete = () => {
//         navigate(routes.listEmployee)
//     }
//     const deleteEmployee = async () => {
//         let success = await employeeService.deleteEmployeeById(id, token)
//         if (success) {
//             toast.success("Bạn đã xóa thành công nhân viên: " + employeeDel.name)
//         } else {
//             toast.warning("Qúa trình xóa thất bại, vui lòng kiểm tra lại !");
//         }
//         navigate(routes.listEmployee)
//     }
//
//     if (!employeeDel) {
//         return null;
//     }
//     return (
//         <div id="de_main" className="flex flex-wrap justify-center p-8 size-full bg-red-50 shadow-md p-5">
//             <div className="mb-5">
//                     <span className="flex justify-center"><i
//                         className="fa-solid fa-triangle-exclamation fa-beat-fade fa-5x"
//                         style={{color: "#e01f1f"}}/></span>
//                 <h1 className="font-bold" style={{color: "red"}}>Xác nhận xóa nhân
//                     viên</h1>
//             </div>
//
//
//             <div className="w-full relative overflow-x-auto sm:rounded-lg ">
//                 <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
//                     <tr className=" border-b  hover:bg-gray-50 ">
//                         <th scope="row"
//                             className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
//                             Họ và tên
//                         </th>
//                         <td className="px-6 py-4 text-gray-900">
//                             {employeeDel.name}
//                         </td>
//                     </tr>
//                     <tr className=" border-b  hover:bg-gray-50 ">
//                         <th scope="row"
//                             className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
//                             Ngày sinh
//                         </th>
//                         <td className="px-6 py-4 text-gray-900">
//                             {formatDate(employeeDel.dob)}
//                         </td>
//                     </tr>
//                     <tr className=" border-b  hover:bg-gray-50 ">
//                         <th scope="row"
//                             className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
//                             Bộ phận
//                         </th>
//                         <td className="px-6 py-4 text-gray-900">
//                             {employeeDel.department}
//                         </td>
//                     </tr>
//                     <tr className=" border-b  hover:bg-gray-50 ">
//                         <th scope="row"
//                             className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
//                             Ngày vào làm
//                         </th>
//                         <td className="px-6 py-4 text-gray-900">
//                             {formatDate(employeeDel.workDate)}
//                         </td>
//                     </tr>
//                 </table>
//                 <div className="w-full flex flex-wrap mt-5">
//                     <div
//                         className="w-full sm:w-1/2 lg:w-1/2 p-2 flex justify-start items-center space-x-2"> <span>
//                                 <i className="fa-solid fa-bullhorn fa-shake fa-lg"/>
//                             </span>
//                         <span
//                             className="text-red-500"> Lưu ý: Hành động này không thể hoàn tác !</span>
//                     </div>
//                     <div className="w-full sm:w-1/2 lg:w-1/2 p-2 flex justify-end items-center space-x-2">
//                         <button className="btn bg-red-500" onClick={deleteEmployee}>
//                             <span> Xác nhận</span>
//                         </button>
//                         <button type={"reset"} className="btn bg-blue-500" onClick={cancelDelete}>
//                             <span>Hủy</span>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }