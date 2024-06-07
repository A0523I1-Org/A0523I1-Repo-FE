import "../../table/css/EditOfPremises.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as landingService from "../../services/LandingService";
import * as floorService from "../../services/FloorService"
import * as Yup from "yup";

const EditLanding = () => {
    const [landing, setLanding] = useState(null);
    const [floors, setFloors] = useState([]);
    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        findLanding(id);
        getAllFloor();
    }, [id]);

    const getAllFloor = async () => {
        try {
            const foundFloor = await floorService.getAllFloor();
            setFloors(foundFloor);
        } catch (error) {
            console.error("Error fetching floor:", error);
        }
    };
    console.log(floors);

    const findLanding = async (id) => {
        const res = await landingService.findLanding(id);
        setLanding(res);
    };

    const submitUpdateLanding = async (values) => {
        values.floor = +values.floor;
        await landingService.updateLading(values);
        alert("Update thành công");
    };

    const validationSchema = Yup.object().shape({
        floor:Yup.string().required("Vui lòng chọn tầng"),

        status:Yup.string().required("Vui lòng trọn trạng thái"),

        type:Yup.string().required("Vui lòng chọn loại mặt bằng"),

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
            .test('is-positive', 'Diện tích không được nhỏ hơn 0.', value => {
                // Kiểm tra xem giá trị có phải là số không
                if (!isNaN(parseFloat(value))) {
                    // Nếu là số, kiểm tra xem giá trị có lớn hơn hoặc bằng không không
                    return parseFloat(value) >= 0;
                }
                // Nếu không phải là số, không áp dụng kiểm tra số dương
                return true;
            })
            .test('is-valid-number', 'Diện tích phải là số và không có ký tự đặc biệt.', value => {
                // Kiểm tra xem giá trị là số và không có ký tự đặc biệt
                return !isNaN(parseFloat(value)) && !/[^a-zA-Z0-9]/.test(value);
            }),

        feePerMonth: Yup.string()
            .required("Vui lòng nhập giá tiền.")
            .test('is-positive-feePerMonth', 'Vui lòng nhập giá tiền lớn hơn 0.', value => {

                if (!isNaN(parseFloat(value))) {

                    return parseFloat(value) >= 0;
                }

                return true;
            })
            .test('is-valid-number-feePerMonth', 'Giá tiền phải là số và không được có ký tự đặc biệt.', value => {

                return !isNaN(parseFloat(value)) && !/[^a-zA-Z0-9]/.test(value);
            }),

        feeManager: Yup.string()
            .required("Vui lòng nhập phí quản lí.")
            .test('is-positive-feeManager', 'Vui lòng nhập phí quản lí lớn hơn 0.', value => {

                if (!isNaN(parseFloat(value))) {

                    return parseFloat(value) >= 0;
                }

                return true;
            })
            .test('is-valid-number-feeManager', 'Phí quản lí phải là số và không được có ký tự đặc biệt.', value => {
                // Kiểm tra xem giá trị là số và không có ký tự đặc biệt
                return !isNaN(parseFloat(value)) && !/[^a-zA-Z0-9]/.test(value);
            }),

        description:Yup.string().max(200,"Chú thích có độ dài tối đa 200 ký tự")
    });

    if (!landing) {
        return <div>Loading...</div>;
    }

    const initialValues = {
        code: landing.code || '',
        area: landing.area || '',
        feeManager: landing.feeManager || '',
        feePerMonth: landing.feePerMonth || '',
        floor: landing.floor || '',
        id: landing.id || '',
        status: landing.status || '',
        type: landing.type || '',
    };
    console.log(initialValues);

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={submitUpdateLanding}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({isSubmitting}) => (
                    <Form className="w-full">
                        <div className="w-full h-auto py-10 flex flex-col gap-5">
                            <h1 className="text-center" style={{fontSize: "40px"}}>CHỈNH SỬA MẶT BẰNG</h1>
                            <div className="mx-16 h-auto flex gap-5">
                                <div className="w-6/12 h-auto bg-white rounded-[3px] flex flex-col gap-8"
                                     style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
                                    <div className="h-[40px] mx-5 mt-3 flex items-center">
                                        <div className="w-4/12 h-full flex items-center">
                                            <span>Tầng <span className="text-red-500 text-xl">*</span></span>
                                        </div>
                                        <div className="w-8/12 h-full">
                                            <Field as="select" id="floor" name="floor"
                                                   className="w-full h-full border-[#8887] form-control">
                                                <option value="">Chọn</option>
                                                {floors.map((floor) => (
                                                    <option key={floor.id} value={floor.name}>
                                                        {floor.name}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="floor" component="span"
                                                          className="text-[12px] text-red-500"/>
                                        </div>
                                    </div>
                                    <div className="h-[40px] mx-5 flex items-center">
                                        <div className="w-4/12 h-full flex items-center">
                                            <span>Trạng thái <span className="text-red-500 text-xl">*</span></span>
                                        </div>
                                        <div className="w-8/12 h-full">
                                            <Field as="select" id="status" name="status"
                                                   className="w-full h-full border-[#8887] form-control">
                                                <option value="">Chọn</option>
                                                <option value="Chưa bàn giao">Chưa bàn giao</option>
                                                <option value="Đang vào ở">Đang vào ở</option>
                                                <option value="Đang sửa chữa">Đang sửa chữa</option>
                                                <option value="Trống">Trống</option>
                                            </Field>
                                            <ErrorMessage name="status" component="span"
                                                          className="text-[12px] text-red-500"/>
                                        </div>
                                    </div>
                                    <div className="h-[40px] mx-5 flex items-center">
                                        <div className="w-4/12 h-full flex items-center">
                                            <span>Diện tích <span className="text-red-500 text-xl">*</span></span>
                                        </div>
                                        <div className="w-8/12 h-full">
                                            <Field type="text" id="area" name="area"
                                                   className="w-full h-full border-[#8887]"/>
                                            <ErrorMessage name="area" component="span"
                                                          className="text-[12px] text-red-500"/>
                                        </div>
                                    </div>
                                    <div className="h-[90px] mx-5   flex items-center ">
                                        <div className="w-4/12 h-full flex items-center">
                                            <span>Chú thích</span>
                                        </div>
                                        <div className="w-8/12 h-full ">
                                            <Field type="text" name="description" id="description"
                                                   className="w-full h-full border border-[#8887] "/>
                                            <ErrorMessage name="description" component="span"
                                                          className="text-[12px] text-red-500"/>
                                        </div>
                                    </div>
                                    <div className="h-[40px] mx-5 flex items-center">
                                        <div className="w-4/12 h-full flex items-center">
                                            <span>File ảnh <span className="text-red-500 text-xl">*</span></span>
                                        </div>
                                        <div className="h-full">
                                            <Field type="file" id="firebaseUrl" name="firebaseUrl" className="w-auto"/>
                                            <ErrorMessage name="firebaseUrl" component="span"
                                                          className="text-[12px] text-red-500"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-6/12 h-full bg-white rounded-[3px]"
                                     style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
                                    <div className="w-full h-1/2">
                                        <div className="w-full h-full flex">
                                            <div className="h-[80px] w-3/12 mr-5 mt-5 mb-3 flex items-center">
                                                <h1 className="text-xl pl-5">Mặt bằng</h1>
                                            </div>
                                            <div className="h-auto w-9/12 mr-5 mt-5 mb-3 flex flex-col gap-8">
                                                <div className="w-full h-[40px] flex">
                                                    <div className="w-3/12 h-full flex items-center">
                                                        <span>Loại mặt bằng <span
                                                            className="text-red-500 text-xl">*</span></span>
                                                    </div>
                                                    <div className="w-9/12 h-full  items-center">
                                                        <Field as="select" id="type" name="type"
                                                               className="w-full h-full border-[#8887] form-control">
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
                                                        <ErrorMessage name="type" component="span"
                                                                      className="text-[12px] text-red-500"/>
                                                    </div>
                                                </div>
                                                <div className="w-full h-[40px] flex">
                                                    <div className="w-3/12 h-full flex items-center">
                                                        <span>Mã mặt bằng <span
                                                            className="text-red-500 text-xl">*</span></span>
                                                    </div>
                                                    <div className="w-9/12 h-full">
                                                        <Field type="text" id="code" name="code"
                                                               className="w-full h-full border-[#8887] pl-3"/>
                                                        <ErrorMessage name="code" component="span"
                                                                      className="text-[11px] text-red-500"/>
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
                                                               className="w-full h-full border-[#8887] pl-3"/>
                                                        <ErrorMessage name="feePerMonth" component="span"
                                                                      className="text-[11px] text-red-500"/>
                                                    </div>
                                                </div>
                                                <div className="w-full h-[40px] flex">
                                                    <div className="w-3/12 h-full flex items-center">
                                                        <span>Phí quản lý</span>
                                                    </div>
                                                    <div className="w-9/12 h-full">
                                                        <Field type="text" id="feeManager" name="feeManager"
                                                               className="w-full h-full border-[#8887] pl-3"/>
                                                        <ErrorMessage name="feeManager" component="span"
                                                                      className="text-[11px] text-red-500"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full h-1/3">
                                        <div className="h-[40px] mx-5 mt-5 mb-3">
                                            <button className="btn bg-[#4CAF50] mr-2" type="submit"
                                                    disabled={isSubmitting}>
                                                <span className="pr-1"><i className="fi fi-rs-disk"/></span>
                                                <span className="pb-10">Lưu</span>
                                            </button>
                                            <button className="btn-2" type="reset">
                                                <span className="pr-1"><i className="fi fi-rr-eraser"/></span>
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
export default EditLanding;