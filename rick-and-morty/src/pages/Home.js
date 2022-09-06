import React, { useEffect, useState } from 'react'
import Api from '../api';
import EpisodeCart from '../components/Episodes/EpisodeCart';
import axios from 'axios';

export default function Home(){
    const [episodeData, setEpisodeData] = useState([]);
    const api = new Api();      

    useEffect(() => {
        const fetchData = async () => {
            api.getEpisodes().then(resp => {
                setEpisodeData(resp.data.results);
            }); 
        };
        fetchData();
      },[]);
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
