import React, { useEffect, useState } from "react";
import * as landingService from "../../services/LandingService";
import * as authService from "../../services/Authenticate/AuthService";
import "../../table/css/ListOfPremises.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../configs/routes";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import routes from "../../configs/routes";
import "../../table/css/pagination.css";
import ResponsivePagination from "react-responsive-pagination";
import {
  AddIcon,
  CloseIcon,
  DeleteAllIcon,
  RefreshIcon,
  SearchIcon,
  SearchInputIcon,
  SearchSubmitIcon
} from "../employee/utils/Icons";

const locationMapping = {
  fullyFurnished: "Đầy đủ nội thất",
  partiallyFurnished: "Nội thất một phần",
  unfurnished: "Không có nội thất",
  readyToMoveIn: "Sẵn sàng để dọn vào",
  underConstruction: "Đang xây dựng",
  newlyRenovated: "Mới được cải tạo",
  basicAmenities: "Tiện nghi cơ bản",
  luxuryAmenities: "Tiện nghi cao cấp",
  ecoFriendly: "Thân thiện với môi trường",
  highTech: "Công nghệ cao",
};
const typeMapping = {
  Apartment: "Căn hộ",
  Home: "Nhà riêng",
  Shop: "Cửa hàng",
  Office: "Văn phòng",
  Warehouse: "Kho xưởng",
  VacantLand: "Đất trống",
  Villa: "Biệt thự",
  Kiot: "Kiot",
  Serviced: "Chung cư dịch vụ",
  MotelRoom: "Phòng trọ",
  Restaurant: "Nhà hàng",
};
const init_param = {
  page: 0,
  size: 3,
  statusLanding: "",
  codeLanding: "",
  areaLanding: "",
  typeLanding: "",
  floorLanding: "",
};

