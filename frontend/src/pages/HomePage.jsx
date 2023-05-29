import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";

import Product from "../components/Product";
import { getProducts } from "../redux/feature/product/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Home = () => {
  const { products, loading, error } = useSelector(
    (state) => state.products
  );
  console.log(products );
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : null}
      <Row>
        {products?.data?.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
       </Row>
    </>
  );
};

export default Home;
