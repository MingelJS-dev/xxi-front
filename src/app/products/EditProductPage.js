import React, { useEffect, useState, useContext } from 'react';
import { CurrentSettingContext } from '../../App.js'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProductById } from '../../reducers/product.reducer.js'

import * as ProductActions from '../../actions/products.actions.js'
import { destroyById } from '../../actions/products.actions.js'; 


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Spinner from '../shared/Spinner.js';
import Header from "../shared/Header.js"

import ProductForm from './ProductForm.js'

export default function EditProductPage() {
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(ProductActions.fetchProducts())
    }, [dispatch, params.SupplieId])

    const currentProduct = useSelector(state => getProductById(state, params.ProductId))
    if (!currentProduct) {
        return (
            <Spinner full={true} />
        )
    }


    function updateProduct(data) {
        dispatch(ProductActions.updateById(data))
    }

    function destroy(id) {
        dispatch(destroyById(id))
    }

    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header
                    title="Editar producto"
                    items={[
                        { label: "Listado de productos", to: "/products" },
                        { label: "Editar producto" }
                    ]}
                >
                </Header>
            </Row>
            <Row className="mb-2">
                <Col className="col-12 p-0 mb-2 col-lg-6 pr-lg-2">
                    <Card className="shadow">
                        <Card.Header className="text-white font-weight-bold bg-dark d-flex justify-content-between">Datos de suministro
                        
                        {
                    currentProduct.id ?
                        <div>
                            <button 
                            onClick={() => destroy(currentProduct.id)}
                            className="btn btn-danger">
                                Eliminar
                            </button>
                        </div>
                        : null
                }
                        </Card.Header>
                        <Card.Body>
                            {currentProduct
                                ?
                                <ProductForm
                                    product={currentProduct}
                                    save={updateProduct}
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