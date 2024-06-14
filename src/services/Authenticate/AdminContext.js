import React, { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../Authenticate/AuthService'; // Ensure this is correctly imported

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        checkAdmin();
        console.log(isAdmin)
    }, []);

    const checkAdmin = async () => {
        if(localStorage.getItem('token')) {
            const roles = await authService.getRoles();
            if (roles && Array.isArray(roles)) {
                setIsAdmin(roles.includes('ROLE_ADMIN'));
            }
        }
    };

    return (
        <AdminContext.Provider value={isAdmin}>
            {children}
        </AdminContext.Provider>
    );
};
