import {Link} from "react-router-dom";
import routes from "../../configs/routes";
import React from "react";


const NotFoundSearch = () => {
    return (
        <>

            <div className=" h-auto  mx-16 text-center flex flex-col justify-center items-center mt-3">
                <img src="/img/img-search.png" className="w-[134px] h-[134px]"/>
                <div className=" text-[18px]">Không tìm thấy kết quả nào</div>
                <div className="text-[17px] opacity-70">Hãy thử sử dụng các từ khóa chung chung hơn hoặc tạo hợp đồng
                </div>
                <Link to={routes.createContract} className="mt-3 font-medium">Thêm mới <span><i
                    className='bx bx-subdirectory-left'></i></span></Link>


            </div>
        </>
    )
}

export default NotFoundSearch;