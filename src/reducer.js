function reducer(state, action) {


   switch (action.type) {

      case 'LOADING':
         return { ...state, loading: true }

      case 'LOADING_OFF':
         return { ...state, loading: false }

      case 'DISPLAY_ITEMS':
         return { ...state, cocktails: action.payload, loading: false }

      case 'NO_ITEMS_TO_DISPLAY':
         return { cocktails: [], loading: false }

      case 'FIRST_PAGE_TO_DISPLAY':
         return { cocktails: [], loading: false }

      case 'SET_SEARCHTERM':
         return { ...state, searchTerm: action.payload }


      case 'ADD_TO_FAVORITES':
         return { ...state, favorites: [action.payload, ...state.favorites] } //mora da ima i spread za da nadopolnuva na vekje stavenite inaku samo po eden ke saocuvuva vo LS i ke go menja da e toj kliknatiot

      case "REMOVE_FROM_FAVORITES":
         return {
            ...state,
            favorites: state.favorites.filter(fav => fav.id !== action.payload)
            //Ova filter znaci sporedi id na filmovite sto se vo watchlist arrayot so toa sto vleguva kkao payload i vrati gi tocnite ravenstva a tie ke bidat site drugi filmovi koi imaat razlicno id , i so toa sme go trgnale selektiraniot koj ima isto id
            //VIP ovde za razlika od gore posto imame vlezen parametar id vo metodot vo context dovolno e smao action.payload posto toa e samoto id 
         }
      case 'CLEAR_FAVORITES_CART':
         return { ...state, favorites: [] } //vrati ni gi site props kako sto se vo context.js, smeni go samo favorites vo prazen array.

      default:
         return state;

   }
}

export default reducer