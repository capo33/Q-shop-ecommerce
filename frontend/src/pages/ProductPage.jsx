import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

import Rating from "../components/Rating";
import { getProductDetails } from "../redux/feature/product/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../redux/actions/cartAction";

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const { product, loading, error } = useSelector((state) => state.products);
  const { data } = product;

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [id, dispatch]);

  const addTocartHandler = () => {
    dispatch(addToCart(id, qty));
    navigate(`/cart/${id}?qty=${qty}`);
  };
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image
              src={data?.image}
              alt={data?.name}
              fluid // fluid keeps the image inside the container
            />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{data?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={data?.rating}
                  text={`${data?.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${data?.price}</ListGroup.Item>
              <ListGroup>Description: {data?.description}</ListGroup>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>¨
                    <Col>
                      <strong>${data?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {data?.data?.countInStock > 0
                        ? "In Stock"
                        : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product?.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {/* 
                        1- creates an array of numbers from 0 to countInStock
                        2- we use Array.from() to create an array from the array-like object 
                         */}
                          {[...Array(product?.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <Button
                  className='btn btn-block m-3'
                  type='button'
                  disabled={data?.data?.countInStock === 0}
                  onClick={addTocartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductPage;
