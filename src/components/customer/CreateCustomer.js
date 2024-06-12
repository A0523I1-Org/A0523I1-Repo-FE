import {Form, Formik} from "formik";
// import './create.css';

const CreateCustomer = () => {

    const  handleCreate = ()=>{

    }
    return (
        <>
            <div className="boss max-w-[1000px] max-h-[900px]  mx-auto">
                <h1 className=" text-center text-amber-700 text-4xl font-bold py-3 shadow-2xl text-shadow">Thêm Mới Khách Hàng</h1>

                <div class="flex items-center justify-center p-12">
                    <div class="mx-auto w-full max-w-[800px]">
                        <Formik action="https://formbold.com/s/FORM_ID" method="POST" initialValues={null} onSubmit={handleCreate}>
                            <Form onReset={Formik.handleReset} >
                                <div class="-mx-3 flex flex-wrap">
                                    <div class="w-full px-3 sm:w-1/2">
                                        <div class="mb-5">
                                            <label
                                                for="fName"
                                                class="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Tên khách hàng <span style={{color: "red"}}>(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="fName"
                                                id="fName"
                                                placeholder="Mời nhập vào..."
                                                class="w-full rounded-md border border-[#000x] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                    <div class="w-full px-3 sm:w-1/2">
                                        <div class="mb-5">
                                            <label
                                                for="lName"
                                                class="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Địa chỉ <span style={{color: "red"}}>(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="lName"
                                                id="lName"
                                                placeholder="Mời nhập vào"
                                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                htmlFor="date"
                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Ngày sinh <span style={{color: "red"}}>(*)</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="date"
                                                id="date"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                htmlFor="lName"
                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Số điện thoại <span style={{color: "red"}}>(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="lName"
                                                id="lName"
                                                placeholder="Mời nhập vào"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                htmlFor="lName"
                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Email <span style={{color: "red"}}>(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="lName"
                                                id="lName"
                                                placeholder="Mời nhập vào"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                htmlFor="lName"
                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Căn cước công dân <span style={{color: "red"}}>(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="lName"
                                                id="lName"
                                                placeholder="Mời nhập vào"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                htmlFor="lName"
                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Tên công ty <span style={{color: "red"}}>(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="lName"
                                                id="lName"
                                                placeholder="Mời nhập vào"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                htmlFor="lName"
                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Website <span style={{color: "red"}}>(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="lName"
                                                id="lName"
                                                placeholder="Mời nhập vào"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div class="mb-5">
                                    <label class="mb-3 block text-base font-medium text-[#07074D]">
                                        Vui lòng chọn giới tính của bạn <span style={{color: "red"}}>(*)</span>
                                    </label>
                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center">
                                            <input
                                                value="Nam"
                                                type="radio"
                                                name="gender"
                                                id="radioButton1"
                                                className="h-5 w-5"
                                            />
                                            <label
                                                htmlFor="radioButton1"
                                                className="pl-3 text-base font-medium text-[#07074D]"
                                            >
                                                Nam
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                value="Nữ"
                                                type="radio"
                                                name="gender"
                                                id="radioButton2"
                                                className="h-5 w-5"
                                            />
                                            <label
                                                htmlFor="radioButton1"
                                                className="pl-3 text-base font-medium text-[#07074D]"
                                            >
                                                Nữ
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                value="Khác"
                                                type="radio"
                                                name="gender"
                                                id="radioButton3"
                                                className="h-5 w-5"
                                            />
                                            <label
                                                htmlFor="radioButton2"
                                                className="pl-3 text-base font-medium text-[#07074D]"
                                            >
                                                Khác
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="hover:shadow-form hover:scale-110  rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                    >
                                        Lưu
                                    </button>
                                    <button
                                        type="reset"
                                        className="mx-3 hover:scale-110  hover:shadow-form rounded-md bg-green-500 py-3 px-3 text-center text-base font-semibold text-white outline-none"
                                    >
                                        Làm mới
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )

}
export default CreateCustomer;
