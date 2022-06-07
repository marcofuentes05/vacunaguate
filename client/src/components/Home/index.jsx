import React, { useState, useEffect } from 'react';
import VaccineGroup from '../VaccineGroup';
import SendTokenModal from '../Modal';
import { contract, web3 } from '../../web3';
import metamask from '../../assets/metamask.svg';
import { Link } from 'react-router-dom';
// import metamaskFox from '../../assets/metamask_fox.svg';
import './styles.scss'

const Home = props => {
    const [userAddress, setUserAddress] = useState("");
    const [newToken, setNewToken] = useState(0);
    const [userTokens, setUserTokens] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedToken, setSelectedToken] = useState(0);

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

    useEffect(() => {
        userAddress && contract.methods.getTokensOfId(userAddress).call().then(res => {
            setUserTokens(res);
        })
    }, [userAddress]);

    const checkIfWalletIsConnected = async (onConnected) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.selectedAddress;

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

    // useEffect(() => {
    //     checkIfWalletIsConnected(setUserAddress);
    // }, [userAddress]);

    function Connect({ setUserAddress }) {
        if (isMobileDevice()) {
          const dappUrl = "metamask-auth.ilamanov.repl.co"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
          const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
          return (
            <a href={metamaskAppDeepLink}>
               <button className='metamask-connect'>
                    <img src={metamask} alt='Metamask logo' />
                    Connect using MetaMask
               </button>
            </a>
          );
        }
      
        return (
          <button className='metamask-connect' onClick={() => connect(setUserAddress)}>
            <img src={metamask} alt='Metamask logo' />
            Connect using MetaMask
          </button>
        );
      }

    web3.eth.subscribe('newBlockHeaders', async (error, result) => {
        if (!error && userAddress) {
            contract.methods.getTokensOfId(userAddress).call().then(res => {
                // setUserAddress(res);
                console.log(res);
            })
        }
    });

    return <div className='background'>

        <div className='header'>
            <p>VACUNAGUATE</p>
        </div>
        {
            userAddress ? 
            <>
        <div className='user-row'>
            <div className='user-image'>
                <img src={metamask} alt='user' />
            </div>
            <div className='user-info'>
                <p className='username'>USUARIO NAME</p>
                <p className='wallet'>{userAddress}</p>
            </div>
        </div>
        <div className='enter-group'>
            <p className='helper-text'>Ingresar nuevo lote</p>
            <div className='body'>
                <input type="number" placeholder='Identificador' value={newToken} onChange={event => event.target.value>0 ? setNewToken(event.target.value ) : undefined}></input>
                <div className='number-send' onClick={() => {contract.methods.mint(userAddress, +newToken).send({from: userAddress})}}>ENVIAR</div>
            </div>
        </div>
        <Link to='detail'>
            <div className='get-logs-button'>
                <p>Get Logs</p>
            </div>
        </Link>
        <h3 className='groups-title'>Lotes en posesión</h3>
        {userTokens.filter(token => token !== 0).map((token, index) => <VaccineGroup identifier={token} key={index} onSend={() => {setSelectedToken(token);setModalOpen(true);}} />)}
        <SendTokenModal isOpen={modalOpen} setIsOpen={setModalOpen} tokenId={selectedToken} loggedUser={userAddress} />
        </>
            : <Connect setUserAddress={setUserAddress}/>
        }
    </div>
}


export default Home;
