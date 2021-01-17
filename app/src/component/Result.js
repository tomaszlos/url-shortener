import React from 'react';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar'

export default class Result extends React.Component {
  constructor (props) {
    super(props);
    this.url = this.getUrl(props.url)

    this.state = {
      open: false
    }

    this.copyToClipboard = this.copyToClipboard.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  getUrl (url) {
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    const port = window.location.port !== 80 ? `:${ window.location.port }` : ''
    return `${ protocol }//${ hostname }${ port }${ url }`
  }

  copyToClipboard () {
    const el = document.createElement('input')
    el.value = this.url
    el.style.opacity = '0'
    el.style.position = 'absolute'
    document.body.appendChild(el)

    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)

    this.setState({ open: true })
  }

  handleClose () {
    this.setState({ open: false })
  }

  render () {
    return (
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Your link is here!
          </Typography>
          <div className="result-url--wrapper">
            <a className="App-link" href={ this.url } target="_blank" rel="noreferrer">{ this.url }</a>
          </div>
        </CardContent>
        <CardActions>
          <Button size="large" color="primary" onClick={ this.copyToClipboard }>
            Copy to clipboard
          </Button>
          <Button size="large" onClick={ this.props.startOver }>
            Start over
          </Button>
        </CardActions>
        <Snackbar
          open={ this.state.open }
          message="Copied!"
          autoHideDuration={ 2000 }
          onClose={ this.handleClose }
        />
      </Card>
    )
  }
}
