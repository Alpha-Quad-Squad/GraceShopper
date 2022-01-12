import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { addItem, incrementItem } from "../store/cart";

let product = {
  id: 4,
  itemName: "Super Great Book",
  itemDescription: "This is the such a beautiful book by a great author",
  itemPrice: 12.99,
  itemImageUrl:
    "https://purepng.com/public/uploads/large/purepng.com-booksbookillustratedwrittenprintedliteratureclipart-1421526451707uyace.png",
};

const SingleProduct = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.productId;

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);

  //   const product = useSelector((state) => {
  //     return state.singleProduct;
  //   });

  const cart = useSelector((state) => {
    return state.cart;
  });

  const addToCart = () => {
    //check if the item is in the cart already
    let inCart = false;
    cart.forEach((item) => {
      if (product.id === item.id) {
        inCart = true;
      }
    });
    if (inCart) {
      //if it in the cart, increment its qty in the store.
      dispatch(incrementItem(product));
    } else {
      //if it is not in the cart add it to the cart in the store (with qty 1)
      dispatch(addItem(product));
    }
  };

  return (
    <>
      <div>
        <p>{product.itemName}</p>
        <div>
          <img src={product.itemImageUrl} />
          <div>
            <p>{product.itemDescription}</p>
            <p>{product.itemPrice}</p>
            <button onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;