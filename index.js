import {HTML5Video, Log, Events} from 'clappr'
import dashjs from 'dashjs'

export default class ClapprDashDashjs extends HTML5Video {
  //where is this enforced??? look for a better name
  name() {return 'clappr_dash_dashjs'}

  constructor(options) {
    super(options)
    //dashjs expose MediaPlayer at root???
    var player = new MediaPlayer(new dashjs.Dash.di.DashContext())
    player.startup()
    player.attachView(this.el)
    player.attachSource(this.options.src)
  }
}

ClapprDashDashjs.canPlay = function(resource, mimeType) {
  var resourceParts = resource.split('?')[0].match(/.*\.(.*)$/) || []
  return "mpd" === resourceParts[1]
}

