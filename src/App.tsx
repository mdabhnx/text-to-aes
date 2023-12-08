import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopySvg } from './assets/icons.js';

const App = () => {
  const [currentState, setCurrentState] = useState<'encrypt' | 'decrypt'>(
    'encrypt',
  );

  const [content, setContent] = useState('');
  const [lockKey, setLockKey] = useState('');
  const [output, setOutput] = useState('');

  return (
    <div className='container'>
      <div className='container-box'>
        <header className='header'>
          Welcome Maste<p>r</p>
        </header>

        <div className='content'>
          <div className='options'>
            <button
              className='btn'
              onClick={() => {
                setCurrentState('encrypt');
              }}
            >
              Encrypt Your Text
            </button>
            <button
              className='btn'
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
                  <button>Submit</button>
                </div>
              </>
            </div>
          </div>
        </div>

        {output.length > 0 && (
          <div className='result-container'>
            <div className='result'>
              <CopyToClipboard text={output} onCopy={() => {}}>
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
  );
};

export default App;
