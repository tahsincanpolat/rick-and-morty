import React, { useEffect, useState } from 'react'
import Api from '../api';
import EpisodeCart from '../components/Episodes/EpisodeCart';

export default function Home(){
    const [episodeData, setEpisodeData] = useState([]);
    const api = new Api();      
    useEffect(() => {
        const fetchData = () => {
            api.getEpisodes().then(resp => {
                setEpisodeData(resp.data.results);
            }); 
        };
        fetchData();
      },[]);
    return (
        <div className='container episodes'>
        <div className='row'>
            <h2>Episodes</h2>
            {
            episodeData.map((episode,index) => {
                return( 
                <EpisodeCart data={episode} key={index}/>
                )
            })
        }
        </div>
        </div>
    )
}
