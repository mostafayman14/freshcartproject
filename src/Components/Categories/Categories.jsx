import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import { increase, decrease, increaseByAmount } from '../../redux/counterSlice'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Loading from '../ui/Loading';
import Heading from '../ui/Heading';
import { Link } from 'react-router-dom';
import ProductsInSpecificCategories from '../productsInSpecificCategories/productsInSpecificCategories';


export default function Categories() {

  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(true)


  async function Allcategory() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategory(data.data)
      setLoading(false);
      localStorage.setItem('categoryName' , category.name);
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    Allcategory();
  }, [])

  return <>
    <Heading titlePage='Categories' />
    {

      loading ? <Loading /> :
        <div className="flex flex-wrap gap-5 justify-center  pt-10">
          {
            category.map((category, index) => <>

              <div className="w-3/4 md:w-2/5 lg:w-1/4">
                <Link to={`/categories/${category._id}`}>
                  <div key={index} className='w-full border-2 rounded-lg overflow-hidden'>
                    <img className='w-full h-[250px] xl:h-[350px] object-cover object-top' src={category.image} alt="" />
                    <h4 className='py-5 text-center text-xl font-semibold hover:text-main'>{category.name}</h4>
                  </div>
                </Link>
              </div>
            </>
            )
          }
        </div>

    }

  </>


}

// let dispatch = useDispatch();

// let { count, userName } = useSelector((store) => store.counter)
// return <>
//   <h2>Categories {count} </h2>
//   <button onClick={() => dispatch(increase())}>increase</button>
//   <button onClick={() => dispatch(decrease())}>decrease</button>
//   <button onClick={() => dispatch(increaseByAmount(10))}>increaseByAmount</button>
// </>