import axios from 'axios';

export const registerEmployee = async (employeeId, username, password) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/account/employee/${employeeId}`, {
            username,
            password,
        });

        if (response.status === 201) {
            // HTTP 201 Created
            console.log(response.data);
            // Hiển thị thông báo thành công
            return { success: true, message: username };
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 409) {
                // HTTP 409 Conflict
                console.log('Employee account already exists:', error.response.data);
                // Hiển thị thông báo lỗi
                return { success: false, message: `Tài khoản ${username} đã tồn tại` };
            } else {
                // Các trạng thái HTTP khác
                console.log('Unexpected error:', error.response.data);
                return { success: false, message: error.response.data };
            }
        } else {
            // Xử lý các lỗi mạng
            console.error('Network error:', error);
            return { success: false, message: 'Lỗi mạng, vui lòng thử lại sau.' };
        }
    }
};