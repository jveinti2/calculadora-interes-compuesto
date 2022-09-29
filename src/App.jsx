import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// import styled from 'styled-components';
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'
import Container from '../components/Container.jsx'
import Section from '../components/Section.jsx'
import Balance from '../components/Balance.jsx'
import { useState } from 'react';

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++) {
    total = (total + contribution) + (rate + 1)
  }
  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const App = () => {
  const [valor, setValor] = useState(0)

  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const total = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setValor(formatter.format(total))
  }
  return (
    <div>
      <Container>
        <Section>
          <Formik
            initialValues={{
              deposit: '',
              contribution: '',
              years: '',
              rate: ''
            }}

            onSubmit={handleSubmit}

            validationSchema={Yup.object({
              deposit: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
              contribution: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
              years: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
              rate: Yup
                .number()
                .required('Obligatorio')
                .typeError('Debe ser un numero')
                .min(0, 'El valor minimo es 0')
                .max(1, 'el valor maximo es 1')
            })}
          >
            <Form>
              <Input name='deposit' label='Deposito inicial' />
              <Input name='contribution' label='Monto de contribución' />
              <Input name='years' label='Años' />
              <Input name='rate' label='Interes aprox' />
              <Button type='submit'>Calcular</Button>
            </Form>
          </Formik>
          <Balance>
            {valor}
          </Balance>
        </Section>
      </Container>
    </div>
  )
}

export default App