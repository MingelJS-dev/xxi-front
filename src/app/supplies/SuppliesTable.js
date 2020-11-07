import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import * as utils from '../../utils.js'
import Spinner from '../shared/Spinner.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faStickyNote } from '@fortawesome/free-solid-svg-icons';

import history from '../../history.js'

import * as SupplieReducer from '../../reducers/supplies.reducer.js'

export default function SuppliesTable({ mode = 'Table' }) {
  const supplies = useSelector(SupplieReducer.getSupplies)
  const isLoading = useSelector(SupplieReducer.getIsLoading)


  if (isLoading) {
    return (
      <div className="container-lg py-4 p-0 text-center">
        <Spinner />
      </div>
    )
  }

  if (supplies.length === 0) {
    return <div className="not-found-table-items">No se encontraron suministros</div>
  }

  const headersData = [
    // {
    //   label: 'Index',
    //   field: 'idx',
    // },
    {
      label: 'Suministro',
      field: 'name',
    },
    {
      label: 'Descripción',
      field: 'description',
    },
    // {
    //   label: 'En espera',
    //   field: 'on_hold'
    // },
    {
      label: 'Stock',
      field: 'quantity',
    },
    {
      label: 'Cantidad minima',
      field: 'modicum'
    }
  ]

  if (mode === "CardList") {
    return (
      <>
        {
          supplies.map(item => (
            <div
              key={item.id}
              onClick={() => history.push(`/supplies/${item.id}/edit`)}
              className="card mb-2 shadow"
            >
              <Row className="card-body d-flex w-100 justify-content-between align-items-center">
                <div className="ml-2">
                  <p className="mb-1">
                    <span className="d-inline-block mr-1" style={{ width: '20px' }}>
                      <FontAwesomeIcon icon={faTag} />
                    </span>
                    <span>{item.name}</span>
                  </p>
                  <p className="mb-1">
                    <span className="d-inline-block mr-1" style={{ width: '20px' }}>
                      <FontAwesomeIcon icon={faStickyNote} />
                    </span>
                    <span>{item.description}</span>
                  </p>
                  <Row className="d-flex justifi-content-between">
                    <Col>
                      <p className="mb-1">
                        <span  >
                          Stock:
                    </span>
                        <span> {item.quantity}</span>
                      </p>
                    </Col>
                    <Col>
                      <p className="mb-1">
                        <span >
                          Minima:
                    </span>
                        <span> {item.modicum}</span>
                      </p>
                    </Col>
                  </Row>

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
      <table className={`table table-striped table-bordered table-hover mb-0`} >
        <thead>
          <tr>
            {
              headersData.map(item => (
                <th key={item.field}>{item.label}</th>
              ))
            }
          </tr>
        </thead>

        <tbody>
          {
            supplies.map(item => (
              <tr key={item.id}>
                {/* <td>*</td> */}
                <td><Link to={"/supplies/" + item.id + "/edit"}>{item.name}</Link></td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.modicum}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )

  }
}