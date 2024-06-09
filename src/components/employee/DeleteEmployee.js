import "bootstrap/dist/css/bootstrap.css"
import "../../css/employee/deleteemployee.css"


export default function DeleteEmployee() {
    return (
        <div className="container">
            <div className="row justify-content-center my-3">

                <div className="col-12 text-center mb-3">
                    <span><i className="fa-solid fa-triangle-exclamation fa-beat-fade fa-6x"
                             style={{color: "#e01f1f"}}></i></span>
                </div>
                <div className="col-12">
                    <h1 className="text-center text-uppercase h3"><strong>Xác nhận xóa nhân viên</strong></h1>
                </div>

                <div className="col-12 mt-3">
                    <table className="table table-hover">
                        <tbody>
                        <tr>
                            <th scope="row">Mã nhân viên</th>
                            <td>NV-12314</td>
                        </tr>
                        <tr>
                            <th scope="row">Tên nhân viên</th>
                            <td>Trần Văn Thiện</td>
                        </tr>
                        <tr>
                            <th scope="row">Ngày sinh</th>
                            <td>08/01/1998</td>
                        </tr>
                        <tr>
                            <th scope="row">Bộ phận</th>
                            <td>Quản lý toàn nhà</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="col-12 d-flex justify-content-center align-items-center mt-3 row">
                    <div className="col-12 col-md-6 mb-3">
                        <span><strong>Lưu ý: </strong><span
                            style={{color:"red"}}>Thao tác này không thể hoàn tác!</span></span>
                    </div>
                    <div className="col-12 col-md-6 text-center text-md-right">
                        <button className="btn btn-danger me-2">Xác nhận</button>
                        <button className="btn btn-primary">Hủy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}