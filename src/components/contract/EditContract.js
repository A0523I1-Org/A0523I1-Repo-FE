import React, {useEffect, useState} from 'react';
import '../../configs/routes'
import {ErrorMessage, Field, Form, Formik, useFormikContext} from 'formik'
import '../../css/form.css'
import {useParams,useNavigate} from 'react-router-dom'
import {getContractById,updateContract} from '../../services/ContractService'
import Moment from "moment";
import {storage} from "../../configs/firebase";
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid';
import {contractSchema} from '../../schema/ContractSchema'
import PopupUpdate from "./PopupUpdate";

const EditContract = () => {
    const  navigate = useNavigate();
    const {id}= useParams();

    const [contract,setContract] = useState({});

    const [progress,setProgress] = useState(null)
    const [url,setUrl] = useState(null)

    const [file,setFile] = useState(null);
    const [isUpdate,setIsUpdate] = useState(false)

    const calculateEndDate = (e,values,setFieldValue) => {
        console.time('calculateEndDate');
        const {name,value} = e.target;
        switch (name) {
            case 'term':
                values.term = value;
                // setFieldValue('term', value);
                break;
            case'startDate':
                values.startDate = value;
                // setFieldValue('startDate', value);
                break;
            default:
                break;
        }
        const {term,startDate} = values
        const start = Moment(startDate)
        const end = start.add(parseInt(term) ,'month');
        setFieldValue('endDate', end.format('YYYY-MM-DD'))
        console.timeEnd('calculateEndDate');
    }

    const numberFormatter = new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
    const formatNumber = (input) => {
        let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
        input.value = numberFormatter.format(value);
    };
    const initialValue = {
        employee:contract.employeeName ? contract.employeeName : '',
        customer : contract.customerName ? contract.customerName : '',
        term: contract.term ? numberFormatter.format(contract.term) : '',
        startDate: contract.startDate ? Moment(contract.startDate).format("yyyy-MM-DD") : '',
        endDate: contract.endDate ? Moment(contract.endDate).format("yyyy-MM-DD") : '',
        currentFee:contract.feePerMouth ? numberFormatter.format(contract.feePerMouth) : '',
        landing : contract.code ? contract.code : '',
        deposit: contract.deposit ? numberFormatter.format(contract.deposit) : '',
        taxCode: contract.taxCode ? contract.taxCode : '',
        content: contract.content ? contract.content : '',
        fireBaseUrl: contract.fireBaseUrl ? contract.fireBaseUrl : '',
        img: null
    }

    useEffect(() => {
        fetchContractById(id);
    },[id])

    // useEffect(() => {
    //     const UploadFile = () => {
    //         const storageRef = ref(storage,`imagesContracts/${file.name + v4()}`);
    //         const uploadTask = uploadBytesResumable(storageRef,file);
    //         uploadTask.on('state_changed',(snapshot) => {
    //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             setProgress(progress);
    //             switch (snapshot.state) {
    //                 case  'paused':
    //                     console.log("Upload is paused")
    //                     break;
    //                 case 'running':
    //                     console.log("Upload is running")
    //                     break;
    //                 default:
    //                     console.log("Upload is unknown")
    //                     break
    //             }
    //         },(error) => {
    //             console.log(error)
    //         },() => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
    //                 setUrl((prev) => ({...prev,image:downloadURL}))
    //             })
    //         })
    //     }
    //
    //     file && UploadFile();
    // },[file])




    const fetchContractById = async (id) => {
        try{
            const response = await getContractById(id);
            setContract(response.result);

        }catch (e) {
            console.log('Error fetching contract ',e);
        }
    }
    const UploadFile = async (file) => {
        try {
            const storageRef = ref(storage,`imagesContracts/${file.name + v4()}`);
            const uploadTask = uploadBytesResumable(storageRef,file);
            uploadTask.on('state_changed',(snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            })
            await uploadTask;
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            return downloadURL;
        }catch (e) {
            console.log(e)
        }
    }
    const onSubmit =  async (values) => {
        try{
        let valueMerge = {...values}
        if(valueMerge.img){
            const img  = await UploadFile(valueMerge.img)
            console.log(img)
                valueMerge = {...valueMerge, fireBaseUrl: img}
                console.log('142',valueMerge)
        }else{
            valueMerge = {...valueMerge, fireBaseUrl:contract.fireBaseUrl}
            console.log('144',valueMerge)
        }
            console.log('146',valueMerge)
            await updateContract(id,valueMerge);
            setIsUpdate(true)
        }catch (e) {
            console.log('Error updating contract ',e);
        }
    }
    console.log(progress)

    const handleClosePopup = () => {
        setIsUpdate(false)
    }


    if (!initialValue) return <div>Loading...</div>
    return (
        <div style={{width: '100%'}} class="w-full h-[600px] mt-[20px] ">
            <div className="h-full mx-16  flex gap-3">
                <div className="w-full h-full box__shadow ">
                    <div className="w-full h-[80px] bg-[#fafafa] border-b-[1px] flex items-center ">
                   <span className="ml-5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                           stroke="currentColor" class="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                     </svg>
                    </span>
                        <p className="font-semibold text-[#333] ml-2  " style={{fontSize: "17px"}}>Hợp đồng</p>
                    </div>
                    <Formik
                        enableReinitialize
                        initialValues={initialValue}
                        onSubmit={values => onSubmit(values)}
                        validationSchema={contractSchema} >
                        {({values,handleChange,setFieldValue}) =>(
                            <Form>
                                <div className="w-full h-full  flex flex-col">
                                    <div className="w-full h-4/6  flex">
                                        <div className="w-1/2 h-5/6 flex flex-col gap-8 wrap ">
                                            <div className=" h-1/5 mx-5  mt-5 flex gap-3 ">
                                                <p className="w-4/12 h-full text-sm">Nhân Viên
                                                    <span className="text-lg text-red-500">*</span></p>
                                                <div className="w-8/12 h-full  flex">
                         <span
                             className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                         </svg>
                         </span>
                                                    <Field
                                                        style={{fontFamily: 'Arial, sans-serif', fontSize: '13.4px', color: '#888'}}
                                                        type="text" className="w-full  border-[#8887] px-3"
                                                        placeholder="Nhập để tìm"
                                                        name='employee'
                                                        disabled/>
                                                    <ErrorMessage name='employee' component="span" style={{color: "red"}}/>
                                                </div>
                                            </div>
                                            <div className=" h-1/5 mx-5 flex gap-3 ">
                                                <p className="w-4/12 h-full text-sm">Khách Hàng <span
                                                    className="text-sm text-red-500">*</span></p>
                                                <div className="w-8/12 h-full  flex">
                         <span
                             className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                         </svg>
                         </span>

                                                    <Field type="text"
                                                           style={{
                                                               fontFamily: 'Arial, sans-serif',
                                                               fontSize: '13.4px',
                                                               color: '#888'
                                                           }}
                                                           className="w-full  border-[#8887] px-3" placeholder="Nhập Để Tìm"
                                                           name="customer"
                                                           disabled
                                                    />


                                                    <ErrorMessage name='customer' component="span" style={{color: "red"}}/>
                                                </div>
                                            </div>

                                            <div className=" h-[40px] mx-5 flex gap-3 ">
                                                <p className="w-4/12 h-full text-sm">Kì Hạn <span
                                                    className="text-lg text-red-500">*</span> <span
                                                    className="text-sm text-red-500">(tháng)</span></p>
                                                <div className="w-8/12 h-full">
                                                    <div className="flex">
                                                 <span
                                                     className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
                                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                    stroke="currentColor" className="w-4 h-4">
                                                  <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"/>
                                               </svg>
                                             </span>
                                                        <Field
                                                            style={{fontFamily: 'Arial, sans-serif', fontSize: '13.4px',  color: '#222'}}
                                                            type="number" className="w-full  border-[#8887] px-3"
                                                            name="term"
                                                            onChange = {(e) =>{
                                                                handleChange(e)
                                                                calculateEndDate(e,values,setFieldValue)


                                                            }}
                                                            placeholder="Nhập Kì hạn"/>
                                                    </div>

                                                    <ErrorMessage name="term" className={'p-2'} component="span" style={{color: "red",fontSize:'11px'}}/>
                                                </div>
                                            </div>
                                            <div className=" h-[40px] mx-5  flex gap-3 ">
                                                <p className="w-4/12 h-full text-sm">Ngày Bắt Đầu <span
                                                    className="text-lg text-red-500">*</span></p>
                                                <div className="w-8/12 h-full">
                                                    <div className="flex">
                                                     <span
                                                         className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" className="w-4 h-4">
                                              <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                                            </svg>
                                     </span>
                                                        <Field
                                                            style={{fontFamily: 'Arial, sans-serif', fontSize: '13.4px', color: '#222'}}
                                                            type="date"
                                                            className="w-full  border-[#8887] px-3"
                                                            placeholder="Chọn Ngày Bắt Đầu"

                                                            onChange = {(e) =>{
                                                                calculateEndDate(e,values,setFieldValue)
                                                                handleChange(e)
                                                            }}
                                                            name="startDate"
                                                        />
                                                    </div>
                                                    <ErrorMessage name="startDate" class={'p-2'} component="span" style={{color: "red",fontSize:'12px'}}/>
                                                </div>
                                            </div>

                                            <div className=" h-1/5 mx-5  flex gap-3 ">
                                                <p className="w-4/12 h-full text-sm">Ngày Kết Thúc <span
                                                    className="text-lg text-red-500">*</span></p>
                                                <div className="w-8/12 h-full  flex">
                           <span
                               className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                                </svg>
                                </span>
                                                    <Field
                                                        type="date"
                                                        style={{fontFamily: 'Arial, sans-serif', fontSize: '13.4px', color: '#888'}}
                                                        className="w-full  border-[#8887] px-3"
                                                        placeholder="Chưa Xác Định"
                                                        name="endDate" id="endDate"
                                                        disabled/>
                                                    <ErrorMessage name="end_date" component="span" style={{color: "red"}}/>
                                                </div>
                                            </div>
                                            <div className=" h-1/5 mx-5  mb-5 flex gap-3 ">
                                                <p className="w-4/12 h-full text-sm">H/A Hợp Đồng <span
                                                    className="text-lg text-red-500">*</span></p>
                                                <div className="w-8/12 h-full flex ">
                                                    {/*<Field type="file" name="img" className="border-none pt-1 h-full" onChange={(e) => setFile(e.target.files[0])}/>*/}
                                                    <input type="file"
                                                           className="border-none pt-1 h-full"
                                                           onChange={(e) => {
                                                               setFieldValue("img", e.target.files[0]);

                                                           }}
                                                    />
                                                    <ErrorMessage name="img" component="span" style={{color: "red"}}/>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="w-1/2 h-5/6 flex flex-col gap-8  ">
                                            <div className=" h-1/5 mx-5  mt-5 flex gap-3 ">
                                                <p className="w-4/12 h-full text-sm">Mặt Bằng <span
                                                    className="text-lg text-red-500">*</span></p>
                                                <div className="w-8/12 h-full flex">
                                             <span
                                                 className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
                                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                    stroke="currentColor" className="w-4 h-4">
                                                      <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"/>
                                               </svg>
                                             </span>
                                                    <Field type="text"
                                                           className="w-full  border-[#8887] px-3"
                                                           style={{
                                                               fontFamily: 'Arial, sans-serif',
                                                               fontSize: '13.4px',
                                                               color: '#888'
                                                           }}
                                                           placeholder="Chưa Xác Định"
                                                           name="landing"
                                                           disabled/>
                                                    <ErrorMessage name="landing" component="span" style={{color: "red"}}/>
                                                </div>
                                            </div>
                                            <div className=" h-[40px] mx-5 flex gap-3 ">
                                                <p className="w-4/12 h-full text-sm">Phí Hiện Tại <span
                                                    className="text-lg text-red-500">*</span> <span
                                                    className="text-sm text-red-500">(VND)</span></p>
                                                <div className="w-8/12 h-full">
                                                    <div className="flex">
                                                    <span
                                                        className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
                                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                        stroke="currentColor" className="w-4 h-4">
                                                       <path strokeLinecap="round" strokeLinejoin="round"
                                                             d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/>
                                                   </svg>
                                                </span>
                                                        <Field type="text"
                                                               className="w-full  border-[#8887] px-3"
                                                               style={{
                                                                   fontFamily: 'Arial, sans-serif',
                                                                   fontSize: '13.4px',
                                                                   color: '#222'
                                                               }}
                                                               onChange={(e) => {
                                                                   formatNumber(e.target)
                                                                   handleChange(e)
                                                               }}
                                                               name="currentFee"
                                                               placeholder="Chưa Xác Định"
                                                        />
                                                    </div>
                                                    <ErrorMessage name="currentFee" className={"p-2"} component="span" style={{color: "red",fontSize:'12px'}}/>
                                                </div>
                                            </div>
                                            <div className=" h-[40px] mx-5 flex gap-3 ">
                                                <p className="w-4/12 h-full text-sm">Tiền Đặt Cọc
                                                    <span className="text-lg text-red-500">*</span>
                                                    <span className="text-sm text-red-500"> (VND)</span></p>
                                                <div className=" w-8/12 h-full">
                                                    <div className="flex">
                                                        <span
                                                            className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" strokeWidth="1.5"
                                                                stroke="currentColor" className="w-4 h-4">
                                                               <path strokeLinecap="round" strokeLinejoin="round"
                                                                     d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/>
                                                           </svg>
                                                        </span>
                                                        <Field type="text"
                                                               className="w-full  border-[#8887] px-3"
                                                               style={{
                                                                   fontFamily: 'Arial, sans-serif',
                                                                   fontSize: '13.4px',
                                                                   color: '#222'
                                                               }}
                                                               name="deposit"
                                                               onChange={(e) => {
                                                                   formatNumber(e.target)
                                                                   handleChange(e)
                                                               }}
                                                               placeholder="Nhập Tiền Đặt Cọc"
                                                        />
                                                    </div>
                                                    <ErrorMessage name="deposit" className={'p-2'} component="span" style={{color: "red",fontSize : '12px'}}/>
                                                </div>

                                            </div>

                                            <div className=" h-1/5 mx-5  flex gap-3 ">
                                                <p className="w-4/12 h-full text-sm">Tổng Tiền </p>
                                                <div className="w-8/12 h-full  flex">
                        <span
                            className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-4 h-4">
                               <path strokeLinecap="round" strokeLinejoin="round"
                                     d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/>
                           </svg>
                        </span>
                                                    <Field type="text"
                                                           className="w-full  border-[#8887] px-3"
                                                           style={{
                                                               fontFamily: 'Arial, sans-serif',
                                                               fontSize: '13.4px',
                                                               color: '#222'
                                                           }}
                                                           placeholder="Chưa Xác Định"
                                                           name="total" id="total"
                                                           disabled/>
                                                </div>
                                            </div>

                                            <div className=" h-[40px] mx-5  flex gap-3 ">
                                                <p className="w-4/12 h-full text-sm">Mã Số Thuế <span
                                                    className="text-lg text-red-500">*</span></p>
                                                <div className="w-8/12 h-full">
                                                    <div className="flex ">
                                                    <span
                                                        className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
                                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                              strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                      <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"/>
                                                      <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"/>
                                                    </svg>
                                                    </span>
                                                        <Field type="text"
                                                               style={{
                                                                   fontFamily: 'Arial, sans-serif',
                                                                   fontSize: '13.4px',
                                                                   color: '#222'
                                                               }}
                                                               className="w-full  border-[#8887] px-3"
                                                               name="taxCode"
                                                               placeholder="Nhập Mã Số"

                                                        />
                                                    </div>
                                                    <ErrorMessage name="taxCode" className={'p-2'} component="span" style={{color : 'red',fontSize:'12px'}}/>

                                                </div>
                                            </div>
                                            <div className=" h-[40px] mx-5  flex gap-3 ">
                                                <p className="w-4/12 h-full text-sm">Nội Dung H/Đ <span
                                                    className="text-lg text-red-500">*</span></p>
                                                <div className="w-8/12 h-full  ">
                                                    <Field
                                                        as="textarea"
                                                        type="text"
                                                        className="w-full h-full border-[#8887] px-3" style={{
                                                        fontFamily: 'Arial, sans-serif',
                                                        fontSize: '13.4px',
                                                        color: '#222',
                                                        height: '10vh'
                                                    }}
                                                        placeholder="Nhập Nội Dung"
                                                        name='content'
                                                    />
                                                    <ErrorMessage name='content' className={'p-2'} component='span' style={{color:"red",fontSize:'13px'}}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full h-1/6">
                                        <div className="w-full ml-3  h-10 ">
                                            <button type="submit" className="btn bg-[#2196e3] mr-2" disabled={progress !== null && progress <100}>
                                                <span className="pr-1"><i className="fi fi-rs-disk"/></span>
                                                <span className="pb-10" > Update</span>
                                            </button>

                                            <button className="btn-2">
                                                <span className="pr-1"><i className="fi fi-rr-eraser"/></span>
                                                <span>Cancel</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </div>

            </div>
            {isUpdate && <PopupUpdate handleClosePopup={handleClosePopup}/>}
        </div>
    )

}

export default EditContract;
