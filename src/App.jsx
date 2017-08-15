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
        var accessCode = 'BQBe0ycNX-mcpu_s8ikSLfuJLgUXXYusYkZKC4i-d_8nbaBhhKDrjIYswBCuAR2lRCACRpwbP27gLSob7O102VCdNf9mLbkcu-TSK6iH5Kk7TJI9qO7SPTD1QdnKtO8kl2zSABZS8otwsU7dnNZ6sL_RnW4Q87DtCInJ&refresh_token=AQDGziFnC5Q7ujLV9gZMTQ_38xoIljOMzYWm6XnTwZPYof6i947j7GY4KoPjJH7twgak3qVpkEyZq2Wab5wNcrt-H4GcdTapFjCw4W8Qlyl1AduQpizPzWt0o2c7AXHN6Q8';

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