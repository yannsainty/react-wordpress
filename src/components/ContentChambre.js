import React, { Component } from 'react'

export class ContentChambre extends Component {
    render() {

        function returnHTML(html, char) {
            if(html.length >= char){
               return {__html: html.substr(0, char)+'...'}; 
            }else{
                return {__html: html}; 
            }            
          }  

        return (
            <div className="une_chambre_home_bulle" id={this.props.id}>
                <div className="callage">
                    <img alt={this.props.id} src={require(`../components/img/picto_chambre_${this.props.slug}.png`)} className="une_chambre_home_bulle_picto" />
                    <div className="une_chambre_home_bulle_titre" dangerouslySetInnerHTML={returnHTML(this.props.title,150)} />
                </div>
            </div>
        )
    }
}

export default ContentChambre
