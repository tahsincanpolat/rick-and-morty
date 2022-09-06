import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';
import Api from '../../api/index';
import CharacterFilter from '../CharacterFilter';

function CharacterCart(props){
     const characters = props.characters
     const [characterId, setCharacterId] = useState('');
     const [characterListData, setCharacterListData] = useState([]);
     const [breakEffect, setBreak] = useState(false);
     const [state, setState] = useState({
      characterList: characterListData,
      filters: new Set(),
    })

    
     
     const CATEGORIES = [
      "Dead", 
      "Alive",
      "unknown" 
    ]

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

      const handleFilterChange = useCallback(event => {
        setState(previousState => {
          let filters = new Set(previousState.filters)
          let characterList = characterListData
          if (event.target.checked) {
            filters.add(event.target.value)
          } else {
            filters.delete(event.target.value)
          }
          // console.log("filters.size",filters.size);

          if (filters.size) {
            characterList = characterListData.filter(character => {
              return filters.has(character.status)
            })

            // console.log("characterList",characterList);
            setCharacterListData(characterList);
          }

          return {
            filters,
            characters,
          }
        })
      }, [setState])

        return (
            <div className='row'>
                <div>
                     <CharacterFilter 
                      categories={CATEGORIES}
                      onFilterChange={handleFilterChange}/>
                </div>
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
