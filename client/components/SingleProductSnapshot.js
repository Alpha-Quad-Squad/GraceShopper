import React from "react";
import './singleProductSnapshot.css'

const SingleProductSnapshot = (props) => {

  return (
    <div className="snapshot">
      <img
        width="175"
        height="200"
        id="snapshotImage"
        src={props.itemData.itemImageUrl}
      />
      <div className="itemDescription">
        <p>{props.itemData.itemName}</p>
        <p>$ {props.itemData.itemPrice}</p>
      </div>
    </div>
  );
};

export default SingleProductSnapshot;
