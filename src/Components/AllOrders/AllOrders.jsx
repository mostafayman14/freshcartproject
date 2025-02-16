import React, { useContext, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { userContext } from '../../context/UserContext';
import Heading from '../ui/Heading';
import Loading from '../ui/Loading';
import { Accordion } from "flowbite-react";



export default function AllOrders() {
  const headers = {
    token: localStorage.getItem('userToken')
  }
  const decodedToken = jwtDecode(headers.token);
  console.log(decodedToken.id);

  const { checkoutInfo, loading, cartUser } = useContext(userContext);
  useEffect(() => {
    checkoutInfo(decodedToken.id);
  }, [decodedToken.id])



  return <>
<Heading titlePage={'All Orders'}/>

    <Accordion className='mt-5 border-2'>
      {
        cartUser?.map((cart, index) =>
          <Accordion.Panel>
            <Accordion.Title>
              <div  className="flex justify-between items-center w-full text-base md:text-2xl lg:text-3xl text-gray-700">
                <div className=''>
                  <p>Qty: <span className='font-bold text-gray-500'>{cart?.cartItems.length}</span> Product</p>
                  <p>Total Price: <span className='font-bold text-gray-500'>{cart?.totalOrderPrice}</span> EGP</p>
                </div>
                <div className=''>
                  <p>Paided by: <span className='font-bold text-gray-500'>{cart.paymentMethodType}</span></p>
                  <p>Date: <span className='font-bold text-gray-500'>{cart.createdAt.toString().slice(0,10)}</span></p>
                </div>
              </div>
            </Accordion.Title>
            <Accordion.Content>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
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
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Toatal Price
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      cart?.cartItems?.map((CartItem, index) =>
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
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {CartItem.price} EGP
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">

                              <div>
                                <span className=""  >
                                  {CartItem.count}
                                </span>
                              </div>

                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {CartItem.price * CartItem.count} EGP
                          </td>

                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
        )
      }

    </Accordion>
  </>
}
