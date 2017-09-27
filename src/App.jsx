import React, { Component } from 'react';
import './css/App.css'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile.jsx';
import Gallery from './Gallery.jsx';
import Discs from './Discs.jsx';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            items:[],
            tracks:[]
        }
    }

    search() {
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        //access code changes every 30 min shitty spotify
        var accessCode = 'BQAE_SWp4oleoRHgLCZ7i-1Nv9sojhaCT2sUBSWWhQ1jPEsrgh9HyY87fwWeTFaAwgt_iY2J8huWgdKmx45wyaiPyg3qr1GVLNuskF9vvxASEzROYwOYav43mX6fN5HND0zrJ5g1vwBf7qJzlCkDo0Y9lZjbqiABuDHk&refresh_token=AQD2tcMin8qi1aucDvTce32dOjB4ITkGoNIl6MXxtY5pjENvZfWTYlozk7lffqzqj5AA8Xol3zmf9NUe9QOujK6h69DvZiNjML_j8rw2zUDhwxTxt67f5LC5cWYIzi-mZxk';

        var myOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessCode
            },
            mode: 'cors',
            cache: 'default'
        };

        fetch(FETCH_URL, myOptions)
            .then(response => response.json())
            .then(json => {
                const artist = json.artists.items[0];
                this.setState({ artist });

                FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=FI&`
                fetch(FETCH_URL, myOptions)
                    .then(response => response.json())
                    .then(json => {
                       // console.log(json);
                        const { tracks } = json;
                        this.setState({ tracks });

                    });

                FETCH_URL = `${ALBUM_URL}${artist.id}/albums?offset=0&limit=20&album_type=album&market=EC&`
                fetch(FETCH_URL, myOptions)
                    .then(response => response.json())
                    .then(json => {
                        //console.log(json);
                        const { items } = json;
                        this.setState({ items });

                    });



            })
        

    }




    render() {


        return (
            <div className="App">
                <div className="App-title">  Music Searcher</div>
                <FormGroup>
                    <InputGroup>

                        <FormControl
                            type="text"
                            placeholder="Search Artist"
                            value={this.state.query}
                            onChange={event => { this.setState({ query: event.target.value }) }}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search()
                                }

                            }}
                        />

                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search" />
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>

                {
                    this.state.artist !== null ?
                        <div>
                            <Profile
                                artist={this.state.artist}

                            />
                         

                            <Gallery 
                                tracks={this.state.tracks}
                               
                            
                            />

                               <Discs
                                items={this.state.items}
                            />
                        </div>

                        : <div></div>
                }
            </div>

        )
    }
}

export default App;