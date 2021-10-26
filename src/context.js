import React, { useState, useContext, useEffect, useReducer } from 'react'
import { useCallback } from 'react'
import reducer from './reducer'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const url2 = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='

const AppContext = React.createContext();

// const [loading, setLoading] = useState(false)
// const [cocktails, setCocktails] = useState([])
// const [searchTerm, setSearchTerm] = useState('a') //na prvo da ne e prazna stranicata i da dava 'a' search po default


const initialState = {
   loading: false,
   cocktails: [],
   // favorites: [],
   favorites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [],
   searchTerm: 'a',
   searchTerm2: 'a'
}


//ako sakame da gi socuvame vo LS
// const initialState = {
//    loading: false,
//    cocktails: localStorage.getItem('cocktails') ? JSON.parse(localStorage.getItem('cocktails')) : [],
//    searchTerm: 'a',
//    searchTerm2: 'a'
// }


const AppProvider = ({ children }) => {

   const [state, dispatch] = useReducer(reducer, initialState)


   if (state.searchTerm === '') {
      dispatch({ type: 'FIRST_PAGE_TO_DISPLAY' })
   }

   useEffect(() => {
      localStorage.setItem('favorites', JSON.stringify(state.favorites))

   }, [state.favorites]);


   const fetchDrinks = useCallback(async () => {

      dispatch({ type: 'LOADING' });

      try {

         const response = await fetch(`${url}${state.searchTerm}`)
         const data = await response.json();
         const { drinks } = data;//drinks e glavniot prop od API-to. Zatoa mozeme da destructure it vnatre vo map-ot dole

         if (drinks) {
            const newCocktails = drinks.map(item => {
               const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item;

               return { //direktno vikame vrati mi nov objekt i im davame tuka iminja na 
                  //destrukturiranite pogore odma vo map-ot
                  id: idDrink,
                  name: strDrink,
                  image: strDrinkThumb,
                  info: strAlcoholic,
                  glass: strGlass
               }
            })
            dispatch({ type: 'DISPLAY_ITEMS', payload: newCocktails })
            // setCocktails(newCocktails)



         } else {
            dispatch({ type: 'NO_ITEMS_TO_DISPLAY' })
            //setCocktails([]);
         }
         dispatch({ type: 'LOADING_OFF' })
      } catch (error) {
         console.log(error)
         dispatch({ type: 'LOADING_OFF' })
      }
   }, [state.searchTerm])




   useEffect(() => {
      fetchDrinks()
   }, [state.searchTerm, fetchDrinks])


   const addToFavorites = (cocktail) => {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: cocktail })
   }

   const removeFromFavorites = (id) => {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: id })
   }


   const setSearch = (searchTerm) => {
      dispatch({ type: 'SET_SEARCHTERM', payload: searchTerm })
   }

   const disableCocktailIfFavorite = (favorite) => {
      let favoriteCocktail = state.favorites.find(obj => obj.id === favorite.id)

      const buttonDisabled = favoriteCocktail ? true : false;
      return buttonDisabled;
   }

   const clearFavoritesCart = () => {
      dispatch({ type: 'CLEAR_FAVORITES_CART' })
   }

   return (
      <AppContext.Provider
         value={{
            ...state,
            setSearch,
            addToFavorites,
            removeFromFavorites,
            disableCocktailIfFavorite,
            clearFavoritesCart
         }}
      >
         {children}
      </AppContext.Provider>
   )

}

export const useGlobalContext = () => {
   return useContext(AppContext)
}

export { AppContext, AppProvider }