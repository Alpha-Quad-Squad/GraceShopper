import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getInventoryItems } from '../store/ManyProdReducer';
import SingleProductSnapshot from './SingleProductSnapshot';

const ManyProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const items = useSelector((state) => state.inventoryItems);
  const dispatch = useDispatch();

  console.log(items)

  const getItems = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await dispatch(getInventoryItems());
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [dispatch, setError, setLoading]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  if (error) {
    return (
      <div>
        <h3>Something went wrong! But dont't worry, it's me not you.</h3>
      </div>
    );
  };

  if (loading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  };

  return (
    <div id='manyProductsContainer'>
      <h1>Our Book Collection</h1>
      <div className='itemListContainer'>
        {items.map((item) => (
          <div className='itemLists' key={item.id}>
            <Link to={`/products/${item.id}`}>
              <SingleProductSnapshot itemData={item} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManyProducts;
