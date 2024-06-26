import React from 'react';
import {capitalizeFirstLetter} from "../utils/Utils";
import {DeleteIcon, DetailIcon, EditIcon} from "../utils/Icons";
import Register from "./Register";
import {Link} from "react-router-dom";
import "../../../css/employee/styles.css";
import routes from "../../../configs/routes";

const EmployeeTable = ({employees, handleUserRegistration, handleOpenModal}) => {

    return (
        <>
            <table className="tw-custom-table">
                <thead className="tw-custom-thead">
                <tr className="tw-custom-first-tr">
                    <th scope="col" className="tw-custom-th"> Lựa chọn </th>
                    <th scope="col" className="tw-custom-th"> Nhân viên </th>
                    <th scope="col" className="tw-custom-th"> Tài khoản </th>
                    <th scope="col" className="tw-custom-th"> Liên hệ </th>
                    <th scope="col" className="tw-custom-th"> Bộ phận </th>
                    <th scope="col" className="tw-custom-th"> Cấp bậc lương </th>
                    <th scope="col" className="tw-custom-th"> </th>
                </tr>
                </thead>
                <tbody className="tw-custom-tbody">
                {employees.map((employee) => (
                    <tr key={employee.id} className="tw-custom-second-tr">
                        <td className="tw-custom-td">
                            <input type="checkbox" className="tw-custom-checkbox" />
                        </td>
                        <td className="tw-custom-td-multi">
                            <span className="tw-custom-span-1">Employee</span>
                            <div className="tw-custom-div-1">
                                <img className="tw-custom-avatar" src={employee.firebaseUrl} alt="" />
                                <span className="tw-custom-span-2"></span>
                            </div>
                            <div className="tw-custom-div-2">
                                <div className="tw-custom-div-2-child-1">{employee.name}</div>
                                <div className="tw-custom-div-2-child-2">{employee.code}</div>
                            </div>
                        </td>
                        <td className="tw-custom-td">
                            {employee.username ? (
                                <span className="tw-custom-span-3">
                                <span className="tw-custom-span-4"></span>
                                    {employee.username}
                            </span>
                            ) : (
                                <Register employeeId={employee.id} onUserRegistered={handleUserRegistration}/>
                            )}
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1">Liên hệ</span>
                            <div className="tw-custom-div-2">
                                <div>{employee.email}</div>
                                <div>{employee.phone}</div>
                            </div>
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1">Department</span>
                            <div>{capitalizeFirstLetter(employee.department)}</div>
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1">Salary Rank</span>
                            {employee.salaryRank}
                        </td>
                        <td className="tw-custom-td">
                            <div className="tw-custom-div-3">
                                <a x-data="{ tooltip: 'Detail' }" href="#" onClick={() => handleOpenModal(employee)}>
                                    <DetailIcon />
                                </a>
                                <Link to={routes.deleteEmployee + employee.id} x-data="{ tooltip: 'Delete' }">
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