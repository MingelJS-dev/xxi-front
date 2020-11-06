import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, shallowEqual } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import SuppliesTable from '../supplies/SuppliesTable.js'
import * as SuppliesActions from '../../actions/supplies.actions.js'

import ProductsTable from '../products/ProductsTable.js'
import * as ProductActions from '../../actions/products.actions.js'

import Spinner from '../shared/Spinner.js';
import Header from '../shared/Header.js'

import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';



export default function DashboardPage() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(SuppliesActions.fetchSupplies())
    dispatch(ProductActions.fetchProducts())
  }, [dispatch])

  // useEffect(() => {

  // }, [ dispatch])

  return (
    <Container fluid={true} className="my-3">
      <Row>

      </Row>

      <Row>
        <Col sm={12} lg={5}>

          <Row className="mb-2">
            <Col sm={12} className="p-0">
              <Card className="shadow">
                <Card.Header className='card-title  card-hearder'>
                  <span>Suministros</span>
                </Card.Header>
                <Card.Body className="p-0">
                  <SuppliesTable />
                </Card.Body>
              </Card>

            </Col>
          </Row>

          <Row className="mb-2">
            <Col sm={12} className="p-0">
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
        </Col>

        <Col sm={12} lg={7} className="p-0 pl-lg-2">
          <Card className="shadow">
            <Card.Header className='card-title card-hearder'>
              <span>Reporte Card</span>

            </Card.Header>

            <Card.Body className="p-0">

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
