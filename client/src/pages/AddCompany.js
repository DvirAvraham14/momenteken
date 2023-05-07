import React, { useState } from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";


const init = {
    c_name: '',
    c_city: '',
    c_zip: '',
    c_street: '',
    c_house_number: '',
    c_email: '',
    c_phone: '',
    c_mobile: '',
    m_preffix: '',
    c_fax: ''
}
function AddCompany() {
    const [formData, setFormData] = useState(init)

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData( prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let isFormValid = true;
        Object.values(formData).forEach((val) => {
            if (val === '')
                isFormValid = false;
        });
        if (isFormValid) {
            fetch('/api/add_company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((e) => console.log(e));
        }
    };

    return (
      <>
          <Form onSubmit={handleSubmit} method="POST">
              <Row>
                  <Col sm={12}>
                      <Form.Group>
                          <Form.Label>שם החברה</Form.Label>
                          <Form.Control type="text" name="c_name" value={formData.c_name} onChange={handleChange} />
                      </Form.Group>
                  </Col>
              </Row>
              <Row>
                  <Col md={6}>
                      <Form.Group>
                          <Form.Label>עיר</Form.Label>
                          <Form.Control type="text" name="c_city" value={formData.c_city} onChange={handleChange} />
                      </Form.Group>
                  </Col>
                  <Col md={6}>
                      <Form.Group>
                          <Form.Label>מיקוד</Form.Label>
                          <Form.Control type="text" name="c_zip" value={formData.c_zip} onChange={handleChange} />
                      </Form.Group>
                  </Col>
              </Row>
              <Row>
                  <Col md={6}>
                      <Form.Group>
                          <Form.Label>רחוב</Form.Label>
                          <Form.Control type="text" name="c_street" value={formData.c_street} onChange={handleChange} />
                      </Form.Group>
                  </Col>
                  <Col md={6}>
                      <Form.Group>
                          <Form.Label>מס׳ בית</Form.Label>
                          <Form.Control type="text" name="c_house_number" value={formData.c_house_number} onChange={handleChange} />
                      </Form.Group>
                  </Col>
              </Row>
              <Row>
                  <Col sm={12}>
                      <Form.Group>
                          <Form.Label>עיר</Form.Label>
                          <Form.Control type="email" name="c_email" value={formData.c_email} onChange={handleChange} />
                      </Form.Group>
                  </Col>
              </Row>
              <Row>
                  <Col md={4}>
                      <Form.Group>
                          <Form.Label>מס׳ טלפון</Form.Label>
                          <Form.Control type="text" name="c_phone" value={formData.c_phone} onChange={handleChange} />
                      </Form.Group>
                  </Col>
                  <Col md={4}>
                      <Row>
                          <Col sm={ { span: 4, order: 1} }>
                              <Form.Group>
                                  <Form.Label>קידומת</Form.Label>
                                  <Form.Select name="m_preffix" value={formData.m_preffix} onChange={handleChange} >
                                      <option></option>
                                      <option>050</option>
                                      <option>052</option>
                                      <option>053</option>
                                      <option>054</option>
                                  </Form.Select>
                              </Form.Group>
                          </Col>
                          <Col sm={8}>
                              <Form.Group>
                                  <Form.Label>מס׳ נייד</Form.Label>
                                  <Form.Control type="text" name="c_mobile" value={formData.c_mobile} onChange={handleChange} />
                              </Form.Group>
                          </Col>
                      </Row>
                  </Col>
                  <Col md={4}>
                      <Form.Group>
                          <Form.Label>פקס</Form.Label>
                          <Form.Control type="text" name="c_fax" value={formData.c_fax} onChange={handleChange} />
                      </Form.Group>
                  </Col>
              </Row>
              <Row className="mt-4">
                  <Button type="submit">שלח</Button>
              </Row>
          </Form>
      </>
    );
}

export default AddCompany;