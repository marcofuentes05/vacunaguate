import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Home from './Home'
import Detail from './/Detail'
import metamask from '../assets/metamask.svg';

import './styles.scss';

const Component = () => {
    const [userAddress, setUserAddress] = useState("");

    useEffect(() => {
        checkIfWalletIsConnected(setUserAddress);
    }, []);

    const checkIfWalletIsConnected = async (onConnected) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.selectedAddress;

            if (accounts.result.length > 0) {
                const account = accounts[0];
                onConnected(account);
                return;
            }
        }
    }

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

    const Connect = ({ setUserAddress }) => (
        <button className='metamask-connect' onClick={() => connect(setUserAddress)}>
          <img src={metamask} alt='Metamask logo' />
          Connect using MetaMask
        </button>
      );


    return (
            userAddress ? (
                <BrowserRouter>
                <Routes>
                <Route path="/" element={<Home userAddress={userAddress} />} />
                <Route path="/detail" element={<Detail />} />
                </Routes>
                </BrowserRouter>
            ) : (
                <>
                <div className='header'>
            <p>VACUNAGUATE</p>
        </div>
                <Connect setUserAddress={setUserAddress}/>
                </>
            )
    )
}

export default Component;
