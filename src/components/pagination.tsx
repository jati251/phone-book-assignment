import React, { useState } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
  maxPageNumbersToShow?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  maxPageNumbersToShow = 5,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          padding: "0",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <li
          onClick={() => handlePageChange(currentPage - 1)}
          style={{
            cursor: "pointer",
            padding: "8px 12px",
            backgroundColor: currentPage === 1 ? "#ddd" : "#f0f0f0",
            borderRadius: "4px",
            transition: "background-color 0.2s ease",
            marginBottom: "8px",
          }}
          className={currentPage === 1 ? "disabled" : ""}
        >
          &laquo; Prev
        </li>
        {[...Array(totalPages)].map((_, i) => {
          if (totalPages <= maxPageNumbersToShow) {
            return (
              <li
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                style={{
                  cursor: "pointer",
                  padding: "8px 12px",
                  backgroundColor:
                    i + 1 === currentPage ? "#00AA5B" : "#f0f0f0",
                  borderRadius: "4px",
                  color: i + 1 === currentPage ? "#fff" : "initial",
                  transition: "background-color 0.2s ease",
                  marginBottom: "8px",
                }}
              >
                {i + 1}
              </li>
            );
          } else {
            const halfMax = Math.floor(maxPageNumbersToShow / 2);
            const start = Math.max(currentPage - halfMax, 1);
            const end = Math.min(start + maxPageNumbersToShow - 1, totalPages);

            if (
              (i + 1 === start && i + 1 !== 1) ||
              (i + 1 === end && i + 1 !== totalPages)
            ) {
              return (
                <li
                  key={i + 1}
                  style={{
                    cursor: "default",
                    marginBottom: "8px",
                  }}
                >
                  ...
                </li>
              );
            }

            if (i + 1 >= start && i + 1 <= end) {
              return (
                <li
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  style={{
                    cursor: "pointer",
                    padding: "8px 12px",
                    backgroundColor:
                      i + 1 === currentPage ? "#00AA5B" : "#f0f0f0",
                    borderRadius: "4px",
                    color: i + 1 === currentPage ? "#fff" : "initial",
                    transition: "background-color 0.2s ease",
                    marginBottom: "8px",
                  }}
                >
                  {i + 1}
                </li>
              );
            }
          }
        })}
        <li
          onClick={() => handlePageChange(currentPage + 1)}
          style={{
            cursor: "pointer",
            padding: "8px 12px",
            backgroundColor: currentPage === totalPages ? "#ddd" : "#f0f0f0",
            borderRadius: "4px",
            transition: "background-color 0.2s ease",
            marginBottom: "8px",
          }}
          className={currentPage === totalPages ? "disabled" : ""}
        >
          Next &raquo;
        </li>
      </ul>
      <p
        style={{
          margin: "0 10px",
          color: "#555",
        }}
      >
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default Pagination;
