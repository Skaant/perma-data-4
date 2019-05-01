import React from 'react'
import FooterMenu from './FooterMenu/FooterMenu';

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      dialog: props.dialog
    }
  }

  backScene() {
    const { current } = this.state
    if (current - 1 >= 0) {
      this.setState({
        current: current - 1
      })
    }
  }

  nextScene() {
    const { dialog, current } = this.state
    if (current + 1 < dialog.scenes.length) {
      this.setState({
        current: current + 1
      })
    }
  }

  goToScene(current) {
    this.setState({ current })
  }

  render() {
    const { translations } = this.props
    const { dialog, current } = this.state
    const scene = dialog.scenes[current]
    return (
      <div id='dialog-modal' className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header bg-info alert-info'>
            <h5 className='modal-title text-uppercase text-white'>{ scene.title || 'Dialog' }</h5>
            <button type='button' className='close'
                data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>
                &times;</span></button>
          </div>
          <div className='modal-body container py-0'>
            <div className='row'>
              {
                scene.img && (
                  <img src={ scene.img }/>
                )
              }
            </div>
            <div className='row p-4'>
              {
                scene.content.map((p, index) => (
                  <p key={ `${ current }x${ index }` }>
                    { p }</p>
                ))
              }
            </div>
          </div>
          <FooterMenu scene={ scene }
              back={ this.backScene.bind(this) }
              next={ this.nextScene.bind(this) }
              goTo={ this.goToScene.bind(this) }
              translations={ translations }/>
        </div>
      </div>
    )
  }
}