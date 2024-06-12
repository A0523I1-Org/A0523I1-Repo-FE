import './EditCustomer.css';
import axios from "axios";
import {Field, Form, Formik} from "formik";
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

const EditCustomer = () => {
    const formatDate = (input) => {
        const date = (input instanceof Date) ? input : new Date(input);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    const {id} = useParams();
    const [customer, setCustomer] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/customer/${id}`)
            .then(res => setCustomer(res.data))
            .catch(err => console.log("Error fetching customer:", err));
    }, [id]);

    const handleEdit = (values) => {
        axios.put(`http://localhost:8080/api/customer/${id}`, values)
            .then(res => {
                navigate("/customer");
            })
            .catch(err => console.log("Error updating customer:", err));
    };

    if (!customer) return <div>Loading...</div>;

    const initialValues = {
        name: customer.name || '',
        address: customer.address || '',
        dob: formatDate(customer.dob) || '06/12/2022',
        phone: customer.phone || '',
        email: customer.email || '',
        idCard: customer.idCard || '',
        companyName: customer.companyName || '',
        website: customer.website || '',
        gender: customer.gender || '',
    };

    return (
        <div className="boss max-w-[1000px] mx-auto">
            <h1 className="text-center text-amber-700 text-4xl font-bold py-3 shadow-2xl">Chỉnh sửa Khách Hàng</h1>
            <div className="flex items-center justify-center p-12">
                <div className="w-full max-w-[800px]">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleEdit}
                        enableReinitialize
                    >
                        <Form>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="name"
                                               className="mb-3 block text-base font-medium text-[#07074D]">
                                            Tên khách hàng <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Mời nhập vào..."
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="address"
                                               className="mb-3 block text-base font-medium text-[#07074D]">
                                            Địa chỉ <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="address"
                                            id="address"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="dob"
                                               className="mb-3 block text-base font-medium text-[#07074D]">
                                            Ngày sinh <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="date"
                                            name="dob"
                                            id="dob"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="phone"
                                               className="mb-3 block text-base font-medium text-[#07074D]">
                                            Số điện thoại <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="email"
                                               className="mb-3 block text-base font-medium text-[#07074D]">
                                            Email <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="idCard"
                                               className="mb-3 block text-base font-medium text-[#07074D]">
                                            Căn cước công dân <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="idCard"
                                            id="idCard"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="companyName"
                                               className="mb-3 block text-base font-medium text-[#07074D]">
                                            Tên công ty <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="companyName"
                                            id="companyName"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="website"
                                               className="mb-3 block text-base font-medium text-[#07074D]">
                                            Website <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="website"
                                            id="website"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
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
                                            type="radio"
                                            name="gender"
                                            value="Nam"
                                            id="genderNam"
                                            className="h-5 w-5"
                                        />
                                        <label htmlFor="genderNam"
                                               className="pl-3 text-base font-medium text-[#07074D]">
                                            Nam
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <Field
                                            type="radio"
                                            name="gender"
                                            value="Nữ"
                                            id="genderNu"
                                            className="h-5 w-5"
                                        />
                                        <label htmlFor="genderNu" className="pl-3 text-base font-medium text-[#07074D]">
                                            Nữ
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <Field
                                            type="radio"
                                            name="gender"
                                            value="Khác"
                                            id="genderKhac"
                                            className="h-5 w-5"
                                        />
                                        <label htmlFor="genderKhac"
                                               className="pl-3 text-base font-medium text-[#07074D]">
                                            Khác
                                        </label>
                                    </div>
                                </div>
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
