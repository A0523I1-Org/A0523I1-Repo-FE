// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import * as authService from '../services/Authenticate/AuthService'

const PrivateRoute = ({ element }) => {
    const isAuthenticated = !!authService.isAuthenticated(); // or your auth check logic

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
