import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Api from '../../api/index';

export default class CharacterCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            episodeCharacter: this.props.characters,
            singleCharacter:[]
        };
        this.api = new Api();
    }
    // componentDidMount(){
    //   this.state.episodeCharacter?.map(characterUrl => {
    //         this.api.getCharacter(characterUrl).then(resp => {
    //             this.setState({
    //                 singleCharacter: resp.data
    //             });
    //         });
    //     })

    // }
  render() {
    console.log(this.state.singleCharacter);
    const singleCharacter = this.state.singleCharacter.map((item, i) => {
        return item
    });
    return (
            <div className='col-md-4 '>
                {singleCharacter}
                {/* <Link to={"/episode/" + episode.id }>
                    <div className='episode-cart'>
                        <img src={isSeasonOne ? "assets/cover-season-one.jpg" : "assets/cover-season-two.jpg"} className='img-fluid' alt={episode.name}/>
                        <div className='info-box'>
                            <p className='name'>{episode.name}</p>
                            <p className='episode'>{episode.episode}</p>
                        </div>
                    </div>
                </Link> */}
            </div>
        
    )
  }
}
