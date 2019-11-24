import React, { Component } from 'react'
import moment from 'moment/min/moment-with-locales'
moment.locale('fr')

export class ContentActualite extends Component {    
    render() {
        function returnHTML(html, char) {
            if(html.length >= char){
               return {__html: html.substr(0, char)+'...'}; 
            }else{
                return {__html: html}; 
            }            
        }

        let dateActu = moment(this.props.date).format('DD-MM-YYYY')

        return (
            <div className="une_actu_home_container">
                <div className="une_actu_home_date">{dateActu}</div>              
                <h3 dangerouslySetInnerHTML={returnHTML(this.props.title,150)} className="une_actu_home_titre" />
                <div dangerouslySetInnerHTML={returnHTML(this.props.excerpt,150)} className="une_actu_home_texte" />
                <div className="une_actu_home_lire">Lire la suite</div>                
            </div>
        )
    }
}

export default ContentActualite
