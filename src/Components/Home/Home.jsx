import React from 'react'
import style from './Home.module.css'
import Products from '../Products/Products'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
  
  return <>
  <MainSlider/>
  <CategorySlider/>
    <Products />
  </>
}
