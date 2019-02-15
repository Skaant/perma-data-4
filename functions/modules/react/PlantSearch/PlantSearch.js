import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      load: false,
      error: null,
      results: []
    }
  }

  handleValueChange(value) {
    this.setState({
      value,
      error: null
    })
  }

  searchPlant() {
    const { ranks } = this.props
    const { value } = this.state
    if (value.length >= 3) {
      this.setState({
        load: true,
        results: []
      })
      fetch(`/api/plants/search?key=${ value }${
        (ranks && ranks.length > 0) ? 
          `&ranks=${ encodeURIComponent(ranks) }` : ''
      }`, {
        method: 'GET'
      })
        .then(result => result.json())
        .then(({ plants }) => {
          this.setState({
            load: false,
            results: plants,
            error: false
          })
        })
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
    const { value, results, load, error } = this.state
    return (
      <div className='plant-search'>
        <div className='row'>
          <div className='input-group mb-4'>
            <input type='text'
                placeholder={ translations.placeholder || 'type plant key here' }
                className='form-control'
                value={ value }
                onChange={ e => this.handleValueChange(e.target.value) }
                onKeyPress={ e => e.charCode === 13
                  && value.length >= 3 && this.searchPlant() }/>
            <div className='input-group-append'>
              <button className='btn btn-x btn-primary'
                  onClick={ () => this.searchPlant() }
                  disabled={ value.length < 3 }>
                go</button>
            </div>
          </div>
        </div>
        {
          load && (
            <div className='row'>
              <div className='col-12 alert alert-info'>
                .. { translations.loading || 'search results are loading' }
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
          results.length === 1 && (
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
          results.length > 1 && (
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