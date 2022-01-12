import React, {useState} from 'react';

// const dummyData = {
//   itemImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
//   name: 'How To Become Awesome',
//   author: 'Mars DeMartian',
//   price: 14.99
// };

const SingleProductSnapshot = (props) => {
  // const [itemInfo, setItemInfo] = useState(dummyData);

  return (
    <div className='snapshot'>
      <img width ='175' height='200' id='snapshotImage' src={props.itemData.itemImage} />
      <div className='itemDescription'>
        <h4>{props.itemData.name}</h4>
        <h5>By {props.itemData.author}</h5>
        <p>${props.itemData.price}</p>
      </div>
    </div>
  );
};

export default SingleProductSnapshot;
