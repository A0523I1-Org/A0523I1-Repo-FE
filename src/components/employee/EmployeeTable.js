import React from 'react';
import {capitalizeFirstLetter} from "./utils";
import {DeleteIcon, DetailIcon, EditIcon} from "./icons";
import Register from "./Register";
import {Link} from "react-router-dom";
import EmployeeDetail from "./EmployeeDetail";

const EmployeeTable = ({employees, handleUserRegistration, handleOpenModal}) => {

    return (
        <>
            <table className="w-full border-collapse block md:table bg-white text-left text-sm text-gray-500">
                <thead className="block md:table-header-group bg-gray-50">
                <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                    <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"
                    >
                        Lựa chọn
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"
                    >
                        Nhân viên
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"
                    >
                        Tài khoản
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"
                    >
                        Liên hệ
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"
                    >
                        Bộ phận
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"
                    >
                        Cấp bậc lương
                    </th>
                    <th scope="col"
                        className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"></th>
                </tr>
                </thead>
                <tbody className="block md:table-row-group divide-y divide-gray-100 border-t border-gray-100">
                {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50 bg-white md:border-none block md:table-row">
                        <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                        </td>
                        <td className="flex gap-3 px-6 py-4 font-normal text-gray-900 md:border md:border-grey-500 text-left block md:table-cell">
                            <span className="inline-block w-1/3 md:hidden font-bold">Employee</span>
                            <div className="relative h-10 w-10">
                                <img className="h-full w-full rounded-full object-cover object-center" src={employee.firebaseUrl} alt="" />
                                <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                            </div>
                            <div className="text-sm">
                                <div className="font-medium text-gray-700">{employee.name}</div>
                                <div className="text-gray-400">{employee.code}</div>
                            </div>
                        </td>
                        <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                            {employee.username ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                    {employee.username}
                            </span>
                            ) : (
                                <Register employeeId={employee.id} onUserRegistered={handleUserRegistration}/>
                            )}
                        </td>
                        <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                            <span className="inline-block w-1/3 md:hidden font-bold">Liên hệ</span>
                            <div className="text-sm">
                                <div>{employee.email}</div>
                                <div>{employee.phone}</div>
                            </div>
                        </td>
                        <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                            <span className="inline-block w-1/3 md:hidden font-bold">Department</span>
                            <div>{capitalizeFirstLetter(employee.department)}</div>
                        </td>
                        <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                            <span className="inline-block w-1/3 md:hidden font-bold">Salary Rank</span>
                            {employee.salaryRank}
                        </td>
                        <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                            <div className="flex justify-end gap-4">
                                {/*<a x-data="{ tooltip: 'Delete' }" href="#">*/}
                                {/*    <DeleteIcon/>*/}
                                {/*</a>*/}
                                <a x-data="{ tooltip: 'Detail' }" href="#" onClick={() => handleOpenModal(employee)}>
                                    <DetailIcon />
                                </a>
                                <Link to={`/employee/delete-employee/${employee.id}`} x-data="{ tooltip: 'Delete' }">
                                    <DeleteIcon />
                                </Link>
                                <a x-data="{ tooltip: 'Edit' }" href="#">
                                    <EditIcon/>
                                </a>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default EmployeeTable;