import React from 'react';
import NodeRSA from 'node-rsa';
import './App.scss';


export default class App extends React.Component {
  lenRSAOptions = [512, 1024, 2048, 4096];

  genPrv = React.createRef();
  genPub = React.createRef();

  encMsg = React.createRef();
  encPub = React.createRef();

  decMsg = React.createRef();
  decPrv = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      lenRSA: 1024,
      rsa: null
    };
    this.generateNewIdentity = this.generateNewIdentity.bind(this);
  }

  generateNewIdentity() {
    this.setState({ rsa: null });
    setTimeout(() => this.setState({ rsa: new NodeRSA({ b: this.state.lenRSA }) }));
  }

  componentDidMount() {
    this.generateNewIdentity();
  }

  copyToClipboard(elem) {
    elem.select();
    elem.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }

  render() {
    return this.state.rsa === null
      ? <div id='generating'>
        <div>generating {this.state.lenRSA}-bit RSA key <span>( )</span></div>
      </div>
      : <>
        <div className='split compact'>
          <div className='row em'>
            <span>DARK-THEME</span>
            <input
              type='checkbox'
              onChange={() => {
                const className = 'dark-theme';
                const classes = document.body.className.split(' ').filter(c => c.length !== 0);
                const darkIndex = classes.indexOf(className);
                if (darkIndex === -1) {
                  classes.push(className);
                } else {
                  classes.splice(darkIndex, 1);
                }
                console.log(classes.join(' '));
                document.body.className = classes.join(' ');
              }}
            />
          </div>
          <h1 className='row em'>Identity</h1>
          <div>
            <h2>Private identity</h2>
            <div
              className='key'
              ref={this.genPrv}
            >{this.state.rsa.exportKey('pkcs8-private')}</div>
          </div>
          <div>
            <h2>Public identity</h2>
            <div
              className='key'
              ref={this.genPub}
            >{this.state.rsa.exportKey('pkcs8-public')}</div>
          </div>
          <div className='row em sep'>
            <button onClick={this.generateNewIdentity}>New Identity</button>
            {this.lenRSAOptions.map(
              (b, i) => <button
                key={i}
                disabled={this.state.lenRSA === b}
                onClick={() => this.setState({ lenRSA: b })}
              >{b}</button>
            )}
          </div>
          <h1 className='row em'>Encryption</h1>
          <div>
            <h2>Message</h2>
            <textarea ref={this.encMsg} />
            <h2>{'Recipient\'s public key'}</h2>
            <textarea ref={this.encPub} />
          </div>
        </div>
      </>;
  }
}
