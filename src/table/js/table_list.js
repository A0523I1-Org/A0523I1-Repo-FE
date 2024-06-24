const btn_menublock_edc = document.querySelectorAll(".btn_menublock_edc");
const menu_edc = document.querySelectorAll(".menu_edc");


btn_menublock_edc.forEach((e,index) => {
    e.addEventListener("click", function () {
        if (e.id === `button-${index + 1}`) {
            menu_edc[index].style.display === "block" ? menu_edc[index].style.display = "none" : menu_edc[index].style.display = "block";
        }
    })

})

document.addEventListener("click", function (event) {
    menu_edc.forEach((e,index) => {
        if (!e.contains(event.target) && !btn_menublock_edc[index].contains(event.target)) {
            e.style.display = "none";
        }
    })

});