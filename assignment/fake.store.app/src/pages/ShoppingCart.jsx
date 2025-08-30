// src: src/pages/ShoppingCart.jsx

import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { removeFromCart, clearCart } from '../store/cartSlice';

function ShoppingCart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // total items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // total price
  const totalPrice = items
    .reduce((sum, item) => sum + item.quantity * item.price, 0)
    .toFixed(2);

  const handleCheckout = () => {
    alert('Checkout successful! Your cart has been cleared.');
    dispatch(clearCart());
    sessionStorage.removeItem('cart');
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Shopping Cart</h2>

      {items.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <Row>
            {items.map((item) => (
              <Col key={item.id} md={6} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ height: '200px', objectFit: 'contain' }}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      Price: ${item.price} <br />
                      Quantity: {item.quantity} <br />
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </Card.Text>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="mt-4 text-center">
            <h4>Total Items: {totalItems}</h4>
            <h4>Total Price: ${totalPrice}</h4>
            <Button variant="success" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default ShoppingCart;
