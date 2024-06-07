import React, {useEffect, useState} from "react";
import * as landingService from "../../services/LandingService";
import "../../table/css/ListOfPremises.css"
import {Link} from "react-router-dom";
import "../../configs/routes"
import routes from "../../configs/routes";
import "../../table/css/pagination.css"
import ResponsivePagination from 'react-responsive-pagination';

const ListLanding = () => {

    const [landing, setLanding] = useState([]);
    const [openMenu, setOpenMenu] = useState({});
    const [floors,setFloors]=useState([])
    const [totalPages,setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchAll, setSearchAll] = useState({
        nameFloor: "",
        codeLanding: "",
        areaLanding: "",
        typeLanding: "",


    })
    const removeCheckedCheckboxes = () => {
        var checked = document.querySelectorAll(".delete-checkbox:checked");
        checked.forEach((elem) => {
          var id = elem.parentElement.dataset.id; // Lấy ID từ thuộc tính data-id của phần tử cha
          landingService.deleteLandingById(id); // Gọi phương thức xóa với ID tương ứng
        });
      }

    useEffect(() => {

        getListAllLanding(
            0,
            3
            );
                getListAllFloor();

    }, [])


    const searchAllLanding = async (e) => {

        const {name, value} = e.target
        setSearchAll({
            ...searchAll,
            [name]: value
        })


    }
    const handleReset = () => {
        setSearchAll({
            nameFloor: "",
            codeLanding: "",
            areaLanding: "",
            typeLanding: "",
        });
        // Optionally, reset the landing list to the initial state
        getListAllLanding({
            nameFloor: "",
            codeLanding: "",
            areaLanding: "",
            typeLanding: "",
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page)
        getListAllLanding(page-1);
    };

    const handleSearch = () => {
        getListAllLanding(searchAll);
        setSearchAll({
            nameFloor: "",
            codeLanding: "",
            areaLanding: "",
            typeLanding: "",
        });
    };

    const handleMenuSelect = (id) => {
        setOpenMenu((prevOpenMenu) => ({
            ...prevOpenMenu,
            [id]: !prevOpenMenu[id],
        }));
    };

    const getListAllFloor = async () => {
        try {
            const res = await landingService.getListAllFloor();
            setFloors(res)

        }catch (e) {
            console.log(e)
        }


    }


    const getListAllLanding = async (page) => {
        const res = await landingService.getListAllLanding(page);
        setTotalPage(res.totalPages)
        // console.log(res)
        // if ("".includes(values.nameFloor) && "".includes(values.codeLanding) && "".includes(values.areaLanding) && "".includes(values.typeLanding)) {
        //     const landingNew = res.map(item => ({
        //         ...item
        //     }))
        //     setLanding(landingNew);
        // } else {
        //     const searchLanding = res.filter(res => (
        //             res.floor.includes(values.nameFloor)) && (values.codeLanding === "" ||
        //         res.code.toLowerCase().includes(values.codeLanding.toLowerCase()))
        //         && (values.areaLanding === "" || res.area.toString().toLowerCase().includes(values.areaLanding.toLowerCase()))
        //         && (values.typeLanding === "" || res.type.toLowerCase().includes(values.typeLanding.toLowerCase()))
        //     )
        //
        //     setLanding(searchLanding)
        // }
        // ;
        setLanding(res.content)
    };


    return (
        <>
          


            <div className=" h-[90px]  mx-16 flex gap-5 items-center">
                <input type="text" className="w-1/5 h-1/2  border-b-[1px] pl-3 border-[#888]  rounded-tl-[3px] "
                       onChange={searchAllLanding} id="nameFloor" name="nameFloor"
                       value={searchAll.nameFloor}
                       placeholder="Tìm theo tầng"/>
                <input type="text" className="w-1/5 h-1/2 border-b-[1px] pl-3 border-[#888]  rounded-tl-[3px] "
                       onChange={searchAllLanding} id="codeLanding" name="codeLanding" value={searchAll.codeLanding}
                       placeholder="Tìm theo mã mặt bằng"/>
                <input type="text" className="w-1/5 h-1/2 border-b-[1px] pl-3 border-[#888]  rounded-tl-[3px] "
                       onChange={searchAllLanding} name="areaLanding" id="areaLanding" value={searchAll.areaLanding}
                       placeholder="Tìm theo diện tích"/>
                <input type="text" className="w-1/5 h-1/2 border-b-[1px] pl-3 border-[#888]  rounded-tl-[3px] "
                       onChange={searchAllLanding} name="typeLanding" id="typeLanding" value={searchAll.typeLanding}
                       placeholder="Tìm theo loại mặt bằng"/>
                <div className="w-1/5 h-1/2 flex gap-3  ">
                    <button onClick={handleSearch} className="rounded-full bg-[#26a69a] w-11 h-11"><i
                        className="fa fa-search text-white"></i>
                    </button>
                    <button className="rounded-full bg-[#2196f3] w-11 h-11 bg-[#2196f3]" onClick={handleReset}><i
                        className="fa fa-refresh text-white"></i></button>
                </div>

            </div>


            <div className="w-full  h-20 ">
                <div className="mx-16 h-full flex items-center  ">
                    <div className="id-button flex gap-3">
                        <button className=" bg-[#4CAF50] h-[36px]"><span className="text-white text-[14px] font-normal">Thêm mới</span>
                        </button>
                        <button className="bg-[#f44336] h-[36px]"><span
                            className="text-white text-[14px]">Xóa tất cả</span></button>


                        <select
                            className="h-[36px] w-[80px] border-[#2196e3]"
                            name="nameFloor"
                            value={searchAll.nameFloor}
                            onChange={searchAllLanding}
                        >
                            <option value="">Tầng</option>
                            {floors.map((floor, index) => (
                                <option key={index} value={floor.id}>{floor.name}</option>
                            ))}index
                        </select>
                    </div>
                </div>
            </div>

            <div className="w-full h-auto  ">
                <div className="mx-16 h-full  ">
                    <table className="table-auto  w-full h-full">
                        <thead className="border  ">
                        <tr className="text-center">
                            <th className="h-[42px] tex-center border-[#ddd]">
                                <input type="checkbox"/>
                            </th>
                            <th>ID</th>
                            <th>Mã I Loại mặt bằng</th>
                            <th>Diện tích</th>
                            <th>Giá bán</th>
                            <th>Phí quản lý</th>
                            <th>Tầng</th>
                            <th>
                                <span className="flex  justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5"
                                         stroke="currentColor" className="w-6 h-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                                    </svg>
                                </span>
                            </th>
                            <th className="">
                              <span className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5"
                                         stroke="currentColor" className="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                              </span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {landing.map((landingItem, index) => (
                            <tr className="w-1/12 h-[76px] " key={index}>
                                <td className="text-center w-[60px]">
                                    <input type="checkbox"/>
                                </td>
                                <td className="w-1/12 text-center ">
                                    <span className="block text-[#2196f3]">ID - {landingItem.id}</span>
                                </td>
                                <td className=" w-2/12 text-center">
                                    <span className="block ">{landingItem.code}</span>
                                    <span className="text-[#f44336]">{landingItem.type}</span>
                                </td>
                                <td className="w-1/12 text-center">
                                    <span>{landingItem.area}
                                        <span className="text-red-600 after:content-['_↗']"></span>
                                    </span>
                                </td>
                                <td className="w-1.5/12 text-center">
                                     <span>
                                         {landingItem.feePerMonth}
                                         <span className="text-red-600 after:content-['_$']"/>
                                    </span>
                                </td>
                                <td className="w-1/12 text-center">
                                    <span>
                                        {landingItem.feeManager}
                                        <span className="text-red-600 after:content-['_$']"></span>
                                    </span>
                                </td>
                                <td className="w-2/12 text-center ">
                                    <div className="w-full h-1/2 grid place-items-center ">
                                        <span>Tầng {landingItem.floor}</span>
                                    </div>
                                </td>
                                <td className=" w-2/12 text-center ">
                                    {landingItem.status === 'Available' ?
                                        <button className="w-auto h-[26px] bg-[#f44336] ">
                                            <span
                                                className="text-[.70rem] font-semibold text-white flex">Chưa bàn giao</span>
                                        </button> : <button className="w-auto h-[26px] bg-[#4CAF50] ">
                                            <span
                                                className="text-[.70rem] font-semibold text-white flex">Bàn Giao</span>
                                        </button>}


                                </td>
                                <td className="w-[76px] relative">
                                    <button onClick={() => handleMenuSelect(landingItem.id)}
                                            className="flex justify-center  w-full"
                                            id="button-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"/>
                                        </svg>
                                    </button>
                                    <div
                                        style={{display: openMenu[landingItem.id] ? 'block' : 'none'}}

                                        className="w-[200px] h-auto absolute rounded-[3px] bg-white right-7 menu-shadow z-30">

                                        <div className="w-full h-full py-2">
                                            <button className="w-full h-1/3 px-3 flex items-center hover:bg-[#fafafa]">
                                <span className="flex py-1">
                                    <span className="mt-0.5 pr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                                        </svg>
                                    </span>
                                    Chi tiết
                                </span>
                                            </button>
                                            <button
                                                className="w-full h-1/3 border-t-[1px] px-3 flex  hover:bg-[#fafafa]">
                                <span className="flex py-1 text-[#f44366]">
                                    <span className="mt-0.5 pr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                        </svg>
                                    </span>
                                    Xóa mặt
                                </span>
                                            </button>
                                            <Link to={routes.editLanding + landingItem.id}>

                                                <button
                                                    className="w-full h-1/3 border-t-[1px] px-3 flex items-center hover:bg-[#fafafa]">
                                <span className="flex py-1">
                                    <span className="mt-0.5 pr-3">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"/>
                                        </svg>
                                    </span>
                                    Sửa mặt bằng
                                </span>

                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}


                        </tbody>
                    </table>
                </div>
            </div>
            <ResponsivePagination
                total={totalPages}
                current={currentPage}
                onPageChange={page => handlePageChange(page)}
            />

        </>
    );


}
export default ListLanding;
