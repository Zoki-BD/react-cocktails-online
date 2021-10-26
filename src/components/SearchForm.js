import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from '../context'


function SearchForm() {


   const { setSearch } = useGlobalContext();




   const searchValue = useRef('');



   useEffect(() => {
      searchValue.current.focus()
   }, [])

   const handleSubmit = (e) => {
      e.preventDefault();
   }

   return (
      <section className='section search'>
         <form className='search-form' onSubmit={handleSubmit}>
            <div className='form-control'>
               <label htmlFor='name'>search cocktails by name</label>
               <input type='text' id="name" ref={searchValue}
                  // onChange={(e) => setSearchTerm(e.target.value)} /> vaka bese bez reducerot
                  onChange={(e) => setSearch(e.target.value)} />

            </div>
         </form>
      </section>
   )
}

export default SearchForm

