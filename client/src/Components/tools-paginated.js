import React from 'react';
import {useState, useEffect } from "react";

const itemsPerPage = 3;

const PaginatedData = ({data}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Group the data by category
  const categoryGroups = {};
    
  /*data?.map((categoryData) => {
    const { category, info } = categoryData;
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push({ category, info });
  });*/
  //console.log(categoryGroups)
  // Get a list of unique category names
  const categoryNames = Object.keys(categoryGroups);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current category based on the currentPage
  const currentCategory = categoryNames[currentPage - 1];

  // Paginate the current category's data
  const currentCategoryData = categoryGroups[currentCategory]?.slice(
    startIndex,
    endIndex
  );

  const totalPages = Math.ceil(
    categoryGroups[currentCategory]?.length / itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  console.log(currentCategoryData)
  return (
    <div>
      {categoryNames.map((categoryName, index) => (
        <div key={index}>
          {categoryName === currentCategory && (
            <>
              <h2>{categoryName}</h2>
              {currentCategoryData.map((categoryData, dataIndex) => (
                <div key={dataIndex}>
                  {categoryData.category === categoryName && (
                    <>
                      {categoryData.info
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((infoItem, infoIndex) => (
                          <div key={infoIndex}>
                            {/* Render infoItem here */}
                          </div>
                        ))}
                    </>
                  )}
                </div>
              ))}
              <div>
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaginatedData;