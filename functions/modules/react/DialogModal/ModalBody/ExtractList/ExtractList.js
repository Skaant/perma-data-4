import React from 'react'
import marked from 'marked'
import ContentDisplay from '../ContentDisplay/ContentDisplay';

export default ({ theme, sceneExtracts, extracts, lang, translations }) => (
  <React.Fragment>
    <div className='row text-center mt-3'>
      <div className='col-12'
        dangerouslySetInnerHTML={ {
          __html: marked(`### **${ translations.extracts }** ${ theme }`)
        } }/>
    </div>
    <div className='row'>
      <ul className='col-12 col-lg-8 offset-lg-2 list-group text-center px-4 my-4'>
        {
          sceneExtracts.map(extractId => {
            const extract = extracts[extractId]
            return (
              <li key={ extractId } className='list-group-item'>
                <a href={ `#${ extract[lang].title.slice(0, 20) }` }
                    className='text-dark small text-uppercase font-weight-light'>
                  { extract[lang].title }</a></li>
            )
          })
        }
      </ul>
    </div>
    {
      sceneExtracts.map((extractId, index) => {
        const extract = extracts[extractId]
        return (
          <React.Fragment key={ extractId }>
            { index > 0 && (<hr/>) }
            <div className='row mt-4'>
              <h1 id={ extract[lang].title.slice(0, 20) }
                  className='text-uppercase col-12 text-center mb-4 mt-3 pb-4'>
                { extract[lang].title }</h1>
              <ContentDisplay content={ extract[lang].content }
                  pictures={ extract.pictures }/>
            </div>
          </React.Fragment>
        )
      })
    }
  </React.Fragment>
)