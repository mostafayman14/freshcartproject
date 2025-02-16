import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../context/UserContext'
export default function Register() {

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nama is required").min(3, 'min is 3').max(15, 'max is 15'),
    email: Yup.string().required("Email is required").email('Invalid Email'),
    password: Yup.string().required("Password is required").matches(/^[A-Z]\w{5,15}$/, 'Password is not valid'),
    rePassword: Yup.string().required("rePassword should matches with password").oneOf([Yup.ref('password')]),
    phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}/, 'We need Egyption Number'),
  })
let {setuserToken} = useContext(userContext);
  const [sendData, setSendData] = useState(false)
  const [errorSUbmit, setErrorSUbmit] = useState(null)
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate();

  async function register(values) {
    try {
      setLoading(true);
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      { data && setSendData(true); }
      setErrorSUbmit(null);
      navigate('home');
      localStorage.setItem('userToken' , data.token)
      setuserToken(data.token);
    } catch (error) {
      setErrorSUbmit(error.response.data.message);
    }
    setLoading(false);
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    }, validationSchema
    , onSubmit: register
  })

  return <>
    <h2>Register</h2>
    <form class="md:w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
      {errorSUbmit &&
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {errorSUbmit}
        </div>
      }
      <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="name" id="name" value={sendData ? formik.initialValues.name : formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
        <label for="name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Enter Your Name</label>
      </div>
      {formik.errors.name && formik.touched.name &&
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.name}
        </div>
      }
      <div class="relative z-0 w-full mb-5 group">
        <input type="email" name="email" id="email" value={sendData ? formik.initialValues.email : formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
        <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Enter Your Email</label>
      </div>
      {formik.errors.email && formik.touched.email &&
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.email}
        </div>
      }
      <div class="relative z-0 w-full mb-5 group">
        <input type="tel" email="phone" id="phone" value={sendData ? formik.initialValues.phone : formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
        <label for="phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Enter Your Phone</label>
      </div>
      {formik.errors.phone && formik.touched.phone &&
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.phone}
        </div>
      }
      <div class="relative z-0 w-full mb-5 group">
        <input type="password" name="password" id="password" value={sendData ? formik.initialValues.password : formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
        <label for="password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Enter Your Password</label>
      </div>
      {formik.errors.password && formik.touched.password &&
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.password}
        </div>
      }
      <div class="relative z-0 w-full mb-5 group">
        <input type="password" name="rePassword" id="rePassword" value={sendData ? formik.initialValues.rePassword : formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
        <label for="rePassword" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Enter Your Repassword</label>
      </div>
      {formik.errors.rePassword && formik.touched.rePassword &&
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.rePassword}
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
