// Chỉ viết hoa chữ cái đầu tiên
export const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Hiển thị ngày dd/MM/yyyy
export const formatDate = (dateString) => {
    const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
    return new Date(dateString).toLocaleDateString('vi-VN', options);
};