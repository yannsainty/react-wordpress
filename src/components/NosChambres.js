import React, { Component } from 'react'
import ChambreMini from '../components/ChambreMini'
import ChambreSolo from '../components/ChambreSolo'
import ChambreDuoTwin from '../components/ChambreDuoTwin'
import ChambrePrivilege from '../components/ChambrePrivilege'
import '../App.scss';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/scale-out-animation';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import axios from 'axios'

class NosChambres extends Component {

    constructor(){
        super()
        this.state = {
          chambres: [],
          donneesChambres: null
        }
    }

    componentDidMount(){

        //Récup des chambres du WP
        let chambresURL= "https://paris-hotel-taylor.com/wp-json/wp/v2/chambre?filter[orderby]=date&order=asc"
        fetch(chambresURL).then(
          response => response.json()
        ).then(
          response => {
            this.setState({
              chambres : response
            })
          }
        )

        //Récup des données de la page chambre
        axios.get("https://paris-hotel-taylor.com/wp-json/wp/v2/pages/45")
        .then(
          response => {
            this.setState({
                donneesChambres : response.data             
            })
          }
        )
        .catch(function(error) {
            console.log('Fetch error: ' + error.message);
        });
    }    

    render() {
        //Parcours des chambres
        let chambres = this.state.chambres.map((chambre, index) => {
            if(chambre.id == 56){
                return (        
                    <ChambreMini key={chambre.id} chambre={chambre.id} />
                )
            }else if(chambre.id == 60){
                return (        
                    <ChambreSolo key={chambre.id} chambre={chambre.id} />
                )
            }else if(chambre.id == 61){
                return (        
                    <ChambreDuoTwin key={chambre.id} chambre={chambre.id} />
                )
            }else if(chambre.id == 62){
                return (        
                    <ChambrePrivilege key={chambre.id} chambre={chambre.id} />
                )
            }
            
        })   

        //Parcours des données de la home
        const donneesChambres = this.state.donneesChambres;     
    
        if (donneesChambres === null) {
            return (
            <Loader
                type="MutatingDots"
                color="#BADA55"
                height={100}
                width={100}
                timeout={3000}
            /> 
            ) 
        }else{      
            
        } 
        
        //Awesome slider
        const AutoplaySlider = withAutoplay(AwesomeSlider);

        const slider = (
            <AutoplaySlider
                play={true}
                cancelOnInteraction={true}
                interval={5000}
                cssModule={AwesomeSliderStyles}
            >
            {
                donneesChambres.acf.slider_header.map((photo, i) => {
                return (
                    <div data-src={photo.image.url} />
                )
                })  
            }     
            </AutoplaySlider>
        );

        return (
            <div id="page-wrap">
                <div className="containerSlider">
                    {slider}
                    <div id="header_overlay"></div>
                    <img className="logo_inter" src={require(`../components/img/logo_home.png`)} />
		 	        <h1 id="titre_header">Nos chambres</h1>
                </div>  
                {chambres}
            </div>
        )
    }
}

export default NosChambres
