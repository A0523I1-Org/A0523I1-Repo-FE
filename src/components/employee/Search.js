import React, {useEffect, useState} from 'react';
import {CloseIcon, RefreshIcon, SearchIcon, SearchInputIcon, SearchSubmitIcon} from "./Icons";
import {capitalizeFirstLetter} from "./utils/Util";
import {getAllDepartments} from "../../services/DepartmentService";
import {getAllSalaryRanks} from "../../services/SalaryRankService";

const Search = ({onSearch}) => {
    const [departments, setDepartments] = useState([]);
    const [salaryRanks, setSalaryRanks] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({
        code: '',
        name: '',
        dob: '',
        dobFrom: '',
        dobTo: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
        workDate: '',
        workDateFrom: '',
        workDateTo: '',
        departmentId: '',
        salaryRankId: '',
        accountUsername: ''
    });
    const [toggleDateRange, setToggleDateRange] = useState(false);
    const [toggleDobRange, setToggleDobRange] = useState(false);

    //lấy dữ liệu
    const fetchDepartmentsAndSalaryRanks = async () => {
        const departmentsData = await getAllDepartments();
        setDepartments(departmentsData);

        const salaryRanksData = await getAllSalaryRanks();
        setSalaryRanks(salaryRanksData);
    };

    useEffect(() => {
        fetchDepartmentsAndSalaryRanks();
    }, []);

    const toggleDateRangeSwitch = () => {
        setToggleDateRange(!toggleDateRange);
        setSearchCriteria((prevCriteria) => {
            if (toggleDateRange) {
                return {...prevCriteria, workDate: ''};
            } else {
                return {...prevCriteria, workDateFrom: '', workDateTo: ''};
            }
        });
    };

    const toggleDobRangeSwitch = () => {
        setToggleDobRange(!toggleDobRange);
        setSearchCriteria((prevCriteria) => {
            if (toggleDateRange) {
                return {...prevCriteria, dob: ''};
            } else {
                return {...prevCriteria, dobFrom: '', dobTo: ''};
            }
        });
    };

    //đóng mở search
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    //update giá trị search
    const handleChange = (e) => {
        const {name, value} = e.target;
        setSearchCriteria((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    //thực hiện search
    const handleSearch = () => {
        console.log(searchCriteria);
        onSearch(searchCriteria);
        setDropdownVisible(false);
    };

    //reset nhập liệu
    const handleRefresh = () => {
        setSearchCriteria({
            code: '',
            name: '',
            dob: '',
            dobFrom: '',
            dobTo: '',
            gender: '',
            address: '',
            phone: '',
            email: '',
            workDate: '',
            workDateFrom: '',
            workDateTo: '',
            departmentId: '',
            salaryRankId: '',
            accountUsername: ''
        });
        onSearch(null); // Assuming this resets the search results
    };

    const inputClassName = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    const selectClassName = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

    return (
        <div className="relative">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={toggleDropdown}>
                <SearchIcon/>
            </button>

            <div id="dropdownSearch"
                 className={`z-10 ${dropdownVisible ? '' : 'hidden'} absolute top-full left-0 mt-2 bg-white rounded-lg shadow w-100 dark:bg-gray-700 overflow-y-auto`}
                 style={{maxHeight: '400px', width: '300px'}}>
                <div className="p-3">
                    <label htmlFor="code" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <SearchInputIcon/>
                        </div>
                        <input type="text" id="code" name="code" className={inputClassName} placeholder="Mã nhân viên"
                               value={searchCriteria.code} onChange={handleChange}/>
                    </div>
                </div>
                <div className="p-3">
                    <label htmlFor="name" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <SearchInputIcon/>
                        </div>
                        <input type="text" id="name" name="name" className={inputClassName} placeholder="Tên nhân viên"
                               value={searchCriteria.name} onChange={handleChange}/>
                    </div>
                </div>
                <div className="p-3">
                    <label htmlFor="username" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <SearchInputIcon/>
                        </div>
                        <input type="text" id="username" name="accountUsername" className={inputClassName}
                               placeholder="Tài khoản" value={searchCriteria.accountUsername} onChange={handleChange}/>
                    </div>
                </div>
                <div className="p-3">
                    <label htmlFor="email" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <SearchInputIcon/>
                        </div>
                        <input type="text" id="email" name="email" className={inputClassName} placeholder="Email"
                               value={searchCriteria.email} onChange={handleChange}/>
                    </div>
                </div>
                <div className="p-3">
                    <label htmlFor="phone" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <SearchInputIcon/>
                        </div>
                        <input type="text" id="phone" className={inputClassName} placeholder="Số điện thoại"
                               value={searchCriteria.phone} onChange={handleChange}/>
                    </div>
                </div>
                <div className="p-3">
                    <label htmlFor="department"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bộ phận</label>
                    <select id="department" name="departmentId" className={selectClassName}
                            value={searchCriteria.departmentId} onChange={handleChange}>
                        <option selected value=""></option>
                        {departments.map(department => (
                            <option key={department.id}
                                    value={department.id}>{capitalizeFirstLetter(department.name)}</option>
                        ))}
                    </select>
                </div>
                <div className="p-3">
                    <label htmlFor="salaryRank"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cấp bậc
                        lương</label>
                    <select id="salaryRank" name="salaryRankId" className={selectClassName}
                            value={searchCriteria.salaryRankId} onChange={handleChange}>
                        <option selected value=""></option>
                        {salaryRanks.map(salaryRank => (
                            <option key={salaryRank.id} value={salaryRank.id}>{salaryRank.salaryRank}</option>
                        ))}
                    </select>
                </div>
                <div className="p-3">
                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giới
                        tính</label>
                    <select id="gender" name="gender" className={selectClassName} value={searchCriteria.gender}
                            onChange={handleChange}>
                        <option selected value=""></option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>

                <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Ngày sinh
                        </label>
                        <div className="inline-flex items-center cursor-pointer" onClick={toggleDobRangeSwitch}>
                            <input type="checkbox" checked={toggleDobRange} onChange={toggleDobRangeSwitch}
                                   className="sr-only peer"/>
                            <div
                                className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                        {toggleDobRange ? (
                            <>
                                <div className="flex items-center space-x-3">
                                    <label htmlFor="dobFrom"
                                           className="text-sm font-medium text-gray-500 dark:text-gray-300">Từ</label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <SearchInputIcon/>
                                        </div>
                                        <input type="date" id="dobFrom" name="dobFrom" className={inputClassName}
                                               placeholder="Từ ngày sinh" value={searchCriteria.dobFrom}
                                               onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <label htmlFor="dobTo"
                                           className="text-sm font-medium text-gray-500 dark:text-gray-300">Đến</label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <SearchInputIcon/>
                                        </div>
                                        <input type="date" id="dobTo" name="dobTo" className={inputClassName}
                                               placeholder="Đến ngày sinh" value={searchCriteria.dobTo}
                                               onChange={handleChange}/>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <SearchInputIcon/>
                                    </div>
                                    <input type="date" id="dob" name="dob" className={inputClassName}
                                           placeholder="Ngày sinh" value={searchCriteria.dob} onChange={handleChange}/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-3">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa
                        chỉ</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <SearchInputIcon/>
                        </div>
                        <input type="text" id="address" name="address" className={inputClassName} placeholder="Địa chỉ"
                               value={searchCriteria.address} onChange={handleChange}/>
                    </div>
                </div>

                <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="workDate" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Ngày làm việc
                        </label>
                        <div className="inline-flex items-center cursor-pointer" onClick={toggleDateRangeSwitch}>
                            <input type="checkbox" checked={toggleDateRange} onChange={toggleDateRangeSwitch}
                                   className="sr-only peer"/>
                            <div
                                className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                        {toggleDateRange ? (
                            <>
                                <div className="flex items-center space-x-3">
                                    <label htmlFor="workDateFrom"
                                           className="text-sm font-medium text-gray-500 dark:text-gray-300">Từ</label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <SearchInputIcon/>
                                        </div>
                                        <input type="date" id="workDateFrom" name="workDateFrom"
                                               className={inputClassName}
                                               placeholder="Từ ngày làm việc" value={searchCriteria.workDateFrom}
                                               onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <label htmlFor="workDateTo"
                                           className="text-sm font-medium text-gray-500 dark:text-gray-300">Đến</label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <SearchInputIcon/>
                                        </div>
                                        <input type="date" id="workDateTo" name="workDateTo" className={inputClassName}
                                               placeholder="Đến ngày làm việc" value={searchCriteria.workDateTo}
                                               onChange={handleChange}/>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <SearchInputIcon/>
                                    </div>
                                    <input type="date" id="workDate" name="workDate" className={inputClassName}
                                           placeholder="Ngày làm việc" value={searchCriteria.workDate}
                                           onChange={handleChange}/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                <div className="p-3 flex justify-around sticky bottom-0 bg-white dark:bg-gray-700">

                    <div onClick={handleSearch}>
                        <SearchSubmitIcon/>
                    </div>


                    <div onClick={handleRefresh}>
                        <RefreshIcon/>
                    </div>

                    <div onClick={toggleDropdown}>
                        <CloseIcon/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;