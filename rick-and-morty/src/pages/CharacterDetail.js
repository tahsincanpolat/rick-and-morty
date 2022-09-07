import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Api from '../api';

function CharacterDetail() {
    const {characterId} = useParams();
    const [characterDetail, setCharacterDetail] = useState([]);
    const [characterEpisode, setCharacterEpisode] = useState([]);
    const [breakEffect, setBreak] = useState(false);
    let regex = /\d+/;

    const urlParse = () => {
        let url = '';
    
        for(let i in characterDetail.episode) {
          url += i.match(regex)[0] + ', ';
        }

        return url;
    };
    useEffect(function() {
        setBreak(true)
        const api = new Api();      
        const fetchData = async () => {
            await api.getEpisodeCharacters(characterId).then(resp => {
                setCharacterDetail(resp.data);
                setBreak(true)
            });
        };
        fetchData();
        localStorage.setItem('episode',  urlParse());
        setCharacterEpisode(localStorage.getItem('episode'));
      });

    return (  
        <div className='container character'>
            <div className='row'>
                <div className='col-md-4'>
                    <img src={characterDetail.image} className='img-fluid image' alt={characterDetail.name} />
                </div>
                <div className='col-md-8'>
                    <p><span>Name:</span> {characterDetail.name} </p>
                    <p><span>Gender: </span>{characterDetail.gender} </p>
                    <p><span>Status: </span>{characterDetail.status} </p>
                    <p><span>Species: </span>{characterDetail.species} </p>
                </div>
                <div className='col-md-12 episode'>
                    <h3 className='episode-header'>Episodes of the series</h3>
                    <p className='character-episode'>{ characterEpisode}</p>
                </div>
               
            </div>
        </div>
    )
}

export default CharacterDetail;
