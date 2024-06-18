// // có thể sử dụng DOMContentLoaded tùy máy , vì cái này phải chờ trang load song mới thực thi hàm bên trong
// document.addEventListener("DOMContentLoaded", function() {
//
//     const btn__animation_menu_header = document.getElementById("btn__animation_menu_header");
//     const menu_animation = document.querySelector(".menu-animation");
//     btn__animation_menu_header.addEventListener("click",function (){
//         menu_animation.style.right === '-200px' ? menu_animation.style.right = '-500px' : menu_animation.style.right = '-200px';
//     })
//
//     // Code xử lý sau khi DOM đã được load hoàn toàn
//     var magicline = document.createElement("div");
//     var active = document.getElementsByClassName("menu__item__active")[0];
//     var menu = document.getElementsByClassName('menu__home')[0];
//     var menu_items = document.getElementsByClassName('menu__item');
//
//     // Thêm class vào thẻ div được tạo
//     magicline.classList.add("menu_magicline");
//
//     // Thêm đường ma thuật vào cuối phần tử trong menu
//     menu.appendChild(magicline);
//
//     // Đường ma thuật cho giá trị hay phần tử ban đầu là Trang chủ - nghĩa là thẻ con absolute ăn theo thẻ cha gần nhất relative
//     moveMagicBar(active);
//
//     // Thiết lập transition sau một khoảng thời gian
//     setTimeout(function(){
//         magicline.style.transition = "all 0.5s ease-in-out";
//     }, 200);
//
//     // Xử lý sự kiện cho mỗi phần tử menu
//     for(let i = 0; i < menu_items.length; i++){
//         // di chuột tới các phần tử
//         menu_items[i].addEventListener("mouseenter", function(){
//             moveMagicBar(this);
//         });
//         // chuột rời khỏi phần tử
//         menu_items[i].addEventListener("mouseout", function(){
//             moveMagicBar(active);
//         });
//     }
//
//     // Logic đường ma thuật
//     function moveMagicBar(elem){
//         magicline.style.transform = "translate3d(" + (elem.getBoundingClientRect().left - 20) + "px" + ", 0px, 0px)";
//         magicline.style.width = elem.offsetWidth + "px";
//     }
//
//
// });

var button_open_menu_lilu = document.getElementById("button_open_menu_lilu");

button_open_menu_lilu.addEventListener("click",function (){

    var menu_lilu = document.getElementsByClassName("menu_lilu")[0];

    menu_lilu.style.display.includes("none") ?  menu_lilu.style.display = 'block' : menu_lilu.style.display = 'none';


})