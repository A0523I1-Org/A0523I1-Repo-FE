import axios from "axios";

export const getAllFloor = async (token) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/landing/listFloor`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};