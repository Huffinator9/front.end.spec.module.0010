// src: src/pages/Cart.jsx

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { Container, Row, Col, Button, Form, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';

function Cart() {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    dispatch(clearCart());
    setCheckoutSuccess(true);
  };

  return (
    <Container className="mt-4">
      <h2>Shopping Cart</h2>

      {checkoutSuccess && <Alert variant="success">Checkout complete! Cart cleared.</Alert>}

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td><img src={item.image} alt={item.title} style={{ height: '50px' }} /></td>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>
                    <Form.Control
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) }))
                      }
                      style={{ width: '70px' }}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button variant="danger" onClick={() => dispatch(removeFromCart(item.id))}>
                      X
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Row className="mt-3">
            <Col><h4>Total Items: {totalItems}</h4></Col>
            <Col><h4>Total Price: ${totalPrice}</h4></Col>
          </Row>

          <Button className="mt-3" variant="success" onClick={handleCheckout}>
            Checkout
          </Button>
        </>
      )}
    </Container>
  );
}

export default Cart;
