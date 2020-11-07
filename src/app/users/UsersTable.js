import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import * as UserActions from '../../actions/users.actions.js'
import * as UserReducer from '../../reducers/users.reducer.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import history from '../../history.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHardHat, faEnvelope, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

import * as RolesReducer from '../../reducers/roles.reducer.js'

import Spinner from '../shared/Spinner.js';

// function StatusCheck({ item }) {
//   const dispatch = useDispatch()
//   const isLoading = useSelector(state => UserReducer.getIsLoadingById(state, item.id))

//   function toggle() {
//     const status = !item.deleted_at ? 'disable' : 'enable'
//     dispatch(UserActions.updateUserStatus(item.id, status))
//   }

//   let label = item.deleted_at ? 'Deshabilitado' : 'Habilitado'

//   if (isLoading) {
//     label = 'Actualizando...'
//   }

//   return (
//     <Form.Check
//       type="switch"
//       className="user-status-check"
//       disabled={isLoading}
//       id={`sw-${item.id}`}
//       label={label}
//       checked={!item.deleted_at}
//       onChange={() => toggle()}
//     />
//   )
// }

export default function UsersTable({ tableSize, mode = 'Table' }) {
  const users = useSelector(UserReducer.getUsers)
  const isLoading = useSelector(UserReducer.getIsLoading)
  const roles = useSelector(RolesReducer.getRoles)

  if (isLoading && roles.length > 0 || users.length === 0) {
    return (
      <div className="container-lg py-4 p-0 text-center">
        <Spinner />
      </div>
    )
  }

  if (users.length === 0 && !isLoading) {
    return <div className="not-found-table-items">No se encontraron usuarios</div>
  }

  if (mode === "CardList") {
    return (
      <>
        {
          users.map(item => (
            <div
              key={item.id}
              onClick={() => history.push(`/users/${item.id}/edit`)}
              className="card mb-2 shadow"
            >
              <Row className="card-body d-flex w-100 justify-content-between align-items-center">
                <div className="ml-2">
                  <p className="mb-1">
                    <span className="d-inline-block mr-1" style={{ width: '20px' }}>
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <span>{item.name}</span>
                  </p>
                  <p className="mb-1">
                    <span className="d-inline-block mr-1" style={{ width: '20px' }}>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <span>{item.email}</span>
                  </p>
                  <p className="mb-1">
                    <span className="d-inline-block mr-1" style={{ width: '20px' }}>
                      <FontAwesomeIcon icon={faUserCircle} />
                    </span>
                    <span>{roles.filter(x => x.id === item.rol_id)[0] ?
                      roles.filter(x => x.id === item.rol_id)[0].name
                      : ''}</span>
                  </p>
                </div>
                <div>
                </div>
              </Row>
            </div>
          ))
        }
      </>

    )

  } else {
    return (
      <Table
        striped
        bordered
        hover
        className={`mb-0 ${tableSize ? 'table-sm' : ''}`}
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <Link to={"/users/" + item.id + "/edit"}>{item.name}</Link>
                  </td>
                  <td>
                    {item.email.toLowerCase()}
                  </td>
                  <td>
                    {roles.filter(x => x.id === item.rol_id)[0] ?  roles.filter(x => x.id === item.rol_id)[0].name : null }
                  </td>
                  <td>
                    {/* <StatusCheck item={item}></StatusCheck> */}
                    Habilitado
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    )
  }
}

