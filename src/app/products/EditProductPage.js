import React, { useEffect, useState, useContext } from 'react';
import { CurrentSettingContext } from '../../App.js'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProductById } from '../../reducers/product.reducer.js'
import { getSupplieByProductId } from '../../reducers/supplies.reducer.js'

import * as ProductActions from '../../actions/products.actions.js'
import * as SupplieActions from '../../actions/supplies.actions.js'
import { destroyById } from '../../actions/products.actions.js'; 


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Spinner from '../shared/Spinner.js';
import Header from "../shared/Header.js"

import ProductForm from './ProductForm.js'
import SuppliesProductForm from './SuppliesProductForm.js'

export default function EditProductPage() {
    const dispatch = useDispatch()
    const params = useParams()
    const [supplies, setSupplies] = useState([])
    const currentProduct = useSelector(state => getProductById(state, params.ProductId))
    const currentSupplies = useSelector(state => getSupplieByProductId(state))

    useEffect( () => {
         dispatch(ProductActions.fetchProducts())
         dispatch(SupplieActions.getAllSuppliesByProductId(params.ProductId))
         dispatch(SupplieActions.fetchSupplies())

    }, [dispatch, params.ProductId])

  

    if (!currentProduct && !currentSupplies) {
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

    const saveSupplies = async (data) => {
        setSupplies(data)
    }

    const updateSupplies = async (data) => {
        dispatch(ProductActions.updateSupplies(data))
    }

    const deleteSupplie = async (ProductSupplieId) => {
        dispatch(ProductActions.destroySupplieById(ProductSupplieId))
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
            <Row className="mb-2 d-flex justify-content-between">
                <Col className="col-12 p-0 col-lg-3">
                    <Card className="shadow">
                        <Card.Header className="text-white font-weight-bold bg-dark d-flex justify-content-between">Datos de suministro
                        
                         {
                   currentProduct &&  currentProduct.id ?
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
                <Col className="col-12 p-0 col-lg-8">
                    <Card className="mb-3">
                        <Card.Header className="card-title bg-dark">
                            <span>Actualizar suministros</span>
                        </Card.Header>
                        <Card.Body>

                        {currentProduct && currentSupplies
                                ?
                                <SuppliesProductForm
                                product={currentProduct}
                                save={saveSupplies}
                                suppliesByProduct={currentSupplies}
                                updateSupplies={updateSupplies}
                                deleteSupplie={deleteSupplie}
                                // saveChange={saveChange}
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