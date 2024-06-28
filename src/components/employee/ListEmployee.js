import React, {useState, useEffect} from 'react';
import Search from "./child_list/Search";
import Pagination from "./child_list/Pagination";
import {AddIcon, DeleteAllIcon} from "./utils/Icons";
import {fetchEmployees} from "../../services/EmployeeService";
import EmployeeTable from "./child_list/EmployeeTable";
import {Link} from "react-router-dom";
import EmployeeDetail from "./child_list/EmployeeDetail";
import "../../css/employee/styles.css";
import routes from "../../configs/routes";
import * as authService from "../../services/Authenticate/AuthService"
import SearchNotFound from "./child_list/SearchNotFound";

const ListEmployee = () => {

    const [employees, setEmployees] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const token = authService.getToken();
    // Cập nhật hiển thị cho tài khoản đăng ký thành công
    const handleUserRegistration = (employeeId, username) => {
        setEmployees((prevEmployees) =>
            prevEmployees.map((employee) =>
                employee.id === employeeId
                    ? {...employee, username: username}
                    : employee
            )
        );
    };

    //Modal xem chi tiết nhân viên
    const handleOpenModal = (employee) => setSelectedEmployee(employee);
    const handleCloseModal = () => setSelectedEmployee(null);

    // Lấy dữ liệu
    const fetchData = async (page, criteria) => {
        const data = await fetchEmployees(page, criteria, token);
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

    return (
        <>
            <div className="flex justify-between mx-16 mb-4">
                <div className="relative">
                    <Search onSearch={handleSearch} />
                </div>
                <div className="flex gap-2">
                    <Link to = {routes.createEmployee}>
                        <button className="tw-add-button">
                            <AddIcon />
                        </button>
                    </Link>
                    <button className="tw-delete-all-button">
                        <DeleteAllIcon />
                    </button>
                </div>
            </div>

            <div className="tw-table-zone">
                {/* Table */}
                <EmployeeTable
                    employees={employees}
                    handleUserRegistration={handleUserRegistration}
                    handleOpenModal={handleOpenModal}
                />
            </div>
            {employees?.length === 0 && (
                <div className=" mx-16 h-10 ">
                    <SearchNotFound onFetchData={() => fetchData(1, {})}/>
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
            />

            {/*Modal Employee Detail*/}
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