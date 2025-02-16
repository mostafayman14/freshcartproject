import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishListContext";

export default function SearchProductsByBrand(getData, searctitle) {
  let { AddToCart } = useContext(CartContext)
  let { AddToWishlist, wishlist, DeleteProductFromWishlist } = useContext(WishlistContext);


  console.log(wishlist);

  return (getData
    .filter((prod) => prod.brand.name.includes(searctitle))
    .map((item) => (
      <div key={item.id} className="w-1/6">
        <div className="product rounded-xl p-2">
          <Link to={`/productdetails/${item.id}`}>
            <img className="w-full" src={item.imageCover} alt={item.title} />
            <div className="px-4 py-2">
              <h3 className="text-main">{item.category.name}</h3>
              <h3 className="font-semibold">{item.title.split(' ', 2).join(' ')}</h3>
              <div className="flex justify-between font-semibold text-gray-600 py-6">
                <p>{item.price} EGP</p>
                <span>
                  <i className="fa-solid fa-star rating-color"></i> {item.ratingsAverage}
                </span>
              </div>
            </div>
          </Link>
          <div className="flex">
            <button onClick={() => { AddToCart(item.id) }} className="btn w-full">Add to cart</button>
            {
              wishlist?.data.join('').includes(item.id) ?
                <i onClick={() => DeleteProductFromWishlist(item.id)} className={`fa-solid fa-heart  flex items-center text-red-600 hover:cursor-pointer`}></i>
                :
                <i onClick={() => AddToWishlist(item.id)} className={`fa-regular fa-heart  flex items-center hover:cursor-pointer`}></i>
            }
          </div>
        </div>
      </div>
    )))
}
