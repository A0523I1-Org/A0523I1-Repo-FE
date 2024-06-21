import './detail.css';
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {format, parseISO} from 'date-fns';

const DetailCustomer = () => {

    const {id} = useParams();
    const [customer, setCustomer] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/customer/${id}`)
            .then(res => setCustomer(res.data))
            .catch(err => console.log("Error fetching customer:", err));
    }, [id]);

    const formatDate = (input) => {
        return format(parseISO(input), "yyyy-MM-dd");
    }


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

    return (
        <div className="boss2 max-w-[1000px] mx-auto">
            <h1 className="text-center text-amber-700 text-4xl font-bold py-3">
                Thông tin khách hàng
            </h1>
            <div className="flex justify-center">
                <div className="bg-gray-500 p-4 inline-block rounded-xl">
                    <h1 className="text-center text-yellow-400 text-4xl font-bold py-3 shadow-2xl rounded-xl">
                        {customer.name}
                    </h1>
                </div>
            </div>
            <div className="flex items-center justify-center p-12">
                <div className="w-full max-w-[800px]">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={null}
                        enableReinitialize
                    >
                        <Form>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="name"
                                               className="mb-3 block text-base font-medium text-white">
                                            Tên khách hàng <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Mời nhập vào..."
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            readOnly/>
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="address"
                                               className="mb-3 block text-base font-medium text-white">
                                            Địa chỉ <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="address"
                                            id="address"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            readOnly/>
                                    </div>
                                </div>
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="dob"
                                               className="mb-3 block text-base font-medium text-white">
                                            Ngày sinh <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="date"
                                            name="dob"
                                            id="dob"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            readOnly/>
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="phone"
                                               className="mb-3 block text-base font-medium text-white">
                                            Số điện thoại <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            readOnly/>
                                    </div>
                                </div>
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="email"
                                               className="mb-3 block text-base font-medium text-white">
                                            Email <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="email"
                                            id="email"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            readOnly/>
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="idCard"
                                               className="mb-3 block text-base font-medium text-white">
                                            Căn cước công dân <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="idCard"
                                            id="idCard"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="companyName"
                                               className="mb-3 block text-base font-medium text-white">
                                            Tên công ty <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="companyName"
                                            id="companyName"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            readOnly />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="website"
                                               className="mb-3 block text-base font-medium text-white">
                                            Website <span style={{color: "red"}}>(*)</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="website"
                                            id="website"
                                            placeholder="Mời nhập vào"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label className="mb-3 block text-base font-medium text-white">
                                    Giới tính <span style={{color: "red"}}>(*)</span>
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
                                        <ErrorMessage name='gender' component='span'
                                                      style={{color: 'red', fontStyle: 'italic'}}></ErrorMessage>

                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default DetailCustomer;
