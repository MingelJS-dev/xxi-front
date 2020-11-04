import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useQuery, toQueryString } from '../../utils.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// import { usePagination } from '../shared/Pagination.js'
import Header, { HeaderActions } from "../shared/Header.js"
import useWindowSize from "../shared/WindowSize.js";


import TablesTable from './TablesTable.js';

import * as TablesActions from '../../actions/tables.actions.js'

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
        dispatch(TablesActions.fetchTables())
    }, [dispatch, history])

    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header
                    title="Mesas"
                    items={[
                        { label: "Listado de mesas" }
                    ]}
                >
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
                              <TablesTable mode='CardList' />
                            :
                            <Card>
                                <Card.Body className="p-0 table-responsive">
                                    <TablesTable />
                                </Card.Body>
                            </Card>
                    }

                </Col>
            </Row>

        </Container>
    );
}

export default SuppliesListPage;
