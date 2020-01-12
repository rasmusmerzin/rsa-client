import React from 'react';
import NodeRSA from 'node-rsa';
import './App.scss';


export default class App extends React.Component {
  lenRSAOptions = [512, 1024, 2048, 4096];

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

  render() {
    //document.body.className = 'dark-theme';
    return <div id='app'>{
      this.state.rsa === null
        ? <div id='generating'>
          <div>generating {this.state.lenRSA}-bit RSA key <span>( )</span></div>
        </div>
        : <>
          <div className='split compact'>
            <h1 className='row em'>Identity</h1>
            <div>
              <h2>Private identity</h2>
              <div className='key'>{this.state.rsa.exportKey('pkcs8')}</div>
            </div>
            <div>
              <h2>Public identity</h2>
              <div className='key'>{this.state.rsa.exportKey('pkcs8-public')}</div>
            </div>
            <div className='row em sep'>
              <button onClick={this.generateNewIdentity}>New Identity</button>
              {this.lenRSAOptions.map(
                b => <button>{b}</button>
              )}
            </div>
            <h1 className='row em'>Encryption</h1>
            <div>
              <h2>Message</h2>
              <textarea></textarea>
            </div>
            <div>
              <h2>{'Recipient\'s public key'}</h2>
              <textarea></textarea>
            </div>
          </div>
        </>
    }</div>;
  }
}
