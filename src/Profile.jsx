import React, { Component } from 'react';
import './css/App.css';

class Profile extends Component {



    render() {

        let artist = {
            name: '', // string json
            followers: { total: '' }, //object json
            images: [{ url: '' }], //object inside array
            genres: [], // array json
            items:[]
        };

        artist = this.props.artist !== null ? this.props.artist : artist; //save artist if not = null

        return (
            
                <div className="profile">
                    <img
                        alt="Profile"
                        className="profile-img"
                        src={artist.images[0].url}
                    />
                    <div className="profile-info">
                    <div className="profile-name">{artist.name}</div>
                    <div className="profile-follow">
                        Followers: {artist.followers.total}
                        </div>
                    <div className="profile-genres">
                        {
                            artist.genres.map((genre, k) => {

                                genre = genre !== artist.genres[artist.genres.length - 1] 
                                                    ? `${genre},` : `${genre}`;
                                //map requires return
                                return (
                                    <span key={k}> {genre} </span>
                                )


                            })
                        }
                    </div>  
                    </div>
                    
                </div>

          

        )



    }
}

export default Profile;