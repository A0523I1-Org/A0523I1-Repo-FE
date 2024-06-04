
const FooterExtra = () => {
    return (
        <>
            <div className={'h-full flex items-center'}>
                <button className="flex items-center text-[#338dbc]">
                    <span className={' pr-2'}>
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"/>
                       </svg>

                     </span>
                    <span className={' font-medium text-[14px]'}>Trở về</span>
                </button>
            </div>
        </>
    )

}
export default FooterExtra;