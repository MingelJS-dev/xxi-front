import React, { useEffect, useState, useContext } from 'react';
import { CurrentSettingContext } from '../../App.js'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import * as UserActions from '../../actions/users.actions.js'
import * as RolesActions from '../../actions/roles.actions.js'
import { getUserById } from '../../reducers/users.reducer.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Spinner from '../shared/Spinner.js';
import Header from "../shared/Header.js"

import UserForm from './UserForm.js';

export default function EditDoorPage() {
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(RolesActions.fetchRoles())
        dispatch(UserActions.fetchUsers())
    }, [dispatch, params.UserId])

    const currentUser = useSelector(state => getUserById(state, params.UserId))
    if (!currentUser) {
        return (
            <Spinner full={true} />
        )
    }


    function updateUser(data) {
        dispatch(UserActions.updateUserById(data))
    }


    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header
                    title="Editar usuario"
                    items={[
                        { label: "Listado de usuarios", to: "/users" },
                        { label: "Editar usuario" }
                    ]}
                >
                </Header>
            </Row>
            <Row className="mb-2">
                <Col className="col-12 p-0 mb-2 col-lg-6 pr-lg-2">
                    <Card className="shadow">
                        <Card.Header className="text-white font-weight-bold bg-dark">Datos de usuario</Card.Header>
                        <Card.Body>
                            {currentUser
                                ?
                                <UserForm
                                    user={currentUser}
                                    save={updateUser}
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