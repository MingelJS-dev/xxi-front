import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, shallowEqual } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import SuppliesTable from '../supplies/SuppliesTable.js'
import * as SuppliesActions from '../../actions/supplies.actions.js'

import ProductsTable from '../products/ProductsTable.js'
import * as ProductActions from '../../actions/products.actions.js'
import * as FileActions from '../../actions/file.actions.js'
import * as FileReducer from '../../reducers/file.reducer.js'
import * as Permission from '../shared/utils.js'
import { CurrentRoleContext } from '../../App.js'

import Spinner from '../shared/Spinner.js';
import Header from '../shared/Header.js'

import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';




export default function DashboardPage() {
  const dispatch = useDispatch();
  const currentRole = useContext(CurrentRoleContext)
  const isLoading = useSelector(FileReducer.getIsLoading)

  useEffect(() => {
    dispatch(SuppliesActions.fetchSupplies())
    dispatch(ProductActions.fetchProducts())
  }, [dispatch])

  // useEffect(() => {

  // }, [ dispatch])

  const exportFile = async () => {
    dispatch(FileActions.fetchFile())
  }

  return (
    <Container fluid={true} className="my-3">
      <Row className="d-flex justify-content-center mb-5">
        {
          Permission.report(currentRole) ?
            <Col sm={12} lg={6} className="p-0 pl-lg-2">
              <Card className="shadow">
                <Card.Header className='card-title card-hearder'>
                  <span>Reporte Card</span>

                </Card.Header>

                <Card.Body className="d-flex justify-content-center p-3">

                  <Button className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                    onClick={() => exportFile()} download>

                    {
                      isLoading ?
                        <div className='spinner-border' role='status'></div>
                        : " Descargar reporte"
                    }
                  </Button >

                </Card.Body>
              </Card>
            </Col> : ''
        }
      </Row>
   

          <Row className="mb-2 d-flex justify-content-between">
            <Col sm={6} className="p-0">
              <Card className="shadow">
                <Card.Header className='card-title  card-hearder'>
                  <span>Suministros</span>
                </Card.Header>
                <Card.Body className="p-0">
                  <SuppliesTable />
                </Card.Body>
              </Card>

            </Col>
            <Col sm={6} className="p-0">
              <Card className="shadow">
                <Card.Header className='card-title card-hearder'>
                  <span>Productos</span>
                </Card.Header>
                <Card.Body className="p-0">
                  <ProductsTable />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mb-2">



          </Row>

    </Container>
  );
}
