import React, { useEffect, useState } from 'react';
import style from './CategoryRelated.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import SearchProducts from '../SearchProducts/SearchProducts';
import Loading from '../ui/Loading';
import Heading from '../ui/Heading';




export default function ProductsRelatedByCategory({ categoryName }) {
  let [getData, setgetData] = useState([]);
  const [loading, setLoading] = useState(true);



  async function getProducts() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      setgetData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);




  return (
    <>
      <Heading titlePage={`${categoryName} Category`} />
      {
        loading ?
          (<Loading />)
          :
          (
            <div className="w-full flex flex-wrap gap-y-4 justify-center overflow-hidden pt-5">
              {SearchProducts(getData, categoryName)}
            </div>
          )
      }
      <div className="flex justify-center">
        <div className="flex gap-3 py-10 w-full md:w-3/4 md:text-xl">
          <div className="flex-1">
            <Link to='/products'>
              <button className="btn py-2 px-5 w-full ">Back to all products</button>
            </Link>
          </div>
          <div className="flex-1">
            <Link to='/cart'>
              <button className="btn py-2 px-5 w-full ">Go to basket <i class="fa-solid fa-cart-shopping"></i></button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

