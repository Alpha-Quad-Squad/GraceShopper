import React from "react";
import './singleProductSnapshot.css'

const SingleProductSnapshot = (props) => {
  const { itemImageUrl, itemName, itemPrice } = props.itemData;
  const refactoredPrice = (itemPrice / 100).toFixed(2);

  return (
    <div className="snapshot">
      <img
        width="175"
        height="200"
        id="snapshotImage"
        src={itemImageUrl}
      />
      <div className="itemDescription">
        <p>{itemName}</p>
        <p>$ {refactoredPrice}</p>
      </div>
    </div>
  );
};

export default SingleProductSnapshot;
