import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, onPreviousPage, onNextPage }) => {
    const renderPageNumbers = () => {
        if (totalPages <= 4) {
            // If total pages are less than or equal to 4, show all pages
            return [...Array(totalPages).keys()].map((page) => (
                <li key={page} className="tw-custom-li">
                    <button onClick={() => onPageChange(page)}
                            className={`tw-custom-button-page ${currentPage === page && 'tw-custom-button-active'}`}
                    >
                        {page + 1}
                    </button>
                </li>
            ));
        } else {
            // Show first 3 pages, the "..." button, and the last page
            return (
                <>
                    {[0, 1, 2].map((page) => (
                        <li key={page} className="tw-custom-li">
                            <button onClick={() => onPageChange(page)}
                                    className={`tw-custom-button-page ${currentPage === page && 'tw-custom-button-active'}`}
                            >
                                {page + 1}
                            </button>
                        </li>
                    ))}
                    {totalPages > 4 && (
                        <li className="tw-custom-li">
                            <button className="tw-custom-button-page" disabled>
                                ...
                            </button>
                        </li>
                    )}
                    <li key={totalPages - 1} className="tw-custom-li">
                        <button onClick={() => onPageChange(totalPages - 1)}
                                className={`tw-custom-button-page ${currentPage === totalPages - 1 && 'tw-custom-button-active'}`}
                        >
                            {totalPages}
                        </button>
                    </li>
                </>
            );
        }
    };

    return (
        <nav aria-label="Page navigation example" className="tw-custom-nav">
            <ul className="tw-custom-ul">
                <li>
                    <button onClick={onPreviousPage} disabled={currentPage === 0}
                            className={`tw-custom-button-prev ${currentPage === 0 && 'tw-custom-disabled'}`}
                    >
                        <span className="tw-custom-span-6">Previous</span>
                        <svg className="tw-custom-svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </button>
                </li>
                {renderPageNumbers()}
                <li>
                    <button onClick={onNextPage} disabled={currentPage === totalPages - 1}
                            className={`tw-custom-button-next ${currentPage === totalPages - 1 && 'tw-custom-disabled'}`}
                    >
                        <span className="tw-custom-span-6">Next</span>
                        <svg className="tw-custom-svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
