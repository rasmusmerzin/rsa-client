import React from 'react';
import NodeRSA from 'node-rsa';
import './App.scss';


const shortenString = (str, len=50) => str.length <= len ? str : str.substr(0, len -3) +'...';

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
  inpPrv = React.createRef();
  inpErr = React.createRef();

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
    setTimeout(() => this.setState({ rsa: new NodeRSA({ b: this.state.lenRSA }) }), 500);
  }

  componentDidMount() {
    this.generateNewIdentity();
  }

  render() {
    return <div>
      <h1>Generate</h1>
      {this.state.rsa === null && <div id='generating'>
        <div>Generating {this.state.lenRSA}-bit RSA keypair <span>( )</span></div>
      </div>}
      <div className={'split compact' +(this.state.rsa === null ? ' hidden' : '')}>
        <textarea
          className='ro'
          value={this.state.rsa ? this.state.rsa.exportKey('pkcs8-private') : ''}
          placeholder='Private key'
          readOnly
          ref={this.genPrv}
          onClick={() => copyToClipboard(this.genPrv.current)}
        ></textarea>
        <textarea
          className='ro'
          value={this.state.rsa ? this.state.rsa.exportKey('pkcs8-public') : ''}
          placeholder='Public key'
          readOnly
          ref={this.genPub}
          onClick={() => copyToClipboard(this.genPub.current)}
        ></textarea>
      </div>
      <div className='sep'>
        <div className='sep2 inline'>
          <button
            onClick={() => {
              this.props.setDialogue(
                'Are you sure?',
                'Previous pair will be overwritten. You may need to save it before generating a new keypair.',
                ['continue', 'cancel']
              ).then(op => op === 'continue' && this.generateNewIdentity());
            }}
            disabled={this.state.rsa === null}
          >Generate Keypair</button>
          <div className='sep3 inline'>
            {this.lenRSAOptions.map(
              (b, i) => <button
                key={i}
                disabled={this.state.rsa === null}
                className={this.state.lenRSA === b ? 'selected' : ''}
                onClick={() => this.setState({ lenRSA: b })}
              >{b}</button>
            )}
          </div>
        </div>
        <button
          disabled={this.state.rsa === null}
          onClick={() => {
            this.props.setDialogue(
              'Import private key',
              <textarea />,
              ['import', 'cancel']
            ).then(op => {
              if (op === 'import') {
              }
            });
          }}
        >Import</button>
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
    return <>
      <h1>Encryption</h1>
      <div className='split two-to-one compact'>
        <textarea
          ref={this.encMsg}
          className='top-left'
          placeholder='Message'
          onChange={() => this.setState({ result: '' })}
        />
        <textarea
          ref={this.encPub}
          className='bottom-left'
          placeholder="Recipient's public key"
          onChange={() => this.setState({ result: '' })}
        />
        <textarea
          className='ro right'
          value={this.state.result}
          placeholder='Encrypted message'
          readOnly
          ref={this.encRes}
          onClick={() => copyToClipboard(this.encRes.current)}
        />
      </div>
      <div className='sep2'>
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
        <i>{shortenString(this.state.processInfo)}</i>
      </div>
    </>;
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
    return <>
      <h1>Decryption</h1>
      <div className='split two-to-one compact'>
        <textarea
          className='top-left'
          ref={this.decMsg}
          placeholder='Encrypted message'
          onChange={() => this.setState({ result: '' })}
        />
        <textarea
          className='bottom-left'
          ref={this.decPub}
          placeholder='Private key'
          onChange={() => this.setState({ result: '' })}
        />
        <textarea
          className='ro right'
          value={this.state.result}
          placeholder='Original message'
          readOnly
          ref={this.decRes}
          onClick={() => copyToClipboard(this.decRes.current)}
        />
      </div>
      <div className='sep2'>
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
        <i>{shortenString(this.state.processInfo)}</i>
      </div>
    </>;
  }
}


class Dialogue extends React.Component {
  componentWillUnmount() {
    (this.props.onRemove || (() => {}))();
  }

  render() {
    return <div className='dialogue'>
      <h2>{this.props.title}</h2>
      <p>{this.props.desc}</p>
      <div className='sep-rev text-align-right'>
        {(this.props.options || ['ok']).map((op, i) =>
          <button
            key={i}
            onClick={() => this.props.onClick(op)}
          >{op}</button>
        )}
      </div>
    </div>;
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setDialogue = this.setDialogue.bind(this);
  }

  setDialogue(title='?', desc='...', options=['ok']) {
    return new Promise((resolve, reject) => {
      this.setState({
        dialogue: <Dialogue
          title={title}
          desc={desc}
          options={options}
          onRemove={reject}
          onClick={op => {
            resolve(op);
            this.setState({ dialogue: undefined });
          }}
        />
      });
    });
  }

  render() {
    return <>
      <div className='text-align-right'>
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
            document.body.className = classes.join(' ');
          }}
        >Dark-Theme</button>
      </div>
      <Identity setDialogue={this.setDialogue} />
      <Encryption />
      <Decryption />
      {this.state.dialogue && <div id='popup'>{this.state.dialogue}</div>}
    </>;
  }
}
