import React, { Component } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export class ImageChambre extends Component {

    constructor(){
        super()
        this.state = {
            infosImageChambre: null
        }
    }

    componentDidMount(){
        axios.get(`https://paris-hotel-taylor.com/wp-json/wp/v2/media/${this.props.id}`)
        .then(
          response => {
            this.setState({
                infosImageChambre : response.data             
            })
          }
        )
        .catch(function(error) {
            console.log('Fetch error: ' + error.message);
        });
    }

    render() {
        const infosImageChambre = this.state.infosImageChambre;

        if (infosImageChambre === null) {
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
            if(this.props.parent == 'NosChambres'){
                return (
                    <div className="chambre_top_img" style={{background:`url(${infosImageChambre.media_details.sizes.large.source_url}) no-repeat center center transparent`, backgroundSize:'cover'}}></div>
                )
            }else{
                return (
                    <div className="une_chambre_img_container">
                        <div className="une_chambre_image" style={{background:`url(${infosImageChambre.media_details.sizes.large.source_url}) no-repeat center center transparent`, backgroundSize:'cover'}}></div>
                    </div>
                )
            }
        }  
    }
}

export default ImageChambre
