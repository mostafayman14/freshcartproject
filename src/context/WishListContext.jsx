import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
    const [wishlist, setWishlist] = useState(null);
    const [wishlistProducts, setWishlistProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [redHeart, setRedHeart] = useState(false);

    const headers = {
        token: localStorage.getItem('userToken')
    }

    async function AddToWishlist(productId) {
        try {
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, { headers })
            console.log(data);
            setWishlist(data);
            setLoading(false);
            toast.success(data.message)

        } catch (error) {
            console.log(error);

        }
    }


    async function DisplayWishlist() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers })
            setWishlistProducts(data);
            setLoading(false);

        } catch (error) {
            console.log(error);

        }
    }
  
    async function DeleteProductFromWishlist(id) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers })
            setWishlist(data);
            DisplayWishlist();
            console.log(data);
            toast.success(data.status)


        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        DisplayWishlist();
    }, [])

    return <WishlistContext.Provider value={{ AddToWishlist ,redHeart ,loading, wishlist,DisplayWishlist ,wishlistProducts, DeleteProductFromWishlist}}>
        {children}
    </WishlistContext.Provider>
}