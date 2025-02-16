import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const headers = {
        token: localStorage.getItem('userToken')
    }

    async function AddToCart(productId) {
        try {
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, { headers })
            setCart(data)
            DisplayCart();
            toast.success(data.message)

        } catch (error) {
            console.log(error);

        }
    }


    async function DisplayCart() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers })
            setCart(data);
            setLoading(false);


        } catch (error) {
            console.log(error);

        }
    }


    async function UpdateCart(count, id) {
        try {
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { 'count': count }, { headers })
            setCart(data);

            toast.success(data.status)



        } catch (error) {
            console.log(error);

        }
    }
    async function DeleteProductFromCart(id) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,  { headers })
            setCart(data);
            console.log(data);
            toast.success(data.status)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        DisplayCart();
    }, [])

    return <CartContext.Provider value={{ AddToCart, cart, loading, UpdateCart , DeleteProductFromCart  }}>
        {children}
    </CartContext.Provider>
}