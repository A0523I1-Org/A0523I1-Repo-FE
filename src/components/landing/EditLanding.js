

const EditLanding = () => {

    const removeCheckedCheckboxes= () => {
        var checked = document.querySelectorAll(".delete-checkbox:checked");
        checked.forEach((elem) => {
          var id = elem.parentElement.dataset.id; // Lấy ID từ thuộc tính data-id của phần tử cha
          landingService.deleteLandingById(id); // Gọi phương thức xóa với ID tương ứng
        });
      }
      

    return (
        <>
        <h4>Content</h4>
        </>
    )

}
export default EditLanding;
