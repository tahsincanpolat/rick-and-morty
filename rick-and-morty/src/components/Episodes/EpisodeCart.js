import React from 'react'
import { Link } from 'react-router-dom';

function EpisodeCart(props) {
    const episode = props.data;
    let findSeason = episode.episode;
    let isSeasonOne = findSeason.includes("S01");
    return (
        <div className='col-md-4 '>
            <Link to={"/episode/" + episode.id }>
                <div className='episode-cart'>
                    <img src={isSeasonOne ? "assets/cover-season-one.jpg" : "assets/cover-season-two.jpg"} className='img-fluid' alt={episode.name}/>
                    <div className='info-box'>
                        <p className='name'>{episode.name}</p>
                        <p className='episode'>{episode.episode}</p>
                    </div>
                </div>
            </Link>
        </div>  
    )
  }
export default EpisodeCart;
