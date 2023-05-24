import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";

import Product from "../components/Product";
import { getProducts } from "../redux/actions/productAction";

const Home = () => {
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? <h2>Loading...</h2> : error ? <h3>{error}</h3> : null}
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
