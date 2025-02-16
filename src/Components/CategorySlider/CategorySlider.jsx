import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios'
import Slider from 'react-slick';
import Loading from '../ui/Loading';

export default function CategorySlider() {
  var settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(true)


  async function categorySlide() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategory(data.data)
      setLoading(false);
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    categorySlide();
  }, [])




  return <>

    {loading ? <Loading /> : <div className='mt-5 mb-20'>
      <Slider className='' {...settings}>
        {category.map((category, index) =>
          <>
            <img className='h-[200px] w-full object-fill object-top ' src={category.image} alt={index} />
            <h3 className='font-bold text-xl py-2'>{category.name}</h3>
          </>
        )
        }
      </Slider>
    </div>}
  </>
}