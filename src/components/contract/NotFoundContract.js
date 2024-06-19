import { Link } from "react-router-dom";
import routes from "../../configs/routes";
import '../../css/contract/listContract.css'

const NotFoundContract = () => {


    return (
        <>
        <div id="notfound-contract" style={{textAlign: 'center',marginTop: '20vh'}}>
            <i style={{fontSize: '25px',color : 'red'}}>
                <span style={{fontSize: '35px',color : 'black'}}>*</span> Hiện tại bạn chưa làm bất kỳ hợp đồng nào ..... ! 
            </i>
            <p style={{fontSize: '20px'}}>Nhấn &nbsp; 
            <button  id="create-error"><Link style={{color : 'white'}}  to={routes.createContract}>Thêm Mới</Link> </button>&nbsp;
                      để tạo hợp đồng</p>
        </div>
        </>
    )
}

export default NotFoundContract;