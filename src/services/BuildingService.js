import axios, {Axios} from "axios";

/*
* Tên : Phan Văn Phùng
* Mục đích : call Api để lưu các thông tin khách hàng muôn tư vấn về mặt bằng lưu vào google sheet
* */
export const SaveInfoCustomerForm = async (dataInfo) => {
    try {
        return await axios.post("https://sheet.best/api/sheets/ceffd477-1d2a-4fce-a892-f19bf5b2125b",dataInfo);
    }catch (e){
        console.log(e)
    }
}