import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SingleProductSnapshot from './SingleProductSnapshot';

const dummyData = [
  {
  id: 1,
  itemImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
  name: 'How To Become Awesome',
  author: 'Mars DeMartian',
  price: 14.99
  },
  {
  id: 2,
  itemImage: 'https://m.media-amazon.com/images/I/41gr3r3FSWL.jpg',
  name: 'How To Become Awesome',
  author: 'Mars DeMartian',
  price: 32.99
  },
  {
  id: 3,
  itemImage: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564',
  name: 'How To Become Awesome',
  author: 'Mars DeMartian',
  price: 9.99
  },
  {
  id: 4,
  itemImage: 'https://images-platform.99static.com//6ELqOlDZNAkWKAlKTT3XjDPSZ_c=/fit-in/590x590/projects-files/83/8342/834261/bc96e38c-765d-4031-a33f-b03eb49bca14.jpg',
  name: 'How To Become Awesome',
  author: 'Mars DeMartian',
  price: 24.99
  },
  {
  id: 5,
  itemImage: 'https://www.theyoungfolks.com/wp-content/uploads/2017/08/six-of-crows.jpg',
  name: 'How To Become Awesome',
  author: 'Mars DeMartian',
  price: 49.99
  },
  {
  id: 6,
  itemImage: 'https://microlancer.lancerassets.com/v2/services/9d/759cf0433411e695bffb04eef0d615/large__original_Spirit_s-Voice-Gothic-Book-Cover.jpg',
  name: 'How To Become Awesome',
  author: 'Mars DeMartian',
  price: 18.99
  },
  {
  id: 7,
  itemImage: 'https://www.adobe.com/express/create/cover/media_19e51036164ee5d6d263b7cd50578765583ffc3f2.jpeg?width=400&format=jpeg&optimize=medium',
  name: 'How To Become Awesome',
  author: 'Mars DeMartian',
  price: 89.99
  },
  {
  id: 8,
  itemImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUiPGYANIq5JLuOUHEEQbK4pPRG2wKgLrhDNHnbMF6v7os1Rg5QT5INmOt7GSG211-iB8&usqp=CAU',
  name: 'How To Become Awesome',
  author: 'Mars DeMartian',
  price: 44.99
  },
  {
  id: 9,
  itemImage: 'https://m.media-amazon.com/images/I/513J3iCksDL.jpg',
  name: 'How To Become Awesome',
  author: 'Mars DeMartian',
  price: 4.99
  },
  {
  id: 10,
  itemImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmD1v3g2gACOW7k3Q7XemLnYnOwD6ePlis7_kpVXqXLAB_nQ2KwEWKit5Dwn29zEHfj9g&usqp=CAU',
  name: 'How To Become Awesome',
  author: 'Mars DeMartian',
  price: 62.99
  },

];

const ManyProducts = (props) => {
  const [items, setItems] = useState(dummyData);
  return (
    <div id='test'>
    <div id='manyProductsContainer'>
      <h1>Books</h1>
      <div className='itemListContainer'>
        {items.map((item) => (
          <div className='itemLists' key={item.id}>
            <SingleProductSnapshot itemData={item} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ManyProducts;
