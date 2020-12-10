import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import * as OrderActions from '../../actions/order.actions.js'


import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import history from '../../history.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHardHat, faEnvelope, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

import * as OrderReducer from '../../reducers/orders.reducer.js'

import Spinner from '../shared/Spinner.js';

export default function OrdersTable({ tableSize, mode = 'Table' }) {
    const orders = useSelector(OrderReducer.getOrders)
    const isLoading = useSelector(OrderReducer.getIsLoading)
    const dispatch = useDispatch()

    // useEffect(() => {
    // }, [dispatch])


    if (isLoading && orders.length > 0 || orders.length === 0) {
        return (
            <div className="container-lg py-4 p-0 text-center">
                <Spinner />
            </div>
        )
    }

    if (orders.length === 0 && !isLoading) {
        return <div className="not-found-table-items">No se encontraron ordenes</div>
    }

    const getStatus = (status) => {
        switch (status) {
            case 1:
                return "Creada"

            case 2:
                return "En preparación"

            default:
                return "Finalizada"
        }
    }

    return (
        <Container fluid={true} className="my-3">
            <Row xs={1} md={5} className="justify-content-center" >
                {
                    orders.map(item => (
                        <Col key={item.id} className="p-0 m-3">
                            <Card className="shadow">
                                <Card.Header className='card-title  card-hearder  d-flex justify-content-between  align-items-center'>
                                    <span>Orden {item.id}</span>
                                    <span>{getStatus(item.status_id)}</span>
                                </Card.Header>
                                <Card.Body className="d-flex justify-content-center p-0 m-3">
                                    <NavLink to={`/orders/detail/${item.id}`} className="nav-link">
                                        <button
                                            className="btn btn-primary"
                                        >
                                            Ver detalle
                                    </button>
                                    </NavLink>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}

