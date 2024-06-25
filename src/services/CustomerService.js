import axios from "axios";


export const gettAllCustomers = async (token) => {
    try {
        const proCustomers = await axios.get(
            `http://localhost:8080/api/customer/list`, {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        return proCustomers.data;
    } catch (e) {
        console.log(e);
    }
};





export const createCustomer = async (customer,token) => {
    try {
        await axios.post(`http://localhost:8080/api/customer/create`, customer,{
            headers: {Authorization : `Bearer ${token}`}
        });
    } catch (e) {
        console.log(e);
    }
};



export const editCustomer = async (id, customer, token) => {
    try {
        await axios.put(`http://localhost:8080/api/customer/${id}`, customer, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (e) {
        console.log(e);
    }
};


export const findbyCustomerId = async (id, token) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/customer/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};


export const deleteCustomer = async (id, token) => {
    try {
        await axios.delete(`http://localhost:8080/api/customer/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (e) {
        console.log(e);
    }
};



export const deleteCustomers = async (ids, token) => {
    try {
        const idsParam = ids.join(',');
        await axios.delete(`http://localhost:8080/api/customer/deleteBatch?ids=${idsParam}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Deleted customers successfully.");
    } catch (e) {
        console.error("Error deleting customers:", e);
    }
};

export const searchByName = async (page, nameSearch, token) => {
    try {
        const response = await axios.get(
            `http://localhost:8080/api/customer/search?page=${page}&name=${nameSearch}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const getAllLandingSpace = async(token) => {
    try {
        const res = await axios.get("http://localhost:8080/api/landing/landing-space", {
            headers: {Authorization : `Bearer ${token}`}
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }

}

    export const getPage = async (page,token) => {
        const response = await axios.get(`http://localhost:8080/api/customer/list?page=${page}`,{
            headers: {Authorization : `Bearer ${token}`}});
        return response.data;
    };

    export const getCustomers = async (token) => {

        try {
            const res = await axios.get("http://localhost:8080/api/customer", {

                headers: {Authorization: `Bearer ${token}`}
            });

            // console.log(res.data);
            return res.data;

        } catch (error) {
            // console.log(error);
        }

    }

