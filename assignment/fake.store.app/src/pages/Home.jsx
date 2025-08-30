// src/pages/Home.jsx

import { Container, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ProductList from './ProductList'

function Home() {
    const navigate = useNavigate();

    return (
	<Container className="text-center mt-4">
	    <Row className="justfy-content-md-center">
		<Col md="8">
		    <h1> Welcome to the Newly Winged Store Page </h1>
		    <p className="lead">
			Browse our wide array of available products.
		    </p>
		    {/*<Button variant="outline-primary" size="lg" onClick={() => navigate('/products')}>
		   	View Products
		    </Button> */}
		    <ProductList />
		</Col>
	    </Row>
	</Container>
    );
}

export default Home
