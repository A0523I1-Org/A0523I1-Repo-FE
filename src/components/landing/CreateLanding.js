import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { storage } from "../../configs/fireBaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useLocation, Await } from "react-router-dom";
import * as Yup from "yup";
import * as floorService from "../../services/FloorService.js";
import * as landingService from "../../services/LandingService";
import { toast,ToastContainer } from "react-toastify";
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
  const [floors, setFloors] = useState();
  const [avatar, setAvatar] = useState();
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
  
  const handleChange = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  };
  useEffect(() => {
    if (avatar) {
      console.log("tai leen firebase va lay url");
      const storageRef = ref(storage, `/imgLanding/${avatar.name}`);
      const uploadTask = uploadBytesResumable(storageRef, avatar);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setFirebaseAvt(url);
          });
        }
      );
    }
  }, [avatar]);
  const submit = async (values) => {
    values.firebaseUrl = firebaseAvt;
    await landingService.addNewLanding(values)
    toast.success("Thêm mặt bằng thành công")
    navigate("/landing");
}

const validate = {
    code: Yup.string().required("Vui lòng nhập mã mặt bằng !").matches(/^MB[0-9]{3}$/, "Code có định dạng: MBxxx !"),

}

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

  if (!landing) {
    return null;
  }
  return (
    <>
        <div className="row justify-content-around">
          <div id="avatarFrame" className="col-md-3">
            <div>
              <div className="center-content">
                <img
                  src={
                    avatar && avatar.preview
                      ? avatar.preview
                      : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                  }
                  alt=""
                />
                <br />
              </div>
              <div className="center-content">
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
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 center-content">
            <h2>
              <strong>THÊM MỚI MẶT BẰNG</strong>
            </h2>
          </div>
        </div>
        <Formik
          initialValues={landing}
          onSubmit={submit}
          validationSchema={Yup.object(validate)}
        >
            <Form className="row justify-content-center">
              <Field hidden type="text" name="firebaseUrl" />

              <div className="col-md-6">
                <label htmlFor="employeeCode" className="form-label">
                  Mã mặt bằng <span>(*)</span>
                </label>
                <Field
                  type="text"
                  className="form-control is-valid"
                  name="code"
                />
                <div className="invalid-feedback">Error !</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="employeeCode" className="form-label">
                  Giá tiền/Tháng <span>(*)</span>
                </label>
                <Field
                  type="text"
                  className="form-control is-valid is-invalid"
                  id="feePerMonth"
                  name="feePerMonth"
                  required
                />
                <div className="invalid-feedback">Error !</div>
              </div>
              <div className="col-md-6">
                <label htmlFor="employeeCode" className="form-label">
                  Loại mặt bằng <span>(*)</span>
                </label>
                <Field
                  as="select"
                  className="form-select is-invalid"
                  name="type"
                  required
                >
                  <option value="">Chọn</option>
                  <option value="Căn hộ">Căn hộ</option>
                  <option value="Nhà riêng">Nhà riêng</option>
                  <option value="Cửa hàng">Cửa hàng</option>
                  <option value="Văn phòng">Văn phòng</option>
                  <option value="Kho xưởng">Kho xưởng</option>
                  <option value="Đất trống">Đất trống</option>
                  <option value="Biệt thự">Biệt thự</option>
                  <option value="Kiot">Kiot</option>
                  <option value="Chung cư dịch vụ">Chung cư dịch vụ</option>
                  <option value="Phòng trọ">Phòng trọ</option>
                  <option value="Nhà hàng">Nhà hàng</option>
                </Field>
                <div className="invalid-feedback">Error !</div>
              </div>
              <div className="col-md-6">
                <label htmlFor="employeeCode" className="form-label">
                  Phí quản lý <span>(*)</span>
                </label>
                <Field
                  type="text"
                  className="form-control is-valid is-invalid"
                  id="feeManager"
                  name="feeManager"
                  required
                />
                <div className="invalid-feedback">Error !</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Diện tích <span>(*)</span>
                </label>
                <Field
                  type="text"
                  className="form-control is-valid"
                  id="area"
                  name="area"
                  required
                />
                <div className="invalid-feedback">Error !</div>
              </div>
              <div className="col-md-6">
                <label htmlFor="employeeCode" className="form-label">
                  Tầng <span>(*)</span>
                </label>
                <Field
                  as="select"
                  className="form-select is-invalid"
                  name="floor"
                  required
                >
                  <option value="">Chọn</option>
                  <option value="1">Tầng 1</option>
                  <option value="2">Tầng 2</option>
                  <option value="3">Tầng 3</option>
                  <option value="4">Tầng 4</option>
                </Field>
                <div className="invalid-feedback">Error !</div>
              </div>
              <div className="col-md-6">
                <label htmlFor="employeeCode" className="form-label">
                  Chú thích
                </label>
                <Field
                  as="textarea"
                  className="form-control is-valid"
                  name="description"
                >
                  ok
                </Field>
                <div className="invalid-feedback">Error !</div>
              </div>
              <div className="col-md-6">
                <label htmlFor="dob" className="form-label">
                  Trạng thái <span>(*)</span>
                </label>
                <Field
                  as="select"
                  className="form-select is-invalid"
                  name="status"
                  required
                >
                  <option value="">Chọn</option>
                  <option value="Chưa bàn giao">Chưa bàn giao</option>
                  <option value="Đang vào ở">Đang vào ở</option>
                  <option value="Đang sửa chữa">Đang sửa chữa</option>
                  <option value="Trống">Trống</option>
                </Field>
                <div className="invalid-feedback">Error !</div>
              </div>

              <div className="col-md-9"></div>
              <div className="col-md-3">
                <button
                  className="btn btn-success"
                  id="btn-1"
                  style={{ background: "#4CAF50", marginRight: "8px" }}
                  type="submit"
                >
                  <span>
                    <i className="fi fi-rs-disk"></i>
                  </span>
                  <span>Lưu</span>
                </button>
                <button
                  className="btn btn-primary"
                  style={{ background: "#2196e3" }}
                  type="reset"
                  id="btn-2"
                >
                  <span>
                    <i className="fi fi-rr-eraser"></i>
                  </span>
                  <span>Làm mới</span>
                </button>
              </div>
            </Form>
        </Formik>
    </>
  );
};
export default CreateLangding;