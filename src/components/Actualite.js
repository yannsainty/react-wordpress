import React, { Component } from 'react'
import axios from 'axios'
import ImageActualite from '../components/ImageActualite'
import ContentActualite from '../components/ContentActualite'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export class Actualite extends Component {

    constructor(){
        super()
        this.state = {
            infosActualite: null
        }
    }

    componentDidMount(){
        axios.get(`https://paris-hotel-taylor.com/wp-json/wp/v2/posts/${this.props.actualite}`)
        .then(
          response => {
            this.setState({
                infosActualite : response.data             
            })
          }
        )
        .catch(function(error) {
            console.log('Fetch error: ' + error.message);
        });
    }

    render() {
        const infos = this.state.infosActualite;

        if (infos === null) {
            return (
                <div className="col-md-4">
                    <div className="une_actu_home">
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
                <div className="col-md-4">
                    <a href={infos.link} className="une_actu_home">
                        <ImageActualite id={infos.featured_media} />
                        <ContentActualite date={infos.date} title={infos.title.rendered} excerpt={infos.excerpt.rendered} />
                    </a>
                </div>                
            )
        } 
    }
}

export default Actualite
