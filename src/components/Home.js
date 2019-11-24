import React from 'react';
import Chambre from '../components/Chambre'
import Actualite from '../components/Actualite'
import Rencontres from '../components/Rencontres'
import '../App.scss';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/scale-out-animation';
import axios from 'axios'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { ParallaxProvider, Parallax } from 'react-skrollr'

class Home extends React.Component {

    constructor(){
        super()
        this.state = {
          chambres: [],
          actualites : [],
          donneesHome: null
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
    
        //Récup des actualites du WP
        let actusURL= "https://paris-hotel-taylor.com/wp-json/wp/v2/posts?filter[orderby]=date&order=asc&per_page=3&status=publish"
        fetch(actusURL).then(
          response => response.json()
        ).then(
          response => {
            this.setState({
              actualites : response
            })
          }
        )
    
        //Récup des données de la home
        axios.get("https://paris-hotel-taylor.com/wp-json/wp/v2/pages/5")
        .then(
          response => {
            this.setState({
              donneesHome : response.data             
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
            return (        
            <Chambre key={chambre.id} chambre={chambre.id} />
            )
        })
    
        //Parcours des actualites
        let actualites = this.state.actualites.map((actualite, index) => {
            return (        
            <Actualite key={actualite.id} actualite={actualite.id} />
            )
        })
    
        //Parcours des données de la home
        const donneesHome = this.state.donneesHome;     
    
        if (donneesHome === null) {
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
                donneesHome.acf.slider_header.map((photo, i) => {
                return (
                    <div data-src={photo.image.url} />
                )
                })  
            }     
            </AutoplaySlider>
        );
    
        function returnHTML(html, char) {
            if(html.length >= char){
            return {__html: html.substr(0, char)+'...'}; 
            }else{
                return {__html: html}; 
            }            
        }  

        return (
            <ParallaxProvider
                init={{
                edgeStrategy: 'set',
                    smoothScrolling: true,
                    forceHeight: false
                }}
            >
                <div id="page-wrap">
                    <div className="containerSlider">
                        {slider}
                        <div id="header_overlay"></div>
                        <img alt="" className="logo_accueil" src={require(`../components/img/logo_home.png`)} />
                    </div>  
                    <div className="container" id="container_offre">
                        <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <div id="container_offre_content">
                            <div id="container_offre_texte">
                                <div id="container_offre_titre">{donneesHome.acf.titre_de_loffre}</div>
                                <div id="container_offre_sous_titre">{donneesHome.acf.sous_titre_de_loffre}</div>
                                <div id="container_offre_texte" dangerouslySetInnerHTML={returnHTML(donneesHome.acf.texte_de_loffre,150)} />
                            </div>
                            {!!(donneesHome.acf.lien_de_loffre)?
                                (
                                <div className="center">
                                    <a className="btn_vert" href={donneesHome.acf.lien_de_loffre} id="btn_offre"><span>EN PROFITER</span></a>
                                </div>
                                )
                            :
                                (
                                <div></div>
                                )
                            }
                            <img alt="" className="hidden-sm hidden-xs" id="offre_img_left" src={require(`../components/img/offre_left.png`)} />
                            <img alt="" className="hidden-sm hidden-xs" id="offre_img_right" src={require(`../components/img/offre_right.png`)} />
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                        </div>
                    </div>  
                    <div className="bande_bleue" id="bande_bleue_home">
                        <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                            <Parallax
                            data={{
                                'data-bottom-center': 'transform: translate3d(0, 50px, 0); opacity:0;',
                                'data-center-center': 'transform: translate3d(0, 0, 0); opacity:1;'
                            }}
                            >
                            <div id="bande_bleue_home_photo" style={{background:`url(${donneesHome.acf.image_bande_bleue.url}) no-repeat center center transparent`, backgroundSize:'cover'}}></div>
                            </Parallax>
                            </div>
                            <div className="col-md-4">
                            <div id="bande_bleue_home_texte">
                                <Parallax
                                data={{
                                    'data-bottom-center': 'transform: translate3d(50px, 0px, 0); opacity:0;',
                                    'data-center-center': 'transform: translate3d(0, 0, 0); opacity:1;'
                                }}
                                >
                                <div className="fond_blanc_full"></div>
                                </Parallax>
                                <Parallax
                                data={{
                                    'data-bottom-center': 'transform: translate3d(0, 50px, 0); opacity:0;',
                                    'data-center-center': 'transform: translate3d(0, 0, 0); opacity:1;'
                                }}
                                >
                                <h1 className="titre_vert center" dangerouslySetInnerHTML={returnHTML(donneesHome.title.rendered,150)} />
                                </Parallax>
                                <Parallax
                                data={{
                                    'data-bottom-center': 'transform: translate3d(0, 50px, 0); opacity:0;',
                                    'data-center-center': 'transform: translate3d(0, 0, 0); opacity:1;'
                                }}
                                >
                                <div className="texte_classique" dangerouslySetInnerHTML={returnHTML(donneesHome.content.rendered,500)} />
                                </Parallax>
                                
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="titre_bleu">Chambres</h2>
                            </div>            
                        </div>
                        <div className="row">
                        {chambres}
                        </div>
                    </div>
                    <div id="bande_actualites_home">
                        <div className="container">
                            <div className="row">
                                {actualites}
                            </div>
                        </div>
                    </div>
                    <div id="bande_rencontres_home">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                <Rencontres />
                                </div>
                            </div>
                        </div>
                    </div>        
                </div>
            </ParallaxProvider>
        )
    }
}

export default Home
