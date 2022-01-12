import React, {useState} from 'react';

const dummyData = {
  itemImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
  name: 'How To Become Awesome',
  author: 'Mars DeMartian',
  price: 14.99
};

const SingleProductSnapshot = (props) => {
  const [itemInfo, setItemInfo] = useState(dummyData);

  return (
    <div class='snapshot'>
      <img width ='175' height='200' id='snapshotImage' src={itemInfo.itemImage} />
      <div class='itemDescription'>
        <h4>{itemInfo.name}</h4>
        <h5>By {itemInfo.author}</h5>
        <p>${itemInfo.price}</p>
      </div>
    </div>
  )
}

export default SingleProductSnapshot
