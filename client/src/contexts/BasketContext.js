import { createContext, useContext, useEffect, useState } from "react";


const BasketContext = createContext()

const defaultBAsket = JSON.parse(localStorage.getItem("basket")) || []

const BasketProvider = ({children}) => {
    const [items, setItems] = useState(defaultBAsket)

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(items))
    }, [items])


    const addToBasket = (data, findBasketItem) => {
        if(!findBasketItem){
            return setItems((prev) => [...prev, data])
        }

        const filtered = items.filter(item => item._id !== findBasketItem._id)
        setItems(filtered)
    }

    const removeFromBasket = (item_id) => {
        const filtered = items.filter(item => item._id !== item_id)
        setItems(filtered)
    }

    const emptyBasket = ( ) => {
        setItems([])
    }

    const values = {
        items,
        setItems,
        addToBasket,
        removeFromBasket,
        emptyBasket
    }

    return <BasketContext.Provider  value={values} > {children} </BasketContext.Provider>
}


const useBaskets = () => useContext(BasketContext)

export {BasketProvider, useBaskets}