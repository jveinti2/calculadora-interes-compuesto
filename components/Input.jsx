import styled from 'styled-components';
import { useField } from 'formik';

const Control = styled.div`
    margin-bottom: 20px;
`
const Label = styled.label`
    color: #000;
    display: block;
    margin-bottom: 5px;
`
const MyInput = styled.input`
    border-radius: 2px;
    border: none;
    margin-bottom: 5px;
    outline: none;
    padding: 5px;
    width: 100%;
`
const ErrorMessage = styled.div`
    color: #f00;
`


const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Control>
            <Label>{label}</Label>
            <MyInput {...field} {...props} />
            {meta.touched && meta.error
                ? (<ErrorMessage>{meta.error}</ErrorMessage>)
                : null}
        </Control>
    )
}

export default Input