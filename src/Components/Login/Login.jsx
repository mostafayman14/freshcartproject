import React, { useContext } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/UserContext';

export default function Login() {

  let { setuserToken } = useContext(userContext);
  const [sendData, setSendData] = useState(false)
  const [errorSUbmit, setErrorSUbmit] = useState(null)
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate();

  async function register(values) {
    try {
      setLoading(true);
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      { data && setSendData(true); }
      setErrorSUbmit(null);
      navigate('/home');
      localStorage.setItem('userToken', data.token);
      setuserToken(data.token);

    } catch (error) {
      setErrorSUbmit(error.response.data.message);
    }
    setLoading(false);
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required("Password is required").matches(/^[A-Z]\w{5,15}$/, 'Password is not valid'),

  });

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, validationSchema
    , onSubmit: register
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
        <input type="email" name="email" id="email" value={sendData ? formik.initialValues.email : formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer" placeholder=" " required />
        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
      </div>
      {formik.errors.email && formik.touched.email &&
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.email}
        </div>
      }
      <div className="relative z-0 w-full mb-5 group">
        <input type="password" name="password" id="password" value={sendData ? formik.initialValues.password : formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer" placeholder=" " required />
        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      </div>
      {formik.errors.password && formik.touched.password &&
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.password}
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
