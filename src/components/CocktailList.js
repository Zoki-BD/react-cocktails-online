import React, { useState, useEffect } from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'
import Pagination from './Pagination'


function CocktailList() {

   const { loading, cocktails } = useGlobalContext();



   //ovie dva state-a se za da moze da pravime pagination. 
   const [currentPage, setCurrentPage] = useState(1) //stranicata na koja sme momentalno pri prelistuvanjeto.
   const [cocktailsPerPage, setcocktailsPerPage] = useState(6) //kolku da pokazuva postovi na edna stranica prelistuvanje.



   const indexOfLastPost = currentPage * cocktailsPerPage; //momental.page e primer 4-tata i sega 4 x 10 = 40 sto e index sto na prviot post na toj page
   const indexOfFirstPost = indexOfLastPost - cocktailsPerPage;
   const currentCocktails = cocktails.slice(indexOfFirstPost, indexOfLastPost);



   //Change page on klik
   const paginate = (brojNaPage) => {
      setCurrentPage(brojNaPage);
   }



   if (loading) {
      return <Loading />
   }


   if (cocktails.length < 1) {
      return (
         <h2 className='section-title'>
            no cocktails matched your search
         </h2>
      )
   }

   return (
      <section className='section'>

         {/* za proverka na LS od net primerot
         <div>
            <input
               type="text"
               placeholder="Enter your name"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
         </div> */}


         <h2 className='section-title'>cocktails</h2>
         <div className='cocktails-center'>
            {/* {cocktails.map((item) => {
               return <Cocktail key={item.id} {...item} cocktails={currentCocktails} cocktail={item} />
            })} */}
            <Cocktail cocktails={currentCocktails} />
         </div>
         <Pagination cocktailsPerPage={cocktailsPerPage} totalCocktails={cocktails.length} paginate={paginate} setCurrentPage={setCurrentPage} />
      </section>

   )
}




export default CocktailList
