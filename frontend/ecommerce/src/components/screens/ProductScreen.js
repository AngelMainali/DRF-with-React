// src/screens/ProductScreen.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Spinner, Alert } from 'react-bootstrap';

const BASE_URL = 'http://127.0.0.1:8000';

function ProductScreen() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${BASE_URL}/api/product/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" /> Loading...</div>;
  }

  if (error) {
    return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;
  }

  return (
    <Container className="py-4">
      <Card>
        <Card.Img
          variant="top"
          src={`${BASE_URL}${product.image}`}
          alt={product.product_name}
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{product.product_name}</Card.Title>
          <Card.Text>
            <strong>Brand:</strong> {product.product_brand} <br />
            <strong>Category:</strong> {product.product_category} <br />
            <strong>Info:</strong> {product.product_info} <br />
            <strong>Rating:</strong> {product.rating} ⭐ <br />
            <strong>Price:</strong> Rs. {product.price} <br />
            <strong>Stock:</strong> {product.stock_count > 0 ? 'Available' : 'Out of Stock'}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductScreen;
