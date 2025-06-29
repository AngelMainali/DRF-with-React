import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Container, Spinner, Alert, Button, Row, Col } from 'react-bootstrap';
import Rating from '../Rating';
import axios from 'axios';

function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError('');
        const { data } = await axios.get(`http://127.0.0.1:8000/api/product/${id}`);
        setProduct(data);
      } catch (err) {
        setError(
          err.response && err.response.data.detail
            ? err.response.data.detail
            : err.message
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    alert('Added to cart!');
  };

  return (
    <Container className="py-4">
      <Button variant="dark" onClick={() => navigate(-1)} className="mb-3">
        ← Go Back
      </Button>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" /> Loading...
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : product ? (
        <Row>
          <Col md={6}>
            <Card>
              <Card.Img
                variant="top"
                src={`http://127.0.0.1:8000${product.image}`}
                alt={product.product_name}
                style={{ height: '100%', objectFit: 'cover' }}
              />
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-3">
              <Card.Body>
                <Card.Title as="h3">{product.product_name}</Card.Title>
                <Card.Text className="mt-3">
                  <strong>Brand:</strong> {product.product_brand} <br />
                  <strong>Category:</strong> {product.product_category} <br />
                  <strong>Info:</strong> {product.product_info} <br />
                  <strong>Rating:</strong>{' '}
                  <Rating value={product.rating} text={`${product.num_reviews} reviews`} /> <br />
                  <strong>Price:</strong> Rs. {product.price} <br />
                  <strong>Stock:</strong>{' '}
                  {product.stock_count > 0 ? 'Available' : 'Out of Stock'}
                </Card.Text>

                <Button
                  variant="primary"
                  onClick={handleAddToCart}
                  disabled={product.stock_count === 0}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}

export default ProductScreen;
