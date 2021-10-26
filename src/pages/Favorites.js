import React, { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useGlobalContext } from '../context'
import { Link } from 'react-router-dom'


function Favorites() {

   const { favorites, removeFromFavorites, clearFavoritesCart } = useGlobalContext();




   if (favorites.length < 1) {
      return (
         <h1 className='empty-favorites-message'> Favorites cart is empty</ h1>
      )
   }

   return (

      <section className='section'>
         <Link to='/' className='btn btn-primary-fav'>
            back home
         </Link>
         <h2 className='section-title'>Favorites</h2>

         <div className='cocktails-center'>
            {
               favorites.length > 0 && (
                  <>
                     {favorites.map((fav) => (

                        <article className='cocktail' key={fav.id}>

                           <div className='img-container'>

                              <img src={fav.image} alt={fav.name} />
                           </div>

                           <div className='cocktail-footer'>
                              <h3>{fav.name}</h3>
                              <h4>{fav.glass}</h4>
                              <p>{fav.info}</p>
                           </div>
                           <button className="btn btn-alert" onClick={() => removeFromFavorites(fav.id)}>
                              remove cocktail
                           </button>
                        </article>
                     ))}

                  </>
               )
            }

         </div>
         <button className="btn btn-primary-fav" onClick={() => clearFavoritesCart()}>
            Clear Cart
         </button>
      </section>





   )
}

export default Favorites
