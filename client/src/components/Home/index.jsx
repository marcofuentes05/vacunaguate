import React, { useRef, useState, useEffect } from 'react';
import VaccineGroup from '../VaccineGroup';
import SendTokenModal from '../Modal';
import { contract, web3, NAMES } from '../../web3';
import { Link } from 'react-router-dom';
import jazzicon from "@metamask/jazzicon"

import './styles.scss'

const Home = props => {
    const {userAddress} = props;
    const [newToken, setNewToken] = useState(0);
    const [userTokens, setUserTokens] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedToken, setSelectedToken] = useState(0);

    const avatarRef = useRef()
    useEffect(() => {
        const element = avatarRef.current;
        if (element && userAddress) {
            const addr = userAddress.slice(2, 10);
            const seed = parseInt(addr, 16);
            const icon = jazzicon(20, seed);
            if (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            element.appendChild(icon);
        }
    }, [userAddress, avatarRef]);

    web3.eth.subscribe('newBlockHeaders', async (error, result) => {
        if (!error && userAddress) {
            contract.methods.getTokensOfId(userAddress).call().then(res => {
                setUserTokens(res);
            })
        }
    });

    useEffect(() => {
        userAddress && contract.methods.getTokensOfId(userAddress).call().then(res => {
            setUserTokens(res);
        })
    }, [userAddress]);

    return <div className='background'>

        <div className='header'>
            <p>VACUNAGUATE</p>
        </div>
        <div className='user-row'>
            <div className='user-image' ref={avatarRef}>
                 <div  />
            </div>
            <div className='user-info'>
                <p className='username'>{NAMES[userAddress.toUpperCase()]}</p>
                <p className='wallet'>{userAddress}</p>
            </div>
        </div>
        <div className='enter-group'>
            <p className='helper-text'>Ingresar nuevo lote</p>
            <div className='body'>
                <input type="number" placeholder='Identificador' value={newToken} onChange={event => event.target.value>0 ? setNewToken(event.target.value ) : undefined}></input>
                <div className='number-send' onClick={() => {contract.methods.mint(userAddress, +newToken).send({from: userAddress})}}>Ingresar</div>
            </div>
        </div>
        <Link to='detail'>
            <div className='get-logs-button'>
                <p>Ver historial</p>
            </div>
        </Link>
        <h3 className='groups-title'>Lotes en posesión</h3>
        {userTokens.filter(token => token != 0).map((token, index) => <VaccineGroup identifier={token} key={index} onSend={() => {setSelectedToken(token);setModalOpen(true);}} />)}
        {userTokens.filter(token => token != 0).length == 0 && <p className='no-tokens'>No tiene lotes en posesión</p>}
        <SendTokenModal isOpen={modalOpen} setIsOpen={setModalOpen} tokenId={selectedToken} loggedUser={userAddress} />
    </div>
}


export default Home;
