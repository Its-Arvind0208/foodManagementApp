import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const AppContext = createContext()

const allMealUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const singleMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
const getFavoritesFromLocaLStorage=()=>{
    let favorites=localStorage.getItem('favorites')
    if(favorites){
        favorites=JSON.parse(localStorage.getItem('favorites'))
    }
    else{favorites=[]}
    return favorites
}

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [meals, setMeals] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [showModel, setShowModel] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [favourites, setFavourites] = useState(getFavoritesFromLocaLStorage())

    const fetchMeal = async (url) => {
        setLoading(true)
        try {
            const { data } = await axios.get(url)
            if (data.meals)
                setMeals(data.meals)
            else {
                setMeals([])
            }

        } catch (error) {
            console.log(error.response);
        }
        setLoading(false)
    }
    const fetchRandomMeal = () => {
        fetchMeal(singleMealUrl)
    }

    const selectMeal = (idMeal, favouriteMeal) => {

        let meal
        if(favouriteMeal){
            meal=favourites.find((meal)=>meal.idMeal===idMeal)
        }
        else{
            meal = meals.find((meal) => meal.idMeal === idMeal)
        }
        setSelectedMeal(meal)
        setShowModel(true)
    }

    const closeModel = () => {
        setShowModel(false)
    }


    const addToFavourites = (idMeal) => {
        const alreadyFavourites = favourites.find((meal) => meal.idMeal === idMeal)
        if (alreadyFavourites) return
        const meal = meals.find((meal) => meal.idMeal === idMeal)
        const updatedFavourites = [...favourites, meal]
        setFavourites(updatedFavourites)
        localStorage.setItem('favorites',JSON.stringify(updatedFavourites))
    }

    const removeFromFavourites = (idMeal) => {
        const updatedFavourites = favourites.filter((meal) => meal.idMeal !== idMeal)
        setFavourites(updatedFavourites)
        localStorage.setItem('favorites',JSON.stringify(updatedFavourites))

    }

    useEffect(() => {
        fetchMeal(allMealUrl)
    }, [])

    useEffect(() => {
        if (!searchTerm) return
        fetchMeal(`${allMealUrl}${searchTerm}`)
    }, [searchTerm])




    return (
        <>
            <AppContext.Provider value={{ loading, meals, setSearchTerm, fetchRandomMeal, showModel, selectMeal, selectedMeal, closeModel,favourites,addToFavourites,removeFromFavourites}}>
                {children}
            </AppContext.Provider>
        </>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }