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
        const { tracks } = this.props;

        return (
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
                            <p className="track-text">
                                {track.name}
                            </p>
                        </div>
                    )
                })}
            </div>
        )


    }
}

export default Gallery