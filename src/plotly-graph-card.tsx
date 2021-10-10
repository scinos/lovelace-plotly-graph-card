import Card from './Card'
import { version } from '../package.json'
import { render } from 'preact'
import { h } from 'preact'
import { Config } from './types'

console.info(
  `%c PLOTLY-GRAPH-CARD %c ${version} `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray'
)

class PlotlyCardWebComponent extends HTMLElement {
  // Whenever the state changes, a new `hass` object is set. Use this to
  // update your content.
  _config = {} as any
  _hass = undefined as any
  render () {
    render(<Card hass={this._hass} config={this._config} />, this)
  }
  set hass (hass) {
    if (hass) this._hass = hass
    this.render()
  }

  // The user supplied configuration. Throw an exception and Lovelace will
  // render an error card.
  setConfig (config) {
    this._config = config
    this.render()
  }

  getCardSize () {
    return 3
  }
  public static async getConfigElement () {
    // await import('/frontend_latest/da9cd922.js')
    // return document.createElement('hui-history-graph-card-editor')
  }

  public static getStubConfig (): Config {
    // Hard coded to sun.sun to prevent high server load when it would pick an entity with a lot of state changes
    return {
      type: 'custom:plotly-graph-card',
      entities: [{ entity: 'sun.sun' }]
    }
  }
}

customElements.define('plotly-graph', PlotlyCardWebComponent)
