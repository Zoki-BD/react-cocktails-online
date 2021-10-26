import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'


const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='


function SingleCocktail() {

   const { id } = useParams()


   const [loading, setLoading] = useState(false)
   const [singleCocktail, setSingleCocktail] = useState(null)

   console.log(id)
   //odime so useEffect kako bi na sekoe renderiranje pravelo fetch i da dava info za toj id na odredeniot koktel
   // Imame url koe treba da go kombinirame so paramsot


   useEffect(() => {
      setLoading(true);
      async function getCocktail() {
         try {
            const response = await fetch(`${url}${id}`)
            const data = await response.json()

            //ideme isto kako vo context pak tuka. Prkeu drinks ke proverime dali ke dade prazen array ili ke ima nesto
            if (data.drinks) {
               console.log(data.drinks)
               const { //oba e na poinakov nacin od context.js na destructuring kade direkt davame iminja nasi pri destructuriranjeto
                  strDrink: name,
                  strDrinkThumb: image,
                  strAlcoholic: info,
                  strCategory: category,
                  strGlass: glass,
                  strInstructions: instructions,
                  strIngredient1,
                  strIngredient2,
                  strIngredient3,
                  strIngredient4,
                  strIngredient5,
               } = data.drinks[0] //posto samo eden koktel ni treba vrakjame so index mesto 0 t.e prviot sto ke go najde so toa id


               //kreirame ingredients array i gi stavame vnatre gore povikanite APi props(posto ne sakavme nase ime ostanaa tie od API-to sto doagjaat)
               const ingredients = [
                  strIngredient1,
                  strIngredient2,
                  strIngredient3,
                  strIngredient4,
                  strIngredient5,
               ]
               const newCocktail = {
                  name,
                  image,
                  info,
                  category,
                  glass,
                  instructions,
                  ingredients,
               }
               setSingleCocktail(newCocktail)
               setLoading(false)
            } else {
               setSingleCocktail(null)
               setLoading(false)
            }

         } catch (error) {
            console.log(error)
            setLoading(false)
         }
      }
      getCocktail()
   }, [id])



   if (loading) {
      return <Loading />
   }


   if (!singleCocktail) {
      return <h2 className='section-title'>no cocktail to display</h2>
   } else {
      const {
         name,
         image,
         category,
         info,
         glass,
         instructions,
         ingredients,
      } = singleCocktail


      return (
         <section className='section cocktail-section'>
            <Link to='/' className='btn btn-primary'>
               back home
            </Link>
            <h2 className='section-title'>{name}</h2>
            <div className='drink'>

               <img src={image} alt={name}></img>
               <div className='drink-info'>
                  <p>
                     <span className='drink-data'>name :</span><span className='sminka'>{name}</span>
                  </p>
                  <p>
                     <span className='drink-data'>category :</span> <span className='sminka'>{category}</span>
                  </p>
                  <p>
                     <span className='drink-data'>info :</span> <span className='sminka'>{info}</span>
                  </p>
                  <p>
                     <span className='drink-data'>glass :</span> <span className='sminka'>{glass}</span>
                  </p>
                  <p>
                     <span className='drink-data'>instructons :</span> <span className='sminka'>{instructions}</span>
                  </p>
                  <p>
                     <span className='drink-data'>ingredients :</span>
                     <span className="sminka"> {ingredients.map((item, index) => {
                        return item ? <span key={index}> {item}</span> : null
                     })}</span>
                  </p>
               </div>
            </div>
         </section>
      )
   }
}

export default SingleCocktail
