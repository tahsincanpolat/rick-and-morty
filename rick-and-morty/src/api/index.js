import axios from 'axios';
export default class Api {
  
    getDatas = async (endPoint) => {
        return await(axios.get(endPoint)
            .then(response => {
                return response;
            })
            .catch(errors => {
                return {
                    errors: errors
                };
            })
        );
    };

    getEpisodes() {
        return this.getDatas('https://rickandmortyapi.com/api/episode/');
    }

    getSingleEpisode(episodeId) {
        return this.getDatas('https://rickandmortyapi.com/api/episode/'+ episodeId);
    }

    getCharacterList(endPoint = 'https://rickandmortyapi.com/api/character') {
        return this.getDatas(endPoint)
    }

    getCharacter(endPoint) {
        return this.getDatas(endPoint);
    }

   
}
