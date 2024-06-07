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
