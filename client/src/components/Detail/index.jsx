import React, { useEffect, useState } from 'react';
import {web3, contract } from '../../web3';
import moment from 'moment'
import './styles.scss'

const Detail = props => {
    const [mintEvents, setMintEvents] = useState([]);
    const [transferEvents, setTransferEvents] = useState([]);

    useEffect(() => {
        contract.getPastEvents('Mint', {fromBlock: 0,
            toBlock: 'latest'}).then(function(events){
                console.log(events)
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
                console.log(events)
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
                    <p className='helper-text'>To:</p>
                    <p className='property'>{event.to}</p>
                </div>
                {
                    event.eventType !== 'Mint' && (
                    <div className='log-info'>
                        <p className='helper-text'>From:</p>
                        <p className='property'>{event.from}</p>
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

    return (
        <div className='background'>
            <div className='header'>
                <p>VACUNAGUATE</p>
            </div>
            
            {mintEvents.map(event => log(event))}
            {transferEvents.map(event => log(event))}
        </div>
    )
}

export default Detail;