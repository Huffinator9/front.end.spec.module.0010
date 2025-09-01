// src: src/pages/AddProduct.jsx

import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { addProduct } from "../firebase/productsCRUD";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [product, setProduct] = useState({ title: "", price: "", description: "", category: "", image: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct({ ...product, price: parseFloat(product.price) });
    alert("Product added!");
    navigate("/"); // redirect to product listing
  };

  return (
    <Container className="mt-4">
      <h2>Add Product</h2>
      <Form onSubmit={handleSubmit}>
        {["title", "price", "description", "category", "image"].map(field => (
          <Form.Group className="mb-3" key={field}>
            <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
            <Form.Control
              type={field === "price" ? "number" : "text"}
              name={field}
              value={product[field]}
              onChange={handleChange}
              required
            />
          </Form.Group>
        ))}
        <Button type="submit">Add Product</Button>
      </Form>
    </Container>
  );
}

export default AddProduct;
