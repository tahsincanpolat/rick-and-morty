import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Api from '../api';

function CharacterDetail() {
    const {characterId} = useParams();
    const [characterDetail, setCharacterDetail] = useState([]);
    const [breakEffect, setBreak] = useState(false);

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
      },[breakEffect]);

    return (  
        <div className='container characters'>
            <div>
                <img src={characterDetail.image} alt={characterDetail.name} />
                <p>Name: {characterDetail.name} </p>
                <p>gender: {characterDetail.gender} </p>
                <p>status: {characterDetail.status} </p>
                <p>species: {characterDetail.species} </p>
            </div>
        </div>
    )
}

export default CharacterDetail;
