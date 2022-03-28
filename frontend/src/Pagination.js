import React from 'react';
import { usePagination } from './usePagination';
import './pagination.css';

const Pagination = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
}) => {
    
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange.length < 2 ) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className='pagination-container'>
            <div className='pagination-item showing'>
                Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount}
            </div>
            <li
                className={currentPage === 1? 'pagination-item disabled': 'pagination-item'}
                onClick={onPrevious}
            >
                <div className="arrow left"/>
            </li>
            {paginationRange.map((pageNumber, idx) => {

                if (pageNumber === "...") {
                    return (
                        <li 
                            key={idx}
                            className="pagination-item dots"
                        >
                            ...
                        </li>
                    );
                }
                
                return (
                    <li
                        key={pageNumber}
                        className={pageNumber === currentPage? 'pagination-item selected': 'pagination-item'}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={currentPage === lastPage? 'pagination-item disabled': 'pagination-item'}
                onClick={onNext}
            >
                <div className="arrow right" />
            </li>
        </ul>
    );

};

export default Pagination;