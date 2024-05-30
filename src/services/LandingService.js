import axios from "axios";

// Phung-PV Dùng để lưu trữ thong tin khách hàng vào google sheet để có thể liên lạc
export const SaveInfoCustomerForm = async (dataInfo) => {
    try {
        return await axios.post("https://sheet.best/api/sheets/ceffd477-1d2a-4fce-a892-f19bf5b2125b",dataInfo);
    }catch (e){
        console.log(e)
    }
}