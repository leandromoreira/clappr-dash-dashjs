import {HTML5Video, Log, Events} from 'clappr'

export default class DashDashjsPlayback extends HTML5Video {
  name() {return 'dash_dashjs_playback'}

  constructor(options) {
    super(options)
    this._embedScript()
  }

  _embedScript() {
    if (!window.Dash) {
      var script = document.createElement('script')
      script.setAttribute("type", "text/javascript")
      script.setAttribute("async", "async")
      script.setAttribute("src", "https://sslplayers-vh.akamaihd.net/dash.js/latest/dash.all.js")
      script.onload = () => this._setup()
      script.onerror = (e) => this._onError(e)
      document.body.appendChild(script)
    } else {
      this._setup()
    }
  }

  _onError(error) {
    Log.error(error)
  }

  _setup() {
    debugger
    var player = new MediaPlayer(new Dash.di.DashContext())
    player.startup()
    player.attachView(this.el)
    player.attachSource(this.options.src)
  }

}

DashDashjsPlayback.canPlay = function(resource, mimeType) {
  var resourceParts = resource.split('?')[0].match(/.*\.(.*)$/) || []
  return "mpd" === resourceParts[1]
}

