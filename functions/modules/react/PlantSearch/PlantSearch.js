import React from 'react'
import BaseInput from './BaseInput/BaseInput';

export default class extends React.Component {
  constructor(props) {
    super(props)
    const html = document.getElementsByTagName('html')[0]
    const lang = html.lang
    this.state = {
      lang,
      value: '',
      improvementMenuOpen: false,
      improvement: null,
      message: null,
      error: null,
      results: null
    }
  }

  handleValueChange(value) {
    this.setState({
      value,
      error: null
    })
  }
  
  handleEnterPress() {
    const { improvementMenuOpen } = this.state
    if (!improvementMenuOpen) {
      this.setState({
        improvementMenuOpen: true
      })
    } else {
      this.searchPlant()
    }
  }
  
  handleImprovementButtonClick() {
    const { improvementMenuOpen } = this.state
    this.setState({
      improvementMenuOpen: !improvementMenuOpen
    })
  }

  searchPlant() {
    const { translations = {} } = this.props
    const { lang, improvement, value } = this.state
    if (value.length >= 3) {
      this.setState({
        improvementMenuOpen: false,
        message: translations.loading || 'loading',
        error: null,
        results: null
      })
      fetch(`/api/plants/search?key=${ value 
          }&lang=${ lang 
          }&improvement=${ improvement }`, {
        method: 'GET'
      })
        .then(result => result.json())
        .then(({ plants }) => this.setState({
          results: plants
        }))
        .catch(err => {
          this.setState({
            load: false,
            error: err.message,
            results: []
          })
        })
    }
  }

  handleResultValidation() {
    this.props.selectPlant(
      this.state.results[0]._id)
  }

  handleResultsSelect(plant) {
    this.props.selectPlant(plant)
  }
  
  handleResultDismiss() {
    this.state.setState({
      results: []
    })
  }

  render() {
    const { translations = {} } = this.props
    const { value, results, message, error, improvementMenuOpen } = this.state
    return (
      <div className='plant-search container'>
        <BaseInput value={ value }
            highlight={ 
              improvementMenuOpen ? 'search' :
                !improvementMenuOpen && !message && !results && !error ? 'improvement' : false }
            handleValueChange={ this.handleValueChange.bind(this) }
            handleEnterPress={ this.handleEnterPress.bind(this) }
            handleImprovementButtonClick={ this.handleImprovementButtonClick.bind(this) }
            searchPlant={ this.searchPlant.bind(this) }
            translations={ translations }/>
        {
          message && !error && (
            <div className='row'>
              <div className='col-12 alert alert-info'>
                .. { message }
              </div>
            </div>
          )
        }
        {
          error && (
            <div className='row'>
              <div className='col-12 alert alert-warning'>
                .. { error }
              </div>
            </div>
          )
        }
        {
          results && results.length === 1 && (
            <div className='row alert alert-success'>
              <button type='button' className='close col-12 text-right'
                  data-dismiss='alert' aria-label='Close'
                  onClick={ () => this.handleResultDismiss() }>
                <span aria-hidden="true">&times;</span>
              </button>
              <p className='col-12'>
                <b>{ results[0]._id } ?</b></p>
              <button className='btn btn-success col-md-6 offset-md-6 col-12 my-1'
                  onClick={ () => this.handleResultValidation() }>
                yes</button>
            </div>
          )
        }
        {
          results && results.length > 1 && (
            <div className='row'>
              <label className='text-uppercase'>
                { translations.resultsLabel || 'plant results' }</label>
              <select className='form-control mb-4'
                  onChange={ e => this.handleResultsSelect(e.target.value) }>
                <option value={ null }>
                  { translations.selectPlant ||'choose a plant' }</option>
                {
                  results.map(({ _id, name }) => (
                    <option key={ _id } value={ _id }>
                      { name || _id }</option>
                  ))
                }
              </select>
            </div>
          )
        }
      </div>
    )
  }
}