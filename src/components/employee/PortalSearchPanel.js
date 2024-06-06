import React from "react";
import { createPortal } from "react-dom";

const PortalSearchPanel = ({ isVisible, toggleSearchPanel }) => {
    if (!isVisible) return null;

    return createPortal(
        <div
            className="fixed top-1/2 left-1/2 bg-white border border-gray-200 rounded-lg shadow-lg"
            style={{
                transform: "translate(-50%, -50%)",
                zIndex: 1000 }}
        >
            <div className="p-4">
                <button onClick={toggleSearchPanel} className="float-right text-red-500">
                    Close
                </button>
                <input
                    type="text"
                    placeholder="Search by name"
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Search by email"
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Search by phone"
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Search by account"
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
            </div>
        </div>,
        document.body
    );
};

export default PortalSearchPanel;