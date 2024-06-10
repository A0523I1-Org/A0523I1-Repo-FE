
import axios from "axios";
export const getListAllLanding=async (page)=> {
try{
    const res=await axios.get(`http://localhost:8080/landing?page=${page}`)


    return res.data

}catch (e) {

    return false;

}

}

//
// export const getListAllLanding = async (page, size) => {
//     try {
//         const res = await axios.get(`http://localhost:8080/landing?page=${page}&size=${size}`);
//
//         return res.data;
//     } catch (e) {
//         return false;
//     }
// };
export const getListAllFloor=async ()=>{
    try {
        const res=await axios.get("http://localhost:8080/landing/listFloor")
       return  res.data

    }catch (e) {
        console.log(e)
        return false;
    }

}

export const updateLading=async(landing) =>{
    try {
        console.log(landing)
        return await axios.put(`http://localhost:8080/landing/${landing.id}`,landing)

    }catch (e) {

        return false;
    }
}
export const deleteLandingById=async(id) =>{
    try {
        console.log(id)
        return await axios.put(`http://localhost:8080/landing/deleteLanding/${id}`)

    }catch (e) {

        return false;
    }
}
export const deleteLandings=async(ids) =>{
    try {
        console.log(ids)
        return await axios.put(`http://localhost:8080/landing/deleteLanding/${ids}`)

    }catch (e) {

        return false;
    }
}
export const addNewLanding = async (landing) => {
    try {
      await axios.post("http://localhost:8080/landing/createLanding ", landing);
      return true;
    } catch (error) {
      return false;
    }
  };
export const findLanding= async(id)=>{
    try {
        const res=await axios.get(`http://localhost:8080/landing/${id}`)
        console.log(res.data)

        return res.data

    }catch (e) {
        console.log(e)
        return false;

    }
}


// Phung-PV Dùng để lưu trữ thong tin khách hàng vào google sheet để có thể liên lạc
export const SaveInfoCustomerForm = async (dataInfo) => {
    try {
        return await axios.post("https://sheet.best/api/sheets/ceffd477-1d2a-4fce-a892-f19bf5b2125b",dataInfo);
    }catch (e){
        console.log(e)
    }
}

export const showListLandingHome = async (page = 0, size = 4) => {
    try {
        const listLandingHome = await axios.get("http://localhost:8080/landing",{
            params : {
                page,
                size
            }
        });
        return listLandingHome.data;
    }catch (error){
        console.error("error fetching data " , error)
        return {
            content: [],
            pageable: {},
            last: true,
            totalElements: 0,
            totalPages: 0,
            number: 0
        };
    }
}

