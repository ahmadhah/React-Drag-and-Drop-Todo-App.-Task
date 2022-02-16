import Todo from './Todo'
import styled from "styled-components"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Column({ name, DeleteColumn, editColumn }) {

    const newColumn = () => prompt('enter new column name')

    return (
        <Container>
            <ButtonSection>
                <Name>{name}</Name>
                <Button style={{ backgroundColor: 'red', borderRadius: "40%" }} onClick={() => { DeleteColumn(name) }}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                <Button onClick={() => {
                    editColumn(name, newColumn())
                }}>Edit</Button>
            </ButtonSection>
            <Todo />
        </Container>
    )
}

export default Column

const Name = styled.h3`
color: #fff;
padding: 5px 20px;
`
const Button = styled.button`
    background: grey;
    color: white;
    height: 30px;
    width: 60px;
    margin: 10px;
    cursor:pointer;
    border-radius:20%;
`
const Container = styled.div`
display: flex;
flex-direction: column;
margin:0 2.5vw;
background: rgba(76, 175, 80, 0.3);
padding:0 20px;
border-radius:30px;
margin-bottom:40px;
`

const ButtonSection = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`