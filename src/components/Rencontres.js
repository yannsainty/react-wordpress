import React, { Component } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ImageSlick from '../components/ImageSlick'

export class Rencontres extends Component {

    constructor(){
        super()
        this.state = {             
            rencontres : [],        
            activeSlick: 0,
            slickNom : 'MARIA',
            slickCitation : 'Polyglotte et attentive à vos besoins, je vous accueille tous les matins pour notre savoureux petit-déjeuner',
            slickPoste : 'Service petit-déjeuner'
        }
    }

    componentDidMount(){
        //Récup des rencontres du WP
        let rencontresURL= "https://paris-hotel-taylor.com/wp-json/wp/v2/rencontre"
        fetch(rencontresURL).then(
        response => response.json()
        ).then(
        response => {
            this.setState({
            rencontres : response
            })
        }
        )
    }

    render() {

         //SLICK SETTINGS
        const rencontres = this.state.rencontres;  
        
        const slickSettings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '60px',
        responsive: [        
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            },
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
            }
        ],
        afterChange: current =>
        //On parcours les rencontres et on fait le matching avec la slide courante pour update les states des rencontres et donc l'affichage du nom, poste et citation
        rencontres.map((rencontre, index) => {      
            if(current === index){
                this.setState({ 
                    slickNom: rencontre.title.rendered,
                    slickPoste: rencontre.acf.poste,
                    slickCitation: rencontre.acf.citation
                })
            }        
        })};
        
        return (
            <div id="container_slider_rencontres">
                <div className="container-fluid">
					<div className="row">
						<div className="col-md-1"></div>
						<div className="col-md-10 no_padding">
                            <Slider {...slickSettings}>
                            {
                                rencontres.map((rencontre, i) => {                         
                                return (
                                    <div >
                                    <ImageSlick  
                                        key={rencontre.id}                              
                                        id={rencontre.featured_media}                                
                                    >
                                    </ImageSlick>
                                                            </div>
                                )
                                })  
                            } 
                            </Slider>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="center">
                                <div id="slider_rencontres_nom">{this.state.slickNom}</div><br />
                                <div id="slider_rencontres_poste">{this.state.slickPoste}</div><br />
                                <div id="slider_rencontres_citation">{this.state.slickCitation}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Rencontres
