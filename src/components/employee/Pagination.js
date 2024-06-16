import React from 'react';

const Pagination = ({currentPage, totalPages, onPageChange, onPreviousPage, onNextPage}) => {
    return (
        <nav aria-label="Page navigation example" className="flex justify-center mt-4">
            <ul className="flex items-center -space-x-px h-8 text-sm">
                <li>
                    <button
                        onClick={onPreviousPage}
                        disabled={currentPage === 0}
                        className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 0 && 'cursor-not-allowed opacity-50'}`}
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2" d="M5 1 1 5l4 4"/>
                        </svg>
                    </button>
                </li>
                {[...Array(totalPages).keys()].map((page) => (
                    <li key={page} className="flex items-center justify-center">
                        <button
                            onClick={() => onPageChange(page)}
                            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === page && 'z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'}`}
                        >
                            {page + 1}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={onNextPage}
                        disabled={currentPage === totalPages - 1}
                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages - 1 && 'cursor-not-allowed opacity-50'}`}
                    >
                        <span className="sr-only">Next</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;