import React from 'react'

export default ({ 
  scene,
  back, next,
  translations
}) => (
  <React.Fragment>
    {
      scene.menu && (
        <div className='modal-footer container pl-0'>
          <div className='row w-100 pr-2 pr-3 d-flex justify-content-center'>
            {
              scene.menu.map(item => (
                <button key={ item } type='button'
                    className='btn btn-warning col-12 col-sm-6 col-lg-3 mx-2 my-1'
                    onClick={ () => console.log(item) }>
                  { item }
                </button>
              ))
            }
          </div>
        </div>
      )
    }
    <div className='modal-footer container pl-0'>
      <div className='row w-100 pr-2 pr-3'>
        <button type='button' className='btn btn-secondary col-12 col-sm-5 col-md-3 my-1'
            onClick={ () => back() }>
          { translations.back }
        </button>
        {
          !scene.disabledNext && (
            <button type='button' className='btn btn-info col-12 col-sm-5 col-md-3 offset-sm-2 offset-md-6 my-1'
                onClick={ () => next() }>
              { translations.next }
            </button>
          )
        }
      </div>
    </div>
  </React.Fragment>
)