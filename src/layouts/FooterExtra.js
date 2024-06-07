import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const locationMapping = {
    contract: 'Hợp đồng',
    customer: 'Khách hàng',
    employee: 'Nhân viên',
    landing: 'Mặt bằng'
};

const actionMapping = {
    create: 'Thêm mới',
    edit: 'Cập nhật',
    register: 'Chi tiết'
};

const FooterExtra = React.memo(({ nameLocation }) => {
    const returnLocation = nameLocation.trim().split("/")[1];
    const showBackButton = !locationMapping.hasOwnProperty(nameLocation.slice(1));
    const [locationPresent, setLocationPresent] = useState("");
    const [locationPresentOperation, setLocationPresentOperation] = useState("");

    useEffect(() => {
        handleLocation();
    }, [nameLocation]);

    const handleLocation = () => {
        const partsLocation = nameLocation.split("/");

        const firstPartLocation = partsLocation[1];
        const secondPartLocation = partsLocation[2];

        setLocationPresent(locationMapping[firstPartLocation] || "");

        if (secondPartLocation) {
            const action = secondPartLocation.split('-')[0];
            setLocationPresentOperation(actionMapping[action] || "");
        } else {
            setLocationPresentOperation("Danh sách");
        }
    };

    return (
        <div className="w-full h-[40px] relative">
            <div className="absolute py-2 left-0 top-2.5">
                {showBackButton && (
                    <div className="h-full flex items-center">
                        <Link to={`/${returnLocation}`}>
                            <button className="flex items-center text-[#338dbc]">
                                <span className="pr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                    </svg>
                                </span>
                                <span className="font-medium text-[14px]">Trở về</span>
                            </button>
                        </Link>
                    </div>
                )}
            </div>
            <div
                className="absolute right-0 w-auto  h-full flex items-center gap-2 justify-center">
                <div className="absolute bottom-0  w-1/2 h-[1.5px] bg-black"></div>
                <span className="pl-3 text-[#338dbc]">Trang chủ</span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                    </svg>
                </span>
                <span className={`${locationPresentOperation === "" ? 'pr-3' : ''}`}>{locationPresent}</span>
                {locationPresentOperation && (
                    <>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                            </svg>
                        </span>
                        <span className="pr-3">{locationPresentOperation}</span>
                    </>
                )}
            </div>
        </div>
    );
});

export default FooterExtra;