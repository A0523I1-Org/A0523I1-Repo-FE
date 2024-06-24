import axios from "axios";

export  const getCustomers = async(token) => {

    try {
        const res = await axios.get("http://localhost:8080/api/customer",{

            headers: {Authorization: `Bearer ${token}`}
        });

        // console.log(res.data);
        return res.data;
        
    } catch (error) {
        // console.log(error);
    }

}