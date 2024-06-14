import axios from "axios";

export  const getCustomers = async() => {

    try {
        const res = await axios.get("http://localhost:8080/api/customer")
        return res.data;
        
    } catch (error) {
        console.log(error);
    }

}