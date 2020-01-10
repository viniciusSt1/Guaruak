import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Table, Form } from 'react-bootstrap';

import Navbar from '../template/navbar';
import DictionaryRow from './dictionaryRow';
import If from '../utils/if';

import { getWords, resetSearch } from './dictionaryActions';

class Dictionary extends Component{

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
        if(this.props.location.pathname.indexOf('/admin') === -1){
            require('bootstrap/dist/css/bootstrap.min.css');
        }
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
            <>
            <Navbar activeItem="home" />

            <Container className="my-4">

                <h2 className="text-center mb-4">Dicionário</h2>

                <Row>
                    <Col md={6} className="form-group">
                        <Form.Label>Língua</Form.Label>
                        <Form.Control as="select" defaultValue="todas" id="lingua" onChange={this.filterLanguage}>
                            <option value="todas">Todas</option>
                            <option value="guarani">Guarani</option>
                            <option value="terena">Terena</option>
                        </Form.Control>
                    </Col>
                    <Col md={6} className="form-group">
                        <Form.Label>Pesquisar</Form.Label>
                        <Form.Control onChange={this.filterSentence} type="text" />
                    </Col>
                </Row>

                <Table responsive bordered id="example" className="w-100">
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
                </Table>

            </Container>
        </>
        );
    }
}

const mapStateToProps = state => ({
	words: state.dictionary.words, 
	sumSearch: state.dictionary.sumSearch 
});
const mapDispatchToProps = dispatch => bindActionCreators({ getWords, resetSearch }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);