import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { storage } from "../../configs/fireBaseConfig.js";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { useNavigate, useLocation, Await } from "react-router-dom";
import * as Yup from "yup";
import routes from "../../configs/routes";
import * as floorService from "../../services/FloorService.js";
import * as landingService from "../../services/LandingService";
import { toast } from "react-toastify";
import * as authService from "../../services/Authenticate/AuthService";

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
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrlUpload, setImageUrlUpload] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  const notify = () => {
    toast.success("Thêm mới mặt bằng thành công");
  };

  useEffect(() => {
    if (state) {
      setLanding(state);
    }
    getAllFloor();
  }, []);

  const getAllFloor = async () => {
    try {
      const token = authService.getToken();
      const foundFloor = await floorService.getAllFloor(token);
      setFloors(foundFloor);
    } catch (error) {
      console.error("Error fetching floor:", error);
    }
  };

  const submitCreateLanding = async (values) => {
    if (imageUrlUpload !== null) {
      const imgRef = ref(storage, `imgLanding/${imageUrlUpload.name}`);
      try {
        const snapshot = await uploadBytes(imgRef, imageUrlUpload);
        const urlFireBase = await getDownloadURL(snapshot.ref);
        values.firebaseUrl = urlFireBase;
      } catch (error) {
        console.error("Error uploading image: ", error);
        return;
      }
    }

    console.log(values.firebaseUrl);
    if (values.firebaseUrl !== "") {
      values.floor = +values.floor;
      try {
        const token = authService.getToken();
        const isSuccess = await landingService.addNewLanding(values, token);
        if (isSuccess) {
          navigate(routes.listLanding);
          notify();
          console.log("Them moi thanh cong!!!");
        } else {
          toast.error("Thêm mới mặt bằng không thành công!");
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi thêm mới mặt bằng!");
        console.error("Error adding new landing:", error);
      }
    }
  };

  const handleChangeFileImg = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setImageUrlUpload(file);
  };

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
      .matches(/^MB\d{3}$/, "Mã mặt bằng phải đúng định dạng MBxxx.")
      .test("unique-code", "Mã mặt bằng đã tồn tại", async (value) => {
        if (!value) return false;
        const token = authService.getToken();
        const isUnique = await landingService.findLandingByCode(value, token);
        console.log(isUnique);
        return !isUnique;
      }),

    area: Yup.string()
      .required("Vui lòng nhập diện tích.")
      .test("is-positive", "Diện tích không được nhỏ hơn 0.", (value) => {
        if (!isNaN(parseFloat(value))) {
          return parseFloat(value) >= 0;
        }
        return true;
      })
      .test(
        "is-valid-number",
        "Diện tích phải là số và không có ký tự đặc biệt.",
        (value) => {
          return !isNaN(parseFloat(value)) && !/[^a-zA-Z0-9]/.test(value);
        }
      )
      .test("is-positive", "Diện tích quá lớn.", (value) => {
        if (!isNaN(parseFloat(value))) {
          return parseFloat(value) < 1000000;
        }
        return true;
      }),

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
      )
      .test("is-positive", "Giá tiền quá lớn.", (value) => {
        if (!isNaN(parseFloat(value))) {
          return parseFloat(value) < 1000000000000;
        }
        return true;
      }),

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
          return !isNaN(parseFloat(value)) && !/[^a-zA-Z0-9]/.test(value);
        }
      )
      .test("is-positive", "Phí quản lí quá lớn.", (value) => {
        if (!isNaN(parseFloat(value))) {
          return parseFloat(value) < 1000000000;
        }
        return true;
      }),

    description: Yup.string().max(200, "Chú thích có độ dài tối đa 200 ký tự"),
    
  };

  const initialValues = {
    code: landing.code || "",
    area: landing.area || "",
    feeManager: landing.feeManager || "",
    feePerMonth: landing.feePerMonth || "",
    floor: landing.floor || "",
    id: landing.id || "",
    status: landing.status || "",
    type: landing.type || "",
    firebaseUrl: landing.firebaseUrl || "",
    description: landing.description || "",
  };

  if (!landing) {
    return null;
  }
  return (
    <>
           
      <Formik
        initialValues={landing}
        onSubmit={submitCreateLanding}
        validationSchema={Yup.object(validate)}
      >
        {({ isSubmitting }) => (
           
            isSubmitting ? (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75"
                     aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-start">
                        <div className="mx-auto mt-0 text-center">
                        <svg aria-hidden="true" role="status" className="inline w-20 h-20 me-3 text-white animate-spin"
                               viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"/>
                          </svg>
                        </div>
                    </div>
                </div>

            ):
        
            <Form className="w-full">

              <div className="row justify-content-around">

                <div className=" h-auto flex gap-5 max-lg:flex-wrap">
                  <div className="w-6/12 max-lg:w-full h-auto bg-white rounded-[3px] flex flex-col gap-8"
                       style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
                    <div className="h-[40px] mx-5 mt-3 flex items-center">
                      <div className="w-4/12 h-full flex items-center">
                        <span>Tầng <span className="text-red-500 text-xl">*</span></span>
                      </div>
                      <div className="w-8/12 h-full">
                        <Field as="select" id="floor" name="floor"
                               className="w-full h-full pl-3 rounded-[3px] border-[#8887] form-control">
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
                               className="w-full h-full pl-3 rounded-[3px] border-[#8887] form-control">
                          <option value="">Chọn</option>
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

                        </Field>
                        <ErrorMessage name="status" component="span"
                                      className="text-[12px] text-red-500" />
                      </div>
                    </div>
                    <div className="h-[40px] mx-5 flex items-center">
                      <div className="w-4/12 h-full flex items-center">
                        <span>Diện tích(m²)<span className="text-red-500 text-xl">*</span></span>
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
                    <div className="h-28">
                      <div className="h-[40px] mx-5 flex items-center">
                        <div className="w-4/12 h-full flex items-center">
                          <span>File ảnh <span className="text-red-500 text-xl">*</span></span>
                        </div>
                        <div className="h-full w-8/12 gap-8 flex ">
                          <div className="center-content ">
                            <label
                                htmlFor="upload_avt"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                            >
                              Chọn <div className="max-sm:hidden px-1"> ảnh</div>
                            </label>
                            <input
                                type="file"
                                hidden
                                required="true"
                                id="upload_avt"
                                onChange={(e) => handleChangeFileImg(e)}

                            />
                          </div>
                          <div className="w-[100px] h-[100px] mt-[-10px]">
                            <img name="firebaseUrl" id="firebaseUrl"
                                 className="w-full h-full object-cover"
                                 src={imageUrl}
                                 alt="anh ko hien thi"
                                 accept="image/!*"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-6/12 h-full max-lg:w-full bg-white rounded-[3px]"
                       style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
                    <div className="w-full h-1/2">
                      <div className="w-full h-full flex">
                        <div className="h-[80px] w-3/12  max-sm:hidden mr-5 mt-5 mb-3 flex items-center">
                          <h1 className="text-xl pl-5">Mặt bằng</h1>
                        </div>
                        <div className="h-auto w-9/12 mr-5 max-sm:mr-0 max-sm:w-full mt-5 mb-3 flex flex-col gap-8">
                          <div className=" h-[40px] flex max-sm:mx-5">
                            <div className="w-3/12 max-sm:w-4/12  h-full flex items-center">
                              <span>Loại mặt bằng </span>
                            </div>
                            <div className="w-9/12 h-full max-sm:w-8/12   ">
                              <Field as="select" id="type" name="type"
                                     className="w-full h-full pl-3 rounded-[3px] border-[#8887] form-control">
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
                          <div className=" h-[40px] flex max-sm:mx-5">
                            <div className="w-3/12 h-full max-sm:w-4/12 flex items-center">
                                                        <span>Mã mặt bằng <span
                                                            className="text-red-500 text-xl">*</span></span>
                            </div>
                            <div className="w-9/12 h-full max-sm:w-8/12">
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
                        <div
                            className="h-[80px] max-sm:hidden w-3/12 mr-5 mt-5 mb-3 flex items-center">
                          <h1 className="text-xl pl-5">Chi phí</h1>
                        </div>
                        <div
                            className="h-auto w-9/12 mr-5 max-sm:mr-0 max-sm:w-full mt-5 mb-3 flex flex-col gap-8">
                          <div className=" h-[40px] flex max-sm:mx-5">
                            <div className="w-3/12 max-sm:w-4/12  h-full flex items-center">
                              <span>Giá tiền(VNĐ)</span>
                            </div>
                            <div className="w-9/12 h-full max-sm:w-8/12   ">
                              <Field type="text" id="feePerMonth" name="feePerMonth"
                                     className="w-full h-full rounded-[3px] border-[#8887] pl-3"/>
                              <ErrorMessage name="feePerMonth" component="span"
                                            className="text-[11px] text-red-500"/>
                            </div>
                          </div>
                          <div className=" h-[40px] flex max-sm:mx-5">
                            <div className="w-3/12 h-full max-sm:w-4/12 flex items-center">
                                                        <span>Phí quản lý(VNĐ) <span
                                                            className="text-red-500 text-xl">*</span></span>
                            </div>
                            <div className="w-9/12 h-full max-sm:w-8/12">
                              <Field type="text" id="feeManager" name="feeManager"
                                     className="w-full h-full rounded-[3px] border-[#8887] pl-3"/>
                              <ErrorMessage name="feeManager" component="span"
                                            className="text-[11px] text-red-500"/>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="w-full h-1/3">
                      <div className="h-[40px] mx-5 mt-5 mb-3 flex items-center">
                        {isSubmitting && (
                        <button disabled type="button" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                          <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin"
                               viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"/>
                          </svg>
                          Đang lưu
                        </button>
                        )}
                        {!isSubmitting && (
                            <button
                                className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                                type="submit"
                                style={{backgroundColor: "#4CAF50"}}
                            >
                              <span className="pr-1">
                                <i className="fi fi-rs-disk"/>
                              </span>
                              Lưu
                            </button>
                        )}
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center" type="reset">
                        <span className="pr-1">
                          <i className="fi fi-rr-eraser"/>
                        </span>
                          Làm mới
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