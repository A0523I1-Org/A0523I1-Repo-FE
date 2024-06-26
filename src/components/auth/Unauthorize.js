import React from 'react';
import '../../css/auth/unauthorize.css'; // Import CSS


const UnauthorizedPage = () => {
    return (
        <div id="unauthorized-page">
            <h1>401</h1>
            <p>Unauthorized - Bạn không có quyền truy cập vào trang này.</p>
        </div>
    );
};

export default UnauthorizedPage;