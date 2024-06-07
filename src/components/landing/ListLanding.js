import * as landingService from "../../services/LandingService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

const ListLanding = () => {
  const removeCheckedCheckboxes = () => {
    var checked = document.querySelectorAll(".delete-checkbox:checked");
    checked.forEach((elem) => {
      var id = elem.parentElement.dataset.id; // Lấy ID từ thuộc tính data-id của phần tử cha
      landingService.deleteLandingById(id); // Gọi phương thức xóa với ID tương ứng
    });
  };
  return (
    <>
    <Formik>
        <Form>
            <Field></Field>
        </Form>
    </Formik>
    </>
  );
};
export default ListLanding;
