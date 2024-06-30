import axios from "axios";
/** Config API */
// Tạo instance Axios cho API login
const loginAxios = axios.create();

// Thêm interceptor cho instance loginAxios để bắt lỗi từ API login
loginAxios.interceptors.response.use(
    response => response,
    error => {
        // Xử lý lỗi từ API login ở đây
        if (error.response) {
            // Ví dụ: Hiển thị thông báo lỗi
            console.error('Login API Error:', error.response.data);
        }
        return Promise.reject(error);
    }
);

// Thêm interceptor chung cho tất cả các request ngoại trừ API login
axios.interceptors.response.use(
    response => response,
    error => {
        // Kiểm tra xem URL có phải là "/login" hay không
        if (error.config.url && !error.config.url.includes('/login')) {
            if (error.response && error.response.status === 401) {
                // Chuyển hướng đến trang unauthorized
                window.location.href = '/unauthorized';
            }
        }
        return Promise.reject(error);
    }
);

/** Call API */
export async function login(username, password){
    try {
        const response = await loginAxios.post(`http://localhost:8080/login`, {username, password})
        console.log(response)
        return response.data;
    } catch(err) {
        throw err;
    }
}
export async function logout(token){
    try {
        await axios.get(`http://localhost:8080/logout`, {
            headers: {Authorization: `Bearer ${token}`}
        });

        // Clear token from localStorage và sessionStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');

    } catch(err) {
        throw err;
    }
}
/** AUTHENTICATION CHECKER */
export function isAuthenticated() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    return !!token
}
export function isAdmin() {
    const role = localStorage.getItem('role') || sessionStorage.getItem('role')
    if (!role) {
        return false;
    }
    return role.includes('ADMIN');
}

// get token
export function getToken() {
    let token = localStorage.getItem('token');
    if (!token) {
        token = sessionStorage.getItem('token');
    }
    return token;
}