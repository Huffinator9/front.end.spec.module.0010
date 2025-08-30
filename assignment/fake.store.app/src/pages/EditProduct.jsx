// src: src/pages/EditProduct.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { updateProduct, deleteProduct } from "../firebase/productsCRUD";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ title: "", price: "", description: "", category: "", image: "" });

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setProduct(docSnap.data());
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateProduct(id, { ...product, price: parseFloat(product.price) });
    alert("Product updated!");
    navigate("/");
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await deleteProduct(id);
    alert("Product deleted!");
    navigate("/");
  };

  return (
    <Container className="mt-4">
      <h2>Edit Product</h2>
      <Form onSubmit={handleUpdate}>
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
        <Button type="submit" className="me-2">Update Product</Button>
        <Button variant="danger" onClick={handleDelete}>Delete Product</Button>
      </Form>
    </Container>
  );
}

export default EditProduct;
