import React from 'react'

import './styles.scss'

const VaccineGroup = (props) => {
    const { identifier, onSend } = props;
    return (
        <div className='vaccine-group'>
            <div className='vaccine-group-info'>
                <p className='helper-text'>Identificador</p>
                <p className='vaccine-group-name'>{identifier}</p>
            </div>
            <div className='vaccine-group-send' onClick={onSend}>
                ENVIAR
            </div>
        </div>
    )
};

export default VaccineGroup;
