import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '../shared/Spinner.js'

export default function ProductForm({ product, save }) {
    const dispatch = useDispatch()
    const [name, setName] = useState(product.name || '')
    const [price, setPrice] = useState(product.price || '')
    const [errors, setErrors] = useState({})


    //   const globalLoading = useSelector(UsersReducer.getIsLoading)
    //   const localLoading = useSelector(state => UsersReducer.getIsLoadingById(state, user.id))


    const isLoading = false

    function validate(e) {
        e.preventDefault()

        // TODO: Validate required data and format
        const validations = []

        if (!name) {
            validations.push(['name', 'Nombre es requerido.'])
        }

        if (!product.id && !price) {
            validations.push(['price', 'Precio es requerido.'])
        }



        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])
            const data = {
                name,
                price,
                // supplies
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



    return (
        <form onSubmit={validate} noValidate>
            <div className="form-group">
                <label>Nombre</label>

                <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    onChange={(x) => setName(x.target.value)}
                    value={name}
                    disabled={isLoading}
                />

                <div className="invalid-feedback">{errors.name}</div>
            </div>

            <div className="form-group">
                <label>Precio</label>

                <input
                    type="number"
                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                    onChange={(x) => setPrice(x.target.value)}
                    value={price}
                    disabled={isLoading}
                    autoComplete="false"
                />

                <div className="invalid-feedback">{errors.price}</div>
            </div>

            <div className="form-group d-flex justify-content-between">
                <button className={`btn btn-primary ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                    <span>Guardar</span>

                    {
                        isLoading ?
                            <div className='spinner-border' role='status'></div>
                            : null
                    }

                </button>
            </div>

        </form>
        
    )
}

