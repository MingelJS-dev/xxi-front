import React, { useEffect, useState, useContext } from 'react';
import { CurrentSettingContext } from '../../App.js'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSupplieById } from '../../reducers/supplies.reducer.js'

import * as OrderActions from '../../actions/order.actions.js'
import * as OrderReducer from '../../reducers/orders.reducer.js'

import * as TableActions from '../../actions/tables.actions.js'
import * as TableReducer from '../../reducers/tables.reducer.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Spinner from '../shared/Spinner.js';
import Header from "../shared/Header.js"

export default function DetailOrderPage() {
    const dispatch = useDispatch()
    const params = useParams()
    // const orders = useSelector(OrderReducer.getOrders)
    const details = useSelector(OrderReducer.getOrderDetails)

    useEffect(() => {
        dispatch(OrderActions.fetchDetails(params.OrderId))
        dispatch(OrderActions.fetchOrders())
        dispatch(TableActions.fetchTables())
    }, [dispatch, params.OrderId])

    const currentOrder = useSelector(state => OrderReducer.getOrderById(state, params.OrderId))
    const currentTable = useSelector(state => TableReducer.getTableById(state, currentOrder && currentOrder.table_id))
    if (!currentOrder || !currentTable) {
        return (
            <Spinner full={true} />
        )
    }


    const getTotal = () => {
        let total = 0
       details.map( x => total += x.price)

       return total
    }
    console.log(details)
    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header
                    title="Detalle orden"
                    items={[
                        { label: "Listado de ordenes", to: "/orders" },
                        { label: "Detalle orden" }
                    ]}
                >
                </Header>
            </Row>
            <Row className="mb-2">
                <Col className="col-12 p-0 mb-2 col-lg-12 pr-lg-2">
                    <Card className="shadow">
                        <Card.Header className="text-white font-weight-bold bg-dark d-flex justify-content-between">Datos de orden
                        </Card.Header>
                        <Card.Body>
                            <Row className="d-flex justify-content-center">
                                <Col>
                                    <div className="form-group">
                                        <label className="form-label font-weight-bold">Orden</label>
                                        <p>{currentOrder.id}</p>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label font-weight-bold">Mesa</label>
                                        <p>Número {currentTable.number}</p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <label className="form-label font-weight-bold">Creada</label>
                                        <p>
                                            <kbd>{currentOrder.creation}</kbd>
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label font-weight-bold">Total</label>
                                        <p>
                                            <kbd>${getTotal()}</kbd>
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                            <Container fluid={true}>
                                <Row xs={1} md={5} className="d-flex justify-content-center">

                                    {
                                        details.map(item =>
                                            <Col key={item.id} >
                                                <Card className="shadow">
                                                    <Card.Header className='card-title  card-hearder  d-flex justify-content-between  align-items-center'>
                                                        <span>Plato {item.name}</span>
                                                    </Card.Header>
                                                    <Card.Body className="d-flex justify-content-center p-0 m-3">
                                                        <div className="ml-2">
                                                            <p className="mb-1">
                                                                <h6 style={{color: 'black'}}>Cantidad: {item.quantity}</h6>
                                                            </p>
                                                            <p className="mb-1">
                                                                <h6 style={{color: 'black'}} >Status: {item.status}</h6>
                                                            </p>
                                                            <p className="mb-1">
                                                                <h6 style={{color: 'black'}} >Precio: {item.price}</h6>
                                                            </p>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    }

                                </Row>
                            </Container>

                        </Card.Body>

                    </Card>
                </Col>
            </Row>
        </Container>
    )
}