import React, { useContext } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';

export default function CheckOut() {

  const [sendData, setSendData] = useState(false)
  const [errorSUbmit, setErrorSUbmit] = useState(null)
  const [loading, setLoading] = useState(false)

  const url = 'https://mostafayman14.github.io/freshcartproject/#';
  const headers = {
    token: localStorage.getItem('userToken')
  }

  const { cart } = useContext(CartContext);
  console.log(cart);


  async function checkoutInfo(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}`, { 'shippingAddress': values }, {headers, params: { url } });
      { data && setSendData(true); }
      setErrorSUbmit(null);
      console.log(data);
      window.open(data.session.url);


    } catch (error) {
      setErrorSUbmit(error.response.data.message);
    }
    setLoading(false);
  }

  const validationSchema = Yup.object().shape({
    datails: Yup.string(),
    city: Yup.string(),
    phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}/, 'We need Egyption Number'),

  });

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    }, validationSchema
    , onSubmit: checkoutInfo
  })


  return <>
    <h2>Login</h2>


    <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
      {errorSUbmit &&
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {errorSUbmit}
        </div>
      }
      <div className="relative z-0 w-full mb-5 group">
        <input type="details" name="details" id="details" value={sendData ? formik.initialValues.details : formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer" placeholder=" " required />
        <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
      </div>
      {formik.errors.details && formik.touched.details &&
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.details}
        </div>
      }
      <div className="relative z-0 w-full mb-5 group">
        <input type="tel" name="phone" id="phone" value={sendData ? formik.initialValues.phone : formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer" placeholder=" " required />
        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone</label>
      </div>
      {formik.errors.phone && formik.touched.phone &&
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.phone}
        </div>
      }
      <div className="relative z-0 w-full mb-5 group">
        <input type="city" name="city" id="city" value={sendData ? formik.initialValues.city : formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer" placeholder=" " required />
        <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city</label>
      </div>
      {formik.errors.city && formik.touched.city &&
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.city}
        </div>
      }
      {
        loading ? <button type="button" class="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">
          <i className='fas fa-spinner fa-spin'></i>
        </button> :
          <button type="submit" class="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Submit</button>

      }
    </form>


  </>
}
