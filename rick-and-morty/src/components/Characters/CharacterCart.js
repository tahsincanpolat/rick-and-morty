import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom';
import Api from '../../api/index';

function CharacterCart(props){
     const characters = props.characters
     const [informations, setInformations] = useState('');
     const [characterListData, setCharacterListData] = useState([]);

     let regex = /\d+/;

    //  console.log(characters);
     const urlParse = () => {
        let url = '';
    
        for(let i in characters) {
          url += i.match(regex)[0] + ',';
        }
        setInformations(url);
    };

     useEffect(() => {
        const api = new Api();   
        const fetchData = () => {
            api.getEpisodeCharacters(informations).then(resp => {
                setCharacterListData(resp.data);
            }); 
        };
        urlParse();
        fetchData();        
      });
    return (
            <div className='container'>
                <div className='row'>
                {Array.isArray(characterListData)
                    ? characterListData.map((data,index) => (
                        <div className='col-md-3' key={index}>
                            <img src={data.image} alt={data.name}/>
                        <h2>
                            {data.name} 
                        </h2>
                        <p>{data.status}</p>
                        </div>
                    ))
                    : null}
                </div>
                
            </div>
        
    )
}

export default CharacterCart;
