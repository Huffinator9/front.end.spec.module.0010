// src/components/NavigationBar.jsx

import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavigationBar() {
    const items = useSelector((state) => state.cart.items);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    
    return (
	<Navbar bg="dark" variant="dark" expand="lg">
	    <Container>
		<Navbar.Brand as={Link} to="/"> NWStore </Navbar.Brand>
		<Navbar.Toggle aria-controls="main-navbar-nav" />
		<Navbar.Collapse id="main-navbar-nav">
		    <Nav className="me-auto">
			<Nav.Link as={Link} to="/"> Home </Nav.Link>
{/*			<Nav.Link as={Link} to="/products"> Products </Nav.Link>*/}
			<Nav.Link as={Link} to="/add-product"> Add Product </Nav.Link>
			<Nav.Link as={Link} to="/cart"> Cart ({totalItems}) </Nav.Link>
		    </Nav>
		</Navbar.Collapse>
	    </Container>
	</Navbar>
    );
}

export default NavigationBar;
