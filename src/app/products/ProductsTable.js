import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import * as utils from '../../utils.js'
import Spinner from '../shared/Spinner.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faDoorClosed, faHashtag } from '@fortawesome/free-solid-svg-icons';

import history from '../../history.js'

import * as ProductReducer from '../../reducers/product.reducer.js'

export default function ProductsTable() {
  const products = useSelector(ProductReducer.getProducts)
  const isLoading = useSelector(ProductReducer.getIsLoading)


  if (isLoading) {
    return (
      <div className="container-lg py-4 p-0 text-center">
        <Spinner />
      </div>
    )
  }

  if (products.length === 0) {
    return <div className="not-found-table-items">No se encontraron productos.</div>
  }

  const headersData = [
    // {
    //   label: 'Index',
    //   field: 'idx',
    // },
    {
      label: 'Plato',
      field: 'name',
    },
    {
      label: 'Precio',
      field: 'price',
    },
    // {
    //   label: 'En espera',
    //   field: 'on_hold'
    // },
    {
      label: 'Suministros',
      field: 'x',
    },
    // {
    //   label: 'Cantidad minima',
    //   field: 'modicum'
    // }
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
              products.map(item => (
                <tr key={item.id}>
                  {/* <td>*</td> */}
                  <td><Link to={"/products/" + item.id + "/edit"}>{item.name}</Link></td>
                  <td>${item.price}</td>
                  <td> En desarrollo </td> 

                </tr>
              ))
            }
      </tbody>
    </table>
  )
}