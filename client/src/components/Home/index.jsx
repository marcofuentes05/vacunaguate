import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';

import './styles.scss'

const Home = props => {
	const [data, setData] = useState('');
	const [isReading, setIsReading] = useState(false);
    const [userAddress, setUserAddress] = useState("");

    const connect = async (onConnected) => {
        if (!window.ethereum) {
            alert('Please install MetaMask first.');
            return
        }

        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        onConnected(accounts[0]);
    }

    const checkIfWalletIsConnected = async (onConnected) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: 'eth_accounts'
            })

            if (accounts.result.length > 0) {
                const account = accounts[0];
                onConnected(account);
                return;
            }

            if (isMobileDevice()) {
                await connect(onConnected);
            }
        }
    }

    const isMobileDevice = () => {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    }

    useEffect(() => {
        checkIfWalletIsConnected(setUserAddress);
    }, []);

    useEffect(() => {
        checkIfWalletIsConnected(setUserAddress);
    }, [userAddress]);

    function Connect({ setUserAddress }) {
        if (isMobileDevice()) {
          const dappUrl = "metamask-auth.ilamanov.repl.co"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
          const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
          return (
            <a href={metamaskAppDeepLink}>
               <button>
                 Connect to MetaMask
               </button>
            </a>
          );
        }
      
        return (
          <button onClick={() => connect(setUserAddress)}>
            Connect to MetaMask
          </button>
        );
      }

    return <div className='background'>
        <div className='header'>
            <p>VACUNAGUATE</p>
        </div>
        <div className='user-row'>
            <div className='user-image'>
                <img src='https://inceptum-stor.icons8.com/oNqvPlnn3sWA/icons8-user.jpg' alt='user' />
            </div>
            <div className='user-info'>
                <p className='username'>USUARIO NAME</p>
                <p className='wallet'>WALLED ID</p>
            </div>
        </div>
        <div className='actions'>
            <div className='button enter-group' onClick={() => setIsReading(true)}>ingresar</div>
            <div className='button view-history'>leer</div>
        </div>
		{ isReading && 
		<QrReader onResult={(result, error) => {
			if (!!result) {
				setData(result?.text);
				setIsReading(false);
			}
			if (!!error) {
				console.info(error);
			}
		}} />}	
		<p>{data}</p>

        <Connect />
    </div>
}


export default Home;
