import React, { useEffect, useState } from 'react'
import style from './ProductsInSpecificCategories.module.css'
import { useParams } from 'react-router-dom'
import ProductsRelatedByCategory from '../categoryRelated/ProductsRelatedByCategory';
import axios from 'axios';
import Loading from '../ui/Loading';

export default function ProductsInSpecificCategories() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  async function getProductDetails() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
      setProduct(data.data);
      setLoading(false);


    } catch (error) {
      console.log(error);

    }

  }

  useEffect(() => {
    getProductDetails();

  }, [id])

  return <>
    {loading?<Loading/> :
      <ProductsRelatedByCategory categoryName={product?.name} />
    }

  </>
}
