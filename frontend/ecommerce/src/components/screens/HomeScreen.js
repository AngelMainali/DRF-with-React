import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../Product';
import axios from 'axios';
import Message from '../Message';
import Loader from '../Loader';

function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError('');
        const { data } = await axios.get('http://127.0.0.1:8000/api/products');
        setProducts(data);
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

    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="my-3">Product List</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
