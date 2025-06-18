import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';

const BASE_URL = 'http://127.0.0.1:8000';

function Product({ product }) {
  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card className="p-3">
        <Card.Img
          variant="top"
          src={`${BASE_URL}${product.image}`}
          alt={product.product_name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{product.product_name}</Card.Title>
          <Card.Text>
            Brand: {product.product_brand} <br />
            Price: Rs. {product.price} <br />
            <Rating value={product.rating} text={`${product.num_reviews} reviews`} /> <br />
            In Stock: {product.stock_count > 0 ? 'Yes' : 'Out of Stock'}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default Product;
