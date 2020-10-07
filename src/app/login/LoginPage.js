import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startLogin, fetchCompanyBySlug } from '../../actions/auth.actions.js';
import { getCompany } from '../../reducers/auth.reducer.js';

// import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';
//import logo from '../../assets/images/logo-enel.png';

import Spinner from '../shared/Spinner.js'

function Header(){
  const company = useSelector(getCompany)

  if(!company){
    return <Spinner />
  }

  window.title = company.app_name

  return (
    <Figure>
      {
        company.logo_url ?
          <Figure.Image width={171} height={180} alt="171x180" src={company.logo_url} />
        : null
      }
      <Figure.Caption>
        <h4 className="pt-2">{company.app_name}</h4>
      </Figure.Caption>
    </Figure>
  )
}

function LoginPage() {
  const dispatch = useDispatch()
  const isLoggingIn = useSelector(state => state.auth.isLoggingIn)
  const credentialsMsg = useSelector(state => state.auth.credentialsMsg)
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  useEffect(() => {
    const slug = window.location.host.split(".")[0]
    dispatch(fetchCompanyBySlug(slug || ''))
  }, [dispatch])

  function login(e){
    e.preventDefault()
    dispatch(startLogin(email, password))
  }

  return (
    <div className="background-login">
      <div className="auth-wrapper mx-2">
        <Card className="shadow col-12 col-sm-6 col-md-3">
          <Card.Body>
            <Form onSubmit={login}>
              <FormGroup className="text-center" >
                <Header />
              </FormGroup>

              <Form.Group>
                <Form.Label>Usuario</Form.Label>
                <Form.Control value={email} disabled={isLoggingIn} onChange={(e) => { setEmail(e.target.value) }} type="text" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control value={password} disabled={isLoggingIn} onChange={(e) => { setPassword(e.target.value) }} type="password" />
              </Form.Group>

              {
                isLoggingIn
                ?
                  <Form.Group className='text-center'>
                    <div className='spinner-border' role='status'>
                      <span className='sr-only'>Cargando...</span>
                    </div>
                  </Form.Group>
                :
                  <Form.Group className='text-center'>
                    <Button className='btn-login' type='submit' disabled={isLoggingIn}>
                      Iniciar Sesión
                    </Button>
                    { credentialsMsg && (
                      <p className="message mt-3 mb-0">Credenciales incorrectas, para mayor información contáctenos a <a href="mailto:contact@restauranxxi.cl" style={{cursor: 'pointer'}}>contact@restauranxxi.cl</a></p>
                    )}
                  </Form.Group>
              }
            </Form>
            <Card.Footer>
                <p className="message d-flex justify-content-center mt-3 mb-0">Crear usuario</p>
                </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
