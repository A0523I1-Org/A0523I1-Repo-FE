import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SignUpDialog from "./SignUpDialog";

const ListEmployee = () => {

    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleUserRegistration = (employeeId, username) => {
        setEmployees((prevEmployees) =>
            prevEmployees.map((employee) =>
                employee.id === employeeId
                    ? { ...employee, account: { username } }
                    : employee
            )
        );
        setSelectedEmployee(null);
    };

    useEffect(() => {
        fetchEmployees(currentPage);
    }, [currentPage]);

    const fetchEmployees = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/employee?page=${page}`);
            console.log(response.data);
            setEmployees(response.data.content || []);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching employee data:', error);
            setEmployees([]);
            setTotalPages(1);
        }
    };

    const capitalizeFirstLetter = (string) => {
        if (!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    return (
        <>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 p-4">
                <div className="flex justify-between mb-4">
                    <div className="relative">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.232 15.232l4.768 4.768M6.5 11a4.5 4.5 0 108 0 4.5 4.5 0 00-8 0z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 4.5L19.5 19.5M19.5 4.5L4.5 19.5"
                                />
                            </svg>
                        </button>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75H19.5M16.5 8.25h-.008M16.5 8.25A4.745 4.745 0 0112 3.75c-2.623 0-4.75 2.127-4.75 4.75 0 2.623 2.127 4.75 4.75 4.75 2.623 0 4.75-2.127 4.75-4.75h.008M4.5 20.25H9.75m4.5 0h4.5m.75 0H18.75 12H5.25m-.75 0H3"
                                />
                            </svg>
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 10.5V15h-3v-3H8.25v3H7.5v-4.5"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8-8-3.59-8-8zm4.5-2.25h3.75"
                                />
                            </svg>
                        </button>
                        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 6.6v10.8a.6.6 0 01-.6.6H5.1a.6.6 0 01-.6-.6V6.6a.6.6 0 01.6-.6h2.582a8.625 8.625 0 0012.236 0H18.9a.6.6 0 01.6.6v0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.945 3.935A8.625 8.625 0 0013.055 6a8.625 8.625 0 01-4.792 0c.87-.62 1.704-1.312 2.682-2.065z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <table className="w-full border-collapse block md:table bg-white text-left text-sm text-gray-500">
                    <thead className="block md:table-header-group bg-gray-50">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                        <th
                            scope="col"
                            className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"
                        >
                            Select
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
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"></th>
                    </tr>
                    </thead>
                    <tbody className="block md:table-row-group divide-y divide-gray-100 border-t border-gray-100">
                        {employees.map((employee) => (
                            <tr key={employee.id} className="hover:bg-gray-50 bg-white md:border-none block md:table-row">
                                <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                    />
                                </td>
                                <td className="flex gap-3 px-6 py-4 font-normal text-gray-900 md:border md:border-grey-500 text-left block md:table-cell">
                                    <span className="inline-block w-1/3 md:hidden font-bold">Employee</span>
                                    <div className="relative h-10 w-10">
                                        <img
                                            className="h-full w-full rounded-full object-cover object-center"
                                            src={employee.firebaseUrl}
                                            alt=""
                                        />
                                        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium text-gray-700">{employee.name}</div>
                                        <div className="text-gray-400">{employee.code}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                                    {employee.account ? (
                                        <span
                                            className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                            {employee.account.username}
                                        </span>
                                    ) : (
                                        <SignUpDialog employeeId={employee.id} onUserRegistered={handleUserRegistration} />
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
                                    {capitalizeFirstLetter(employee.department.name)}
                                </td>
                                <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                                    <span className="inline-block w-1/3 md:hidden font-bold">Salary Rank</span>
                                    {employee.salaryRank.salaryRank}
                                </td>
                                <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                                    <div className="flex justify-end gap-4">
                                        <a x-data="{ tooltip: 'Delete' }" href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="currentColor" className="h-6 w-6"
                                                 x-tooltip="tooltip">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                            </svg>
                                        </a>
                                        <a x-data="{ tooltip: 'Edite' }" href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="currentColor" className="h-6 w-6"
                                                 x-tooltip="tooltip">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                                            </svg>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <nav aria-label="Page navigation example" className="flex justify-center mt-4">
                    <ul className="flex items-center -space-x-px h-8 text-sm">
                        <li>
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 0}
                                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 0 && 'cursor-not-allowed opacity-50'}`}
                            >
                                <span className="sr-only">Previous</span>
                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                                </svg>
                            </button>
                        </li>
                        {[...Array(totalPages).keys()].map((page) => (
                            <li key={page} className="flex items-center justify-center">
                                <button
                                    onClick={() => setCurrentPage(page)}
                                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === page && 'z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'}`}
                                >
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages - 1}
                                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages - 1 && 'cursor-not-allowed opacity-50'}`}
                            >
                                <span className="sr-only">Next</span>
                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default ListEmployee;