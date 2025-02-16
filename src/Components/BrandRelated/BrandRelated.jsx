import React, { useEffect, useState } from 'react'
import style from './BrandRelated.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SearchProductsByBrand from '../SearchProductsByBrand/SearchProductsByBrand';
import Heading from '../ui/Heading';


export default function BrandRelated() {
  let { id } = useParams();

  const [product, setProduct] = useState(null);
  const [getData, setgetData] = useState([]);
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

  }, [])




  async function getProductrelatedByBrands() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      setProduct(data.data);
      setLoading(false);
     
    } catch (error) {
      console.log(error);

    }

  }

  useEffect(() => {
    getProductrelatedByBrands();

  }, [id])


  return <>
        <Heading titlePage={`Products for ${product?.name}`} />
    {loading ?
      <i class="fa-solid fa-spinner fa-spin text-2xl flex justify-center items-center "></i>
      :
      <div className="w-full flex flex-wrap gap-y-4 justify-center overflow-hidden py-6">
        {SearchProductsByBrand(getData, product.name)}
      </div>
}
  </>
}