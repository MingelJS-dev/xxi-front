import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useQuery, toQueryString } from '../../utils.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// import { usePagination } from '../shared/Pagination.js'
// import useSearch from '../shared/Search.js'
import Header, { HeaderActions } from "../shared/Header.js"
import useWindowSize from "../shared/WindowSize.js";

import SuppliesTable from './SuppliesTable.js';

import * as SuppliesActions from '../../actions/supplies.actions.js'

function SuppliesListPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const winSize = useWindowSize()

//   const paginationInfo = useSelector(UserReducer.getPagination)


//   const Pagination = usePagination(paginationInfo, page => {
//     if (currentFilters.page !== page) {
//       setCurrentFilters({ ...currentFilters, page })
//     }
//   })


  useEffect(() => {
    dispatch(SuppliesActions.fetchSupplies())
  }, [dispatch, history])

  return (
    <Container fluid={true} className="my-3">
      <Row>
        <Header
          title="Suministros"
          items={[
            { label: "Listado de suministro" }
          ]}
        >
          <HeaderActions>
              <Link to="/supplies/new" className="btn btn-sm btn-create-user">Crear suministro</Link>
          </HeaderActions>
        </Header>
      </Row>

      {/* <Row>
        <Col className="p-0">
          {Pagination}
        </Col>
      </Row> */}

      <Row>
        <Col className="pt-2 pr-0 pb-0 pl-0">
          {
            winSize.width <= 768 ?
              <SuppliesTable mode='CardList' />
              :
              <Card>
                <Card.Body className="p-0 table-responsive">
                  <SuppliesTable />
                </Card.Body>
              </Card>
          }

        </Col>
      </Row>

    </Container>
  );
}

export default SuppliesListPage;
