import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import SupplieForm from './SupplieForm.js'

import * as SupplieActions from '../../actions/supplies.actions.js'
import Header from '../shared/Header.js'

export default function NewUserPage(){
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(RolesActions.fetchRoles())
  }, [])

  function createSupplie(data){
    dispatch(SupplieActions.createSupplie(data))
  }

  return (
    <Container fluid={true} className="my-3">
      <Row>
        <Header
          title="Nuevo suministro"
          items={[
            { label: "Listado de suministros", to: "/supplies" },
            { label: "Nuevo suministro" },
          ]}
        />
      </Row>

      <Row>
        <Col className="col-12 p-0 col-lg-6">
          <Card className="mb-3">
            <Card.Header className="card-title bg-dark">
              <span>Crear suministro</span>
            </Card.Header>
            <Card.Body>
              <SupplieForm 
                supplie={{}} 
                save={createSupplie} 
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

