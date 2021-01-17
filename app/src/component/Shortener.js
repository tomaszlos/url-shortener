import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField'
import Result from './Result'
import axios from 'axios'

/*
Need to look into the Hooks
 */

const useStyles = theme => ({
  root: {
    '&': {
      margin: theme.spacing(1),
      padding: 0
    },
    '& .form--wrapper': {
      display: 'flex',
      flexDirection: 'column'
    },
    '& input': {},
    '& button': {
      margin: '8px 0',
      float: 'right',
      width: '100%'
    }
  }
})

class Shortener extends React.Component {
  constructor () {
    super();

    this.state = {
      busy: false,
      error: null,
      validationError: null,
      userUrl: '',
      shortUrl: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.startOver = this.startOver.bind(this)
  }

  /*
  Helpers
   */

  setBusy (busy = true) {
    this.setState({ busy })
  }

  setError (error = null) {
    this.setState({ error })
  }

  setShortUrl (shortUrl = null) {
    this.setState({ shortUrl: shortUrl })
  }

  setValidationError (validationError = null) {
    this.setState({ validationError })
  }

  /*
  Handle input change
   */

  handleChange (evt) {
    this.setValidationError()
    this.setState({ userUrl: (evt.target.value).trim() })
  }

  /*
  Handle for submission
   */

  handleSubmit (evt) {
    const url = this.state.userUrl

    evt.preventDefault()

    this.setValidationError()
    this.setShortUrl()
    this.setBusy()

    if (!url || !url.length) {
      return
    }

    if (!this.validateUrl(url)) {
      this.setValidationError('URL does not seem to be correct')
      this.setBusy(false)
      return
    }

    axios.post('/api/shorten', { url }).then(response => {
      this.setShortUrl(response.data.url)
      this.setBusy(false)
    }).catch(err => {
      this.setError(err)
      this.setBusy(false)
      this.setShortUrl()

      console.error(err)
    })
  }

  startOver () {
    this.setShortUrl()
    this.setState({ userUrl: '' })
  }

  validateUrl = (string) => {
    /*
    RegEx taken from https://gist.github.com/dperini/729294
     */

    const pattern = new RegExp(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i, 'i');
    return !!pattern.test(string);
  }

  render () {
    const { classes } = this.props;
    return (
      <div className={ classes.root }>
        { (!this.state.shortUrl) &&
        <form onSubmit={ this.handleSubmit } className="form--wrapper" noValidate autoComplete="off">
          <TextField id="url--input"
                     error={ !!this.state.validationError }
                     helperText={ this.state.validationError } value={ this.state.userUrl } disabled={ this.state.busy }
                     onChange={ this.handleChange } fullWidth={ true } label="URL" variant="outlined"/>
          { (this.state.busy) &&
          <CircularProgress className="busy--spinner"/>
          }
          <Button type="submit" variant="contained" size="large" color="primary"
                  disabled={ this.state.busy || !this.state.userUrl.length }>Make it short!</Button>
        </form>
        }
        { (this.state.shortUrl) &&
        <Result url={ this.state.shortUrl } startOver={ this.startOver }/>
        }
      </div>
    )
  }
}

export default withStyles(useStyles)(Shortener)
