import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import If from '../utils/if';

import { sumSearch } from './dictionaryActions';

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

                <Form.Control 
                    value={translationLanguage} 
                    as="select" className="form-control" 
                    onChange={this.handleChange}>
                        {word.translations.map((translation, key) => (
                            <option key={key} value={key}>{translation.language}</option>
                        ))}
                </Form.Control>
            </If>

            <If test={word.translations.length === 1}>
                    {word.translations[0].language}
            </If>
            </>
        );
    }

    render(){
        const { word } = this.props;
        return(
            <If test={ this.filterLanguage() && this.filterSentence() }>
                <tr>
                    <td>{word.word}</td>
                    <td>
                        {this.renderLanguages()}
                    </td>
                    <td>{word.translations[this.returnLanguageKey()].translation}</td>
                    <td align="center">
                        <Button variant="outline-dark" onClick={() => this.playAudio() }>
                            <FontAwesomeIcon icon={faVolumeUp} />
                        </Button>
                    </td>
                </tr>
            </If>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ sumSearch }, dispatch);
export default connect(null, mapDispatchToProps)(DictionaryRow);