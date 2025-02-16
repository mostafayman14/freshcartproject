import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishListContext';

export default function Navbar() {
  let { userToken, setuserToken } = useContext(userContext);
  let { cart } = useContext(CartContext);
  let { wishlistProducts } = useContext(WishlistContext);

  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function logOut() {
    setuserToken(null);
    localStorage.removeItem('userToken');
    navigate('login');
  }

  return <>

    <header className="bg-white  fixed inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">

        <Link to={'/'} className="lg:pe-4">
          <span className="sr-only">Your Company</span>
          <img className="" src={logo} width={120} alt />
        </Link>
        <div onClick={() => setIsOpen(true)} className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-transparent hover:bg-gray-100">
            <span className="sr-only">Open main menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        {
          userToken && <div className="hidden lg:flex   lg:gap-x-10 capitalize">

            <NavLink to={'/'} className="text-lg w-fit font-medium text-gray-900 ">home</NavLink>
            <NavLink to={'cart'} className="relative text-lg w-fit font-medium text-gray-900 ">
              Cart
              <span class="sr-only"></span>
              <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-main border-2 border-white rounded-full -top-2 -end-6 dark:border-gray-900">{cart?.numOfCartItems}</div>

            </NavLink>
            <NavLink to={'wishlist'} className="relative text-lg w-fit font-medium text-gray-900 ">
              Wishlist
              <span class="sr-only"></span>
              <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-main border-2 border-white rounded-full -top-2 -end-6 dark:border-gray-900">{wishlistProducts?.count}</div>

            </NavLink>
            <NavLink to={'brands'} className="text-lg w-fit font-medium text-gray-900 ">brands</NavLink>
            <NavLink to={'categories'} className="text-lg w-fit font-medium text-gray-900 ">categories</NavLink>
            <NavLink to={'products'} className="text-lg w-fit font-medium text-gray-900 ">products</NavLink>
          </div>
        }
        <div className="hidden lg:flex  lg:justify-end space-x-3">

          {userToken ?
            <span className=" font-medium text-gray-900 hover:cursor-pointer" onClick={() => logOut()}>Log Out <i class="fa-solid fa-arrow-right-from-bracket"></i></span>
            : <>
              <NavLink to={'register'} className=" font-medium text-gray-900">Register</NavLink>
              <NavLink to={'login'} className=" font-medium text-gray-900">Login <span aria-hidden="true">→</span></NavLink>

            </>}
        </div>
      </nav>
      {/* Mobile menu, show/hide based on menu open state. */}
      <div className={isOpen ? "lg:hidden" : "hidden" } role="dialog" aria-modal="true">
        {/* Background backdrop, show/hide based on slide-over state. */}
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink onClick={() => {setIsOpen(false)}} to={'/'} className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="" src={logo} width={120} alt />
            </NavLink>
            <button onClick={() => setIsOpen(false)} type="button" className="-m-2.5  bg-transparent hover:bg-gray-100 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {userToken && <div className="space-y-2 py-6">

                <NavLink onClick={() => {setIsOpen(false)}} to={'/'} className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50  after:h-0 ">home</NavLink>
                <NavLink onClick={() => {setIsOpen(false)}} to={'cart'} className="relative block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50  after:h-0 ">
                  cart
                  <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-main border-2 border-white rounded-full -top-2 start-7 dark:border-gray-900">{cart?.numOfCartItems}</div>
                </NavLink>
                <NavLink onClick={() => {setIsOpen(false)}} to={'wishlist'} className="relative block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50  after:h-0 ">
                  Wishlist
                  <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-main border-2 border-white rounded-full -top-2 start-15 dark:border-gray-900">{wishlistProducts?.count}</div>
                </NavLink>
                <NavLink onClick={() => {setIsOpen(false)}} to={'brands'} className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50  after:h-0 ">brands</NavLink>
                <NavLink onClick={() => {setIsOpen(false)}} to={'categories'} className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50  after:h-0 ">categories</NavLink>
                <NavLink onClick={() => {setIsOpen(false)}} to={'products'} className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50  after:h-0 ">products</NavLink>
              </div>}
              <div className="py-6">
                {userToken ?
                  <span onClick={() => logOut()} className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50 hover:cursor-pointer">Log Out</span>

                  : <div>
                    <NavLink to={'register'} className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50">Register</NavLink>
                    <NavLink to={'login'} className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50">Log in <span aria-hidden="true">→</span></NavLink>

                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

  </>
}
