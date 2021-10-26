import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

function Pagination({ totalCocktails, cocktailsPerPage, paginate, setCurrentPage }) {

   const pageNumbers = [];

   console.log(paginate)

   for (let i = 1; i <= Math.ceil(totalCocktails / cocktailsPerPage); i++) {
      pageNumbers.push(i)
   }


   const checkNumber = (number) => {
      // pageNumbers.length -1  e poslednoto indexno mesto
      if (number > pageNumbers.length - 1) {
         return 0;
      }
      if (number < 0) {
         return pageNumbers.length - 1;
      }
      return number;
   };


   //Ova e metod za prev i e ist kako kaj counterot koga idevme so prevValue
   const paginateLeft = () => {
      setCurrentPage((index) => {
         // let newIndex = index - 1;
         return checkNumber(index - 1);
      });
   };

   //Metod za next. Ovde odime cisto za deka moze i vaka, preku let varijabla. isto e
   const paginateRight = () => {
      setCurrentPage((index) => {
         let newIndex = index + 1;
         return checkNumber(newIndex);
      });
   };

   if (pageNumbers.length < 1) {
      return '';
   }

   return (
      <nav className='text-center'>
         <ul className='pagination justify-content-center'>

            <div className='button-container'>
               <a href="#" className='strelka' onClick={paginateLeft} >
                  <FaChevronLeft />
               </a>
            </div>
            <div className=" list-group list-group-horizontal">
               {
                  pageNumbers.map(number => (
                     <li key={number} className="page-item  ">
                        <a href="#" onClick={() => paginate(number)} className="page-link " >
                           {number}
                        </a>
                     </li>
                  ))
               }
            </div>
            <div >
               <a href='#' className='strelka' onClick={paginateRight}>
                  <FaChevronRight />
               </a>
            </div>
         </ul>
      </nav >
   )
}

export default Pagination
