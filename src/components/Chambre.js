import React, { Component } from 'react'
import axios from 'axios'
import ImageChambre from '../components/ImageChambre'
import ContentChambre from '../components/ContentChambre'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export class Chambre extends Component {

    constructor(){
        super()
        this.state = {
            infosChambre: null
        }
    }

    componentDidMount(){
        axios.get(`https://paris-hotel-taylor.com/wp-json/wp/v2/chambre/${this.props.chambre}`)
        .then(
          response => {
            this.setState({
              infosChambre : response.data             
            })
          }
        )
        .catch(function(error) {
            console.log('Fetch error: ' + error.message);
        });
    }

    render() {     
        const infos = this.state.infosChambre;

        if (infos === null) {
            return (
                <div className="col-md-6">
                    <div className="une_chambre_home">
                    <Loader
                        type="MutatingDots"
                        color="#BADA55"
                        height={100}
                        width={100}
                        timeout={3000}
                    />
                    </div>                    
                </div>               
            )
        }else{
            return (
                <div className="col-md-6">
                    <a href={infos.link} className="une_chambre_home">
                        <ImageChambre id={infos.featured_media} />
                        <ContentChambre slug={infos.slug} title={infos.title.rendered} id={`une_chambre_home_bulle_${infos.slug}`} />
                    </a>
                </div>                
            )
        }        
    }
}

export default Chambre
