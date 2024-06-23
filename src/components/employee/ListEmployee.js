import React, {useState, useEffect} from 'react';
import Search from "./Search";
import Pagination from "./Pagination";
import {AddIcon, DeleteAllIcon} from "./icons";
import {fetchEmployees} from "../../services/EmployeeService";
import EmployeeTable from "./EmployeeTable";
import {Link} from "react-router-dom";
import EmployeeDetail from "./EmployeeDetail";

const ListEmployee = () => {

    const [employees, setEmployees] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Cập nhật hiển thị cho tài khoản đăng ký thành công
    const handleUserRegistration = (employeeId, username) => {
        setEmployees((prevEmployees) =>
            prevEmployees.map((employee) =>
                employee.id === employeeId
                    ? {...employee, account: {username}}
                    : employee
            )
        );
    };

    //Modal xem chi tiết nhân viên
    const handleOpenModal = (employee) => {
        setSelectedEmployee(employee);
    };

    const handleCloseModal = () => {
        setSelectedEmployee(null);
    };

    // Lấy dữ liệu
    const fetchData = async (page, criteria) => {
        const data = await fetchEmployees(page, criteria);
        setEmployees(data.content || []);
        setTotalPages(data.totalPages);
    };

    const handleSearch = (criteria) => {
        setSearchCriteria(criteria);
        setCurrentPage(0);
        fetchData(0, criteria);
    };

    // Xử lý Pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchData(page, searchCriteria);
        // Thực hiện hành động khác khi trang thay đổi, như tải lại dữ liệu
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
    useEffect(() => {
        fetchData(currentPage, searchCriteria);
    }, [currentPage]);

    // Sử dụng useEffect để theo dõi selectedEmployee và cập nhật isOpen
    useEffect(() => {
        // Nếu selectedEmployee có giá trị, mở modal
        // Ngược lại, đóng modal
        if (selectedEmployee) {
            console.log("Opening modal with employee:", selectedEmployee);
        } else {
            console.log("Closing modal");
        }
    }, [selectedEmployee]);

    return (
        <>
            <div className="flex justify-between mb-4">
                <div className="relative">
                    <Search onSearch={handleSearch} />
                </div>
                <div className="flex gap-2">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        <DeleteAllIcon />
                    </button>
                    <Link to="/employee/create-employee">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            <AddIcon />
                        </button>
                    </Link>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md p-4">
                {/* Table */}
                <EmployeeTable
                    employees={employees}
                    handleUserRegistration={handleUserRegistration}
                    handleOpenModal={handleOpenModal}
                />

                {/* Pagination */}
                <div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        onPreviousPage={handlePreviousPage}
                        onNextPage={handleNextPage}
                    />
                </div>
            </div>

            {selectedEmployee && (
                <EmployeeDetail
                    employee={selectedEmployee}
                    isOpen={!!selectedEmployee}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default ListEmployee;