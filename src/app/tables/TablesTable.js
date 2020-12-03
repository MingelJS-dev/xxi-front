import React, { useContext, useEffect } from 'react';
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
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons';

import history from '../../history.js'

import * as TableReducer from '../../reducers/tables.reducer.js'
import * as UserReducer from '../../reducers/users.reducer.js'
import * as TableActions from '../../actions/tables.actions'

function StatusCheck({ item }) {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => TableReducer.getIsLoadingById(state, item.id))

    function toggle() {
        const status = item.status ? 'No disponible' : 'Disponible'
        dispatch(TableActions.updateTableById({
            id: item.id,
            status: !item.status,
            number: item.number
        }))
    }

    let label = item.status ? 'No disponible' : 'Disponible'
    useEffect(() => {
        // console.log(tables)
    }, [dispatch])
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
    const users = useSelector(UserReducer.getUsers)
    const isLoading = useSelector(TableReducer.getIsLoading)
    const isLoadingU = useSelector(UserReducer.getIsLoading)
    const dispatch = useDispatch()
    useEffect(() => {
        // console.log(tables)
    }, [users])

    if (isLoading || isLoadingU) {
        return (
            <div className="container-lg py-4 p-0 text-center">
                <Spinner />
            </div>
        )
    }

    if (tables.length === 0) {
        return <div className="not-found-table-items">No se encontraron mesas</div>
    }

    function updateTable(item, user_id) {
        dispatch(TableActions.updateTableById({
            id: item.id,
            number: item.number,
            user_id: user_id ? user_id : null,
            status: user_id ? true : false
        }))
    }

    function createTable() {
        dispatch(TableActions.createTable({
            number: tables.length + 1,
            user_id: null,
            status: false
        }))
    }

    function deleteTable(id) {
        dispatch(TableActions.destroyTableById(id))
    }


    return (
        <Container fluid={true} className="my-3">
            <Row xs={1} md={5} className="justify-content-center" >
                {
                    tables.map(item => (
                        <Col key={item.id} className="p-0 m-3">
                            <Card className="shadow">
                                <Card.Header className='card-title  card-hearder  d-flex justify-content-between  align-items-center'>
                                    <span>Mesa {item.number}</span>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteTable(item.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </Card.Header>
                                <Card.Body className="p-0 m-3">
                                    <StatusCheck item={item} />
                                    <FontAwesomeIcon icon={faUser} />
                                    <span className="ml-2" >Ocupado por:
                                    <select
                                            className={`form-control`}
                                            onChange={(e => updateTable(item, e.target.value))}
                                            defaultValue={item.user_id}
                                        >
                                            <option value="">Seleccione...</option>
                                            {
                                                users.map(x => (
                                                    <option
                                                        key={x.id + x.name}
                                                        value={x.id}
                                                    >{x.name}</option>
                                                ))
                                            }
                                        </select> </span>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }

                <Col className="p-0 m-3">
                    <Card className="shadow">
                        <Card.Header className="card-title-create  d-flex justify-content-between align-items-center">
                            <span>Crear mesa</span>
                            <button
                                className="btn btn-light btn-sm"
                                onClick={() => createTable()}
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
}