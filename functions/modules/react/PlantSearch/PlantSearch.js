import React from 'react'
import BaseInput from './BaseInput/BaseInput'
import ImprovementMenu from './ImprovementMenu/ImprovementMenu'
import DisplaySingleResult from './DisplaySingleResult/DisplaySingleResult'
import DisplayMultipleResults from './DisplayMultipleResults/DisplayMultipleResults'

const urlBuilder = (improvement, step) => {
  if (improvement === 'ids') {
    return '/ids'
  } else if (improvement === 'names' || step === 2) {
      return '/names'
  } else {
    return ''
  }
}

const nameFormatterFactory = (improvement, step) => 
  (plant, option) => {
    if (improvement === 'names' || step === 2) {
      if (!option) {
        return (
          <React.Fragment>
            { plant.names[0] }
            <br/>
            <i>{ plant._id }</i>
          </React.Fragment>
        )
      } else {
        return `${ plant.names[0] }, ${ plant._id }`
      }
    } else {
      return plant._id
    }
  }

const selectPlant = plant =>
  document.location.href =
    `/${ window.__PROPS__.lang }/plant/${ plant}`

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
      loading: false,
      error: null,
      result: null
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

  handleImprovementChange(improvement) {
    this.setState({ improvement })
  }

  searchPlant(secondStep) {
    const { lang, improvement, value } = this.state
    if (value.length >= 3) {
      this.setState({
        improvementMenuOpen: false,
        loading: true,
        error: null,
        result: null
      })
      fetch(`/api/plants/search${
            urlBuilder(improvement, !secondStep ? 1 : 2)
          }?key=${ value 
          }&lang=${ lang 
          }&improvement=${ improvement }`, {
        method: 'GET'
      })
        .then(result => result.json())
        .then(result => this.setState({
          loading: false,
          result
        }))
        .catch(err => {
          this.setState({
            loading: false,
            error: err.message,
            result: null
          })
        })
    }
  }

  handleDigDeeper() {
    this.searchPlant(true)
  }

  handleErrorDismiss() {
    this.setState({
      error: null
    })
  }
  
  handleResultsDismiss() {
    this.setState({
      result: null
    })
  }

  render() {
    const { translations = {} } = this.props
    const {
      value, loading,
      improvementMenuOpen, improvement,
      result,
      error } = this.state
    const nameFormatter = result && nameFormatterFactory(improvement, result.step)
    return (
      <div className='plant-search container px-0'>
        <BaseInput value={ value } improvement={ improvement }
            highlight={ 
              improvementMenuOpen ? 'search' : 'improvement' }
            handleValueChange={ this.handleValueChange.bind(this) }
            handleEnterPress={ this.handleEnterPress.bind(this) }
            handleImprovementButtonClick={ this.handleImprovementButtonClick.bind(this) }
            changeImprovement={ this.handleImprovementChange.bind(this) }
            searchPlant={ this.searchPlant.bind(this) }
            translations={ translations.baseInput }/>
        {
          improvementMenuOpen && (
            <ImprovementMenu improvement={ improvement }
              changeImprovement={ this.handleImprovementChange.bind(this) }
              translations={ translations.improvements }/>
          )
        }
        {
          loading && !error && (
            <div className='alert alert-info'>
              <div className='row'>
                <p className='col-12 mb-0'>
                  { translations.loading }</p></div></div>
          )
        }
        {
          error && (
            <div className='alert alert-danger'>
              <div className='row'>
                <p className='col-12 mb-0'>
                  { error }
                  <button type='button' className='close'
                      aria-label='Close'
                      onClick={ () => this.handleErrorDismiss() }>
                    <span aria-hidden='true'>&times;</span></button></p></div></div>
          )
        }
        {
          result && result.plants && result.plants.length === 0 && (
            <div className='alert alert-secondary'>
              <div className='row'>
                <p className='col-12 mb-0'>
                  { translations.notFound }
                  <button type='button' className='close'
                      aria-label='Close'
                      onClick={ () => this.handleResultsDismiss() }>
                    <span aria-hidden='true'>&times;</span></button></p></div></div>
          )
        }
        {
          result && result.plants && result.plants.length === 1 && (
            <DisplaySingleResult plant={ result.plants[0] }
                step={ result.step }
                nameFormatter={ nameFormatter }
                selectPlant={ selectPlant }
                digDeeper={ this.handleDigDeeper.bind(this) }
                dismiss={ this.handleResultsDismiss.bind(this) }
                translations={ Object.assign({},
                  translations.singleResult,
                  translations.commonResults) }/>
          )
        }
        {
          result && result.plants && result.plants.length > 1 && (
            <DisplayMultipleResults plants={ result.plants }
                step={ result.step }
                nameFormatter={ nameFormatter }
                selectPlant={ selectPlant }
                digDeeper={ this.handleDigDeeper.bind(this) }
                dismiss={ this.handleResultsDismiss.bind(this) }
                translations={ Object.assign({},
                  translations.multipleResults,
                  translations.commonResults) }/>
          )
        }
      </div>
    )
  }
}