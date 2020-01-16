import React from 'react';
import NodeRSA from 'node-rsa';
import './App.scss';


const copyToClipboard = elem => {
  elem.select();
  elem.setSelectionRange(0, 99999);
  return document.execCommand('copy');
};

const encrypt = (msg, pub) => {
  const rsa = new NodeRSA(pub);
  return rsa.encrypt(msg, 'base64');
};

const decrypt = (msg, prv) => {
  const rsa = new NodeRSA(prv);
  return rsa.decrypt(msg, 'utf-8');
};

class Identity extends React.Component {
  lenRSAOptions = [512, 1024, 2048, 4096];
  genPrv = React.createRef();
  genPub = React.createRef();

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
    return <div>
      <h1>Generate</h1>
      {this.state.rsa === null && <div id='generating'>
        <div>generating {this.state.lenRSA}-bit RSA key <span>( )</span></div>
      </div>}
      <div className={'split compact' +(this.state.rsa === null ? ' hidden' : '')}>
        <h2>Private key</h2>
        <h2>Public key</h2>
        <textarea
          className='ro'
          value={this.state.rsa ? this.state.rsa.exportKey('pkcs8-private') : ''}
          readOnly
          ref={this.genPrv}
          onClick={() => copyToClipboard(this.genPrv.current)}
        ></textarea>
        <textarea
          className='ro'
          value={this.state.rsa ? this.state.rsa.exportKey('pkcs8-public') : ''}
          readOnly
          ref={this.genPub}
          onClick={() => copyToClipboard(this.genPub.current)}
        ></textarea>
        <div className='row em sep'>
          <div className='sep2 inline'>
            <button onClick={this.generateNewIdentity}>Generate Keypair</button>
            <div className='sep3 inline'>
              {this.lenRSAOptions.map(
                (b, i) => <button
                  key={i}
                  className={this.state.lenRSA === b ? 'selected' : ''}
                  onClick={() => this.setState({ lenRSA: b })}
                >{b}</button>
              )}
            </div>
          </div>
          <button disabled>Import</button>
        </div>
      </div>
    </div>;
  }
}

class Encryption extends React.Component {
  encMsg = React.createRef();
  encPub = React.createRef();
  encRes = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      result: '',
      processInfo: ''
    };
  }

  render() {
    return <div className='split compact'>
      <h1 className='row em'>Encryption</h1>
      <h2>Message</h2>
      <h2>Encrypted message</h2>
      <textarea
        ref={this.encMsg}
        onChange={() => this.setState({ result: '' })}
      />
      <textarea
        className='col ro'
        value={this.state.result}
        readOnly
        ref={this.encRes}
        onClick={() => copyToClipboard(this.encRes.current)}
      />
      <h2>{'Recipient\'s public key'}</h2>
      <textarea
        ref={this.encPub}
        onChange={() => this.setState({ result: '' })}
      />
      <div className='row em sep2'>
        <button
          onClick={() => {
            this.setState({ processInfo: 'encrypting...' });
            try {
              const res = encrypt(this.encMsg.current.value, this.encPub.current.value);
              this.setState({ result: res, processInfo: '' });
            } catch(e) {
              this.setState({ processInfo: String(e) });
            }
          }}
        >Encrypt</button>
        <i>{this.state.processInfo}</i>
      </div>
    </div>;
  }
}

class Decryption extends React.Component {
  decMsg = React.createRef();
  decPub = React.createRef();
  decRes = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      result: '',
      processInfo: ''
    };
  }

  render() {
    return <div className='split compact'>
      <h1 className='row em'>Decryption</h1>
      <h2>Encrypted message</h2>
      <h2>Original message</h2>
      <textarea
        ref={this.decMsg}
        onChange={() => this.setState({ result: '' })}
      />
      <textarea
        className='col ro'
        value={this.state.result}
        readOnly
        ref={this.decRes}
        onClick={() => copyToClipboard(this.decRes.current)}
      />
      <h2>Private key</h2>
      <textarea
        ref={this.decPub}
        onChange={() => this.setState({ result: '' })}
      />
      <div className='row em sep2'>
        <button
          onClick={() => {
            this.setState({ processInfo: 'decrypting...' });
            try {
              const res = decrypt(this.decMsg.current.value, this.decPub.current.value);
              this.setState({ result: res, processInfo: '' });
            } catch(e) {
              this.setState({ processInfo: String(e) });
            }
          }}
        >Decrypt</button>
        <i>{this.state.processInfo}</i>
      </div>
    </div>;
  }
}


export default class App extends React.Component {
  render() {
    return <>
      <div className='text-to-right'>
        <button
          onClick={() => {
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
        >Dark-Theme</button>
      </div>
      <Identity />
      <Encryption />
      <Decryption />
    </>;
  }
}
