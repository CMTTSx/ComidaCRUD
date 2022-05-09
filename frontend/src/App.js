import React, { useState, useEffect } from 'react';

//Importando Estilo
import './App.css'

//Importando Axios
import Axios from 'axios';

function App() {
  const [foodName, setFoodName] = useState('');
  const [days, setDays] = useState(0);
  const [newFoodName, setNewFoodName] = useState('');

  //Botão de Adicionar
  const addButton = () => {
    Axios.post('http://localhost:3001/insert', {
      foodName: foodName,
      days: days});

  };

  //Botao de Update
  const updateFood = (id) => {
    Axios.put('http://localhost:3001/update', {id: id, newFoodName: newFoodName,})
  }

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  const [foodList, setFoodList] = useState([]);



  //diz ao React que o componente precisa fazer algo apenas depois da renderização.
  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((response) => {
      setFoodList(response.data);
    });
  }, [addButton]);
//Atualizar renderização depois de ter realizado a ação

  
  return (
    <div className="App">
      <h1>CRUD - MERN STACK</h1>
      <label>Nome da Comida:</label>
      <input type="text" onChange={ (event) => {setFoodName(event.target.value)} } />
      <label>Dias desde comeu:</label>
      <input type="number" 
              onChange={ (event) => {
              setDays(event.target.value)} } />

    <button onClick={addButton} >Adicionar</button>
    
    <h1>Lista de Comidas</h1>

    {foodList.map((val, key) => {
      return <div className='food' key={key}> {val.foodName} <h1> {val.daysSinceIAte} dias </h1> 
      < input 
        type='text'
        placeholder='Novo nome comida'
        onChange={ (event) => {
          setNewFoodName(event.target.value);
        }}
      />
      <button onClick={()=> updateFood(val._id)}>Editar</button>
      <button onClick={()=> deleteFood(val._id)}>Deletar</button>
        
      </div>
    })}
    
    </div>
  );
}

export default App;
