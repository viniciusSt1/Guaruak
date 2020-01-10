import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import DictionaryRow from './dictionaryRow';
import If from '../../utils/if';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

import { getWords, resetSearch } from './dictionaryAdminActions';

class Index extends Component{

    constructor(props){
        super(props);

        this.state = {
            languageSearch: 'todas',
            sentenceSearch: ''
        }

        this.filterLanguage = this.filterLanguage.bind(this);
        this.filterSentence = this.filterSentence.bind(this);
    }

    componentWillMount() {
        this.props.getWords();
    }

    filterLanguage(event){
    	this.props.resetSearch();
        const languageSearch = event.target.value;
        this.setState({ ...this.state, languageSearch });
    }

    filterSentence(event){
    	this.props.resetSearch();
        const sentenceSearch = event.target.value;
        this.setState({ ...this.state, sentenceSearch });
    }

    render(){
        const words = this.props.words || [];

        return (
            <div className="content-wrapper">
                <div className="content-header">
                    <h1>Palavras</h1>
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/admin">
                                <FontAwesomeIcon icon={faTachometerAlt} />
                                &nbsp; Home
                            </Link>
                        </li>
                        <li className="active">
                            Palavras
                        </li>
                    </ol>
                </div>
                <div className="content">
                    <div className="box">
                        <div className="box-body">
                            <div id="table_words_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
                                <div className="row" style={{ marginBottom: '1em' }}>
                                    <div className="col-sm-6">
                                        <label>Search: &nbsp;</label>
                                        <input type="search" className="form-control input-sm" onChange={this.filterSentence} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Língua: &nbsp;</label>
                                        <select defaultValue="todas" id="lingua" onChange={this.filterLanguage} className="form-control input-sm">
                                            <option value="todas">Todas</option>
                                            <option value="guarani">Guarani</option>
                                            <option value="terena">Terena</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <table id="table_words" className="table table-bordered table-striped dataTable" role="grid">
                                            <thead>
                                                <tr>
                                                    <th>Termo</th>
                                                    <th>Traduzir para:</th>
                                                    <th>Tradução</th>
                                                    <th className="text-center">Áudio</th>
                                                </tr>
                                            </thead>
                                            <tbody ref="wordsTable">

                                                { words.map((word, key) => <DictionaryRow languageSearch={this.state.languageSearch} sentenceSearch={this.state.sentenceSearch} key={key} word={word} />) }
                                                
                                                <If test={words.length === 0}>
                                                    <tr >
                                                        <td align="center" colSpan="4">
                                                            <b>Não há nenhuma palavra em nossa base de dados</b>
                                                        </td>
                                                    </tr>
                                                </If>

                                                <If test={ words.length !== 0 && this.props.sumSearch === 0 }>
                                                    <tr >
                                                        <td align="center" colSpan="4">
                                                            <b>Palavra não encontrada</b>
                                                        </td>
                                                    </tr>
                                                </If>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
	words: state.dictionary.words, 
	sumSearch: state.dictionary.sumSearch 
});
const mapDispatchToProps = dispatch => bindActionCreators({ getWords, resetSearch }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Index);