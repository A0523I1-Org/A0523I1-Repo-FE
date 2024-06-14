// function Pagination({ currentPage, totalPages, onPageChange }) {
//     const handlePageChange = (page) => {
//         onPageChange(page);
//     };
//
//     const renderPageButtons = () => {
//         const pageButtons = [];
//
//         // Hiển thị nút trước đó nếu không ở trang đầu tiên
//         if (currentPage > 1) {
//             pageButtons.push(
//                 <button
//                     key="prev"
//                     onClick={() => handlePageChange(currentPage - 1)}
//                 >
//                     Trước
//                 </button>
//             );
//         }
//
//         // Hiển thị các nút số trang
//         pageButtons.push(
//             ...Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
//                 <button
//                     key={page}
//                     onClick={() => handlePageChange(page)}
//                     style={{
//                         backgroundColor: page === currentPage ? 'blue' : 'white',
//                         color: page === currentPage ? 'white' : 'black',
//                     }}
//                 >
//                     {page}
//                 </button>
//             ))
//         );
//
//         // Hiển thị nút tiếp theo nếu không ở trang cuối cùng
//         if (currentPage < totalPages) {
//             pageButtons.push(
//                 <button
//                     key="next"
//                     onClick={() => handlePageChange(currentPage + 1)}
//                 >
//                     Tiếp
//                 </button>
//             );
//         }
//
//         return pageButtons;
//     };
//
//     return (
//         <div>
//             {renderPageButtons()}
//         </div>
//     );
// }
//
// export  default Pagination;