import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <Row className="w-100 justify-content-center">
            <Col className="text-center">
                <h1 className="display-1">404</h1>
                <p className="lead mb-5">העמוד אינו קיים</p>
                <Link to="/">חזרה לעמוד הבית</Link>
            </Col>
        </Row>
    );
};

export default NotFoundPage;
