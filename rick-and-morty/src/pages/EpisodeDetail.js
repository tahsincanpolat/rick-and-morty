import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Api from '../api';
import CharacterCart from '../components/Characters/CharacterCart';

function EpisodeDetail() {
    const {episodeId} = useParams();
    const [episodeDetailData, setEpisodeDetailData] = useState([]);

    useEffect(() => {
        const api = new Api();      
        const fetchData = async () => {
            await api.getSingleEpisode(episodeId).then(resp => {
                setEpisodeDetailData(resp.data);
            });
        };
        fetchData();
      },[]);
    return (  
        <div className='container episodes'>
            <p> {  episodeDetailData.name } </p>
            <div className='row'>
            {       
                <CharacterCart characters={ episodeDetailData.characters}/>
            } 
            </div>
        </div>
    )
}

export default EpisodeDetail;
