import { useState } from "react";
import * as customerService from "../../services/CustomerService";
import * as authService from '../../services/Authenticate/AuthService.js'
import {toast} from "react-toastify";




const PopUpDelete = (setCustomers, setTotalCustomers, token) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [popupAction, setPopupAction] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = (id) => {
        setPopupAction("single");
        setDeleteId(id);
        setShowPopup(true);
    };

    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleDeleteIds = () => {
        setPopupAction("multiple");
        setShowPopup(true);
    };

    const confirmDelete = async () => {
        setShowPopup(false);
        const token = authService.getToken();
        if (!token) {
            console.log("No token found. Please log in.");
            return;
        }
        try {
            if (popupAction === "single") {
                await customerService.deleteCustomer(deleteId, token);
                setCustomers((prevCustomers) =>
                    prevCustomers.filter((customer) => customer.id !== deleteId)
                );
                setTotalCustomers((prevTotal) => prevTotal - 1);
                toast.success("Xóa khách hàng thành công", {
                    autoClose: 2000,
                });
            } else if (popupAction === "multiple") {
                await customerService.deleteCustomers(selectedIds, token);
                setCustomers((prevCustomers) =>
                    prevCustomers.filter((customer) => !selectedIds.includes(customer.id))
                );
                setTotalCustomers((prevTotal) => prevTotal - selectedIds.length);
                setSelectedIds([]);
                toast.success("Xóa khách hàng thành công", {
                    autoClose: 2000,
                });
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    const cancelDelete = () => {
        setShowPopup(false);
    };

    return {
        handleDelete,
        confirmDelete,
        selectedIds,
        deleteIds: selectedIds,
        handleDeleteIds,
        setSelectedIds,
        cancelDelete,
        toggleSelect,
        showPopup,
    };
};

export default PopUpDelete;