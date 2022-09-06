import React, { useEffect, useState } from 'react'
import Api from '../api';
import EpisodeCart from '../components/Episodes/EpisodeCart';
import axios from 'axios';

export default function Home(){
    const [episodeData, setEpisodeData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const response = await axios.get(
            `https://rickandmortyapi.com/api/episode`
          );
    
          setEpisodeData(response.data.results);
        };
    
        fetchData();
      });
    return (
        <div className='container episodes'>
        <div className='row'>{
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
