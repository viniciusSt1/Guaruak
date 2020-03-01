import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import If from '../../utils/if';

import { sumSearch } from './dictionaryAdminActions';

import axios from 'axios';

class DictionaryRow extends Component{

    constructor(props){
        super(props);
        this.state = { 
            translation: 0 
        }

        this.handleChange = this.handleChange.bind(this);
        this.renderLanguages = this.renderLanguages.bind(this);
        this.filterLanguage = this.filterLanguage.bind(this);
        this.returnLanguageKey = this.returnLanguageKey.bind(this);
    }

    componentDidMount(){
        if(this.filterSentence() && this.filterLanguage()){
            this.props.sumSearch();
        }
    }

    componentDidUpdate(){
        if(this.filterSentence() && this.filterLanguage()){
            this.props.sumSearch();
        }
    }

    handleChange(event){
        this.setState({ ...this.state, translation: event.target.value });
    }

    playAudio(){
        const audio = new Audio(this.props.word.translations[this.returnLanguageKey()].audio);
        audio.play();
    }

    filterLanguage(){
        const languageSearch = this.props.languageSearch;

        if(languageSearch === 'todas'){
            return true;
        }else{

            const translations = this.props.word.translations;
            const wordsLanguageSearch = translations.filter(translation => translation.language === languageSearch);
            if(wordsLanguageSearch.length !== 0){
                return true;
            }
            return false;
        }
    }

    filterSentence(){
        const { sentenceSearch, word } = this.props;

        if(word.translations[this.returnLanguageKey()].translation.indexOf(sentenceSearch) !== -1 || word.word.indexOf(sentenceSearch) !== -1){
            return true;
        }
        return false;
    }

    returnLanguageKey(){

        const languageSearch = this.props.languageSearch;
        const translations = this.props.word.translations;
        var translationLanguage = this.state.translation;

        const wordsLanguageSearch = translations.filter(translation => translation.language === languageSearch);

        if(wordsLanguageSearch.length !== 0){

            translations.forEach((translation, key) => {
                if(wordsLanguageSearch[0].language === translation.language){
                    translationLanguage = key;
                }
            });
        }

        return translationLanguage;
    }

    renderLanguages(){
        const translationLanguage = this.returnLanguageKey();
        const { word } = this.props;
        return (
            <>
            <If test={word.translations.length > 1}>

                <select
                    className="form-control"
                    value={translationLanguage}
                    onChange={this.handleChange}>
                        {word.translations.map((translation, key) => (
                            <option key={key} value={key}>{translation.language}</option>
                        ))}
                </select>
            </If>

            <If test={word.translations.length === 1}>
                    {word.translations[0].language}
            </If>
            </>
        );
    }
    render(){
        const { word } = this.props;
        const rota = `http://localhost:3001/admin/delete/${word._id}`
        return(
            <If test={ this.filterLanguage() && this.filterSentence() }>
                <tr>
                    <td>{word.word}</td>
                    <td>
                        {this.renderLanguages()}
                    </td>
                    <td>{word.translations[this.returnLanguageKey()].translation}</td>
                    <td align="center">
                        <button className="btn btn-dark" onClick={() => this.playAudio() }>
                            <FontAwesomeIcon icon={faVolumeUp} />
                        </button>
                    </td>
                    <td align="center" width="120px">
                        <form action={rota} method="post">
                            <input type="hidden" name="id" value={word._id}/>
                            <button type="submit" className="btn btn-danger">
                            Remover <span className="glyphicon glyphicon-trash"></span>
                            </button>
                        </form>
                        
                    </td>
                </tr>
            </If>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ sumSearch }, dispatch);
export default connect(null, mapDispatchToProps)(DictionaryRow);