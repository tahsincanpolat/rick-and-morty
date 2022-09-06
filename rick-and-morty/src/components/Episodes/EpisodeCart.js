import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class EpisodeCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            episode: this.props.data,
        };

    }
  render() {
    const episode = this.state.episode;
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
}
