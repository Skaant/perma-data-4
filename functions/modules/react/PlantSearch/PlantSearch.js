import React from 'react'
import BaseInput from './BaseInput/BaseInput';
import ImprovementMenu from './ImprovementMenu/ImprovementMenu';
import DisplaySingleResult from './DisplaySingleResult/DisplaySingleResult';
import DisplayMultipleResults from './DisplayMultipleResults/DisplayMultipleResults';

const urlBuilder = (improvement, step) => {
  switch (improvement) {
    case 'ids':
      return '/ids'
    case 'names':
      return '/names'
    case null:
      return step === 1 ? '' : '/names'
    default:
      return ''
  }
}

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
  
  handleResultsDismiss() {
    this.setState({
      result: null
    })
  }

  render() {
    const { translations = {}, selectPlant } = this.props
    const {
      value, loading,
      improvementMenuOpen, improvement,
      result,
      message, error } = this.state
    return (
      <div className='plant-search container'>
        <BaseInput value={ value } improvement={ improvement }
            highlight={ 
              improvementMenuOpen ? 'search' :
                !improvementMenuOpen && !message && !result && !error ? 'improvement' : false }
            handleValueChange={ this.handleValueChange.bind(this) }
            handleEnterPress={ this.handleEnterPress.bind(this) }
            handleImprovementButtonClick={ this.handleImprovementButtonClick.bind(this) }
            changeImprovement={ this.handleImprovementChange.bind(this) }
            searchPlant={ this.searchPlant.bind(this) }
            translations={ translations }/>
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
            <div className='alert alert-warning'>
              <div className='row'>
                <p className='col-12 mb-0'>
                  { error }</p></div></div>
          )
        }
        {
          result && result.plants && result.plants.length === 0 && (
            <div className='alert alert-secondary'>
              <div className='row'>
                <p className='col-12 mb-0'>
                  { translations.notFound }</p></div></div>
          )
        }
        {
          result && result.plants && result.plants.length === 1 && (
            <DisplaySingleResult plant={ result.plants[0] }
                step={ result.step }
                selectPlant={ selectPlant }
                digDeeper={ this.handleDigDeeper.bind(this) }
                dismiss={ this.handleResultsDismiss.bind(this) }
                translations={ translations.singleResult }/>
          )
        }
        {
          result && result.plants && result.plants.length > 1 && (
            <DisplayMultipleResults plants={ result.plants }
                step={ result.step }
                selectPlant={ selectPlant }
                digDeeper={ this.handleDigDeeper.bind(this) }
                dismiss={ this.handleResultsDismiss.bind(this) }
                translations={ translations.multipleResults }/>
          )
        }
      </div>
    )
  }
}