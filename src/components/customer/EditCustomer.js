import './EditCustomer.css';
import axios from "axios";
import {Field, Form, Formik, ErrorMessage} from "formik";
import * as customerService from "../../services/CustomerService"
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as Yup from "yup";
import { format, parseISO } from 'date-fns';
import {toast} from "react-toastify";


const EditCustomer = () => {
    const formatDate = (input) => {
        return format(parseISO(input), 'yyyy-MM-dd');
    };

    const {id} = useParams();
    const [customer, setCustomer] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/customer/${id}`)
            .then(res => setCustomer(res.data))
            .catch(err => console.log("Error fetching customer:", err));
    }, [id]);

    const handleEdit = async (values) => {
      await  customerService.editCustomer(id,values)
            .then(res => {
                navigate("/customer");
                toast.success("Chỉnh sửa khách hàng thành công", {
                    position: "bottom-left",
                    autoClose: 1000,
                });
            })
            .catch(err => console.log("Error updating customer:", err));
    };

    if (!customer) return <div>Loading...</div>;

    const initialValues = {
        name: customer.name || '',
        address: customer.address || '',
        dob: customer.dob ? formatDate(customer.dob) : '',
        phone: customer.phone || '',
        email: customer.email || '',
        idCard: customer.idCard || '',
        companyName: customer.companyName || '',
        website: customer.website || '',
        gender: customer.gender || '',
    };

    const validate = {
        name: Yup.string()
            .required("Tên khách hàng không được rỗng")
            .max(100, "Tên khách hàng không dài quá 100 kí tự")
            .min(3, "Tên khách hàng phải có ít nhất 3 kí tự")
            .matches(/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/, "Tên khách hàng chỉ được chứa chữ cái và khoảng trắng , Chữ đầu viết hoa"),
        dob: Yup.date()
            .required("Vui lòng chọn ngày sinh")
            .max(new Date(), `Ngày không được lớn hơn hiện tại`),
        gender: Yup.string().required("Vui lòng chọn giới tính"),
        address: Yup.string()
            .required("Địa chỉ không được rỗng")
            .max(100, "Địa chỉ không dài quá 100 kí tự")
            .min(5, "Địa chỉ phải có ít nhất 5 kí tự"),
        email: Yup.string()
            .required("Email không được rỗng")
            .max(100, "Email không dài quá 100 kí tự")
            .min(5, "Email phải có ít nhất 5 kí tự")
            .matches(/^[\S]+@[\w]+\.[\w]+$/, "Email không đúng định dạng"),
        phone: Yup.string()
            .required("Số điện thoại không được rỗng")
            .max(20, "Số điện thoại không dài quá 20 số")
            .min(5, "Số điện thoại phải có ít nhất 10 số")
            .matches(/^(\+\d{1,2}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4,}$/, "Số điện thoại không hợp lệ"),
        website: Yup.string()
            .required("Website không được rỗng")
            .max(100, "Website không dài quá 100 kí tự")
            .min(5, "Website phải có ít nhất 5 kí tự"),
        companyName: Yup.string()
            .required("Tên công ty không được rỗng")
            .max(100, "TTên công ty không dài quá 100 kí tự")
            .min(5, "Tên công ty dài hơn 5 kí tự")
            .matches(/^[a-zA-Z\s]+$/, "Tên khách hàng chỉ được chứa chữ cái và khoảng trắng"),
        idCard: Yup.string()
            .required("Căn cước công dân không được rỗng")
            .max(20, "Căn cước công dân không dài quá 20 kí tự")
            .matches(/^(\+\d{1,2}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4,}$/, "Số điện thoại không hợp lệ")
            .min(5, "Tên khách phi hàng lớn hơn 5 kí tự"),
            
    };

    return (
        <div id="tt" className="boss max-w-[1000px] mx-auto">
            <h1 className="text-center text-amber-700 text-4xl font-bold py-3 shadow-2xl">Chỉnh sửa Khách Hàng</h1>
            <div className="flex items-center justify-center p-12">
                <div className="w-full max-w-[800px]">
                    <Formik
                        validationSchema={Yup.object(validate)}
                        initialValues={initialValues}
                        onSubmit={handleEdit}
                        enableReinitialize
                    >
                        <Form>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Tên khách hàng <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Mời nhập vào..."
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        <ErrorMessage name="name" component="span" className="text-red-500" />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="address" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Địa chỉ <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="address"
                                            id="address"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        <ErrorMessage name="address" component="span" className="text-red-500" />
                                    </div>
                                </div>
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="dob" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Ngày sinh <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="date"
                                            name="dob"
                                            id="dob"
                                            validate={(value) => {
                                                let currentYear = new Date().getFullYear();
                                                let minAllowedYear = currentYear - 18;
                                                let minAllowedMonth = 5; // tháng 6 - 1 = tháng 5
                                                let dob = new Date(value);
                                                if (dob.getFullYear() > minAllowedYear || (dob.getFullYear() === minAllowedYear && dob.getMonth() >= minAllowedMonth)) {
                                                    return 'Bạn chưa đủ 18 tuổi.';
                                                }
                                            }}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        <ErrorMessage name="dob" component="span" className="text-red-500" />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Số điện thoại <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        <ErrorMessage name="phone" component="span" className="text-red-500" />
                                    </div>
                                </div>
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Email <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        <ErrorMessage name="email" component="span" className="text-red-500" />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="idCard" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Căn cước công dân <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="idCard"
                                            id="idCard"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        <ErrorMessage name="idCard" component="span" className="text-red-500" />
                                    </div>
                                </div>
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="companyName" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Tên công ty <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="companyName"
                                            id="companyName"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        <ErrorMessage name="companyName" component="span" className="text-red-500" />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="website" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Website <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="website"
                                            id="website"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        <ErrorMessage name="website" component="span" className="text-red-500" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label className="mb-3 block text-base font-medium text-[#07074D]">
                                    Vui lòng chọn giới tính của bạn <span style={{color: "red"}}>(*)</span>
                                </label>
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center">
                                        <Field
                                            as="select"
                                            name="gender"
                                            className="w-32 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </Field>
                                    </div>
                                </div>
                                <ErrorMessage name="gender" component="span" className="text-red-500" />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="hover:shadow-form hover:scale-110 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                >
                                    Lưu
                                </button>
                                <button
                                    type="reset"
                                    className="mx-3 hover:scale-110 hover:shadow-form rounded-md bg-green-500 py-3 px-3 text-center text-base font-semibold text-white outline-none"
                                >
                                    Làm mới
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default EditCustomer;
