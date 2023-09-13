import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsByCategory } from '../actions/productActions';
import { Col, Row } from 'react-bootstrap';
import Product from './Product';
import Paginate from './Paginate';

const CategoryProductList = ({ match }) => {
  const category = match.params.category;
  const dispatch = useDispatch();

  const productListCategory = useSelector((state) => state.productListCategory);
  const { page, pages, loading, error, products } = productListCategory;

  useEffect(() => {
    dispatch(listProductsByCategory(category));
  }, [dispatch, category]);

  return (
    <>
      <h1>{category} Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />

                </Col>
              );
            })}
          </Row>
          <Paginate page={page} pages={pages} />
        </div>
      )}

    </>
  );
};

export default CategoryProductList;
