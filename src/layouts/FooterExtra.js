import {Link} from "react-router-dom";
import React, { useMemo} from "react";

const FooterExtra = React.memo(({nameLocation}) => {

    const returnLocation  = useMemo(() => {
            return nameLocation.trim().split("/")[1];
    },[nameLocation])

    return (
        <>
            <div className={'h-full flex items-center'}>
                <Link to={`/${returnLocation}`}>
                    <button className="flex items-center text-[#338dbc]">
                    <span className={' pr-2'}>
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round"
                                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"/>
                       </svg>

                     </span>
                        <span className={' font-medium text-[14px]'}>Trở về</span>
                    </button>
                </Link>
            </div>
        </>
    )
})
export default FooterExtra;