import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { initContentHeight } from "../../utils/setContentHeight"; // ✅ 추가
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {

    useEffect(() => {
        const cleanup = initContentHeight();
        return cleanup;
    }, []);

    return (
        <footer className="bg-dark text-light py-4 mt-auto">
            <Container>
                <Row className="align-items-center text-center text-md-start">
                <Col md={6}>
                    <h6 className="mb-0">© 2025 My React App</h6>
                    <small>All rights reserved.</small>
                </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
