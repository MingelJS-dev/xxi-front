import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import ProductForm from './ProductForm.js'
import SuppliesProductForm from './SuppliesProductForm.js'

import * as ProductsActions from '../../actions/products.actions.js'
import * as SuppliesActions from '../../actions/supplies.actions.js'
import * as NotificationActions from "../../actions/notifications.actions.js"
import Header from '../shared/Header.js'

export default function NewProductPage() {
    const dispatch = useDispatch()
    const [supplies, setSupplies] = useState([])
    // const [errors, setErrors] = useState([])
    useEffect(() => {
        dispatch(SuppliesActions.fetchSupplies())
    }, [])

    function createProduct(data) {
        let errors = supplies.length > 0 ? [] : [1]
        let currentSupplies = []
        if (supplies.length > 0) {
            supplies.map(x => {
                if (!x.units || x.units === 0) {
                    errors.push(1)
                } else {
                    currentSupplies.push({
                        id: x.id,
                        quantity: x.units
                    })
                }
            })
        }

        if (errors.length > 0) {
            dispatch(NotificationActions.updateNotification('Debe agregar suministros/unidades', 'warning'))
        } else {
            dispatch(ProductsActions.create({...data, supplies: currentSupplies }))
        }
    }

    const saveSupplies = async (data) => {
        // console.log(data)
        setSupplies(data)
    }

    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header
                    title="Nuevo producto"
                    items={[
                        { label: "Listado de productos", to: "/products" },
                        { label: "Nuevo producto" },
                    ]}
                />
            </Row>

            <Row className="d-flex justify-content-between">
                <Col className="col-12 p-0 col-lg-3">
                    <Card className="mb-3">
                        <Card.Header className="card-title bg-dark">
                            <span>Crear producto</span>
                        </Card.Header>
                        <Card.Body>
                            <ProductForm
                                product={{}}
                                save={createProduct}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="col-12 p-0 col-lg-8">
                    <Card className="mb-3">
                        <Card.Header className="card-title bg-dark">
                            <span>Seleccionar suministros</span>
                        </Card.Header>
                        <Card.Body>
                            <SuppliesProductForm
                                product={{}}
                                save={saveSupplies}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

