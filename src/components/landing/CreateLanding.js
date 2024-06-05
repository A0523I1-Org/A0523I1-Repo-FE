import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import * as floorService from '../../services/FloorService.js';
import * as landingService from '../../services/LandingService';
import { toast } from "react-toastify";
import styles from '../../css/createLanding.css';



const CreateLangding = () => {
  const [landing, setLanding] = useState();
  const [floors, setFloors] = useState();
  const navigate = useNavigate();
  const [isSubmit, setSubmit] = useState([]);

  useEffect(() => {
    getAllFloor();
    setLanding({
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
  }, []);

  const getAllFloor = async () => {
    try {
      const foundFloor = await floorService.getAllFloor();
      setFloors(foundFloor);
    } catch (error) {
      console.error("Error fetching floor:", error);
    }
  };

  const validateLanding = {
  };

  const createLanding = async (values) => {
    setSubmit(true);
    console.log(values);
    setSubmit(false);
    values.floor = +values.floor;
    values.feePerMonth = +values.feePerMonth;
    values.feeManager = +values.feeManager;
    values.area = +values.area;
    await landingService.addNewLanding(values);
    toast.success("Landing added successfully");
    navigate("/landing");
  };
  if (!landing) {
    return null;
  }
  return (
    <>
      <Formik
      initialValues={landing}
      onSubmit={createLanding}
      id="main"
      className="box__shadow"
    >
      <Form className="row g-3 justify-content-center">
        <div id="avatarFrame" className="col-md-3">
          <div>
            <div className="center-content">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2175/2175188.png"
                alt=""
              />
              <br />
            </div>
            <div className="center-content">
              <label
                htmlFor="upload_avt"
                className="btn btn-primary"
                style={{ background: '#2196e3' }}
              >
                Chọn ảnh mặt bằng
              </label>
              
            </div>
          </div>
        </div>
        <div className="col-md-9 center-content">
          <h1>
            <strong>THÊM MỚI MẶT BẰNG</strong>
          </h1>
        </div>
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
          <Field as="select" className="form-select is-invalid" name="type" required>
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
          <Field as="select" className="form-select is-invalid" name="floor" required>
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
          <Field as="textarea" className="form-control is-valid" name="description">ok</Field>
          <div className="invalid-feedback">Error !</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="dob" className="form-label">
            Trạng thái <span>(*)</span>
          </label>
          <Field as="select" className="form-select is-invalid" name="status" required>
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
          <button className="btn-1" id="btn-1" style={{ background: '#4CAF50', marginRight: '8px' }} type="submit">
            <span>
              <i className="fi fi-rs-disk"></i>
            </span>
            <span>Lưu</span>
          </button>
          <button className="btn btn-primary" style={{ background: '#2196e3' }} type="reset" id="btn-2">
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
