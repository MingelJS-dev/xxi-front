import React, { useEffect, useState, useContext } from 'react';
import { CurrentSettingContext } from '../../App.js'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSupplieById } from '../../reducers/supplies.reducer.js'

import * as SupplieActions from '../../actions/supplies.actions.js'
import { destroySupplieById } from '../../actions/supplies.actions.js'; 
import { getUserById } from '../../reducers/users.reducer.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Spinner from '../shared/Spinner.js';
import Header from "../shared/Header.js"

import SupplieForm from './SupplieForm.js'

export default function EditSuppliePage() {
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(SupplieActions.fetchSupplies())
    }, [dispatch, params.SupplieId])

    const currentSupplie = useSelector(state => getSupplieById(state, params.SupplieId))
    if (!currentSupplie) {
        return (
            <Spinner full={true} />
        )
    }


    function updateSupplie(data) {
        dispatch(SupplieActions.updateSupplieById(data))
    }

    function destroy(id) {
        dispatch(destroySupplieById(id))
    }

    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header
                    title="Editar suministro"
                    items={[
                        { label: "Listado de suministros", to: "/supplies" },
                        { label: "Editar suministro" }
                    ]}
                >
                </Header>
            </Row>
            <Row className="mb-2">
                <Col className="col-12 p-0 mb-2 col-lg-6 pr-lg-2">
                    <Card className="shadow">
                        <Card.Header className="text-white font-weight-bold bg-dark d-flex justify-content-between">Datos de suministro
                        
                        {
                    currentSupplie.id ?
                        <div>
                            <button 
                            onClick={() => destroy(currentSupplie.id)}
                            className="btn btn-danger">
                                Eliminar
                            </button>
                        </div>
                        : null
                }
                        </Card.Header>
                        <Card.Body>
                            {currentSupplie
                                ?
                                <SupplieForm
                                    supplie={currentSupplie}
                                    save={updateSupplie}
                                />
                                : <Spinner />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}