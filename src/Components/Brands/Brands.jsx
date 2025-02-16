import React, { useEffect } from 'react'
import style from './Brands.module.css'
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Heading from '../ui/Heading';

export default function Brands() {
  const [brands, setBrands] = useState(null);
  const [loading, setLoading] = useState(true);
  async function allBrands() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
      setLoading(false);



    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    allBrands();
  }, [])
  return <>
    <Heading titlePage='Brands' />
    {loading ?
      (<i class="fa-solid fa-spinner fa-spin text-2xl flex justify-center items-center "></i>)
      :
      (
        <div className="flex flex-wrap justify-around">
          {
            brands.map((item, i) =>
              <div className='w-[10rem] md:w-[12rem] lg:w-[16rem] xl:w-[18rem]' key={i}>
                <Link to={`/brands/${item._id}`}>
                  <div key={i} className=''>
                    <div className='w-full'>
                      <img src={item.image} alt="" />
                    </div>
                  </div>
                </Link>
              </div>
            )
          }
        </div>
      )
    }
  </>
}
