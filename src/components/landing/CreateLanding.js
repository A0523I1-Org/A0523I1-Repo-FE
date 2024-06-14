import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { storage } from "../../configs/fireBaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL,uploadBytes } from "firebase/storage";
import { useNavigate, useLocation, Await } from "react-router-dom";
import * as Yup from "yup";
import * as floorService from "../../services/FloorService.js";
import * as landingService from "../../services/LandingService";
import { toast, ToastContainer } from "react-toastify";
// import styles from "../../css/createLanding.css";

const CreateLangding = () => {
  const [landing, setLanding] = useState({
    code: "",
    area: "",
    description: "",
    feePerMonth: "",
    feeManager: "",
    status: "",
    type: "",
    floor: "",
    firebaseUrl: "",
  });
  const [floors, setFloors] = useState([]);
  const [imageUrl,setImageUrl]=useState("")
    const [imageUrlUpload,setImageUrlUpload]=useState("")
  const [percent, setPercent] = useState(0);
  const [firebaseAvt, setFirebaseAvt] = useState("");
  const navigate = useNavigate();
  const [isSubmit, setSubmit] = useState([]);
  const { state } = useLocation();
  useEffect(() => {
    if (state) {
      setLanding(state);
    }
    getAllFloor();
  }, []);

  const getAllFloor = async () => {
    try {
      const foundFloor = await floorService.getAllFloor();
      setFloors(foundFloor);
    } catch (error) {
      console.error("Error fetching floor:", error);
    }
  };


  const submitUpdateLanding = async (values) => {
    if (imageUrlUpload !== null) {
        const imgRef = ref(storage, `imgLanding/${imageUrlUpload.name}`);
        try {
            const snapshot = await uploadBytes(imgRef, imageUrlUpload);
            const urlFireBase = await getDownloadURL(snapshot.ref);
            values.firebaseUrl = urlFireBase;
        } catch (error) {
            console.error("Error uploading image: ", error);
            return; // Có thể thông báo lỗi cho người dùng tại đây nếu cần
        }
    }

    console.log(values.firebaseUrl);
    if (values.firebaseUrl !== "") {
        values.floor = +values.floor;
        try {
            await landingService.addNewLanding(values);
            toast.success("Thêm mặt bằng thành công");
        } catch (error) {
            console.error("Error updating landing: ", error);
            // Có thể thông báo lỗi cho người dùng tại đây nếu cần
        }
    }
};


const handleChangeFileImg=(e)=>{
    const file=e.target.files[0];
  
    if(!file) return;
    const reader=new FileReader();
    reader.onloadend=()=>{
        setImageUrl(reader.result)
    }
    reader.readAsDataURL(file)
    setImageUrlUpload(file)
   
}

  const validate = {
    floor: Yup.string().required("Vui lòng chọn tầng"),

    status: Yup.string().required("Vui lòng trọn trạng thái"),

    type: Yup.string().required("Vui lòng chọn loại mặt bằng"),

    code: Yup.string()
      .required("Mã mặt bằng không được để trống.")
      .matches(/^[A-Za-z0-9]+$/, {
        message: "Mã mặt bằng chỉ được chứa ký tự và số.",
        excludeEmptyString: true,
      })
      .max(25, "Mã mặt bằng phải có tối đa 25 ký tự.")
      .matches(/^MB\d{3}$/, "Mã mặt bằng phải đúng định dạng MBxxx."),

    area: Yup.string()
      .required("Vui lòng nhập diện tích.")
      .test("is-positive", "Diện tích không được nhỏ hơn 0.", (value) => {
        // Kiểm tra xem giá trị có phải là số không
        if (!isNaN(parseFloat(value))) {
          // Nếu là số, kiểm tra xem giá trị có lớn hơn hoặc bằng không không
          return parseFloat(value) >= 0;
        }
        // Nếu không phải là số, không áp dụng kiểm tra số dương
        return true;
      })
      .test(
        "is-valid-number",
        "Diện tích phải là số và không có ký tự đặc biệt.",
        (value) => {
          // Kiểm tra xem giá trị là số và không có ký tự đặc biệt
          return !isNaN(parseFloat(value)) && !/[^a-zA-Z0-9]/.test(value);
        }
      ),

    feePerMonth: Yup.string()
      .required("Vui lòng nhập giá tiền.")
      .test(
        "is-positive-feePerMonth",
        "Vui lòng nhập giá tiền lớn hơn 0.",
        (value) => {
          if (!isNaN(parseFloat(value))) {
            return parseFloat(value) >= 0;
          }

          return true;
        }
      )
      .test(
        "is-valid-number-feePerMonth",
        "Giá tiền phải là số và không được có ký tự đặc biệt.",
        (value) => {
          return !isNaN(parseFloat(value)) && !/[^a-zA-Z0-9]/.test(value);
        }
      ),

    feeManager: Yup.string()
      .required("Vui lòng nhập phí quản lí.")
      .test(
        "is-positive-feeManager",
        "Vui lòng nhập phí quản lí lớn hơn 0.",
        (value) => {
          if (!isNaN(parseFloat(value))) {
            return parseFloat(value) >= 0;
          }

          return true;
        }
      )
      .test(
        "is-valid-number-feeManager",
        "Phí quản lí phải là số và không được có ký tự đặc biệt.",
        (value) => {
          // Kiểm tra xem giá trị là số và không có ký tự đặc biệt
          return !isNaN(parseFloat(value)) && !/[^a-zA-Z0-9]/.test(value);
        }
      ),

    description: Yup.string().max(200, "Chú thích có độ dài tối đa 200 ký tự"),
  };

  // const createLanding = async (values) => {
  //   setSubmit(true);
  //   console.log(values);
  //   setSubmit(false);
  //   values.floor = +values.floor;
  //   values.feePerMonth = +values.feePerMonth;
  //   values.feeManager = +values.feeManager;
  //   values.area = +values.area;
  //   await landingService.addNewLanding(values);
  //   toast.success("Thêm mặt bằng thành công");
  //   navigate("/landing");
  // };

  const initialValues = {
    code: landing.code || '',
    area: landing.area || '',
    feeManager: landing.feeManager || '',
    feePerMonth: landing.feePerMonth || '',
    floor: landing.floor || '',
    id: landing.id || '',
    status: landing.status || '',
    type: landing.type || '',
  firebaseUrl: landing.firebaseUrl || '',
  description:landing.description || '',
};

  if (!landing) {
    return null;
  }
  return (
    <>
       <Formik
                initialValues={initialValues}
                onSubmit={submitUpdateLanding}
                validationSchema={validate}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({ isSubmitting }) => (
                    <Form className="w-full">

                        <div className="row justify-content-around">

                            <div className="mx-16 h-auto flex gap-5">
                                <div className="w-6/12 h-auto bg-white rounded-[3px] flex flex-col gap-8"
                                    style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
                                    <div className="h-[40px] mx-5 mt-3 flex items-center">
                                        <div className="w-4/12 h-full flex items-center">
                                            <span>Tầng <span className="text-red-500 text-xl">*</span></span>
                                        </div>
                                        <div className="w-8/12 h-full">
                                            <Field as="select" id="floor" name="floor"
                                                className="w-full h-full rounded-[3px] border-[#8887] form-control">
                                                <option value="">Chọn</option>
                                                {floors.map((floor) => (
                                                    <option key={floor.id} value={floor.name}>
                                                        {floor.name}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="floor" component="span"
                                                className="text-[12px] text-red-500" />
                                        </div>
                                    </div>

                                    <div className="h-[40px] mx-5 flex items-center">
                                        <div className="w-4/12 h-full flex items-center">
                                            <span>Trạng thái <span className="text-red-500 text-xl">*</span></span>
                                        </div>
                                        <div className="w-8/12 h-full">
                                            <Field as="select" id="status" name="status"
                                                className="w-full h-full rounded-[3px] border-[#8887] form-control">
                                                <option value="">Chọn</option>
                                                <option value="Available">Chưa bàn giao</option>
                                                <option value="Occupied">Đang vào ở</option>
                                                <option value="Repair">Đang sửa chữa</option>
                                                <option value="Drum">Trống</option>
                                            </Field>
                                            <ErrorMessage name="status" component="span"
                                                className="text-[12px] text-red-500" />
                                        </div>
                                    </div>
                                    <div className="h-[40px] mx-5 flex items-center">
                                        <div className="w-4/12 h-full flex items-center">
                                            <span>Diện tích <span className="text-red-500 text-xl">*</span></span>
                                        </div>
                                        <div className="w-8/12 h-full">
                                            <Field type="text" id="area" name="area"
                                                className="pl-3 w-full h-full rounded-[3px] border-[#8887]" />
                                            <ErrorMessage name="area" component="span"
                                                className="text-[12px] text-red-500" />
                                        </div>
                                    </div>
                                    <div className="h-[90px] mx-5   flex items-center ">
                                        <div className="w-4/12 h-full flex items-center">
                                            <span>Chú thích</span>
                                        </div>
                                        <div className="w-8/12 h-full ">
                                            <Field type="text" name="description" id="description"
                                                className="w-full h-full border border-[#8887] " />
                                            <ErrorMessage name="description" component="span"
                                                className="text-[12px] text-red-500" />
                                        </div>
                                    </div>
                                    <div className="h-[40px] mx-5 flex items-center">
                                        <div className="w-4/12 h-full flex items-center">
                                            <span>File ảnh <span className="text-red-500 text-xl">*</span></span>
                                        </div>
                                        <div className="h-full w-8/12 gap-8 flex ">
                                            <div className="center-content ">
                                                <label
                                                    htmlFor="upload_avt"
                                                    className="btn btn-primary"
                                                    style={{ background: "#2196e3" }}
                                                >
                                                    Chọn avatar
                                                </label>
                                                <input
                                                    type="file"
                                                    hidden
                                                    id="upload_avt"
                                                    onChange={(e)=>handleChangeFileImg(e)}
                                                 
                                                />
                                            </div>
                                            <div className="w-[100px] h-[100px] mt-[-10px]">
                                                <img name="firebaseUrl" id="firebaseUrl"
                                                    className="w-full h-full object-cover"
                                                    src={imageUrl}
                                                    alt="anh ko hien thi"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="w-6/12 h-full bg-white rounded-[3px]"
                                    style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
                                    <div className="w-full h-1/2">
                                        <div className="w-full h-full flex">
                                            <div className="h-[80px] w-3/12 mr-5 mt-5 mb-3 flex items-center">
                                                <h1 className="text-xl pl-5">Mặt bằng</h1>
                                            </div>
                                            <div className="h-auto w-9/12 mr-5 mt-5 mb-3 flex flex-col gap-8">
                                                <div className="w-full h-[40px] flex">
                                                    <div className="w-3/12 h-full flex items-center">
                                                        <span>Loại mặt bằng </span>
                                                    </div>
                                                    <div className="w-9/12 h-full  items-center">
                                                        <Field as="select" id="type" name="type"
                                                            className="w-full h-full rounded-[3px] border-[#8887] form-control">
                                                            <option value="">Tìm theo loại mặt bằng</option>
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
                                                        </Field>
                                                        <ErrorMessage name="type" component="span"
                                                            className="text-[12px] text-red-500" />
                                                    </div>
                                                </div>
                                                <div className="w-full h-[40px] flex">
                                                    <div className="w-3/12 h-full flex items-center">
                                                        <span>Mã mặt bằng <span
                                                            className="text-red-500 text-xl">*</span></span>
                                                    </div>
                                                    <div className="w-9/12 h-full">
                                                        <Field type="text" id="code" name="code"
                                                            className="w-full h-full rounded-[3px] border-[#8887] pl-3" />
                                                        <ErrorMessage name="code" component="span"
                                                            className="text-[11px] text-red-500" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full h-2/3">
                                        <div className="w-full h-full flex">
                                            <div className="h-[80px] w-3/12 mr-5 mt-5 mb-3 flex items-center">
                                                <h1 className="text-xl pl-5">Chi phí</h1>
                                            </div>
                                            <div className="h-auto w-9/12 mr-5 mt-5 mb-3 flex flex-col gap-8">
                                                <div className="w-full h-[40px] flex">
                                                    <div className="w-3/12 h-full flex items-center">
                                                        <span>Giá tiền</span></div>
                                                    <div className="w-9/12 h-full">
                                                        <Field type="text" id="feePerMonth" name="feePerMonth"
                                                            className="w-full h-full rounded-[3px] border-[#8887] pl-3" />
                                                        <ErrorMessage name="feePerMonth" component="span"
                                                            className="text-[11px] text-red-500" />
                                                    </div>
                                                </div>
                                                <div className="w-full h-[40px] flex">
                                                    <div className="w-3/12 h-full flex items-center">
                                                        <span>Phí quản lý</span>
                                                    </div>
                                                    <div className="w-9/12 h-full">
                                                        <Field type="text" id="feeManager" name="feeManager"
                                                            className="w-full h-full rounded-[3px] border-[#8887] pl-3" />
                                                        <ErrorMessage name="feeManager" component="span"
                                                            className="text-[11px] text-red-500" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full h-1/3">
                                        <div className="h-[40px] mx-5 mt-5 mb-3">
                                            <button className="btn bg-[#4CAF50] mr-2" type="submit"
                                                disabled={isSubmitting}>
                                                <span className="pr-1"><i className="fi fi-rs-disk" /></span>
                                                <span className="pb-10">Lưu</span>
                                            </button>
                                            <button className="btn-2" type="reset">
                                                <span className="pr-1"><i className="fi fi-rr-eraser" /></span>
                                                <span>Làm mới</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
    </>
  );
};
export default CreateLangding;
