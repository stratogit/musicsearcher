import React, { Component } from 'react';
import './css/App.css'

class Discs extends Component {
    render() {
      //  console.log(this.props);
        const { items } = this.props;
     
        return (
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
            </div>
        )


    }
}

export default Discs