import axios from "axios";
export const gettAllCustomers = async () => {
    try {
        const proCustomers = await axios.get(
            `http://localhost:8080/api/customer/list`
        );
        return proCustomers.data;
    } catch (e) {
        console.log(e);
    }
};
export const createCustomer = async (customer) => {
    try {
        await axios.post(`http://localhost:8080/api/customer/create`, customer);
    } catch (e) {
        console.log(e);
    }
};
export const editCustomer = async (id) => {
    try {
        await axios.put(`http://localhost:8080/api/customer/${id}`);
    } catch (e) {
        console.log(e);
    }
};
export const findbyCustomerId = async (id) => {
    try {
        await axios.get(`http://localhost:8080/api/customer/${id}`);
    } catch (e) {
        console.log(e);
    }
};

export const deleteCustomer = async (id)=>{
    try{
        await axios.delete(`http://localhost:8080/api/customer/${id}`)
    }catch(e){
        console.log(e)
    }
}
export const searchByName = async (nameSearch) => {
    try {
        const listSearch = await axios.get(
            `http://localhost:8080/api/customer/search?name=${nameSearch}`
        );
        return listSearch.data;
    } catch (e) {
        console.log(e);
    }
};
