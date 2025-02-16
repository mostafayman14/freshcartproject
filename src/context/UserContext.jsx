import axios from "axios";
import { use, useEffect, useState } from "react";
import { createContext } from "react";



export let userContext = createContext();

export default function UserContextProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [userToken, setuserToken] = useState(null);
    let [cartUser, setCartUser] = useState(null);
    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            setuserToken(localStorage.getItem('userToken'));

        }

    }, [])

    async function checkoutInfo(id) {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
            // console.log(data);
            setCartUser(data);


        } catch (error) {
            console.log(error);

        }
        setLoading(false);
    }

    return (
        <>
            <userContext.Provider value={{ userToken, setuserToken, checkoutInfo, loading ,cartUser }}>
                {children}
            </userContext.Provider>
        </>
    )
};