import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import * as utils from '../../utils.js'
import Spinner from '../shared/Spinner.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faDoorClosed, faHashtag } from '@fortawesome/free-solid-svg-icons';

import history from '../../history.js'


export default function SuppliesTable() {

    const headersData = [
        {
            label: 'Index',
          },
          {
            label: 'Suministro',
            field: 'name',
          },
          {
            label: 'Stock',
            field: 'stock',
          }
      ]

    //   ${small ? 'table-sm' : ''}`
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
            {/* {
              supplies.map(item => (
                <tr key={item.id}>
                  <td>{index}</td>
                  <td>{item.name}</td>
                  <td>{item.stock}</td>

                </tr>
              ))
            } */}
          </tbody>
        </table>
      )
}