import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg"

const Footer = () => {
  const links = [
    [{ head: "Quick Links:" }],
    [{ name: "- Cart", href: "/cart" },
    { name: "- Wishlist", href: "/wishlist" },
    { name: "- Brands", href: "/brands" },
    { name: "- Categories", href: "/categories" },
    { name: "- Products", href: "/products" }
    ]
  ];
  const contact = [
    [{ head: "Contact Us:" }],
    [
      { icon: "fa-solid fa-phone-volume", title: "Phone", data_title: "01069721978" },
      { icon: "fa-regular fa-envelope", title: "Mail", data_title: "mostafa.maksoudaa@gmail.com" }
    ]
  ];


  return (
    <footer className="bg-gray-300 text-gray-800 pt-6">
      <div className="brLine container px-5 lg:py-12 md:py-8  flex justify-evenly md:items-center lg:items-start md:flex-row  flex-wrap flex-col">
        <div className="md:w-80 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link to={'/'} className="flex title-font font-medium items-center sm:justify-start md:justify-center pt-3 pb-6 md:p-0">
            <img
              alt="Your Company"
              src={logo}
              className="sm:w-60 md:w-72   "
            />
          </Link>
        </div>
        {Array(1)
          .fill("")
          .map((_, index) => (
            <div key={index} className="lg:w-1/4 md:w-1/2 w-full px-4 text-center ">

              <div className="text-">
                {links[0].map((item, i) => (
                  <h2 key={i} className="title-font text-left md:text-center xl:text-3xl lg:text-2xl sm:text-xl  font-bold leading-8 text-[--color-primary] tracking-widest  mb-4">
                    {item.head}
                  </h2>
                ))}
              </div>
              <nav className="list-none mb-10 text-left md:text-center md:flex flex-col items-center">
                <div className="text-left">
                  {links[1].map((item, i) => (
                    <li key={i} className="">
                      <Link
                        to={item.href}
                        className="sm:text-lg md:text-xl  font-medium leading-10 text-[--color-gray]"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </div>
              </nav>
            </div>
          ))}
        {/* Contact US */}
        {Array(1)
          .fill("")
          .map((_, index) => (
            <div key={index} className="lg:w-1/4 md:w-1/2 w-full px-4 text-center">

              {contact[0].map((item, i) => (
                <h2 key={i} className="title-font  xl:text-3xl text-left  lg:text-2xl sm:text-xl font-bold leading-8  tracking-widest  mb-4">
                  {item.head}
                </h2>
              ))}
              <nav className="list-none mb-10  flex flex-col justify-between ">
                {contact[1].map((item, i) => (
                  <li key={i}>
                    <div className=" flex items-center mb-6">
                      <div className="border-2 border-[#414143] rounded-full  lg:w-12 lg:h-12 md:w-10 md:h-10 w-8 h-8 flex justify-center items-center duration-500  ">
                        <i className={`${item.icon}  lg:text-2xl md:text-lg text-sm  duration-500  px-10`}></i>
                      </div>
                      <div className="flex flex-col text-left pl-3 md:text-xl text-m font-medium  ">
                        <h3>{item.title}</h3>
                        <p>{item.data_title}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </nav>
            </div>
          ))}
      </div>




      <div className="border-t-2 border-gray-500 ">
        <div className="md:container md:mx-auto py-4 px-5 flex flex-wrap flex-col-reverse xl:flex-row justify-center items-center">
          <p className="sm:text-sm md:text-base text-center  sm:mt-4 md:mt-0 text-[--color-gray]">
            © 2025 Made By Mostafa Ayman.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