const ListLanding = () => {

  const [landing, setLanding] = useState();
  const [openMenu, setOpenMenu] = useState({});
  const [floors, setFloors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState(init_param);
  const [checkedAll, setCheckAll] = useState(false);
  const [listIdInput, setListIdInput] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalDeleteMultiIsOpen, setModalDeleteMultiIsOpen] = useState(false);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [landingDetail, setLandingDetail] = useState({});
  const [landingDelete, setLandingDelete] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [updatedRecordId, setUpdatedRecordId] = useState(null);
  const [paginationVisible, setPaginationVisible] = useState(true);
  const [dropdownVisibleSearch,setDropdownVisibleSearch] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    const savedSearchParams = JSON.parse(
        sessionStorage.getItem("searchParams")
    );

    const params = savedSearchParams ? savedSearchParams : searchParams;
    if (savedPage) {
      params.page = parseInt(savedPage, 10);
    }
    setSearchParams(params);
    getListAllLanding(params);
    getListAllFloor();
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleChangeDetail = (id) => {
    try {
      handleDetailClick();
      setUpdatedRecordId(id);
      setTimeout(() => {
        setUpdatedRecordId(null);
      }, 100000);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(updatedRecordId);

  const handlePageChange = (page) => {
    sessionStorage.setItem("currentPage", page - 1);
    const param = { ...searchParams, page: page - 1 };
    setListIdInput([])
    setSearchParams(param);
    getListAllLanding(param);
  };

  const handleMenuSelect = (id) => {
    if (openMenu.id === id) {
      setOpenMenu({
        ...id,
        status: false
      })
    } else {
      setOpenMenu({
        id: id,
        status: true
      });

    }

  };
  const handleClickOutside = (event) => {
    if (
        !event.target.closest(".menu") &&
        !event.target.closest(".menu-button")
    ) {
      setOpenMenu({});
    }
  };
  const handleDetailClick = () => {
    setOpenMenu({});
  };
  const handleDeleteClick = (landing) => {
    handleDetailClick();
    openModal(landing);
  };
  const setNewModalDetail = () => {
    setDetailModalIsOpen(false)
    setPaginationVisible(true)

  }

  const getListAllFloor = async () => {
    try {
      const token = authService.getToken()
      const res = await landingService.getListAllFloor(token);
      setFloors(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getListAllLanding = async (searchParams) => {
    try {
      const token = authService.getToken()
      const res = await landingService.getListAllLanding(searchParams, token);
      setLanding(res);

      setIsNotFound(res.content.length === 0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    sessionStorage.setItem("searchParams", JSON.stringify(searchParams));
    sessionStorage.setItem("currentPage", 0);
    const param = {
      ...searchParams,
      page: 0,
    };
    setSearchParams(param);
    getListAllLanding(param);
  };

  const handleReset = () => {
    sessionStorage.removeItem("currentPage");
    sessionStorage.removeItem("searchParams");
    const param = {
      ...init_param,
      page: 0,
    };
    setSearchParams(param);
    getListAllLanding(param);
  };
  const handleGoBack = () => {
    handleReset();
  };

  const deleteLandingByIds = async () => {
    setModalDeleteMultiIsOpen(false);
    const token = authService.getToken();

    for (const ld of listIdInput) {
      try {
        // const landingAvailable =
        //   await landingService.findLandingIsAvailableById(ld.id, token);
        // if (landingAvailable) {
        //   toast.error("Mặt bằng " + ld.code + " không thể xóa vì đã vào ở");
        //   return;
        // }
        const isSuccess = await landingService.deleteLandingById(
            ld.id,
            token
        );
        if (isSuccess) {
          toast.success("Xóa mặt bằng " + ld.code + " thành công");
        } else {
          toast.error("Xóa mặt bằng " + ld.code + " không thành công");
        }
      } catch (e) {
        toast.error("Xóa mặt bằng " + ld.code + " gặp lỗi: " + e.message);
      }
    }
    await getListAllLanding(searchParams);
    setListIdInput([]);
  };

  const deleteLanding = async () => {
    const token = authService.getToken();

    // const landingAvailable = await landingService.findLandingIsAvailableById(
    //   landingDelete.id,
    //   token
    // );
    // if (!landingAvailable) {
    //   toast.error("Mặt bằng " + landingDelete.code + " không thể xóa vì đã vào ở");
    //   return;
    // }
    const isSuccess = await landingService.deleteLandingById(
        landingDelete.id,
        token
    );
    if (isSuccess) {
      toast.success("Xóa mặt bằng " + landingDelete.code + " thành công");
    } else {
      toast.error("Xóa mặt bằng " + landingDelete.code + " không thành công");
    }
    setIsOpen(false);
    getListAllLanding(searchParams);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const handleDeleteAll = (e, ld) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setListIdInput([...listIdInput, ld]);
    } else {
      setListIdInput(listIdInput.filter((item) => item !== ld));
    }
  };
  const handleSelectAll = (e) => {
    if (!e.target.checked) {
      setListIdInput([]);
    } else {
      setCheckAll(!checkedAll);
      !checkedAll
          ? setListIdInput(landing.content.map((l) => l))
          : setListIdInput([]);
    }
  };

  const openModal = (landing) => {
    setLandingDelete(landing);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModalMultiDelete = () => {
    setModalDeleteMultiIsOpen(true);
  };
  const closeModalMultiDelete = () => {
    setModalDeleteMultiIsOpen(false);
  };

  const setModalDetail = (landing) => {
    setDetailModalIsOpen(true);
    setLandingDetail(landing);
  };
  const openDetailModal = (landing) => {
    handleDetailClick();
    setModalDetail(landing);
    setPaginationVisible(false);
  };

  const closeModalDetail = (landing) => {
    setDetailModalIsOpen(false);
    setPaginationVisible(true);
  };

  if (!landing) return (
      <div className="w-full h-screen flex items-center justify-center">
        <div
            className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute">
        </div>
      </div>
  )

  const selectClassName = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const inputClassName = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
      <>
        <div id="list__lading">

          {/*search new*/}

          <div className="relative max-lg:mx-0  mx-16 flex items-center h-20 ">
            <div className="absolute left-0">
              <button className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setDropdownVisibleSearch(!dropdownVisibleSearch)}>
                <SearchIcon/>
              </button>
              <div id="dropdownSearch"
                   className={`z-10 ${dropdownVisibleSearch ? '' : 'hidden'} absolute top-full left-0 mt-2 bg-white rounded-lg shadow w-100 dark:bg-gray-700 overflow-y-auto`}
                   style={{maxHeight: '400px', width: '300px'}}>
                <div className="p-3">
                  <label htmlFor="code" className="sr-only">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <SearchInputIcon/>
                    </div>
                    <select className={inputClassName}
                            name="typeLanding"
                            id="typeLanding"
                            value={searchParams.typeLanding}
                            onChange={handleChange}>
                      <option value="">Loại mặt bằng</option>
                      <option value="Apartment">Căn hộ</option>
                      <option value="Home">Nhà riêng</option>
                      <option value="Shop">Cửa hàng</option>
                      <option value="Office">Văn phòng</option>
                      <option value="Warehouse">Kho xưởng</option>
                      <option value="VacantLand">Đất trống</option>
                      <option value="Villa">Biệt thự</option>
                      <option value="Kiot">Kiot</option>
                      <option value="Serviced">Chung cư dịch vụ</option>
                      <option value="MotelRoom">Phòng trọ</option>
                      <option value="Restaurant">Nhà hàng</option>
                    </select>
                  </div>
                </div>
                <div className="p-3">
                  <label htmlFor="name" className="sr-only">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <SearchInputIcon/>
                    </div>
                    <input type="text" id="codeLanding"
                           name="codeLanding"
                           value={searchParams.codeLanding}
                           onChange={handleChange} className={inputClassName} placeholder="Mã mặt bằng"
                    />
                  </div>
                </div>
                <div className="p-3">
                  <label htmlFor="name" className="sr-only">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <SearchInputIcon/>
                    </div>
                    <input type="text" name="areaLanding"
                           id="areaLanding"
                           value={searchParams.areaLanding}
                           onChange={handleChange}
                           className={inputClassName} placeholder="Diện tích"
                    />
                  </div>
                </div>
                <div className="p-3">
                  <label htmlFor="name" className="sr-only">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <SearchInputIcon/>
                    </div>
                    <select id="statusLanding"
                            name="statusLanding"
                            value={searchParams.statusLanding}
                            onChange={handleChange} className={inputClassName}
                    >
                      <option value=""> Trạng thái</option>

                      <option value="fullyFurnished">Đầy đủ nội thất</option>
                      <option value="partiallyFurnished">Nội thất một phần</option>
                      <option value="unfurnished">Không có nội thất</option>
                      <option value="readyToMoveIn">Sẵn sàng để dọn vào</option>
                      <option value="underConstruction">Đang xây dựng</option>
                      <option value="newlyRenovated">Mới được cải tạo</option>
                      <option value="basicAmenities">Tiện nghi cơ bản</option>
                      <option value="luxuryAmenities">Tiện nghi cao cấp</option>
                      <option value="ecoFriendly">Thân thiện với môi trường</option>
                      <option value="highTech">Công nghệ cao</option>
                    </select>

                  </div>
                </div>
                <div className="p-3 flex justify-around sticky bottom-0 bg-white dark:bg-gray-700">
                  <div>
                    <button onClick={handleSubmit}>
                      <SearchSubmitIcon/>
                    </button>
                  </div>
                  <div>
                    <button onClick={handleReset}>
                      <RefreshIcon/>
                    </button>
                  </div>
                  <div>
                    <button onClick={() => setDropdownVisibleSearch(!dropdownVisibleSearch)}>
                      <CloseIcon/>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="id-button absolute right-0 flex gap-3">
              <Link to={routes.createLanding}>
                <button className="tw-add-button">
                  <AddIcon/>
                </button>
              </Link>
              <button className="tw-delete-all-button" disabled={listIdInput.length === 0} onClick={() => setModalDeleteMultiIsOpen(true)}>
                <DeleteAllIcon/>
              </button>
              <select
                  className="h-[36px] w-[80px] pl-2 border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  inline-flex items-center "
                  name="floorLanding"
                  value={searchParams.floorLanding}
                  onChange={handleChange}
              >
                <option value="" className="text-sm">Tầng</option>
                {floors.map((floor, index) => (
                    <option key={index} value={floor.name}>
                      {floor.name}
                    </option>
                ))}
                index
              </select>
            </div>
          </div>


          <div className="w-full h-[280px] ">
            <div className="mx-16 h-full max-lg:mx-0 ">
              <table className=" table-auto lg:table-fixed min-w-full">
                <thead className="border  ">
                <tr className="text-center">
                  <th className="h-[42px] tex-center border-[#ddd]">
                    <input
                        type="checkbox"
                        checked={listIdInput.length > 0}
                        onChange={handleSelectAll}
                        size="small"
                    />
                  </th>
                  <th className="max-lg:hidden">STT</th>
                  <th className="max-md:hidden">Mã I Loại Mặt Bằng</th>
                  <th>Diện tích</th>
                  <th>Giá <span className="max-sm:hidden">bán</span></th>
                  <th className="max-md:hidden">Phí quản lý</th>
                  <th>Tầng</th>
                  <th className="max-sm:hidden">
                  <span className="flex  justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  </th>
                  <th className="">
                  <span className="flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                      />
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </span>
                  </th>
                </tr>
                </thead>

                <tbody>
                {landing.content.map((landingItem, index) => (
                    <tr
                        key={index}
                        className={`w-1/12 h-[76px] ${updatedRecordId === landingItem.id ? "bg-yellow-200" : ""
                        }`}
                    >
                      <td className="text-center w-[60px]">
                      <input
                            type="checkbox"
                            value={landingItem.id}
                            name={landingItem.id}
                            checked={listIdInput.includes(landingItem)}
                            onChange={(e) => {
                              handleDeleteAll(e, landingItem);
                              //xoa
                              landingItem.select = e.target.checked;
                              setLanding(landing);
                            }}
                            size="small"
                        />
                      </td>
                      <td className="w-1/12 text-center max-lg:hidden">
                    <span className="block text-[#2196f3]">
                      ID - {index + 1}
                    </span>
                      </td>
                      <td className=" w-2/12 text-center max-md:hidden">
                        <span className="block ">{landingItem.code}</span>
                        <span className="text-[#f44336]">
                      {typeMapping[landingItem.type]}
                    </span>
                      </td>
                      <td className="w-1/12 max-sm:w-3/12 max-md:w-2/12 text-center">
                    <span>
                      {landingItem.area}
                      <span className="text-red-600"> m<sup className="text-[10px]">2</sup></span>
                    </span>
                      </td>
                      <td className="w-1.5/12 text-center">
                    <span>
                      {landingItem.feePerMonth.toLocaleString("vi-VN")}
                      <span className="text-red-600 after:content-['_vnd']"/>
                    </span>
                      </td>
                      <td className="w-1/12 text-center max-md:hidden">
                    <span>
                      {landingItem.feeManager.toLocaleString("vi-VN")}
                      <span className="text-red-600 after:content-['_vnd']"></span>
                    </span>
                      </td>
                      <td className="w-2/12 text-center ">
                        <div className="w-full h-1/2 grid place-items-center ">
                          <span>Tầng {landingItem.floor}</span>
                        </div>
                      </td>

                      <td className=" w-2/12 text-center max-sm:hidden">
                        {locationMapping.hasOwnProperty(landingItem.status) ? (
                            <button
                                className={` rounded-[4px]
                                    ${locationMapping[landingItem.status] ===
                                "Đầy đủ nội thất" ||
                                locationMapping[
                                    landingItem.status
                                    ].trim() === "Nội thất một phần" ||
                                locationMapping[
                                    landingItem.status
                                    ].trim() === "Không có nội thất" ||
                                locationMapping[
                                    landingItem.status
                                    ].trim() === "Sẵn sàng để dọn vào" ||
                                locationMapping[
                                    landingItem.status
                                    ].trim() === "Đang xây dựng" ||
                                locationMapping[
                                    landingItem.status
                                    ].trim() === "Mới được cải tạo" ||
                                locationMapping[
                                    landingItem.status
                                    ].trim() === "Tiện nghi cơ bản" ||
                                locationMapping[
                                    landingItem.status
                                    ].trim() === "Tiện nghi cao cấp" ||
                                locationMapping[
                                    landingItem.status
                                    ].trim() ===
                                "Thân thiện với môi trường" ||
                                locationMapping[
                                    landingItem.status
                                    ].trim() === "Công nghệ cao"
                                    ? "bg-green-500"
                                    : ""
                                }   w-auto h-[26px] 
                                `}
                            >
                        <span
                            className={`text-[.70rem] px-1  font-semibold text-white flex `}
                        >
                          {locationMapping[landingItem.status]}
                        </span>
                            </button>
                        ) : (
                            <span></span>
                        )}
                      </td>
                      <td className="w-[76px] relative">
                        <button
                            onClick={() => handleMenuSelect(landingItem.id)}
                            className="flex justify-center w-full menu-button"
                            id="button-1"
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
                                d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                            />
                          </svg>
                        </button>
                        <div
                            style={{
                              display: landingItem.id === openMenu.id && openMenu.status === true ? "block" : "none",
                            }}
                            className="w-[200px] h-auto  absolute rounded-[3px] bg-white right-7 menu-shadow z-30 menu"
                        >
                          <div className="w-full h-full  ">
                            <button
                                onClick={() => openDetailModal(landingItem)}
                                className="w-full h-1/3 py-1 px-3 flex items-center hover:bg-[#fafafa]"
                            >
                          <span className="flex py-1">
                            <span className="mt-0.5 pr-3">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-4 h-4"
                              >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                />
                              </svg>
                            </span>
                            Chi tiết
                          </span>
                            </button>
                            <Link to={routes.editLanding + landingItem.id}>
                              <button
                                  onClick={() => handleChangeDetail(landingItem.id)}
                                  className="w-full h-1/3 py-1 border-t-[1px] px-3 flex items-center hover:bg-[#fafafa]"
                              >
                            <span className="flex py-1">
                              <span className="mt-0.5 pr-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                  <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                                  />
                                </svg>
                              </span>
                              Sửa mặt bằng
                            </span>
                              </button>
                            </Link>
                            <button
                                onClick={() => handleDeleteClick(landingItem)}
                                className="w-full py-1 h-1/3 border-t-[1px] px-3 flex hover:bg-[#fafafa]"
                            >
                          <span className="flex py-1 text-[#f44366]">
                            <span className="mt-0.5 pr-3">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-4 h-4"
                              >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </span>
                            Xóa mặt bằng
                          </span>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
              {isNotFound && (
                  <div className=" h-auto  mx-16 text-center flex flex-col justify-center items-center mt-3">
                    <img src="/img/img-search.png" className="w-[134px] h-[134px]"/>
                    <div className=" text-[18px]">Không tìm thấy kết quả nào</div>
                    <div className="text-[17px] opacity-70">Hãy thử sử dụng các từ khóa chung chung hơn</div>
                    <button onClick={handleGoBack} className="mt-3 font-medium">Quay lại <span><i
                        className='bx bx-subdirectory-left'></i></span></button>
                  </div>
              )}
            </div>
          </div>

          <div className=" h-[40px] my-5 relative mx-16 flex max-lg:mx-0 ">
            <div className={`absolute  h-full right-0 ${paginationVisible ? '' : 'pagination-hidden'}`}>
              <ResponsivePagination
                  total={landing.totalPages}
                  current={landing.number + 1}
                  onPageChange={(page) => handlePageChange(page)}
              />
            </div>
          </div>
          <Modal
              isOpen={modalIsOpen}
              // onAfterOpen={afterOpenModal}
              onRequestClose={() => setIsOpen(false)}
              contentLabel="Example Modal"
              style={customStyles}
          >
            <div className="container-fluid" style={{width: "400px"}}>
              <div className="row justify-content-center my-3">
                <div className="col-12  mb-3">
              <span className="">
                <i className="fa-solid fa-triangle-exclamation fa-beat-fade fa-1x  text-[#e01f1f] bg-[#FEE2E2] p-2 rounded-full"></i>
                <span className="px-3 font-[700]">Xác nhận xóa mặt bằng {landingDelete.code}</span>
              </span>
                </div>
                <div className="w-full h-auto ">
                  <div className="w-full h-auto flex gap-10">
                    <span>Tầng : {landingDelete.floor} </span>
                    <span>Diện tích : {landingDelete.area} m<sup className="text-[10px]">2</sup></span>
                  </div>
                  <div className="py-2">
                    <span >Thể loại : {landingDelete.type}</span>
                  </div>
                  <div>
                    <span>Phí quản lý : {landingDelete.feePerMonth !== undefined && landingDelete.feePerMonth.toLocaleString("vi-VN")} vnd</span><br/>
                  </div>
                </div>

                <div className="col-12 d-flex justify-content-center align-items-center mt-3 row">
                  <div className="col-12 col-md-6 mb-3">
                <span>
                  <strong>Lưu ý: </strong>
                  <span style={{color: "#red"}}>
                    Thao tác này không thể hoàn tác!
                  </span>
                </span>
                  </div>
                  <div className="">
                    <button className=" font-medium bg-red-500 p-2 text-white border-none rounded-[4px] " onClick={deleteLanding}>
                      Xác nhận
                    </button>
                    <button className="mx-6 p-2 font-medium bg-white text-slate-700 border border-gray-500 rounded-[4px] " onClick={closeModal}>
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
              isOpen={modalDeleteMultiIsOpen}
              // onAfterOpen={afterOpenModal}
              onRequestClose={() => setModalDeleteMultiIsOpen(false)}
              contentLabel="Example Modal"
              style={customStyles}
          >
            <div className="container-fluid" style={{width: "400px"}}>
              <div className="row justify-content-center my-3">
                <div className="col-12  mb-3">
              <span className="">
                <i className="fa-solid fa-triangle-exclamation fa-beat-fade fa-1x  text-[#e01f1f] bg-[#FEE2E2] p-2 rounded-full"></i>
                <span className="px-3 font-[700]">Xác nhận xóa mặt bằng </span>
              </span>
                </div>
                <div className="w-full h-auto ">
                  {listIdInput.map(landingAllDelete => (
                      <div className="w-full h-auto flex gap-10">
                        <span>Mã mặt bằng : </span>
                        <span>{landingAllDelete.code}</span>
                      </div>
                  ))}
                </div>

                <div className="col-12 d-flex justify-content-center align-items-center mt-3 row">
                  <div className="col-12 col-md-6 mb-3">
                <span>
                  <strong>Lưu ý: </strong>
                  <span style={{color: "#red"}}>
                    Thao tác này không thể hoàn tác!
                  </span>
                </span>
                  </div>
                  <div className="">
                    <button className="font-medium bg-red-500 p-2 text-white border-none rounded-[4px]"
                            onClick={deleteLandingByIds}>
                      Xác nhận
                    </button>
                    <button className="mx-6 p-2 font-medium bg-white text-slate-700 border border-gray-500 rounded-[4px]Q"
                            onClick={closeModalMultiDelete}>
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
              isOpen={detailModalIsOpen}
              // onAfterOpen={afterOpenModal}
              onRequestClose={setNewModalDetail}
              contentLabel="Example Modal"
              style={customStyles}
          >
            <div className="container-fluid ">
              <div className="row justify-content-center my-3">
                <div className="col-12">
                  <div className=" flex">
                  <span className="">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                   stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                              </svg>
                     </span>
                    <span className="text-[20px] text-center p-1.5">
                    Chi tiết mã mặt bằng {landingDetail.code}
                  </span>
                  </div>
                </div>
                <div className=" h-auto mx-6 my-5">
                  <div className="w-full h-auto">
                    <span>Tầng : </span>
                    <span>{landingDetail.floor}</span>

                  </div>
                  <div className="w-full h-auto py-2">
                    <span>Trạng thái : </span>
                    <span>{landingDetail.status}</span>
                  </div>
                  <div className="w-full h-auto py-2">
                    <span>Diện tích : </span>
                    <span>{landingDetail.area} m<sup className="text-[10px]">2</sup></span>

                  </div>
                  <div className="w-[400px] max-sm:w-[300px]  h-auto py-2 ">
                    <span>Chú thích : </span>
                    <span className="break-words">{landingDetail.description}</span>

                  </div>
                  <div className="w-full h-auto py-2">
                    <span>Thể loại : </span>
                    <span>{landingDetail.type}</span>

                  </div>
                  <div className="w-full h-auto py-2">
                    <span>Phí quản lí tháng : </span>
                    <span>{landingDetail.feePerMonth !== undefined && landingDetail.feePerMonth.toLocaleString("vi-VN")} vnđ</span>
                  </div>
                  <div className="w-full h-auto py-2">
                    <span>Phí quản lí : </span>
                    <span>{landingDetail.feeManager !== undefined && landingDetail.feeManager.toLocaleString("vi-VN")} vnđ</span>
                  </div>
                  <div className="w-full h-auto py-2 flex">
                    <span>Hình ảnh : </span>
                    <img src={landingDetail.firebaseUrl} className="w-[200px] h-[100px] ml-20"/>
                  </div>
                </div>
                <div className="w-full h-10 ">
                  <button className="p-2 bg-white border border-gray-700 rounded-[4px]" onClick={closeModalDetail}>
                    Đã rõ
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </>
  );
};
export default ListLanding;