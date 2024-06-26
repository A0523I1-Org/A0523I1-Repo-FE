import axios, {get} from "axios";

// Phung-PV Dùng để lưu trữ thong tin khách hàng vào google sheet để có thể liên lạc
export const SaveInfoCustomerForm = async (dataInfo) => {
  try {
    return await axios.post(
        "https://sheet.best/api/sheets/ceffd477-1d2a-4fce-a892-f19bf5b2125b",
        dataInfo
    );
  } catch (e) {
    console.log(e);
  }
};

export const deleteLandingById = async (id, token) => {
  try {
    console.log(id);
    return await axios.put(
        `http://localhost:8080/api/landing/deleteLanding/${id}`,
        {}, // Dữ liệu body của PUT request, có thể để trống nếu không cần
        {
          headers: { Authorization: `Bearer ${token}` },
        }
    );
  } catch (e) {
    console.error(e); // Log lỗi để biết thêm chi tiết về lỗi
    return false;
  }
};
export const deleteLandings = async (ids, token) => {
  try {
    console.log(ids);
    return await axios.put(
        `http://localhost:8080/api/landing/deleteLanding/${ids}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
    );
  } catch (e) {
    return false;
  }
};
export const addNewLanding = async (landing, token) => {
  try {
    await axios.post(
        "http://localhost:8080/api/landing/createLanding ",
        landing,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
    );
    return true;
  } catch (error) {
    return false;
  }
};


export const showListLandingHome = async (page, size = 4) => {
    try {
        const listLandingHome = await axios.get("http://localhost:8080/landingHome/listLandingHome?",{
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

// lấy danh sách mb còn trống (Hoài NT)
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



