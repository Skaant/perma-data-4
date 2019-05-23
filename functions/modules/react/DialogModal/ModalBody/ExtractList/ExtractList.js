import React from 'react'
import marked from 'marked'
import ContentDisplay from '../ContentDisplay/ContentDisplay';

export default ({ theme, sceneExtracts, extracts, lang, translations }) => (
  <React.Fragment>
    <div className='row text-center mt-3'>
      <div className='col-12'
        dangerouslySetInnerHTML={ {
          __html: marked(`### **${ translations.extracts }** ${ theme }`)
        } }/></div>
    {
      sceneExtracts.map(extractId => {
        const extract = extracts[extractId]
        return (
          <React.Fragment>
            <hr/>
            <div key={ extractId } className='row mt-4'>
              <p className='text-secondary text-uppercase small col-12 text-center mb-4 mt-3'>
                { extract[lang].title }</p>
              <ContentDisplay content={ extract[lang].content }
                  pictures={ extract.pictures }/>
            </div>
          </React.Fragment>
        )
      })
    }
  </React.Fragment>
)