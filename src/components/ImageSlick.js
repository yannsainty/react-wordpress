import React, { Component } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export class ImageSlick extends Component {

    constructor(){
        super()
        this.state = {
            infosImageSlick: null
        }
    }

    componentDidMount(){
        axios.get(`https://paris-hotel-taylor.com/wp-json/wp/v2/media/${this.props.id}`)
        .then(
          response => {
            this.setState({
                infosImageSlick : response.data             
            })
          }
        )
        .catch(function(error) {
            console.log('Fetch error: ' + error.message);
        });
    }

    render() {
        const infosImageSlick = this.state.infosImageSlick;

        if (infosImageSlick === null) {
            return (
                <div className="une_chambre_img_container" style={{padding:'115px 0'}}>
                    <Loader
                        type="MutatingDots"
                        color="#BADA55"
                        height={100}
                        width={100}
                        timeout={3000}
                    />
                </div>  
            )
        }else{
            return (
                <div 
                    className="un_slide_rencontres"
                    data-nom = {this.props.nom}
                    data-citation = {this.props.citation}
                    data-poste = {this.props.poste}
                    style={{background:`url(${infosImageSlick.media_details.sizes.large.source_url}) no-repeat center center transparent`, backgroundSize:'cover'}}
                ></div>
               
            )
        }  
    }
}

export default ImageSlick
