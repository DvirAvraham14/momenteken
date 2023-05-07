import React, { useState, useEffect } from 'react';
import {Row, Col, Alert, Navbar, Container, Nav,NavDropdown} from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

function Header() {
    return (
        <>
            <Navbar collapseOnSelect sticky="top" fixed="top" expand="md"  bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">מומנטקן</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/"> ראשי </Nav.Link>
                            <NavDropdown title=" צור " id="basic-nav-dropdown">
                                <NavDropdown.Item href="/add_site">פרוייקט חדש</NavDropdown.Item>
                                <NavDropdown.Item href="/add_company">חברה חדשה</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title=" צפה " id="basic-nav-dropdown">
                                <NavDropdown.Item href="/company">חברות</NavDropdown.Item>
                                <Nav.Link href="/view_site">אתרים</Nav.Link>
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Row lg={"10"} md={"10"} sm={"12"}>
                <Col>
                    <Alert variant="info">
                        <Alert.Heading>מומנט טקן - מטלת בית</Alert.Heading>
                        <hr />
                        <p>
                            דימוי מערכת נתונים ליצירת אתרים חדשים והכנסת עובדים לאתר
                        </p>
                    </Alert>
                </Col>
            </Row>
            <Row style={{paddingRight: 2 + 'em', paddingLeft: 2 + 'em'}}>
                <Outlet />
            </Row>

        </>
    );
}

export default Header;
