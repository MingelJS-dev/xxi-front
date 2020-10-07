import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import * as UsersReducer from '../../reducers/users.reducer.js'

import Spinner from '../shared/Spinner.js'
// import useFeatureChecker from '../shared/FeatureChecker.js'


function PasswordWrapper({ user, password, errors, repeatPassword, setPassword, setRepeatPassword, isLoading }){
  const [ disabled, setDisabled ] = useState(!!user.id || isLoading)
  const [ changePassword, setChangePassword ] = useState(false)

  function toggle(e){
    setChangePassword(!changePassword)
    setDisabled(!disabled)
  }

  return (
    <>
      <div className={`mb-3 ${user.id ? 'd-block' : 'd-none'}`}>
        <label role="button">
          <input
            type="checkbox"
            onChange={toggle}
            checked={changePassword}
          />
          <span className="pl-2">Cambiar contraseña</span>
        </label>
      </div>

      <div className={`form-group ${disabled ? 'd-none' : 'd-block'}`}>
        <label>Contraseña</label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          onChange={(x) => setPassword(x.target.value)}
          disabled={disabled}
          autoComplete="false"
        />

        <div className="invalid-feedback">{errors.password}</div>
      </div>

      <div className={`form-group ${disabled ? 'd-none' : 'd-block'}`}>
        <label>Repetir Contraseña</label>

        <input
          type="password"
          className={`form-control ${errors.repeatPassword ? 'is-invalid' : ''}`}
          onChange={(x) => setRepeatPassword(x.target.value)}
          disabled={disabled}
          autoComplete="false"
        />

        <div className="invalid-feedback">{errors.repeatPassword}</div>
      </div>
    </>
  )
}

export default function UserForm({ user, save }) {
  // const CheckFeatures = useFeatureChecker()
  const [name, setName] = useState(user.name || '')
  const [email, setEmail] = useState(user.email || '')
  // const [rut, setRut] = useState(user.rut || '')
  const [role, setRole] = useState(user.role || '')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errors, setErrors] = useState({})

  const roles = useSelector(UsersReducer.getRoles)

  const globalLoading = useSelector(UsersReducer.getIsLoading)
  const localLoading = useSelector(state => UsersReducer.getIsLoadingById(state, user.id))


  const isLoading = false

  function validate(e) {
    e.preventDefault()

    // TODO: Validate required data and format
    const validations = []

    if (!name) {
      validations.push(['name', 'Nombre es requerido'])
    }

    if (!user.id && !email) {
      validations.push(['email', 'Correo electrónico es requerido'])
    }


    // if (!user.id && !rut) {
    //   validations.push(['rut', 'Rut es requerido'])
    // }

    if (!user.id && !password) {
      validations.push(['password', 'Contraseña es requerida'])
    }

    if (!user.id && !repeatPassword) {
      validations.push(['repeatPassword', 'Repetir contraseña es requerida'])
    }

    if (!user.id && (password && repeatPassword) && password !== repeatPassword) {
      validations.push(['password', 'Las contraseñas no coinciden'])
      validations.push(['repeatPassword', 'Las contraseñas no coinciden'])
    }

    if (validations.length > 0) {
      setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
      return
    } else {
      setErrors([])
      const data = {
        name,
        email,
        password,
        // repeatPassword,
        rol_id: 0,
        // rut,
        // user_role_id: 2,
      }

      if (user.id) {
        data.id = user.id
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
        <label>Nombre completo</label>

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
        <label>Correo electrónico</label>

        <input
          type="text"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          onChange={(x) => setEmail(x.target.value)}
          value={email.toLowerCase()}
          disabled={isLoading || user.id}
          autoComplete="false"
        />

        <div className="invalid-feedback">{errors.email}</div>
      </div>

      <div className="form-group">
        <label>Rol</label>

        <select
          className={`form-control`}
          onChange={(e => setRole(e.target.value))}
          defaultValue={role}
        >
          <option value="">Seleccione...</option>
          {
            roles.map(item => (
              <option
                key={item}
                value={item}
              >{item}</option>
            ))
          }
        </select>
      </div>


      {/* <div className="form-group">
        <label>Rut</label>

        <input
          type="text"
          autoComplete="false"
          className={`form-control ${errors.rut ? 'is-invalid' : ''}`}
          onChange={(x) => setRut(x.target.value)}
          value={rut}
          disabled={isLoading}
        />
        <div className="invalid-feedback">{errors.rut}</div>
      </div> */}
{/* 
      <div className="form-group">
        <label>Número de teléfono (Opcional)</label>

        <input
          type="text"
          className={`form-control`}
          onChange={(x) => setPhone(x.target.value)}
          value={phone}
          disabled={isLoading }
        />
      </div> */}

      <PasswordWrapper {...{user, password, setPassword, repeatPassword, setRepeatPassword, isLoading, errors}} />

      <div className="form-group">
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

