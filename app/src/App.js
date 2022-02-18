import React, {useEffect, useState} from 'react';
import './App.css';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'metatcreatureclub';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

    //Declaring State
    const [walletAddress, setWalletAddress] = useState(null);



  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );

            setWalletAddress(response.publicKey.toString()); //Guess Thats how you obtain address in SOL


        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*
   * Let's define this method so our code doesn't break.
   * We will write the logic for this next!
   */
  const connectWallet = async () => {
    const {solana} = window;

    if(solana) { 
        const response = await solana.connect();
        console.log("Connected with Public Key: ", response.publicKey.toString());
        setWalletAddress(response.publicKey.toString())
    }


  };

  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);





  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header"> NFT DROP</p>
          <p className="sub-text">Join The Meta Creatures Club</p>
          {!walletAddress && renderNotConnectedContainer() }
        </div>

        {walletAddress && <CandyMachine walletAddress={window.solana} />}


        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
