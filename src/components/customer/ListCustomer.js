// import ".list.css";
import { useEffect, useState } from "react";
import * as customerService from "../../services/CustomerService";
import { useNavigate } from "react-router-dom";
const ListCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    const getListCustomers = async () => {
        try {
            const proList = await customerService.gettAllCustomers();
            setCustomers(proList);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getListCustomers();
    }, []);
//   const formatDate = (dateString) => {
//     const options = { day: "2-digit", month: "2-digit", year: "numberic" };
//     return new Date(dateString).toLocaleDateString("vi-VN", options);
//   };
    const formatDate = (input) => {
        const date = (input instanceof Date) ? input : new Date(input);
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return date.toLocaleDateString("vi-VN", options);
    };

    const handleSearch = async () => {
        const nameSearch = document.getElementById("nameSerach").value;
        if (!nameSearch) {
            document.getElementById("nameSearch").classList.add("is-invalid");
        } else {
            document.getElementById("nameSearch").classList.remove("is-invalid");
            try {
                const listSearch = await customerService.searchByName(nameSearch);
                if (listSearch) {
                    setCustomers(listSearch);
                } else {
                    alert(`${nameSearch} Không tồn tại.`);
                }
            } catch (e) {
                console.log(e);
            }
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                await customerService.deleteCustomer(id);
                await navigate("/customer");
                console.log(`Customer with id ${id} has been deleted successfully.`);
            } catch (error) {
                console.error(`Error deleting customer with id ${id}:`, error);
            }
        }
    };


    return <>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 p-4">
            <h1 className="text-center">Danh Sách Khách Hàng</h1>


            <div className="flex justify-between mb-4">
                <div className="relative flex items-center">
                    <input
                        className="h-11 mr-2 w-80
                             border-2 border-blue-200
                             hover:border-blue-500 hover:border-2
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
                </div>
                <div className="relative">

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
                        Tên khách hàng
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"
                    >
                        Ngày Sinh
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"
                    >
                        Gender
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"
                    >
                        Phone
                    </th>

                    <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"
                    >
                        Tên Công Ty
                    </th>

                    <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"
                    >
                        Xem Chi Tiết
                    </th>

                    <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell"
                    >
                        Chức Năng
                    </th>

                </tr>
                </thead>
                <tbody className="block md:table-row-group divide-y divide-gray-100 border-t border-gray-100">
                {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 bg-white md:border-none block md:table-row">
                        <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                            />
                        </td>
                        <td className="px-6 py-4 md:border md:border-grey-500 text-left block md:table-cell">
                            <span className="inline-block w-1/3 md:hidden font-bold text-2">customer Code</span>
                            <span className="text-md">{customer.name}</span>
                        </td>
                        <td className="flex gap-3 px-6 py-4 font-normal text-gray-900 md:border md:border-grey-500 text-left block md:table-cell">
                            <div className="text-sm">
                                <div className="font-medium text-gray-700">{formatDate(customer.dob)}</div>
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
                                <button x-data="{ tooltip: 'detail' }" href="#">
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
                                <button x-data="{ tooltip: 'Delete' }" href="#" onClick={()=>handleDelete(customer.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" className="h-6 w-6 text-red-500 hover:scale-110  transform"
                                         x-tooltip="tooltip">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                    </svg>
                                </button>
                                <button x-data="{ tooltip: 'Edite' }" href="#" onClick={() =>
                                    navigate(`/customer/edit-customer/${customer.id}`)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" className="h-6 w-6 hover:scale-110 text-yellow-500"
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
            </table>
        </div>
    </>;
};
export default ListCustomer;
