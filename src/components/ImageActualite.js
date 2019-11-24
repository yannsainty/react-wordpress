import React, { Component } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export class ImageActualite extends Component {

    constructor(){
        super()
        this.state = {
            InfosImageActualite: null
        }
    }

    componentDidMount(){
        axios.get(`https://paris-hotel-taylor.com/wp-json/wp/v2/media/${this.props.id}`)
        .then(
          response => {
            this.setState({
                InfosImageActualite : response.data             
            })
          }
        )
        .catch(function(error) {
            console.log('Fetch error: ' + error.message);
        });
    }

    render() {
        const InfosImageActualite = this.state.InfosImageActualite;

        if (InfosImageActualite === null) {
            return (
                <div className="une_actu_home_img_container" style={{padding:'115px 0'}}>
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
                <div className="une_actu_home_img_container">
                    <div className="une_actu_home_img" style={{background:`url(${InfosImageActualite.media_details.sizes.large.source_url}) no-repeat center center transparent`, backgroundSize:'cover'}}></div>
                </div>
            )
        }  
    }
}

export default ImageActualite
