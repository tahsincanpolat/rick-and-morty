import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Api from '../../api/index';

function CharacterCart(props){
     const characters = props.characters
     const [characterId, setCharacterId] = useState('');
     const [characterListData, setCharacterListData] = useState([]);
     const [breakEffect, setBreak] = useState(false);

     let regex = /\d+/;

     const urlParse = () => {
        let url = '';
    
        for(let i in characters) {
          url += i.match(regex)[0] + ',';
        }
        setCharacterId(url);
    };

     useEffect(() => {
        setBreak(false)
        const api = new Api();   
        const fetchData = () => {
             api.getEpisodeCharacters(characterId).then(resp => {
                setCharacterListData(resp.data);
                setBreak(true)
            }); 
        };
        urlParse();
        fetchData(); 
      
      },[breakEffect]);


     function handleChange() {
        let val = document.getElementById("sortDropdown").value
        if(val === 'asc'){
            sortAscending();
        }
        else if(val==='desc'){
            sortDescending();
        }
      }

      const sortAscending = () => {
        characterListData.sort((a, b) => (a.name > b.name) ? 1 : -1)
        const sorted = [...characterListData].sort((a, b) => {
            return b.name - a.name;
          });
        setCharacterListData(sorted);
      }

      const sortDescending = () => {
        characterListData.sort((a, b) => (a.name < b.name) ? 1 : -1)
        const sorted = [...characterListData].sort((a, b) => {
            return b.name - a.name;
          });
        setCharacterListData(sorted);
      }

        return (
            <div className='row'>
                <select id='sortDropdown' onChange={handleChange}>
                    <option>Sort in Alphabetical Order</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                {Array.isArray(characterListData)
                    ? characterListData.map((character,index) => (
                            <div className='col-md-3' key={index}>
                                <Link  to={"/character/" + character.id }>
                                    <img className='img-fluid' src={character.image} alt={character.name}/>
                                    <h2>{character.name}</h2>
                                    <p>{character.status}</p>
                                </Link>
                            </div>
                    ))
                    : null}
                   
            </div> 
                             
    )
}

export default CharacterCart;
