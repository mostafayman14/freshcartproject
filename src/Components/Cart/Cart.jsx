import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../context/CartContext';
import Loading from '../ui/Loading';
import Heading from '../ui/Heading';
import { Link } from 'react-router-dom';

export default function Cart() {
  let { cart, loading, UpdateCart, DeleteProductFromCart } = useContext(CartContext);





  return <>
    <Heading titlePage='Cart' />    {loading ? <Loading /> :

      <>

        {<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-16 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                cart.data.products.map((CartItem, index) =>
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="p-4">
                      <img src={CartItem.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {CartItem.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button onClick={() => { UpdateCart(CartItem.count - 1, CartItem.product._id, index) }} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>
                        <div>
                          <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  >
                            {CartItem.count}
                          </span>
                        </div>
                        <button onClick={() => { UpdateCart(CartItem.count + 1, CartItem.product._id, index) }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {CartItem.price * CartItem.count} EGP
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => { DeleteProductFromCart(CartItem.product._id) }} className="font-medium bg-transparent hover:bg-transparent  text-red-600 dark:text-red-500 hover:underline">Remove</button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        }
        <div className="flex justify-around items-center overflow-x-auto shadow-md sm:rounded-lg mt-5 p-5">
          <div className='text-lg md:text-2xl text-main'>
            {
              cart?.numOfCartItems > 0 ? <p> <span className=''>Total Price for <span className="font-bold">{cart.numOfCartItems}</span> items:</span> {cart?.data.totalCartPrice} EGP</p>
                : <span className=''>ooops! your cart is empty, Let's go shopping. </span>
            }
          </div>
          {cart?.numOfCartItems > 0 ? <Link to={`/checkout`}>
            <button className='btn py-3 md:py-5 text-lg font-bold'>Proceed to Checkout</button>
          </Link>
            : <Link to={`/products`}>
              <button className='btn py-3 md:py-5 text-lg font-bold'>Shopping Now</button>
            </Link>}
        </div>
      </>
    }

  </>
}
