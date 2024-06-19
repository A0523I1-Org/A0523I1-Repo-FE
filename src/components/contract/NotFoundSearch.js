

const NotFoundSearch = () => {
    return (
        <>
            <div style={{textAlign: 'center',marginTop: '10vh'}}>
                <i style={{fontSize: '20px',color : 'red'}}>
                    <span style={{fontSize: '25px',color : 'black'}}>*</span> Không tìm thấy bất kỳ kết quả nào cho nội dung tìm kiếm này ..... ! 
                </i>
                <p style={{fontSize: '18px'}}>Thử nhập các từ khóa khác</p>
            </div>
        </>
    )
}

export default NotFoundSearch;