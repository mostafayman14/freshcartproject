import React, { useContext, useEffect } from 'react'
import style from './Wishlist.module.css'
import Loading from '../ui/Loading'
import Heading from '../ui/Heading'
import { WishlistContext } from '../../context/WishListContext';
import { CartContext } from '../../context/CartContext';

export default function Wishlist() {
  let { AddToWishlist, loading, wishlistProducts, DisplayWishlist, wishlist, DeleteProductFromWishlist } = useContext(WishlistContext);
  let { AddToCart } = useContext(CartContext);

  useEffect(() => {
    DisplayWishlist();
  }, [wishlistProducts?.count])

  console.log(wishlistProducts);

  return <>
    <Heading titlePage='Wishlist' />    {loading ? <Loading /> :

      <>

        {<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          
            <tbody className='w-full'>
              {
                wishlistProducts.data.map((wishListItem, index) =>
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                     
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <div className='flex items-center gap-5 '>
                          <img className='w-20 md:w-44 max-w-full max-h-full' src={wishListItem.imageCover} alt="" />
                          <div className="flex flex-col">
                            <h3 className=' md:text-xl font-medium'>{wishListItem.title.split(' ', 4).join(' ')}</h3>
                            <h3 className='text-main text-base md:text-lg font-medium'>{wishListItem.price} EGP</h3>
                            <button onClick={() => { DeleteProductFromWishlist(wishListItem._id) }} className="flex justify-start font-medium bg-transparent hover:bg-transparent  text-red-600 dark:text-red-500 hover:underline m-0 p-0">Remove</button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <button onClick={() => {AddToCart(wishListItem._id); DeleteProductFromWishlist(wishListItem._id) }} className='btn py-1 md:py-3  md:text-lg font-bold'>Add to Cart</button>
                      </td>
                    </tr>
                )
              }
            </tbody>
          </table>

          {/* {
            wishlistProducts.data.map((wishListItem, index) =>
              <div className="flex items-center justify-around p-5">
                <div className='flex items-center gap-5 '>
                  <img className='w-[30%] md:w-[20%]' src={wishListItem.imageCover} alt="" />
                  <div className="flex flex-col">
                    <h3 className='text-lg md:text-xl font-medium'>{wishListItem.title.split(' ', 4).join(' ')}</h3>
                    <h3 className='text-main text-base md:text-lg font-medium'>{wishListItem.price} EGP</h3>
                    <button onClick={() => { DeleteProductFromWishlist(wishListItem._id) }} className="flex justify-start font-medium bg-transparent hover:bg-transparent  text-red-600 dark:text-red-500 hover:underline m-0 p-0">Remove</button>
                  </div>
                </div>
                <button onClick={() => AddToCart(wishListItem._id)} className='btn py-1 md:py-3 w-[70%] md:w-[15%] md:text-lg font-bold'>Add to Cart</button>
              </div>
            )
          } */}

        </div>
        }

      </>
    }

  </>
}
