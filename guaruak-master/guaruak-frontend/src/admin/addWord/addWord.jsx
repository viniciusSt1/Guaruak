import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import Messages from '../../utils/messages';

import { init, create } from './addWordActions';

class AddWord extends Component{

	constructor(props){
		super(props);
		this.state = {
			recording: false,
			audio: "",
			mediaRecorder: null,
			chunks : []
		}

		this.record = this.record.bind(this);

		this.initRecording = this.initRecording.bind(this);
		this.record = this.record.bind(this);
		this.playAudio = this.playAudio.bind(this);
	}

	componentWillMount(){
		this.props.init();
		this.initRecording();
	}

	initRecording(){

		navigator.mediaDevices.getUserMedia({ audio:true }).then(stream => {

			const mediaRecorder = new MediaRecorder(stream);

			mediaRecorder.ondataavailable = data => {
				let chunks = this.state.chunks;
				chunks.push(data.data);
				this.setState({
					...this.state, 
					chunks : chunks
				});
			}

			mediaRecorder.onstop = () => {
				const blob = new Blob(this.state.chunks, {type: 'audio/mp3; code=opus'});
				const reader = new window.FileReader();
				reader.readAsDataURL(blob);
				reader.onloadend = () =>{
					this.setState({ ...this.state, chunks: [], audio: reader.result });
				}
			}

			this.setState({ ...this.state, mediaRecorder: mediaRecorder });
			
		}, err => {
			if(err === 'NotAllowedError: Permission denied'){
				alert('Você deve permitir o audio');
			}else{
				alert("Não é possível capturar seu audio");

			}
		})
	}

	record(){

		if(this.state.recording){
			this.state.mediaRecorder.stop();
		}else{
			this.state.mediaRecorder.start();
		}
		this.setState({ ...this.state, 
			recording : !this.state.recording 
		});
	}

	playAudio(){
		const audio = new Audio(this.state.audio);
		audio.play();
	}

    render(){
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
                        <li>
                            <Link to="/admin">
                                &nbsp; Palavras
                            </Link>
                        </li>
                        <li className="active">
                            &nbsp; Adicionar
                        </li>
                    </ol>
                </div>
                <div className="content">
                    <div className="box">
                        <div className="box-body">
                            <h2 className="text-center my-4">Adicionar Palavra</h2>
                            <form onSubmit={ this.props.handleSubmit((values) => this.props.create(values, this.state.audio)) }>
                                <div className="form-group">
                                    <label>Palavra em Português</label>
						            <Field name="word" type="text" component="input" className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label>Língua</label>
                                    <Field name="language" component="select" className="form-control">
                                        <option value="guarani">Guarani</option>
                                        <option value="terena">Terena</option>
                                    </Field>
                                </div>

                                <div className="form-group">
                                    <label>Palavra em {this.props.language}</label>
						            <Field name="translation" component="input" className="form-control" />
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between',  alignItems: 'center' }}>
                                    <button
                                        type="button"
                                        onClick={this.record} 
                                        className={`btn btn-${!this.state.recording ? "success" : "danger"}`}>
                                        {!this.state.recording ? "Iniciar Gravação" : "Parar Gravação"}
                                    </button>

                                    <button
                                        type="button"
                                        className={`btn btn-success ${this.state.audio === "" ? 'disabled' : ''}`}
                                        onClick={this.playAudio}>
                                        <FontAwesomeIcon icon={faVolumeUp} />
                                    </button>
                                </div>

                                <button
                                    type="submit" 
                                    className="btn btn-primary btn-block" 
                                    style={{ marginTop: '1em' }}>
                                    Adicionar
                                </button>
                            </form>

                            <Messages />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddWord = reduxForm({ form: 'addWordForm' })(AddWord);
const selector = formValueSelector('addWordForm');

const mapStateToProps = state => ({
    word: selector(state, 'word'),
    language: selector(state, 'language'),
    translation: selector(state, 'translation')
});
const mapDispatchToProps = dispatch => bindActionCreators({ init, create }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddWord);