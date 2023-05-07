import React, { useState, useEffect } from 'react';
import {Button, Table, Form, Stack} from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter} from 'react-bootstrap';
import {Link} from "react-router-dom";



function ViewCompany() {
    const [data, setData] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [type, setType] = useState(1);
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);
    const fetchData = () =>  {
        fetch('/api/get_company/1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((data) =>{
                setData(data)})
            .catch((e) => console.log(e));
    }
    const handleClose = () => setShow(false);
    const handleShow = (type, company) => {
        setSelectedCompany(company);
        setType(type)
        setShow(true);
    };

    const CompanyDetail = () => {
        return (
            <>
            <h5>{selectedCompany.company_name}</h5>
        {/* Display other company details here */}
        <p>עיר: {selectedCompany.city}</p>
        <p>עיר: {selectedCompany.zip_code}</p>
        <p>עיר: {selectedCompany.street}</p>
        <p>עיר: {selectedCompany.house_number}</p>
        <p>עיר: {selectedCompany.email}</p>
        <p>עיר: {selectedCompany.phone}</p>
        <p>עיר: {selectedCompany.mobile}</p>
        <p>עיר: {selectedCompany.fax}</p>
            </>
        )
    }

    const MangersDetail = () => {
        const [mangers, setMangers] = useState([]);
        const [reload, setReload] = useState(true);
        const [newManger, setNewManger] = useState([]);

        useEffect( () => {
            fetch(`/api/get_mangers/${selectedCompany.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((m) =>{
                    setReload(false);
                    setMangers(m)})
                .catch((e) => console.log(e));

        }, [reload]);

        const handleInputChange = (e, index) => {
            const { value, name } = e.target;
            setNewManger(prevData => {
                const newData = [...prevData];
                newManger[index][name] = value;
                return newData;
            });
        };
        const handleAddRow = () => {
            setNewManger(prevData => {
                const newRow = { first_name: '', last_name: '',manger_id: '', address: '', remarks: '' };
                return [...prevData, newRow];
            });
        };

        const handleSave = () => {
            fetch('/api/add_mangers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ company: selectedCompany.id, Manager: newManger })
            })
                .then((res) => res.json())
                .then((res) =>{
                    setNewManger([])
                    setReload(true);
                })
                .catch((e) => console.log(e));
        }

        return (
            <>
                <h1>מנהלים</h1>
                <Table className='striped bordered hover'>
                    <thead>
                    <tr>
                        <th>שם פרטי</th>
                        <th>שם משפחה</th>
                        <th>ת״ז</th>
                        <th>כתובת</th>
                        <th>הערות</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mangers.map((row, index) => (
                        <tr key={row.id}>
                            <td>{row.first_name}</td>
                            <td>{row.last_name}</td>
                            <td>{row.manger_id}</td>
                            <td>{row.address}</td>
                            <td>{row.remarks}</td>
                        </tr>
                    ))}
                    {newManger.map((row, index) => (
                        <tr key={row.id}>
                                <td>
                                    <input type="text" name='first_name' value={row.first_name} onChange={e => handleInputChange(e, index)}
                                    className="form-control" />
                                </td>
                                <td>
                                    <input type="text" name='last_name' value={row.last_name} onChange={e => handleInputChange(e, index)}
                                           className="form-control" />
                                </td>
                                <td>
                                    <input type="text" name='manger_id' value={row.manger_id} onChange={e => handleInputChange(e, index)}
                                           className="form-control" />
                                </td>
                                <td>
                                    <input type="text" name='address' value={row.address} onChange={e => handleInputChange(e, index)}
                                           className="form-control" />
                                </td>
                                <td>
                                    <input type="text" name='remarks' value={row.remarks} onChange={e => handleInputChange(e, index)}
                                           className="form-control" />
                                </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Stack direction="horizontal" gap={2}>
                    <Button onClick={handleAddRow}>הוסף</Button>
                    <Button onClick={handleSave}>שמור</Button>
                </Stack>

            </>
        );
    }

    function ShowModal() {
        if (!selectedCompany) {
            return null;
        }
        return (
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    <ModalTitle>פרטי החברה</ModalTitle>
                </ModalHeader>
                <ModalBody dir="rtl" className="container-fluid" style={{ maxHeight: '50vh', overflowY: 'scroll' }}>
                    <div className="table-responsive">
                        {type === 1 ? <CompanyDetail /> : <MangersDetail />}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
      <>
          <h1> חברות </h1>
          <Table striped bordered hover variant="dark">
            <thead>
                  <tr>
                        <th>#</th>
                        <th>שם החברה</th>
                        <th>מנהלים</th>
                        <th>פרטי החברה</th>
                  </tr>
            </thead>
          <tbody>
                {data.map( line => {
                    return(
                       <tr key={line.id}>
                           <td> {line.id} </td>
                           <td> {line.company_name} </td>
                           <td> <Link  onClick={() => handleShow(2, line)}>צפייה</Link> </td>
                           <td> <Link  onClick={() => handleShow(1, line)}>צפייה</Link> </td>
                       </tr>
                    )
                })}
          </tbody>
          </Table>
          <ShowModal />
      </>
    );
}

export default ViewCompany;