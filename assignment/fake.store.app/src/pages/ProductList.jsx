// src: src/pages/ProductList.jsx

import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProducts, getProductsByCategory } from "../firebase/productsCRUD";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = selectedCategory === "all" 
        ? await getProducts() 
        : await getProductsByCategory(selectedCategory);
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  // Extract categories dynamically from products
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getProducts();
      const uniqueCategories = ["all", ...new Set(data.map(p => p.category))];
      setCategories(uniqueCategories);
    };

    fetchCategories();
  }, []);

  if (loading) return <Spinner animation="border" />;

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
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Products */}
      <Row>
        {products.map(product => (
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
                <Link to={`/edit-product/${product.id}`}>
                  <Button variant="outline-primary" size="sm" className="m-1">
                    Edit
                  </Button>
                </Link>
                <Link to={`/products/${product.id}`}>
                  <Button variant="outline-success" size="sm" className="m-1">
                    View
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
