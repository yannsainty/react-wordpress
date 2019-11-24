import React, { Component } from 'react'
import axios from 'axios'
import ImageChambre from '../components/ImageChambre'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export class ChambreDuoTwin extends Component {

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
        
        function returnHTML(html, char) {
            if(html.length >= char){
               return {__html: html.substr(0, char)+'...'}; 
            }else{
                return {__html: html}; 
            }            
        } 
        
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
                <div className="container nos_chambres_une">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-10 no_padding">
                            <div className="container_chambre_top_content">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-7 order-last" style={{height:'100%'}}>
                                            <ImageChambre parent="NosChambres" id={infos.featured_media} />
                                        </div>
                                        <div className="col-md-5 order-first">
                                            <div className="container_chambre_infos">										
                                                <h2 className="chambre_type bleu right">Chambre<br /><span dangerouslySetInnerHTML={returnHTML(infos.title.rendered,150)} /></h2>
                                                <div className="chambre_texte right">
                                                    <span dangerouslySetInnerHTML={returnHTML(infos.excerpt.rendered,150)} />
                                                    <img className="chambre_picto_left" src={require(`../components/img/chambre_picto_duo.png`)} />
                                                </div>
                                                <div style={{clear:'both'}}></div>
                                                <a href="#" className="btn_vert_50">Plus d'infos</a>
                                                <a href="https://sky-eu1.clock-software.com/49764/9114/wbe/products/new" target="_blank" className="btn_bleu_50">Réserver</a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>              
            )
        }        
    }
}

export default ChambreDuoTwin
