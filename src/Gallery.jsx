import React, { Component } from 'react';
import './css/App.css'

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playingUrl: '',
            audio: null,
            playing: false
        }
    }
    playAudio(previewUrl) {
        let audio = new Audio(previewUrl);

        if (!this.state.playing) {
            audio.play()
            this.setState({
                playing: true,
                playingUrl: previewUrl,
                audio
            })
        } else {
            if (this.state.playingUrl === previewUrl) {
                this.state.audio.pause();
                this.setState({
                    playing: false,
                })
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({
                    playing: true,
                    playingUrl: previewUrl,
                    audio
                })
            }
        }

    }

    render() {
        //console.log(this.props);
   
        
       
          var  {tracks}  = this.props;
     
      //    var  {items}  = this.props;
    



        return (
            <div>
            
                <div>
                    <p>Most Popular tracks in Finland</p>
                    {tracks.map((track, k) => {
                        //console.log(track);
                        const trackImg = track.album.images[1].url;
                        return (
                            <div
                                key={k}
                                className="track"
                                onClick={() => this.playAudio(track.preview_url)}
                            >

                                <img
                                    src={trackImg}
                                    className="track-img"
                                    alt="track"
                                />
                                <div className="track-play">
                                    <div className="track-p-inner">

                                        {
                                            this.state.playingUrl === track.preview_url ?
                                                <span> | | </span> : <span> &#9654;</span>

                                        }
                                    </div>
                                </div>
                                <p className="track-text">
                                    {track.name}
                                </p>
                            </div>
                        )
                    })}
                </div>

{/* 
                <div>
                    <p>Most Popular Albums in Ecuador</p>
                    {items.map((item, k) => {
                        console.log(item);
                        const albumImg = item.images[0].url;
                        return (
                            <div
                                key={k}
                                className="album"
                            >

                                <img
                                    src={albumImg}
                                    className="album-img"
                                    alt="album"
                                />
                                <p className="album-text">
                                    {item.name}
                                </p>
                            </div>
                        )
                    })}
                </div> */}




            </div>




        )


    }
}

export default Gallery