import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card } from 'react-bootstrap';

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <h2 className="my-3">Product List</h2>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card className="p-3">
              <Card.Body>
                <Card.Title>{product.product}</Card.Title>
                <Card.Text>
                  Category: {product.category} <br />
                  Price: Rs. {product.price}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeScreen;
