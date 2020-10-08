import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import UserForm from './UserForm.js'

import * as UserActions from '../../actions/users.actions.js'

import Header from '../shared/Header.js'

export default function NewUserPage(){
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(UserActions.fetchRoles())
  }, [])

  function crateUser(data){
    dispatch(UserActions.createUser(data))
  }

  return (
    <Container fluid={true} className="my-3">
      <Row>
        <Header
          title="Nuevo usuario"
          items={[
            { label: "Listado de usuarios", to: "/users" },
            { label: "Nuevo usuario" },
          ]}
        />
      </Row>

      <Row>
        <Col className="col-12 p-0 col-lg-6">
          <Card className="mb-3">
            <Card.Header className="card-title bg-dark">
              <span>Crear usuario</span>
            </Card.Header>
            <Card.Body>
              <UserForm 
                user={{}} 
                save={crateUser} 
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

