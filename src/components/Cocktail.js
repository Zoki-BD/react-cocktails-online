import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
import Favorites from '../pages/Favorites';
import { useGlobalContext } from '../context'
import Modal from 'react-modal';



// function Cocktail({ id, name, image, info, glass, cocktail, cocktails }) {
function Cocktail({ cocktails }) {

   const { addToFavorites, disableCocktailIfFavorite } = useGlobalContext();

   const [isModalOpen, setIsModalOpen] = useState(false)




   return (
      <>
         {
            cocktails.map(cocktail => (


               // const { id, name, image, info, glass } = cocktail;
               // console.log(name);


               <article className='cocktail ' key={cocktail.id}>

                  <div className='img-container'>

                     <img src={cocktail.image} alt={cocktail.name} />
                  </div>

                  <div className='cocktail-footer'>
                     <h3>{cocktail.name}</h3>
                     <h4>{cocktail.glass}</h4>
                     <p>{cocktail.info}</p>


                     <Link to={`/cocktail/${cocktail.id}`} className="btn btn-primary btn-details">
                        details
                     </Link>
                     <button
                        className='btn btn-primary btn-details'
                        onClick={() => addToFavorites(cocktail)}
                        disabled={disableCocktailIfFavorite(cocktail)}
                     >
                        Add to Favorites
                     </button>
                     {/* Modal pocenja od tuka nadole */}
                     <div>
                        <button className="btn btn-primary-fav-modal">

                           <button className="btn btn-primary btn-details" onClick={() => setIsModalOpen(true)}> Details in modal</button>
                        </button>
                     </div>
                     <Modal
                        className='Modal'
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        style={
                           {
                              overlay: {
                                 position: 'fixed',
                                 top: 0,
                                 left: 0,
                                 right: 0,
                                 bottom: 0,
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 backgroundColor: 'rgba(90,98,107,.9)'
                              },
                              content: {
                                 position: 'null', // to override default styles
                                 top: 'null',
                                 left: 'null',
                                 right: 'null',
                                 bottom: 'null',
                                 border: '2px solid #5B6675',
                                 background: 'white',
                                 padding: '28px 15px',
                                 maxWidth: '760px',
                                 minWidth: '400px',
                                 height: '55vh'
                              },
                              body: {
                                 color: 'null',
                              }
                           }}
                     >

                        <button
                           className='btn-modalClose'
                           onClick={() => setIsModalOpen(false)}>Close</button>
                        <div className='modal-body'>
                           <h2 className='section-title-modal'>{cocktail.name}</h2>
                           <div className='drink'>

                              <img src={cocktail.image} alt={cocktail.name} className='img-modal'></img>
                              <div className='drink-info'>
                                 <p>
                                    <span className='drink-data'>name: </span> {cocktail.name}
                                 </p>

                                 <p>
                                    <span className='drink-data'>info: </span> {cocktail.info}
                                 </p>
                                 <p>
                                    <span className='drink-data'>glass: </span> {cocktail.glass}
                                 </p>
                              </div>
                           </div>
                        </div>

                     </Modal>

                  </div>

               </article>
            ))

         }

      </>
   )
}

export default Cocktail


   //Za da menjame ako sakame da stavame vo favorites preku button kopce koe ke e (+) t.e ke pokaze (-) na disable 
   // const add = (e) => {

   //    // const newAdded = {
   //    //    id: id,
   //    //    name: name,
   //    //    info: info,
   //    // }

   //    if (e.target.classList.contains("favorite-btn")) {
   //       if (e.target.classList.contains("is-favorite")) {
   //          //Dodavame class is-favorite vo css prvo pa ovde vo zavisnost ja trgame ili dodavame za da smeni boja kopceto
   //          //remove the class
   //          e.target.classList.remove("is-favorite");
   //          e.target.textContent = "+"; //dodavame plus znak da ako ne e selektirano
   //       } else {
   //          //Add the class back
   //          e.target.classList.add("is-favorite");
   //          e.target.textContent = "-"; //dodavame minus znak da dade ako e selektirano
   //       }

   //    }
   // }