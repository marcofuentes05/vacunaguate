import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { contract } from '../../web3';

import './styles.scss';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const SendTokenModal = props => {
    const {
        isOpen,
        setIsOpen,
        tokenId,
        loggedUser
    } = props;

    const [userAddress, setUserAddress] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setUserAddress("");
        }
    }, [isOpen]);

    const onSend = async () => {
        try {
            const _ = await contract.methods.transfer(userAddress, tokenId).send({from: loggedUser});
            setIsOpen(false);
        } catch {
            console.log("Error");
        }
    }

    return (<Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
        className="modal"
      >
        <h2>Enviar lote</h2>
        <div className='close-icon' onClick={() => setIsOpen(false)}>X</div>
        <div>Ingrese a qué wallet enviar {tokenId}</div>
        <input value={userAddress} onChange={event => setUserAddress(event.target.value)} />
        <div className='send-button' onClick={onSend} />
      </Modal>)
}

export default SendTokenModal;
