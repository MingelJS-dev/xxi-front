import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import * as UsersReducer from '../../reducers/users.reducer.js'
import * as RolesReducer from '../../reducers/roles.reducer.js'
import Spinner from '../shared/Spinner.js'

// import useFeatureChecker from '../shared/FeatureChecker.js'



export default function SupplieForm({ supplie, save }) {
    // const CheckFeatures = useFeatureChecker()
    const dispatch = useDispatch()
    const [name, setName] = useState(supplie.name || '')
    const [description, setDescription] = useState(supplie.description || '')
    // const [rut, setRut] = useState(user.rut || '')
    const [quantity, setQuantity] = useState(supplie.quantity || '')
    const [modicum, setModicum] = useState(supplie.modicum || '')
    const [on_hold, setOn_hold] = useState(supplie.on_old || '')
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

        if (!supplie.id && !description) {
            validations.push(['description', 'Descripción es requerida.'])
        }

        if (!supplie.id && !modicum) {
            validations.push(['modicum', 'Cantidad minima es requerida.'])
        }


        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])
            const data = {
                name,
                description,
                modicum,
                quantity,
                on_hold: 0,
            }

            if (supplie.id) {
                data.id = supplie.id
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
                <label>Descripción</label>

                <input
                    type="textarea"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    onChange={(x) => setDescription(x.target.value)}
                    value={description.toLowerCase()}
                    disabled={isLoading}
                    autoComplete="false"
                />

                <div className="invalid-feedback">{errors.description}</div>
            </div>

            <div className="form-group">
                <label>Cantidad minima</label>

                <input
                    type="number"
                    className={`form-control ${errors.modicum ? 'is-invalid' : ''}`}
                    onChange={(x) => setModicum(x.target.value)}
                    value={modicum}
                    disabled={isLoading}
                    autoComplete="false"
                />

                <div className="invalid-feedback">{errors.modicum}</div>
            </div>

            <div className="form-group">
                <label>Stock</label>

                <input
                    type="number"
                    className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                    onChange={(x) => setQuantity(x.target.value)}
                    value={quantity}
                    disabled={isLoading}
                    autoComplete="false"
                />

                <div className="invalid-feedback">{errors.quantity}</div>
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

