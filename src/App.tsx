import { useState } from 'react';

const App = () => {
  const [currentState, setCurrentState] = useState<'encrypt' | 'decrypt'>(
    'encrypt',
  );

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
                <textarea cols={30} rows={10}></textarea>
              </>
              <>
                <div className='title'>
                  {currentState === 'encrypt' ? 'Encrypt' : 'Decrypt'} with
                </div>
                <input className='inp-password' type='password' />
                <div className='submit-btn'>
                  <button>Submit</button>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
