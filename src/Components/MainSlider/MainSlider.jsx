import React from 'react'
import style from './MainSlider.module.css'
import staticImg1 from '../../assets/images/staticImg1.jpg'
import staticImg2 from '../../assets/images/staticImg2.jpg'
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'
import Slider from 'react-slick'


export default function MainSlider() {
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
    responsive: [
      {
        breakpoint: 1024,
        settings: {

          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {

          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {

          dots: false
        }
      }
    ]
  };

  return <>

    <div className='lg:flex items-center mb-12'>
      <div className="lg:w-2/3 xl:w-3/4 mb-5 lg:m-0">
        <Slider {...settings}>

          <img className='object-cover  object-right w-full lg:h-[600px] ' src={slider1} alt='Image1' />
          <img className='object-cover object-right w-full lg:h-[600px] ' src={slider2} alt='Image1' />
          <img className='object-cover object-right w-full lg:h-[600px] ' src={slider3} alt='Image1' />

        </Slider>
      </div>
      <div className='md:flex lg:block lg:w-1/3 xl:w-1/4 lg:h-[600px]'>
        <img className='w-full md:w-1/2 lg:w-full lg:h-1/2' src={staticImg1} alt="" />
        <img className='w-full md:w-1/2 lg:w-full lg:h-1/2' src={staticImg2} alt="" />
      </div>
    </div>


  </>
}
