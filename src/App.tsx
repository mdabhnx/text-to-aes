import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AES, enc } from 'crypto-js';
import { toast, Toaster } from 'react-hot-toast';
import { CopySvg } from './assets/icons.js';

const App = () => {
  const [currentState, setCurrentState] = useState<'encrypt' | 'decrypt'>(
    'encrypt',
  );

  const [content, setContent] = useState('');
  const [lockKey, setLockKey] = useState('');
  const [output, setOutput] = useState('');

  const [isToasterShowing, setIsToasterShowing] = useState(false);

  const handleOperation = () => {
    if (currentState === 'encrypt') {
      const _result = AES.encrypt(JSON.stringify(content), lockKey).toString();
      setOutput(String(_result));
      if (!isToasterShowing) {
        toast.success('Your content has been encrypted');
        setIsToasterShowing(true);
        setTimeout(() => {
          setIsToasterShowing(false);
        }, 3000);
      }
    }

    if (currentState === 'decrypt') {
      try {
        const _result = AES.decrypt(content, lockKey);
        setOutput(JSON.parse(_result.toString(enc.Utf8)));
        toast.success('Your content has been decrypted');
        setIsToasterShowing(true);
        setTimeout(() => {
          setIsToasterShowing(false);
        }, 3000);
      } catch (error) {
        if (!isToasterShowing) {
          toast.error('invalid password');
          setIsToasterShowing(true);
          setTimeout(() => {
            setIsToasterShowing(false);
          }, 3000);
        }
      }
    }
  };

  const handleCopy = () => {
    if (!isToasterShowing) {
      toast.success('Copied to clipboard');
      setIsToasterShowing(true);
      setTimeout(() => {
        setIsToasterShowing(false);
      }, 3000);
    }
  };

  return (
    <>
      <Toaster />
      <div className='container'>
        <div className='container-box'>
          <header className='header'>
            Welcome Maste<p>r</p>
          </header>

          <div className='content'>
            <div className='options'>
              <button
                className={`btn ${currentState === 'encrypt' && 'btn-active'}`}
                onClick={() => {
                  setCurrentState('encrypt');
                }}
              >
                Encrypt Your Text
              </button>
              <button
                className={`btn ${currentState === 'decrypt' && 'btn-active'}`}
                onClick={() => {
                  setCurrentState('decrypt');
                }}
              >
                Decrypt Your Text
              </button>
            </div>
          </div>

          <div className='operations-container'>
            <div className='current-state-message'>
              Your Current Mode Is -{' '}
              {currentState === 'encrypt' ? 'Encryption' : 'Decryption'}
            </div>
            <div className='operation'>
              <div className='content'>
                <>
                  <div className='title'>Enter Your Content</div>
                  <textarea
                    cols={30}
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </>
                <>
                  <div className='title'>
                    {currentState === 'encrypt' ? 'Encrypt' : 'Decrypt'} with
                  </div>
                  <input
                    className='inp-password'
                    type='password'
                    value={lockKey}
                    onChange={(e) => setLockKey(e.target.value)}
                  />
                  <div className='submit-btn'>
                    <button onClick={handleOperation}>Submit</button>
                  </div>
                </>
              </div>
            </div>
          </div>

          {output.length > 0 && (
            <div className='result-container'>
              <div className='result'>
                <CopyToClipboard
                  text={output}
                  onCopy={() => {
                    handleCopy();
                  }}
                >
                  <div className='response-area'>
                    <CopySvg
                      color={'white'}
                      fill={'black'}
                      height={30}
                      width={30}
                      className='copy'
                    />
                    <div className='data'>{output}</div>
                  </div>
                </CopyToClipboard>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
