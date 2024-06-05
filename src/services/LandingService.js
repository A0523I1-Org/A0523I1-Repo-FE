import axios from "axios";

export const addNewLanding = async (landing) => {
    try {
      await axios.post("http://localhost:8080/landing/createLanding ", landing);
      return true;
    } catch (error) {
      return false;
    }
  };