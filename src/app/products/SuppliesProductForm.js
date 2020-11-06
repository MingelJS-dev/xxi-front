import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../shared/Spinner.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as SupplieReducer from '../../reducers/supplies.reducer.js'
import './ProductPage.css'

const SearchBar = ({ keyword, setKeyword }) => {
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    return (
        <input
            style={BarStyling}
            key="random1"
            value={keyword}
            placeholder={"Buscar suministro..."}
            onChange={(e) => setKeyword(e.target.value)}
        />
    );
}


export default function SuppliesProductForm({ product, save, suppliesByProduct }) {

    const supplies = useSelector(SupplieReducer.getSupplies)
    let sbyProduct


    const dispatch = useDispatch()
    const [suppliesProductSelect, setSuppliesProductSelect] = useState(sbyProduct || [])
    const [supplieList, setSupplieList] = useState([])
    // const [supplieList, setSupplieList] = useState([])
    const [input, setInput] = useState('');
    const [errors, setErrors] = useState({})


    //   const globalLoading = useSelector(UsersReducer.getIsLoading)
    //   const localLoading = useSelector(state => UsersReducer.getIsLoadingById(state, user.id))

  
    useEffect(() => {
        if (suppliesByProduct && suppliesByProduct.length > 0 ) {
            sbyProduct = supplies.filter(x => 
                suppliesByProduct.map(item => item.supplies_id).includes(x.id) 
                && 
                suppliesByProduct.map(item => item.food_plate_id).includes(product.id)
                )

            sbyProduct.map(item => {
                item.units = suppliesByProduct.filter(x => x.supplies_id === item.id)[0].quantity
            })
            setSuppliesProductSelect(sbyProduct)
        }
        // console.log(suppliesByProduct)
    }, [])

    const isLoading = false

    function validate(e) {
        e.preventDefault()

        // TODO: Validate required data and format
        const validations = []


        if (suppliesProductSelect.length === 0) {
            validations.push(['suppliesProductSelect', 'Suministros es requerido.'])
        }



        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])
            const data = {
                suppliesProductSelect
            }

            if (product.id) {
                data.id = product.id
            }

            save(data)
        }
    }

    if (isLoading) {
        return (<Spinner />)
    }




    const updateSearch = async (input) => {
        let filtered = []
        let idsSelect = suppliesProductSelect.map(x => x.id)
        if (input) {
            filtered = supplies.filter(item =>
                item.name.toLowerCase().includes(input.toLowerCase()) && !idsSelect.includes(item.id)
            )
            setInput(input);
            setSupplieList(filtered);
        } else {
            setInput(input);
            setSupplieList(filtered);
        }
    }

    const selectSupplie = async (item) => {
        // let suppliesSelect = suppliesProductSelect
        // suppliesSelect.push(item)
        let filtered = []

        filtered = supplieList.filter(x => item.id !== x.id)
        setSupplieList(filtered);

        setSuppliesProductSelect([...suppliesProductSelect, item])

         save(suppliesProductSelect)
    }

    const deleteSelect = (item) => {
        let filtered = []

        filtered = suppliesProductSelect.filter(x => item.id !== x.id)
        setSuppliesProductSelect(filtered);

        // setSupplieList([...supplieList, item])
        save(suppliesProductSelect)
    }

    const changeUnits = (value, id) => {
        //  suppliesProductSelect.filter(x => x.id === parseInt(id))[0].units = value
        if (product && product.id) {
            if (suppliesProductSelect.filter(x => x.id === parseInt(id))) {
                suppliesProductSelect.filter(x => x.id === parseInt(id))[0].newUnits = parseInt(value)
            }
        } else {
            if (suppliesProductSelect.filter(x => x.id === parseInt(id))) {
                suppliesProductSelect.filter(x => x.id === parseInt(id))[0].units = parseInt(value)
            }
        }

       
        save(suppliesProductSelect)
    }

    function saveChange() {
        console.log(suppliesProductSelect)
    }
 


    return (
        <Container fluid={true}>
            <Row className="d-flex justify-content-between">
                <Col lg={4}>
                    <Row>
                        <Col>
                            <SearchBar
                                input={input}
                                setKeyword={updateSearch}
                            />
                        </Col>
                    </Row>

                    {
                        supplieList.length > 0 ?
                            supplieList.map(item =>
                                <Row key={item.id}>
                                    <Col className="p-0 m-3">
                                        <Card className="shadow cardPointer"
                                            border="dark"
                                            onClick={async () => selectSupplie(item)}
                                        >
                                            <Card.Body className="p-0 m-3">
                                                <span>{item.name}</span>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            ) : ''
                    }

                </Col>
                <Col lg={6}>
                    <Row>
                        <Col>
                            <h5 className="page-title m-0 p-2">Suministros seleccionados</h5>
                        </Col>
                    </Row>
                    {
                        suppliesProductSelect.map(item =>
                            <Row key={item.id}>
                                <Col className="p-0 m-3">
                                    <Card
                                        className="shadow"
                                        border="primary"
                                    >
                                        <Card.Body className="p-0 m-3">

                                            <span>{item.name}</span>

                                            <Row >
                                                <Col className="d-flex justify-content-between">
                                                    <div >
                                                        <input
                                                            type="number"
                                                            id={item.id}
                                                            className={`form-control ${errors.units ? 'is-invalid' : ''}`}
                                                            onChange={(x) => changeUnits(x.target.value, x.target.id)}
                                                            disabled={isLoading}
                                                            placeholder={item.units ? item.units : 'Ingresar unidades...'}
                                                        />

                                                        <div className="invalid-feedback">{errors.units}</div>
                                                    </div>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => deleteSelect(item)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </Col>
                                            </Row>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        )
                    }
                </Col>
            </Row>
            <div className="form-group d-flex justify-content-center">
                <button className={`btn btn-primary ${isLoading ? 'loading' : ''}`} 
                disabled={isLoading}
                onClick={ async () => await saveChange()}>
                    <span>Guardar</span>

                    {
                        isLoading ?
                            <div className='spinner-border' role='status'></div>
                            : null
                    }

                </button>
            </div>
        </Container>

    )
}

