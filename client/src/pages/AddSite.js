import React, { useState, useRef, useEffect} from "react";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {Form, Row, Col, Button, Table} from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';


function AddSite() {
    const [step, setStep] = useState(1);

    const fetchOptions = async () => {
        try {
            const response = await fetch('/api/get_options');
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch options');
        }
    };

    const Step1 = () => {
        const selectOpt = ['הנדסית', 'ציבורי', 'מגורים', 'תעשיה', 'תמא 38', 'פינוי בינוי', 'שיפוץ', 'תוספת', 'מינהור', 'גשרים'];
        const row = ['job', 'full_name','address', 'inCharge', 'start_date', 'signature'];
        const [subcontractors, setSubcontractors] = useState([]);
        const [promoter, setPromoter] = useState(null);
        const [operator, setOperator] = useState(null);
        const [field, setField] = useState({site_name:'' ,promoter_id: '', operator_id: '',
            operator_stamp: '', operator_signature:'', max_employees: '', work_type: '', contractors: []})

        const [options, setOptions] = useState([]);
        const handleAutoChange = (selected, id) => {
            const selectedId = selected[0] ? selected[0].id : null;
            if (id === "promoter") {
                setPromoter(selected[0].company_name);
                setField((prevField) => ({
                    ...prevField,
                    promoter_id: selectedId,
                }));
            } else {
                setOperator(selected[0].company_name);
                setField((prevField) => ({
                    ...prevField,
                    operator_id: selectedId,
                }));
            }
        };

        useEffect(() => {
            fetchOptions()
                .then((data) => setOptions(data))
                .catch((error) => console.log(error));
        }, []);

        const handleChange = (e) => {
            const {name, value} = e.target;
            setField((prevField) => ({
                ...prevField,
                [name]: value,
            }));
        }
        const handleContractorsChange = (e, index) => {
            const { value, name } = e.target;
            setField((prev) => ({
                ...prev,
                contractors: prev.contractors.map((manager, i) =>
                    i === index ? { ...manager, [name]: value } : manager
                ),
            }));
        };

        const handleAddRow = () => {
            const newRow = { job: '', full_name: '', address: '', inCharge: '', start_date: '', signature: '' };
            setField( (prev) => ({
                ...prev,
                contractors: [...prev.contractors, newRow],
            }))
        };

        const handleSubmit = (e) => {
            e.preventDefault();

            fetch('api/add_site/step1', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(field),
            }).then(res => res.ok ? res.json() : '' )
                .catch(e => console.warn(e));
        }



        return (
            <>
                <Row className="mb-3">
                    <Col>
                        <Typeahead
                            id="promoter"
                            labelKey="company_name"
                            options={options}
                            selected={promoter ? [promoter] : []}
                            onChange={(selected) => handleAutoChange(selected, "promoter")}
                            placeholder="שם היזם"
                        />
                    </Col>
                    <Col>
                        <Typeahead
                            id="operator"
                            labelKey="company_name"
                            options={options}
                            selected={operator ? [operator] : []}
                            onChange={(selected) => handleAutoChange(selected, "operator")}
                            placeholder="שם המבצע"
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Control onChange={handleChange} name="operator_stamp" placeholder="חותמת מבצע" />
                    </Col>
                    <Col>
                        <Form.Control onChange={handleChange} name="operator_signature" placeholder="חתימת מבצע" />
                    </Col>
                </Row>
                <Row className="mb-3" >
                    {selectOpt.map((opt, idx) => {
                        if (idx % 2 === 0) {
                            return (
                                <React.Fragment key={idx}>
                                    <Col md={2}>
                                        <Form.Check
                                            type="radio"
                                            label={opt}
                                            name="work_type"
                                            onChange={handleChange}
                                            id={`option_${idx}`}
                                            value={opt}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Check
                                            type="radio"
                                            label={selectOpt[idx + 1]}
                                            name="work_type"
                                            onChange={handleChange}
                                            id={`option_${idx + 1}`}
                                            value={selectOpt[idx + 1]}
                                        />
                                    </Col>
                                </React.Fragment>
                            );
                        }
                    })}

                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Control onChange={handleChange} name="site_name" placeholder="שם האתר" />
                    </Col>
                    <Col>
                        <Form.Control onChange={handleChange} name="max_employees" placeholder="מספר מרבי של עובדים" />
                    </Col>
                </Row>
                <Row>
                    <span><h2>קבלני משנה</h2></span>
                    <Button onClick={handleAddRow} >הוסף</Button>
                    <Table>
                        <thead>
                        <tr>
                            <th>סוג עבודה</th>
                            <th>שם הקבלן</th>
                            <th>המען</th>
                            <th>שם האחראי</th>
                            <th>תאריך תחילת העבודה</th>
                            <th>חתימה וחותמת</th>
                        </tr>
                        </thead>
                        <tbody>
                        {field.contractors.map((r, index) => (
                            <tr key={index}>
                                {row.map((val, idx) => (
                                    <td key={idx}>
                                        <input
                                            type={val !== "start_date" ? "text" : "date"}
                                            name={val}
                                            value={r[val] || ''}
                                            onChange={(e) => handleContractorsChange(e, index)}
                                            className="form-control"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}

                        </tbody>
                    </Table>
                </Row>
                <Row>
                    <Button type="submit" onClick={handleSubmit}>צור אתר</Button>
                </Row>
            </>
        );
    }

    const Step2 = () => {
        return (
            <>
                <Row>
                    <p><h2>מנהלי עבודה</h2></p>
                    <Button  >הוסף</Button>
                    <Table>
                        <thead>
                        <tr>
                            <th>שם מלא</th>
                            <th>מס׳ זהות</th>
                            <th>המען</th>
                            <th>טלפון</th>
                            <th>תאריך מינוי</th>
                            <th>תאריך סיום תפקיד</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </Table>
                </Row>
            </>
        )
    }

    const Step3 = () => {

        return (
            <>
                <Row>
                    <p><h2>בונים מקצועים</h2></p>
                    <Button  >הוסף</Button>
                    <Table>
                        <thead>
                        <tr>
                            <th>שם מלא</th>
                            <th>מס׳ זהות</th>
                            <th>המען</th>
                            <th>טלפון</th>
                            <th>תפקיד</th>
                            <th>תאריך מינוי</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </Table>
                </Row>
            </>
        )
    }

    const Step4 = () => {
        return (
        <>
            <Row>
                <p><h2>מפעילי מגדלי הרמה</h2></p>
                <Button >הוסף</Button>
                <Table>
                    <thead>
                    <tr>
                        <th>שם מלא</th>
                        <th>מס׳ זהות</th>
                        <th>המען</th>
                        <th>טלפון</th>
                        <th>תפקיד</th>
                        <th>תאריך מינוי</th>
                        <th>חתימה</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </Table>
            </Row>
        </>
            )
    }

    const Step5 = () => {
        return (
            <>
                <Row>
                    <p><h2>מפעלי מכונות הרמה</h2></p>
                    <Button  >הוסף</Button>
                    <Table>
                        <thead>
                        <tr>
                            <th>שם מלא</th>
                            <th>מס׳ זהות</th>
                            <th>המען</th>
                            <th>טלפון</th>
                            <th>תפקיד</th>
                            <th>תאריך מינוי</th>
                            <th>חתימה</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </Table>
                </Row>
            </>
        )
    }

    const PageView = () => {
        switch (step){
            case 1:
                return <Step1 />;
            case 2:
                return <Step2 />;
            case 3:
                return <Step3 />;
            case 4:
                return <Step4 />;
            case 5:
                return <Step5 />;
            default:
                return <Step1 />
        }
    }
    return (
        <>
            <Form>
                <PageView />
            </Form>
        </>
    );
}

export default AddSite;