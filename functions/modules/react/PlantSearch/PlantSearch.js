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
      fetch(`/api/plants/search?keys=${ encodeURIComponent(value.split(' ')) }${
        (ranks && ranks.length > 0) ? `&ranks=${ encodeURIComponent(ranks) }` : ''
      }`, {
        method: 'GET'
      })
        .then(result => result.json())
        .then(({ plants }) => {
          const { selectPlant } = this.props
          if (plants.length === 1) {
            selectPlant(plants[0])
          }
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

  handleResultsSelect(plant) {
    const { selectPlant } = this.props
    selectPlant(plant)
  }

  render() {
    const { langs = {}, selectPlant } = this.props
    const { value, results, load, error } = this.state
    return (
      <div className='plant-search'>
        <div className='row'>
          <div className='input-group mb-4'>
            <input type='text'
                placeholder={ langs.plantSearchPlaceholder || 'type plant key here' }
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
                .. { langs.searchResultsLoading || 'search results are loading' }
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
          results.length > 1 && (
            <div className='row'>
              <label className='text-uppercase'>
                { langs.searchResults || 'plant results' }</label>
              <select className='form-control mb-4'
                  onChange={ e => this.handleResultsSelect(e.target.value) }>
                <option value={ null }>
                  { langs.choosePlant ||'choose a plant' }</option>
                {
                  results.map(plant => (
                    <option key={ plant._id } value={ plant }>
                      { plant.name || plant._id }</option>
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