import React, { useEffect, useState } from 'react';
import {web3, contract, NAMES } from '../../web3';
import moment from 'moment'
import './styles.scss'

const Detail = props => {
    const [mintEvents, setMintEvents] = useState([]);
    const [transferEvents, setTransferEvents] = useState([]);
    const [generatedTokens, setGeneratedTokens] = useState([]);
    const [selectedToken, setSelectedToken ] = useState(0);

    const getGeneratedTokens = async () => {
        contract.methods.getGeneratedTokens().call().then(res => setGeneratedTokens(res));
    }

    useEffect(() => {
        getGeneratedTokens();
    }, []);

    useEffect(() => {
        contract.getPastEvents('Mint', {fromBlock: 0,
            toBlock: 'latest'}).then(function(events){
                const transformedMintEvents = events.map(
                    event => ({
                        eventType: 'Mint',
                        to: event.returnValues._to,
                        tokenId: event.returnValues._tokenId,
                        blockNumber: event.blockNumber,
                    })
                )
                setMintEvents(transformedMintEvents)
            });

        contract.getPastEvents('Transfer', {fromBlock: 0,
            toBlock: 'latest'}).then(function(events){
                const transformedTransferEvents = events.map(
                    event => ({
                        eventType: 'Transfer',
                        from: event.returnValues._from,
                        to: event.returnValues._to,
                        tokenId: event.returnValues._tokenId,
                        blockNumber: event.blockNumber,
                    })
                )
                setTransferEvents(transformedTransferEvents)
            });
    }, []);

    const log = (event) => {
        const timestamp = web3.eth.getBlock(event.blockNumber).timestamp
        return (
            <div className={`log-row ${event.eventType !== 'Mint' && 'orange'}`}>
                <p className='event-type'>{event.eventType}</p>
                <div className='log-info'>
                    <p className='helper-text'>Token:</p>
                    <p className='property'>{event.tokenId}</p>
                </div>
                <div className='log-info'>
                    <p className='helper-text'>Para:</p>
                    <p className='property'>{NAMES[event.to.toUpperCase()]}</p>
                </div>
                {
                    event.eventType !== 'Mint' && (
                    <div className='log-info'>
                        <p className='helper-text'>De:</p>
                        <p className='property'>{NAMES[event.from.toUpperCase()]}</p>
                    </div>  
                    )
                }
                <div className='log-info'>
                    <p className='helper-text'>Fecha:</p>
                    <p className='property'>{moment(timestamp).format('D MMM HH:MM')}</p>
                </div>
            </div>
        )
    }

    const allEvents = [...mintEvents, ...transferEvents];

    return (
        <div className='background'>
            <div className='header'>
                <p>VACUNAGUATE</p>
            </div>

            <h2>Ver historial de Lote</h2>
            <select onChange={event => setSelectedToken(event.target.value)}>
                <option value='-1'>Selecciona un lote</option>
                {generatedTokens.map(token => 
                    <option key={token} value={token}>{token}</option>)}
            </select>
            {allEvents.filter((event => event.tokenId === selectedToken)).map(filteredEvent => log(filteredEvent))}
            {/* {mintEvents.map(event => log(event))}
            {transferEvents.map(event => log(event))} */}
        </div>
    )
}

export default Detail;