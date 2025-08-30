// src/pages/ProductList.jsx

import { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Container, Row, Col, Card, Spinner, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

// Fetch categories
const fetchCategories = async () => {
  const res = await axios.get('https://fakestoreapi.com/products/categories');
  return res.data;
};

// Fetch products (all or by category)
const fetchProducts = async (category) => {
  const url =
    category && category !== 'all'
      ? `https://fakestoreapi.com/products/category/${category}`
      : 'https://fakestoreapi.com/products';
  const res = await axios.get(url);
  return res.data;
};

function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const dispatch = useDispatch();

  // Load categories
  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Load products based on category
  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => fetchProducts(selectedCategory),
  });

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Product Listing</h2>

      {/* Category Dropdown */}
      <Form.Group className="mb-4">
        <Form.Label>Filter by Category</Form.Label>
        <Form.Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Products */}
      {loadingProducts || loadingCategories ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: '300px', objectFit: 'contain' }}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>

                  {/* View Details navigates */}
                  <Link to={`/products/${product.id}`}>
                    <Button variant="outline-primary" size="sm"> View Details </Button>
                  </Link>

                  {/* Add to Cart dispatches */}
                  <Button variant="outline-success" size="sm" className="ms-2" onClick={() => dispatch(addToCart(product))}> Add to Cart </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ProductList;
