
import '../../css/listContract.css'
import ResponsivePagination from 'react-responsive-pagination';
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as contractService from '../../services/ContractService.js'
import '../../css/paginationContract.css'
import '../../configs/routes.js'
import routes from '../../configs/routes.js';
import { Formik,Field,Form } from 'formik';
import PopupDelete from "./PopupDelete";

const ListContract = () => {
    const [contracts,setContract] = useState([]);
    const [totalPages,setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenu,setOpenMenu] = useState({});
    const [isModalOpen,setIsModalOpen] = useState(false);
    const[sizePage,setSizePage] = useState(0);
    const [customerNameSearch,setCustomerNameSearch] = useState('');
    const [landingCodeSearch,setLandingCodeSearch] = useState('');
    const [startDateSearch,setStartDateSearch] = useState('')
    const [endDateSearch,setEndDateSearch] = useState('')
    const [showPopup,setShowPopup] = useState(false)
    const [contractId,setContractId] = useState('');

    const handleShowPopup = (id) => {
        setOpenMenu(false);
        setContractId( id);
        setShowPopup(true);


    }
    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const handleDeleteConfirm = async () => {
        getAllContract(0,customerNameSearch,landingCodeSearch,startDateSearch,endDateSearch)
        setShowPopup(false);
    };
    
    const getAllContract = async(page,customeName,landingCode,startDate,endDate) => {
        const result = await  contractService.findAllContract(page,customeName,landingCode,startDate,endDate)
            console.log(result.content);
            setContract(result.content)
            setTotalPage(result.totalPages)
            setSizePage(result.size)
        
    };

    const handleReset = () => {
        setCustomerNameSearch("");
        setLandingCodeSearch("");
        setStartDateSearch("");
        setEndDateSearch("");
        getAllContract(0,"","","","");
        setCurrentPage(1);
    }
    

    const handleSubmit = (values) => {
        
            getAllContract(0,customerNameSearch,landingCodeSearch,startDateSearch,endDateSearch)
            setCurrentPage(1);
        

    }
    const handleChangeCustomerName = (e,setFieldValue) => {
        setCustomerNameSearch(e.target.value);
        setFieldValue("customerName",e.target.value)
    }

    const handleChangeLandingCode = (e,setFieldValue) => {
        setLandingCodeSearch(e.target.value);
        setFieldValue("landingCode",e.target.value)
    }
    const handleChangeStartDate = (e,setFieldValue) => {
        setStartDateSearch(e.target.value);
        setFieldValue("startDate",e.target.value)
    }
    const handleChangeEndDate = (e,setFieldValue) => {
        setEndDateSearch(e.target.value);
        setFieldValue("endDate",e.target.value)
    }
    

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

    const handleSelectMenu = (id) => {
        setOpenMenu((prevOpenMenu)=>({
            ...prevOpenMenu,[id] : !prevOpenMenu[id]
        }));
    }  



    
    const handlePageChange = (page) => {
        setCurrentPage(page)
        getAllContract((page-1),customerNameSearch,landingCodeSearch,startDateSearch,endDateSearch);

    };

    useEffect(()=>{
        if(contracts.length === 0){
           
            getAllContract(0,customerNameSearch,landingCodeSearch,startDateSearch,endDateSearch);
        }
    },[]);
   
    return (
<>
    <div class="w-full h-auto  ">
        <h3 class="text-2xl my-10">DANH SÁCH HỢP ĐỒNG</h3>

       
            <Formik
                onSubmit={handleSubmit}
                initialValues={{
                    customerName : "",
                    landingCode : "",
                    startDate : "",
                    endDate : ""
                }}
            >
                 {({ setFieldValue }) => {
               return  <div class="mx-16 search">
                <Form>
                <Field
                   onChange={(e) =>handleChangeCustomerName(e,setFieldValue)}
                  name='customerName' 
                  style={{width: '15%'}} 
                  type="text"
                   placeholder="Tên Khách Hàng"/>
                <Field
                onChange={(e) =>handleChangeLandingCode(e,setFieldValue)}
                 name='landingCode' 
                 style={{width: '15%'}}  
                 type="text"
                  placeholder="Mã Mặt Bằng"/>
                <Field
                 onChange={(e) =>handleChangeStartDate(e,setFieldValue)}
                 name='startDate' 
                 placeholder="Ngày Bắt Đầu"

                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                     onBlur={(e) => (e.target.type = "text")}
                    />
                <Field 
                 onChange={(e) =>handleChangeEndDate(e,setFieldValue)}
                 name='endDate'
                  placeholder="Ngày Kết Thúc"
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                     onBlur={(e) => (e.target.type = "text")}
                    />
                <button id='search-bt1' type='submit' ><i class="fa fa-search"></i></button>
                <button id='search-bt2' onClick={handleReset} type='reset'><i class="fa fa-refresh"></i></button>
                
                </Form>
            </div>
            }
        }
            </Formik>

               

        
        <br></br>
        <div class="mx-16 create-reset">
                <button id="create"><Link  to={routes.createContract}>Thêm Mới</Link> </button>
        </div>
        <br></br>
    
        <div class="mx-16 h-full  ">
            <table class="table-auto  w-full h-full">
                <thead class="border ">
                    <tr>
                        <th> STT </th>
                        <th>Tên Khách Hàng</th>
                        <th>Mã Mặt Bằng</th>
                        <th>Ngày Bắt Đầu</th>
                        <th>Ngày Kết Thúc</th>
                        <th class="">
                        <span class="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                        </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {contracts.map((contract,index) =>(
                        <tr key={contract.id} class=" h-[50px] ">
                        <td class="w-1/12 text-center">
                           
                            <span class="block text-[#2196f3]">{(index+1)+(currentPage-1)*sizePage}</span>
                        </td>
                        <td class="w-3/12 text-center">
                            <span>{contract.customerName}</span>
                        </td>
                        <td class="w-2/12 text-center">
                            <span>{contract.landingCode}</span>
                        </td>
                        <td class="w-3/12 text-center">
                            <span>{contract.startDate}</span>
                        </td>
                        <td class=" w-3/12 text-center px-3 ">
                            <span>{contract.endDate}</span>
                        </td>
                        <td class="w-[76px] relative">
                <button onClick={()=>handleSelectMenu(contract.id)} class="flex justify-center btn_menublock_edc  " id={`button-`+(index+1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"/>
                    </svg>
                </button>
                <div
                style={{display:openMenu[contract.id] ? 'block' : 'none'}}
                 class="menu_edc w-[200px] h-auto absolute rounded-[3px] z-30 box_child_menu_edc bg-white right-7 ">
                    <div class="w-full h-full py-2">

                        <Link class="w-full h-1/3 px-3 flex items-center hover:bg-[#fafafa]">
                                <span class="flex py-1">
                                    <span class="mt-0.5 pr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                                        </svg>
                                    </span>
                                    Chi Tiết Hợp Đồng
                                </span>
                        </Link>

                        <button onClick={()=> handleShowPopup(contract.id)} class="w-full h-1/3 border-t-[1px] px-3 flex  hover:bg-[#fafafa]">
                                <span class="flex py-1 text-[#f44366]">
                                    <span class="mt-0.5 pr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                        </svg>
                                    </span>
                                    Xóa Hợp Đồng
                                </span>
                        </button>
                        
                        <Link to={routes.editContract+contract.id} class="w-full h-1/3 border-t-[1px] px-3 flex items-center hover:bg-[#fafafa]">
                                <span class="flex py-1">
                                    <span class="mt-0.5 pr-3">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                      </svg>
                                    </span>
                                    Sửa Hợp Đồng
                                </span>
                        </Link>


                    </div>
                </div>
            </td>

                    </tr>
                    ))}
                    
                </tbody>
            </table>
            <br></br>

           
            <ResponsivePagination
                total={totalPages}
                current={currentPage}
                onPageChange={page => handlePageChange(page)}
            />

    {/* <             Modal 
                isOpen={isModalOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => setIsModalOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div style={{borderStyle : '-moz-initial'}}>
                <h3>Delete Company</h3>
                <i>You Want Delete Company  </i>
                <br></br>
                <br></br>
                <button style={{marginRight: '5px'}} className="btn btn-danger" >Confirm</button>
                <button className="btn btn-primary" onClick={()=>setIsModalOpen(false)}>Cancle</button>
                </div>
 
            </Modal> */}
            {showPopup && (<PopupDelete id={contractId} handleDeleteConfirm={handleDeleteConfirm} handleClosePopup={handleClosePopup} />)}
             
    </div>
</div>
        </>
    )
    }


export default ListContract;
