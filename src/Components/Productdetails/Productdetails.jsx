import React, { useContext, useState } from 'react'
import style from './Productdetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import Slider from "react-slick";
import CategoryRelated from '../categoryRelated/ProductsRelatedByCategory';
import Products from '../Products/Products';
import ProductsRelatedByCategory from '../categoryRelated/ProductsRelatedByCategory';
import { CartContext } from '../../context/CartContext';
import Loading from '../ui/Loading';
import { WishlistContext } from '../../context/WishListContext';

export default function Productdetails() {
  var settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnFocus: true,
  };
  let { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  let { AddToCart } = useContext(CartContext);

  let { AddToWishlist, redHeart, wishlist, DeleteProductFromWishlist } = useContext(WishlistContext);


  async function getProductDetails() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProduct(data.data);
      setLoading(false);


    } catch (error) {
      console.log(error);

    }

  }

  useEffect(() => {
    getProductDetails();

  }, [id])

  useEffect(() => {
    window.scrollTo(
      {
        top: 0,
        behavior: 'smooth'
      }
    ); // Scroll to the top of the page
  }, [id]);


  return <>
    {loading ?
      <Loading />
      :
      <>
        <div className="flex flex-col md:flex-row justify-center items-center gap-x-32 pb-10">
          <div className='w-3/4 md:w-1/3 lg:w-1/4 pb-10'>
            <Slider className='p-5' {...settings}>
              {product.images.map((image, index) => <img src={image} alt={index} />)}
            </Slider>
          </div>
          <div className="md:w-2/3 lg:w-3/4">
            <p className='font-bold text-2xl'>{product.title}</p>
            <p className='text-gray-500 py-2 text-lg'>{product.description}</p>
            <span>{product.category.name}</span>
            <div className="flex justify-between py-1 text-xl px-4">
              <span>{product.price} EGP</span>
              <span><i className="fas fa-star rating-color"></i> {product.ratingsAverage} </span>
            </div>
            <div className="flex px-4 gap-2 ">
              <button onClick={() => AddToCart(product.id)} className='btn w-full'>Add to cart</button>
              {
                wishlist?.data.join('').includes(product.id) ?
                  <i onClick={() => DeleteProductFromWishlist(product.id)} className={`fa-solid fa-heart  flex items-center text-red-600 hover:cursor-pointer`}></i>
                  :
                  <i onClick={() => AddToWishlist(product.id)} className={`fa-regular fa-heart  flex items-center hover:cursor-pointer`}></i>

              }
            </div>
          </div>
        </div>
        <ProductsRelatedByCategory categoryName={product.category.name} />
      </>
    }
  </>
}