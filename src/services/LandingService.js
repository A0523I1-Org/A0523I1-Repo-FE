import axios from "axios";
// export const getListAllLanding=async (page)=> {
// try{
//     const res=await axios.get(`http://localhost:8080/landing?page=${page}`)

//     return res.data

// }catch (e) {

//     return false;

// }

// }

export const getListAllLanding = async (searchParams, token) => {
  try {
    const res = await axios.get(
        `http://localhost:8080/api/landing?page=${searchParams.page}&size=${searchParams.size}&statusLanding=${searchParams.statusLanding}&codeLanding=${searchParams.codeLanding}&areaLanding=${searchParams.areaLanding}&typeLanding=${searchParams.typeLanding}&floorLanding=${searchParams.floorLanding}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
    );
    return res.data;
    console.log(res.data.content);
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getListAllFloor = async (token) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/landing/listFloor`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateLading = async (landing) => {
  try {
    console.log(landing);
    return await axios.put(
        `http://localhost:8080/api/landing/${landing.id}`,
        landing
    );
  } catch (e) {
    return false;
  }
};
export const findLanding = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/landing/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export const findLandingByCode = async (code, token) => {
  try {
    const res = await axios.get(
        `http://localhost:8080/api/landing/code/${code}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
    );
    return res.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export const findLandingIsAvailableById = async (id,token) => {
  try {
    const res = await axios.get(
        `http://localhost:8080/api/landing/landing-isAvailable/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
    );
    return res.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

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

export const showListLandingHome = async (page = 0, size = 4) => {
  try {
    const listLandingHome = await axios.get("http://localhost:8080/landing", {
      params: {
        page,
        size,
      },
    });
    return listLandingHome.data;
  } catch (error) {
    console.error("error fetching data ", error);
    return {
      content: [],
      pageable: {},
      last: true,
      totalElements: 0,
      totalPages: 0,
      number: 0,
    };
  }
};
export const getAllLandingSpace = async (token) => {
  try {
    const res = await axios.get(
        "http://localhost:8080/api/landing/landing-space",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};