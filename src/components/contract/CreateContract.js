import "../../css/createContract.css";
import { useState, useEffect } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as landingService from "../../services/LandingService";
import * as customerService from "../../services/CustomerService";
import * as contractService from "../../services/ContractService";
import { storage } from "../../configs/firebase";
import { ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const CreateContract = () => {
  const [contract, setContract] = useState({
    customerId : "",
    term : "",
    startDate : "",
    endDate : "",
    firebaseUrl : "",
    landingId : "",
    currentFee : "",
    deposit : "",
    taxCode : "",
    content : ""
  });
  const [landings, setLandings] = useState([]);
  const [customers, setCustomers] = useState([]);
  // const [customerNameSearch, setCustomerNameSearch] = useState("");
  // const [customerId, setCustomerId] = useState("");
  const [term,setTerm] = useState(0);
  const [deposit,setDeposit] = useState(0);
  const [currentFee,setCurrentFee] = useState(0)
  const [startDate,setStartDate] = useState("");
  const [landing,setLanding] = useState({});
  const[imgUpload,setImgUpload] = useState(null);
  const [url,setUrl] = useState("");
 
  
  const contractValidate = {
      customerId : Yup.string().required("Vui lòng chọn khách hàng !"),
      term : Yup.number()
                        .typeError("Vui lòng nhập số !")
                        .required("Vui lòng nhập kì hạn !")
                        .min(1,"Kì hạn thuê tối thiểu 1 tháng !")
                        .max(120,"Kì hạn thuê tối đa không quá 10 năm !")
                        .integer("Chỉ được thuê theo từng tháng !"),
                        
      startDate : Yup.date()
                        .required("Vui lòng chọn ngày bắt đầu !")
                        .min(new Date(),"Ngày bắt đầu phải sau hoặc bằng ngày hiện tại !"),
      firebaseUrl : Yup.mixed()
                        .required("Vui lòng cung cấp hình ảnh H/Đ !")
                        
                        .test("a","Vui lòng cung cấp file hình ảnh !",value => {
                          let arr = value.split(".");
                          if( arr.pop() === 'png' || arr.pop() === 'jpg' || arr.pop() === 'gif' ){

                                return true;
                          }else {
                            return false;
                          }
                      } )  ,
      landingId :  Yup.string().required("Vui lòng chọn mặt bằng !")   ,
      deposit : Yup.number()
                        .typeError("Vui lòng nhập số !")
                        .required("Vui lòng nhập tiền đặt cọc !")
                        .min(currentFee*10/100,"Tiền đặt cọc tối thiểu bằng 10% so với phí hiện tại !")
                        .max(currentFee*term,"Tiền đặt cọc tối đa bằng tổng tiền (phí * kì hạn) !"),
      taxCode : Yup.string()
                        .required("Vui lòng nhập mã số thuế !")
                        .matches(/^[0-9]{10}$/,"Vui lòng nhập đúng định dạng (10 chữ số)!"),
      content : Yup.string()  
                   .required("Vui lòng nhập nội dung !")  
                   .min(50,"Nhập nội dung tối thiểu 50 kí tự !")   
  };

  const uploadImage = (values,setFieldValue) => {
    
    if(imgUpload == null) return;
    const imageRef = ref(storage,`imgContract/${imgUpload.name + v4() }`);
    uploadBytes(imageRef,imgUpload).then(snapshot => getDownloadURL(snapshot.ref)
    .then((url) => createContract(url,values,setFieldValue) )
    )
  }


  const createContract = async (url,values,setFieldValue) => {
    values.firebaseUrl = url;
    values.term = +values.term;
    values.deposit = +values.deposit;
    values.customerId = +values.customerId;
    values.landingId = +landing.id
    console.log(values);
    const isSucsecc = await contractService.createContract(values);

    
    
    if(isSucsecc){
      alert("thanh cong")
      
    }else{
      setFieldValue("firebaseUrl",imgUpload.name)
      
      alert("that bai")
    }
  };
  const handleChangeLanding = (e,setFieldValue) => {
    

    setLanding(JSON.parse(e.target.value))
    setFieldValue('currentFee',JSON.parse(e.target.value).feeManager+JSON.parse(e.target.value).feePerMonth)
    setCurrentFee(JSON.parse(e.target.value).feeManager+JSON.parse(e.target.value).feePerMonth)
    setFieldValue('landingId',e.target.value);
  }
  const handleChangeFirebaseUrl = (e,setFieldValue) => {
   
      setImgUpload(e.target.files[0]);
      
      e.target.value ? setFieldValue('firebaseUrl',e.target.files[0].name)
                      : setFieldValue('firebaseUrl',"")
   
  }

  const setEndDate = (startDate,term) => {
    let stDate = startDate;
    let list = stDate.split("-");
    let getMonthNew = +list[1]+(+term);
    let endDate;

    if(getMonthNew < 10){
        endDate = +list[0]+'-0'+getMonthNew+'-'+(list[2]);
    }else if( getMonthNew >= 10 && getMonthNew <=12 ){
        endDate = +list[0]+'-'+getMonthNew+'-'+(list[2]);
    }else{
        let yearNew = +list[0]+Math.floor(getMonthNew/12);
        
        getMonthNew-12*Math.floor(getMonthNew/12) < 10 ?
        endDate = yearNew+'-0'+(getMonthNew-12*Math.floor(getMonthNew/12)) +'-'+(list[2]) :
        endDate = yearNew+'-'+(getMonthNew-12*Math.floor(getMonthNew/12)) +'-'+(list[2])
    }

    return endDate;
        
  }

  const handleChangeStartDate = (e,setFieldValue) => {
    setStartDate(e.target.value)
    
    term === ""? setFieldValue('endDate',"")
                : setFieldValue('endDate',setEndDate(e.target.value,term))

    setFieldValue('startDate',e.target.value)     
    if(!e.target.value){
      setFieldValue("endDate","")
    }  
    
  }
  const handleChangeTerm = (e,setFieldValue) => {
    setTerm(+e.target.value)
    
    startDate === "" ? setFieldValue('endDate',""):
                        setFieldValue('endDate',setEndDate(startDate,e.target.value))
     setFieldValue('term',e.target.value)
    
  }
  const handleChangeDeposit = (e,setFieldValue) => {
    setDeposit(+e.target.value);
    setFieldValue('deposit',e.target.value);
  }
  const handleChangeCustomer = (e,setFieldValue) => {
    setFieldValue("customerId",e.target.value)
  }
  
  



  useEffect(() => {
    const getLandings = async () => {
      const result = await landingService.getAllLandingSpace();

      setLandings(result);
    };
    getLandings();
  }, []);

  

  useEffect(() => {
    const getCustomers = async () => {
      const result = await customerService.getCustomers();
      // console.log(result);
      // const listCustomerBySearchName = result.filter((customer) =>
      //   customer.name.includes(customerNameSearch)
      // );
      setCustomers(result);
    };
    getCustomers();
  }, []);


  // console.log(customerId);
  return (
    <>
      <div className="w-full h-[600px] mt-[20px] ">
        <div className="h-full mx-16  flex gap-3">
          <div className="w-full h-full box__shadow ">
            <div className="w-full h-1/6 bg-[#fafafa] border-b-[1px] flex items-center ">
              <span className="ml-5">
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </span>
              <p
                className="font-semibold text-[#333] ml-2  "
                style={{ fontSize: 17 }}
              >
                Hợp đồng
              </p>
            </div>
            <Formik
              initialValues={contract}
              validationSchema={Yup.object(contractValidate)}
              onSubmit={(values,actions)=>uploadImage(values,actions.setFieldValue)}
            > 
                {({ setFieldValue }) => {
           return   <div className="w-full h-full  flex flex-col">
              
                    <Form>
                  <div className="w-full h-5/6  flex">
                    <div className="w-1/2 h-6/6 flex flex-col gap-9  ">
                      <div className=" h-[40px] mx-5  mt-5 flex gap-3 ">
                        <p className="w-4/12 h-full text-sm">
                          Nhân Viên{" "}
                          <span className="text-lg text-red-500">*</span>
                        </p>
                        <div className="w-8/12 h-full  flex">
                          <span className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
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
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                              />
                            </svg>
                          </span>
                          <input
                            readOnly
                            style={{
                              fontFamily: "Arial, sans-serif",
                              fontSize: "13.4px",
                              color: "#888",
                            }}
                            type="text"
                            className="w-full h-full border-[#8887] px-3"
                            defaultValue="Nguyễn Văn Thanh"
                          />
                        </div>
                      </div>

                      <div className=" h-[40px] mx-5 flex gap-3 ">
                        <p className="w-4/12 h-full text-sm">
                          Khách Hàng{" "}
                          <span className="text-sm text-red-500">*</span>
                        </p>
                        <div className="w-8/12 h-full  ">
                          <div className="flex h-full">
                          <span className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
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
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                              />
                            </svg>
                          </span>
                          <Field  as = 'select'
                            name="customerId"
                            onChange={(e) =>handleChangeCustomer(e,setFieldValue)}
                            className="w-full h-full border-[#8887] px-3"
                            
                          >
                            <option selected hidden>
                              Chọn Khách Hàng
                            </option>
                            {customers.map((customer) => (
                              <option key={customer.id} value={customer.id}>
                                {customer.name}
                              </option>
                            ))}
                          </Field>
                          </div>
                          <ErrorMessage style={{ fontSize: '11px',color : 'red'}} className="pl-12" name="customerId" component="i"/>
                   
                        </div>
                      </div>

                      <div className=" h-[40px] mx-5 flex gap-3 ">
                        <p className="w-4/12 h-full text-sm">
                          Kì Hạn <span className="text-lg text-red-500">*</span>{" "}
                          <span className="text-sm text-red-500">(tháng)</span>
                        </p>
                        <div className="w-8/12 h-full  ">
                        <div className="flex h-full">
                        <span className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
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
                                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                              />
                            </svg>
                          </span>
                          <Field
                            onChange = {(e) => handleChangeTerm(e,setFieldValue)}
                            name="term"
                            type="text"
                            className="w-full h-full border-[#8887] px-3"
                            placeholder="Nhập Kì hạn"
                          />
                        </div>                   
                      <ErrorMessage style={{ fontSize: '11px',color : 'red'}} className="pl-12" name="term" component="i"/>                         
                        </div> 

                      </div>
                      <div  className=" h-[40px] mx-5  flex gap-3 ">
                        <p className="w-4/12 h-full text-sm">
                          Ngày Bắt Đầu{" "}
                          <span className="text-lg text-red-500">*</span>
                        </p>
                        <div className="w-8/12 h-full  ">
                        <div className="flex h-full">
                        <span className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
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
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                              />
                            </svg>
                          </span>
                          <Field
                            placeholder="Chọn Ngày Bắt Đầu"
                            name="startDate"
                            type="text"
                            onChange = {(e) => handleChangeStartDate(e,setFieldValue)}
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            className="w-full h-full border-[#8887] px-3"
                          />
                        </div>
                      <ErrorMessage style={{ fontSize: '11px',color : 'red'}} className="pl-12" name="startDate" component="i"/>                        
                        </div>
                      </div>
                      <div className=" h-1/5 mx-5  flex gap-3 ">
                        <p className="w-4/12 h-full text-sm">Ngày Kết Thúc </p>
                        <div className="w-8/12 h-full  flex">
                          <span className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
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
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                              />
                            </svg>
                          </span>
                          <Field
                            
                            style={{
                              fontFamily: "Arial, sans-serif",
                              fontSize: "13.4px",
                              color: "#888",
                            }}
                            readOnly
                            placeholder="Chưa Xác Định"
                            type="text"
                            name="endDate"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            className="w-full h-full border-[#8887] px-3"
                          />
                        </div>
                      </div>
                      <div className=" h-[40px] mx-5  mb-5 flex gap-3 ">
                        <p className="w-4/12 h-full text-sm">H/A Hợp Đồng</p>
                        <div className="w-8/12 h-full ">
                          <input
                          name="firebaseUrl"
                            type="file"
                            className=" border-none pt-1 h-full block "
                            onChange = {(e)=>handleChangeFirebaseUrl(e,setFieldValue)}
                          />
                      <ErrorMessage style={{ fontSize: '11px',color : 'red',display : "block"}} className="pl-12" name="firebaseUrl" component="span"/>     

                        </div>
                      </div>
                    </div>
                    

                    <div className="w-1/2 h-5/6 flex flex-col gap-9  ">
                      <div className=" h-[40px] mx-5  mt-5 flex gap-3 ">
                        <p className="w-4/12 h-full text-sm">
                          Mặt Bằng{" "}
                          <span className="text-lg text-red-500">*</span>
                        </p>
                        <div className="w-8/12 h-full ">
                         <div className="flex h-full">
                         <span className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
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
                                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                              />
                            </svg>
                          </span>
                          <Field as = 'select'
                          onChange = {(e) => handleChangeLanding(e,setFieldValue)}
                            name="landingId"
                            className="w-full h-full border-[#8887] px-3"
                          >
                            <option selected hidden>
                              Chọn Mặt Bằng
                            </option>
                            {landings.map((landing) => (
                              <option key={landing.id} value={JSON.stringify(landing)}>
                                {landing.code}
                              </option>
                            ))}
                          </Field>
                         </div>
                      <ErrorMessage style={{ fontSize: '11px',color : 'red'}} className="pl-12" name="landingId" component="span"/>

                        </div>
                      </div>

                      <div className=" h-1/5 mx-5 flex gap-3 ">
                        <p className="w-4/12 h-full text-sm">
                          Phí Hiện Tại{" "}
                          <span className="text-sm text-red-500">(tháng)</span>
                        </p>
                        <div className="w-8/12 h-full  flex">
                          <span className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
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
                                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                              />
                            </svg>
                          </span>
                          <Field
                            
                            name="currentFee"
                            type="text"
                            readOnly
                            style={{
                              fontFamily: "Arial, sans-serif",
                              fontSize: "13.4px",
                              color: "#888",
                            }}
                            className="w-full h-full border-[#8887] px-3"
                            placeholder="Chưa Xác Định"
                          />
                        </div>
                      </div>

                      <div className=" h-[40px] mx-5 flex gap-3 ">
                        <p className="w-4/12 h-full text-sm">
                          Tiền Đặt Cọc{" "}
                          <span className="text-lg text-red-500">*</span>
                        </p>
                        <div className="w-8/12 h-full  ">
                        <div className="flex h-full "> 
                        <span className="flex items-center bg-[#fafafa] py-3 px-4  rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
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
                                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                              />
                            </svg>
                          </span>
                          <Field
                            // onChange = {(e) => handleChangeDeposit(e,setFieldValue)}
                            onChange= {(e)=>handleChangeDeposit(e,setFieldValue)}
                            name="deposit"
                            type="text"
                            className="w-full h-full border-[#8887] px-3"
                            placeholder="Nhập Tiền Đặt Cọc"
                          />
                        </div>
                      <ErrorMessage style={{ fontSize: '11px',color : 'red' }} className="pl-12" name="deposit" component="i"/>
                        
                        </div>
                      </div>

                      <div className=" h-[40px] mx-5  flex gap-3 ">
                        <p className="w-4/12 h-full text-sm">Tổng Tiền </p>
                        <div className="w-8/12 h-full  flex">
                          <span className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
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
                                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                              />
                            </svg>
                          </span>
                          <input
                            style={{
                              fontFamily: "Arial, sans-serif",
                              fontSize: "13.4px",
                              color: "#888",
                            }}
                            readOnly
                            type="text"
                            value={
                                currentFee === 0  || deposit === 0 || term === 0 ||
                                currentFee === ""  || deposit === "" || term === ""
                                ?"" : currentFee*term-deposit
                            }
                            className="w-full h-full border-[#8887] px-3"
                            placeholder="Chưa Xác Định"
                          />
                        </div>
                      </div>

                      <div className=" h-[40px] mx-5  flex gap-3 ">
                        <p className="w-4/12 h-full text-sm">
                          Mã Số Thuế{" "}
                          <span className="text-lg text-red-500">*</span>
                        </p>
                        <div className="w-8/12 h-full  ">
                         <div className="flex h-full">
                         <span className="flex items-center bg-[#fafafa] py-3 px-4 border rounded-tl-[3px] rounded-tb-[3px] text-[#888] ">
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
                                d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                              />
                            </svg>
                          </span>
                          <Field
                            name="taxCode"
                            placeholder="Nhập Mã Số"
                            type="text"
                            className="w-full h-full border-[#8887] px-3"
                          />
                         </div>
                      <ErrorMessage style={{ fontSize: '11px',color : 'red'}} className="pl-12" name="taxCode" component="i"/>

                        </div>
                      </div>

                      <div className=" h-[40px] mx-5  flex gap-3 ">
                        <p className="w-4/12 h-full text-sm">
                          Nội Dung H/Đ{" "}
                          <span className="text-lg text-red-500">*</span>
                        </p>
                        <div className="w-8/12 h-full  ">
                          <Field as='textarea'
                            name="content"
                            style={{ height: "10vh" }}
                            placeholder="Nhập Nội Dung"
                            type="text"
                            className="w-full h-full border-[#8887] px-3"
                            defaultValue={""}
                          />
                      <ErrorMessage style={{ fontSize: '13px',color : 'red',display : "block"}} className="pl-12" name="content" component="i"/>

                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="w-full h-1/6 ">
                    <div className="w-full ml-3 my-5 h-10 ">
                      <button type="submit" className="btn bg-[#4CAF50] mr-2">
                        <span className="pr-1">
                          <i className="fi fi-rs-disk" />
                        </span>
                        <span className="pb-10"> Lưu</span>
                      </button>
                      <button type="reset" className="btn-2">
                        <span className="pr-1">
                          <i className="fi fi-rr-eraser" />
                        </span>
                        <span>Làm mới</span>
                      </button>
                    </div>
                  </div>
                     </Form>

                     
              </div>
                 }
                }
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateContract;
