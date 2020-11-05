import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import * as utils from '../../utils.js'
import Spinner from '../shared/Spinner.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import history from '../../history.js'

import * as TableReducer from '../../reducers/tables.reducer.js'

function StatusCheck({ item }) {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => TableReducer.getIsLoadingById(state, item.id))

    function toggle() {
        const status = item.status ? 'No disponible' : 'Disponible'
        // dispatch(UserActions.updateUserStatus(item.id, status))
    }

    let label = item.status ? 'No disponible' : 'Disponible'

    if (isLoading) {
        label = 'Actualizando...'
    }

    return (
        <Form.Check
            type="switch"
            className="user-status-check"
            disabled={isLoading}
            id={`sw-${item.id}`}
            label={label}
            checked={!item.status}
            onChange={() => toggle()}
        />
    )
}

export default function SuppliesTable() {
    const tables = useSelector(TableReducer.getTables)
    const isLoading = useSelector(TableReducer.getIsLoading)


    if (isLoading) {
        return (
            <div className="container-lg py-4 p-0 text-center">
                <Spinner />
            </div>
        )
    }

    if (tables.length === 0) {
        return <div className="not-found-table-items">No se encontraron mesas</div>
    }


    return (
        <Container fluid={true} className="my-3">
            <Row xs={1} md={5} className="justify-content-center" >
                {
                    tables.map(item => (
                        <Col key={item.id} className="p-0 m-3">
                            <Card className="shadow">
                                <Card.Header className='card-title  card-hearder'>
                                    <span>Mesa {item.number}</span>
                                </Card.Header>
                                <Card.Body className="p-0 m-3">
                                    <StatusCheck item={item} />
                                    <FontAwesomeIcon icon={faUser} />
                                    <span className="ml-2" >Ocupado por: Nadie </span>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }

                <Col className="p-0 m-3">
                    <Card className="shadow">
                        <Card.Header className="card-title card-hearder d-flex justify-content-between align-items-center">
                            <span>Crear mesa</span>
                            <button
                                className="btn btn-light btn-sm"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </Card.Header>
                        <Card.Body className="p-0 m-3">
                            <StatusCheck item={{}} />
                            <FontAwesomeIcon icon={faUser} />
                            <span className="ml-2" >Ocupado por:  </span>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
    //   return (
    //     <table className={`table table-striped table-bordered table-hover mb-0`} >
    //       <thead>
    //         <tr>
    //           {
    //             headersData.map(item => (
    //               <th key={item.field}>{item.label}</th>
    //             ))
    //           }
    //         </tr>
    //       </thead>

    //       <tbody>
    //         {
    //             //   tables.map(item => (
    //             //     <tr key={item.id}>
    //             //       {/* <td>*</td> */}
    //             //       <td><Link to={"/tables/" + item.id + "/edit"}>{item.name}</Link></td>
    //             //       <td>{item.description}</td>
    //             //       <td>{item.quantity}</td>
    //             //       <td>{item.modicum}</td>
    //             //     </tr>
    //             //   ))
    //             }
    //       </tbody>
    //     </table>
    //   )
}