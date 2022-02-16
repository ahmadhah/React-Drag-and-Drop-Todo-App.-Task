import styled from "styled-components"

import React, { useState } from 'react';
import Column from './components/Column';


function App() {

  const [ColumnNames, setColumnName] = useState([]);
  const [nameinput, setnameinput] = useState('');

  const AddNewColumn = (name) => {
    name ? setColumnName([...ColumnNames, name]) : alert('Please enter a name.');
  }
  const DeleteColumn = (name) => {
    setColumnName(ColumnNames.filter(item => item !== name));
  }

  const editColumnName = (name, newName) => {
    name && setColumnName(ColumnNames.map(item => item === name ? newName : item));
  }

  return (
    <Outer>
      <Wrapper>
        <Input type="text" value={nameinput} placeholder="Write Column Name Here and press Add button..." onChange={(e) => { setnameinput(e.target.value) }} />
        <Button onClick={() => {
          AddNewColumn(nameinput)
          setnameinput('')
        }}>Add New Column</Button>
      </Wrapper>
      <h1 style={{ "textAlign": "center" }}> Task can be move up and down in the list...</h1>
      <Container>
        {ColumnNames.length > 0 &&
          ColumnNames.map((item, index) => <Column key={index} name={item} DeleteColumn={DeleteColumn} editColumnName={editColumnName} />)
        }
      </Container>
    </ Outer>
  );
}

export default App;


const Input = styled.input`
margin: 30px;
 minWidth: 60vw;
 fontSize: 20px;
 max-height: 50px;
 margin-top: 45px;
 padding-left: 50px;
 font-size: 19px;
 color: black;
`

const Outer = styled.div`
  height: 100vh;
  width: 100vw;
`

const Container = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
margin: 15px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  background-color: #4CAF50;
  min-height: 30px;
  width: 100px;
  margin:50px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10vw;
`


