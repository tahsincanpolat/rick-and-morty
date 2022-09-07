import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';
import Api from '../../api/index';
import CharacterFilter from '../CharacterFilter';

function CharacterCart(props){
     const characters = props.characters
     const [characterId, setCharacterId] = useState('');
     const [characterListData, setCharacterListData] = useState([]);
     const [breakEffect, setBreak] = useState(false);
     const [searchInput, setSearchInput] = useState('');
     const [filteredResults, setFilteredResults] = useState([]);
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
      //sort ascending character name

      const sortAscending = () => {
        const data = characterListData;
        data.sort((a, b) => (a.name > b.name) ? 1 : -1)
        const sorted = [...data].sort((a, b) => {
            return b.name - a.name;
          });
          setFilteredResults(sorted)
      }
      //sort descending character name

      const sortDescending = () => {
        const data = characterListData;
        data.sort((a, b) => (a.name < b.name) ? 1 : -1)
        const sorted = [...data].sort((a, b) => {
            return b.name - a.name;
          });
          setFilteredResults(sorted)
      }

      //Search character name

      const searchItems = (searchValue) => {
       const data = characterListData;
       setFilteredResults(data)
       setSearchInput(searchValue)
       if (searchInput !== '') {
            const filteredData = data.filter((item) => {
                return Object.values(item.name).join('').toLowerCase().includes(searchValue.toLowerCase())
            })
            // console.log(filteredData);
            setFilteredResults(filteredData)
        }
        else{
          setFilteredResults(data)
        }
    }

      //Filter character status

      const handleFilterChange = useCallback(event => {
        let characterList = characterListData
        const data = characterListData;

        setState(previousState => {
          let filters = new Set(previousState.filters)
          setFilteredResults(data)
          if (event.target.checked) {
            filters.add(event.target.value)
          } else {
            filters.delete(event.target.value)
          }
          // console.log("filters.size",filters.size);
          // console.log("characterList",characterList);

          if (filters.size) {
            characterList = data.filter(character => {
              return filters.has(character.status)
            })

          }
          setFilteredResults(characterList)
          return {
            filters,
            characters,
          }
        })
      }, [setState])

        return (
          <div className='character-list'>
              <div className='filter pt-5'>
                <div>
                      <CharacterFilter 
                        categories={CATEGORIES}
                        onFilterChange={handleFilterChange}/>
                  </div>
              </div>
              <div className='row' style={searchInput.length <= 0 ? {width:'100%'} : {width:'100%'}}>
                <div className='search-sort'>
                <div className='search'> 
                    <input icon='search'
                      placeholder='Search Characters Name...'
                      onChange={(e) => searchItems(e.target.value)}
                    />
                  </div>
                  <div className='sort'>
                    <select id='sortDropdown' onChange={handleChange}>
                        <option>Sort in Alphabetical Order</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                  </div>
                </div>
                {filteredResults.length>0 ? (
                            Array.isArray(filteredResults)
                            ? filteredResults.map((character,index) => (
                                    <div className='col-md-3 character-cart' key={index}>
                                        <Link to={"/character/" + character.id }>
                                            <img className='img-fluid' src={character.image} alt={character.name}/>
                                            <h5 className='character-name'>{character.name}</h5>
                                            <div className='d-flex justify-content-center'>
                                            <span className='character-status'>{character.status}</span>
                                            <span className='dot-status' style={{backgroundColor:
                                                          character.status === 'Alive'
                                                          ? 'green'
                                                          : character.status === 'Dead'
                                                          ? 'red'
                                                          : '#9f9f9f',
                                                          }} />
                                            </div>
                                        </Link>
                                    </div>
                            ))
                            : null)
                  : (
                  Array.isArray(characterListData)
                    ? characterListData.map((character,index) => (
                            <div className='col-md-3 character-cart' key={index}>
                                <Link to={"/character/" + character.id }>
                                    <img className='img-fluid' src={character.image} alt={character.name}/>
                                    <h5 className='character-name'>{character.name}</h5>
                                    <div className='d-flex justify-content-center'>
                                    <span className='character-status'>{character.status}</span>
                                    <span className='dot-status' style={{backgroundColor:
                                                  character.status === 'Alive'
                                                  ? 'green'
                                                  : character.status === 'Dead'
                                                  ? 'red'
                                                  : '#9f9f9f',
                                                  }} />
                                    </div>
                                </Link>
                            </div>
                    ))
                    : null
                )}
                
                   
            </div> 
          </div>
            
                             
    )
}

export default CharacterCart;
