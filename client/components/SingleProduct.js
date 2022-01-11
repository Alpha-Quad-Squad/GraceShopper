import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct"




const SingleProduct = (props) => {

    const dispatch = useDispatch();
    const productId = props.match.params.productId;

    useEffect(() => {
        dispatch(fetchSingleProduct(productId))
    }, [])

    const product = useSelector((state) => {
        return state.singleProduct
    })

    const addToCart = () => {
        
    }

    return (
        <>
            <div>
                <p>{product.name}</p>
                <div>
                    <img src={product.imageUrl} />
                    <div>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <button onClick={addToCart} >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct

