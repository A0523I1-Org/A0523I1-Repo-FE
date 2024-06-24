import "./list.css";
import {useEffect, useState} from "react";
import * as customerService from "../../services/CustomerService";
import {useNavigate} from "react-router-dom";
import ReactPaginate from "react-paginate";

import {toast} from "react-toastify";


// import {getPage} from "../../services/CustomerService";
import ConfirmationPopup from "./ConfirmationPopup";
import PopUpDelete from "./PopUpDelete";
import Modal from "./Modal";



const ListCustomer = () => {
    const [customers, setCustomers] = useState([]);
    // const [selectedIds, setSelectedIds] = useState([]);
    const navigate = useNavigate();
    const [popupAction, setPopupAction] = useState('single'); // or 'multiple'
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalPages, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [isSearching, setIsSearching] = useState(false);

    const handleReset = () => {
        getListPage(0);
        setIsSearching(false);
        setCurrentPage(0);  //reset lại giá trị của currentPage
        document.getElementById("nameSearch").value = "";
    }


    const handlePageClick = (event) => {
        console.log("check ev:", event.selected);
        setCurrentPage(event.selected);// Lưu lại giá trị của currentPage khi click vào nút phân trang
        console.log("current : ",currentPage)

        if (isSearching) {
            handleSearch(+event.selected);
        } else {
            getListPage(+event.selected);
        }
    };

    const getListPage = async (page) => {
        let resPage = await customerService.getPage(page);
        // console.log(resPage)
        setCustomers(resPage.content);
        setTotalPage(resPage.totalPages)
    }


    useEffect(() => {
        getListPage(0);
    }, []);

    const handleSearch = async (page = 0) => {
        const nameSearch = document.getElementById("nameSearch").value;
        if (!nameSearch) {
            document.getElementById("nameSearch").classList.add("is-invalid");
        } else {
            document.getElementById("nameSearch").classList.remove("is-invalid");
            try {
                const listSearch = await customerService.searchByName(page, nameSearch);
                // console.log(listSearch)
                if (listSearch) {
                    console.log("so page :",page);
                    setTotalPage(listSearch.totalPages);
                    setCustomers(listSearch.content)
                    setIsSearching(true);
                    setCurrentPage(page);
                    console.log("current z: ",page)
                } else {
                    toast.info(`Khách hàng : ${nameSearch} Không tồn tại.`, {
                        position: "top-center",
                        style: {
                            color: "red"
                        }
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    };
// const handleSearchPageClick = async (page) => {
    //     const nameSearch = document.getElementById("nameSearch").value;
    //     try {
    //         const listSearch = await customerService.searchByName(page, nameSearch);
    //         console.log(listSearch);
    //         if (listSearch) {
    //             setTotalPage(listSearch.totalPages);
    //             setCustomers(listSearch.content);
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };


    useEffect(() => {
        const fetchData = async () => {
            let resPage = await customerService.getPage(0);
            setTotalCustomers(resPage.totalElements);
        };
        fetchData();

        // Clean up function
        return () => {
            // Clean up any resources here
        };
    }, [totalCustomers]);


    const handleCheckSumCustomer = async () => {
        let resPage = await customerService.getPage(0);
        setTotalCustomers(resPage.totalElements);
        toast.dark(`Tổng số khách hàng : ${totalCustomers} người`,
            {
                position: "top-center"
            });
    }


    const formatDate = (input) => {
        const date = (input instanceof Date) ? input : new Date(input);
        const options = {day: "2-digit", month: "2-digit", year: "numeric"};
        return date.toLocaleDateString("vi-VN", options);
    };
    const {
        handleDelete,
        showPopup,
        confirmDelete,
        toggleSelect,
        handleDeleteIds,
        selectedIds,
        cancelDelete,
    } = PopUpDelete(setCustomers, setTotalCustomers);

    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleDetailClick = (customer) => {
        setSelectedCustomer(customer);
    };
    const handleModalClose = () => {
        setSelectedCustomer(null);
    };

    return  <>
        <div id="tt" className="container">
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 p-4">
                <h1 className="text-center text-amber-700 text-4xl font-bold py-3 shadow-sm text-shadow">Danh Sách Khách
                    Hàng</h1>


                <div className="flex justify-between mb-4">
                    <div className="relative flex items-center">
                        <input
                            className="h-11 mr-2 w-80
                             border-2 border-blue-200
                             hover:border-blue-500 hover:border-2
                             active:boder-red-500
                             transition-all duration-300 ease-in-out
                             rounded-xl px-3"
                            type="text"
                            name="name"
                            id="nameSearch"
                            placeholder="Nhập tên khách hàng"
                            onKeyDown={(e) => e.key === 'Enter' ? handleSearch() : null}
                        />
                        <button onClick={() => handleSearch()}

                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.232 15.232l4.768 4.768M6.5 11a4.5 4.5 0 108 0 4.5 4.5 0 00-8 0z"/>
                            </svg>
                        </button>

                        <button
                            onClick={() => handleReset()}
                            className=" mx-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
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
                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="relative">

                    </div>
                    <div className="flex gap-2">

                        <button onClick={() => {
                            navigate("/customer/create-customer")
                        }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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
                                    d="M12 6v12m6-6H6"
                                />
                            </svg>
                        </button>

                        <button onClick={() => handleCheckSumCustomer()}
                                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
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
                        <button onClick={handleDeleteIds}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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

                    </div>

                </div>
                {(customers && customers.length > 0) ?
                <table className="w-full border-collapse block md:table bg-white text-left text-sm text-gray-500">
                    <thead className="block md:table-header-group bg-gray-50">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                        <th
                            scope="col"
                            className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"
                        >
                            Lựa Chọn
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 text-center font-medium text-gray-900 text-left block md:table-cell"
                        >
                            Tên khách hàng
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 text-center font-medium text-gray-900 text-left block md:table-cell"
                        >
                            Ngày Sinh
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 text-center font-medium text-gray-900 text-left block md:table-cell"
                        >
                            Giới Tính
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 text-center font-medium text-gray-900 text-left block md:table-cell"
                        >
                            Điện Thoại
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-4 text-center font-medium text-gray-900 text-left block md:table-cell"
                        >
                            Tên Công Ty
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-4 text-center font-medium text-gray-900 text-left block md:table-cell"
                        >
                            Xem Chi Tiết
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-4 text-center font-medium text-gray-900 text-left block md:table-cell"
                        >
                            Chức Năng
                        </th>
                    </tr>
                    </thead>
                    <tbody className="block md:table-row-group divide-y divide-gray-100 border-t border-gray-100">
                    {   customers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-50 bg-white md:border-none block md:table-row">
                            <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell flex justify-center items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                    checked={selectedIds.includes(customer.id)}
                                    onChange={() => toggleSelect(customer.id)}
                                />
                            </td>
                            <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                                <span className="inline-block w-1/3 md:hidden font-bold text-2">customer Code</span>
                                <span className="text-md">{customer.name}</span>
                            </td>
                            <td className="flex gap-3 px-6 py-4 font-normal text-gray-900 md:border md:border-grey-500 text-left block md:table-cell">
                                <div className="text-sm">
                                    <div className="text-md">{formatDate(customer.dob)}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                                {customer.gender}
                            </td>

                            <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                                {customer.phone}
                            </td>

                            <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                                {customer.companyName}
                            </td>

                            <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                                <div className="flex justify-center items-center">
                                        <button   data-modal-target="crud-modal"
                                                  data-modal-toggle="crud-modal"
                                                  onClick={() => handleDetailClick(customer)}
                                        >
                                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                            </svg>
                                        </div>
                                    </button>

                                </div>
                            </td>

                            <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                                <div className="flex justify-end gap-4">
                                    <button x-data="{ tooltip: 'Delete' }" href="#"
                                            onClick={() => handleDelete(customer.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor"
                                             className="h-6 w-6 text-red-500 hover:scale-110  transform"
                                             x-tooltip="tooltip">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                        </svg>
                                    </button>
                                    <button x-data="{ tooltip: 'Edite' }" href="#" onClick={() =>
                                        navigate(`/customer/edit-customer/${customer.id}`)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor"
                                             className="h-6 w-6 hover:scale-110 text-yellow-500"
                                             x-tooltip="tooltip">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                                        </svg>

                                    </button>

                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table> :
                    <div className="bg-gray-500 mx-auto w-[50%]">
                    <h1 className="text-center text-red-700 text-4xl font-bold py-3 shadow-sm text-shadow">Danh Sách Rỗng</h1>
                    </div>
                }

            </div>
            <div className="pagination-container">

                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Kế Tiếp >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={totalPages}
                    previousLabel="< Quay Lại"
                    pageClassName="page-item mx-1 border rounded-md"
                    pageLinkClassName="page-link px-3 py-2 hover:bg-gray-200 hover:rounded-full"
                    previousClassName="page-item mx-1 border rounded-md ml-0 "
                    previousLinkClassName="page-link px-3 py-2 hover:bg-amber-500 bg-gray-800 text-white w-24"
                    nextClassName="page-item mx-1 border rounded-md mr-0"
                    nextLinkClassName="page-link px-3 py-2 hover:bg-amber-500 bg-gray-800 text-white w-24"
                    breakClassName="page-item mx-1 border rounded-md"
                    breakLinkClassName="page-link px-3 py-2 hover:bg-gray-200 hover:rounded-full"
                    containerClassName="pagination flex justify-center"
                    activeClassName="active bg-blue-500 text-white"
                    forcePage={currentPage}
                />
            </div>
            {showPopup && (
                <ConfirmationPopup
                    message={
                        popupAction === "single"
                            ? `Bạn có muốn xóa những khách hàng ?`
                            : "Are you sure you want to delete selected customers?"
                    }
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}

            {selectedCustomer && (
                <Modal customer={selectedCustomer} onClose={handleModalClose} />
            )}
        </div>
        </>
        };
        export default ListCustomer;
