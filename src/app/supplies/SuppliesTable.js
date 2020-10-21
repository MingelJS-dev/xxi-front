import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import * as utils from '../../utils.js'
import Spinner from '../shared/Spinner.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faDoorClosed, faHashtag } from '@fortawesome/free-solid-svg-icons';

import history from '../../history.js'

import * as SupplieReducer from '../../reducers/supplies.reducer.js'

export default function SuppliesTable() {
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