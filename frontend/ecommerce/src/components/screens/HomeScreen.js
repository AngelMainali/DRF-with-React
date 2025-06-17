import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../Product';
import { listProducts } from '../../actions/productActions';
import Message from '../Message';
import Loader from '../Loader';




function HomeScreen() {
  const dispatch = useDispatch();

  // get product list from redux store
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h2 className="my-3">Product List</h2>
      {loading ? (
        <Loader/>
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
