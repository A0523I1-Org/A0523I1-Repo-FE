import "bootstrap/dist/css/bootstrap.css"
import "../../css/employee/deleteemployee.css"
import {useParams} from 'react-router-dom'
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import * as employeeService from "../../services/EmployeeService"
import {toast} from 'react-toastify'


export default function DeleteEmployee() {
    const {id} = useParams();
    const [employeeDel, setEmployeeDel] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getEmployeeDel(id);
    }, [id])

    const getEmployeeDel = async () => {
        let temp = await employeeService.findEmployeeById(id);
        setEmployeeDel(temp)
    }
    const cancelDelete = () => {
        navigate("/")
    }
    const deleteEmployee = async () => {
        let success = await employeeService.deleteEmployeeById(id)
        if (success) {
            toast.success("Bạn đã xóa thành công nhân viên: " + employeeDel.name)
            navigate("/")
        } else {
            toast.warning("Qúa trình xóa thất bại, vui lòng kiểm tra lại !");
            navigate("/")
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
        return date.toLocaleDateString('en-GB', options);
    }


    if (!employeeDel) {
        return null;
    }
    return (
        <div id="de_main">
            <div className="row justify-content-center my-3">

                <div className="col-12 text-center mb-3">
                    <span><i className="fa-solid fa-triangle-exclamation fa-beat-fade fa-6x"
                             style={{color: "#e01f1f"}}></i></span>
                </div>
                <div className="col-12">
                    <h1 className="text-center text-uppercase h3"><strong style={{color: "red"}}>Xác nhận xóa nhân
                        viên</strong></h1>
                </div>

                <div className="col-12 mt-3">
                    <table className="table table-hover">
                        <tbody>
                        <tr>
                            <th scope="row">Mã nhân viên</th>
                            <td>{employeeDel.code}</td>
                        </tr>
                        <tr>
                            <th scope="row">Tên nhân viên</th>
                            <td>{employeeDel.name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Ngày sinh</th>
                            <td>{formatDate(employeeDel.dob)}</td>
                        </tr>
                        <tr>
                            <th scope="row">Bộ phận</th>
                            <td>{employeeDel.department.name}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="col-12 d-flex justify-content-center align-items-center mt-3 row">
                    <div className="col-12 col-md-6 mb-3">
                        <span><strong>Lưu ý: </strong><span
                            style={{color: "red"}}>Thao tác này không thể hoàn tác!</span></span>
                    </div>
                    <div className="col-12 col-md-6 text-center text-md-right">
                        <button className="btn btn-danger me-2 de_button" onClick={deleteEmployee}>Xác nhận</button>
                        <button className="btn btn-primary de_button" onClick={cancelDelete}>Hủy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
