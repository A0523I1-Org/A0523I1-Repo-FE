import loading from './img/Dual Ring@1x-1.0s-200px-200px.gif'
import React from 'react';

const Loading = () => <img src={loading} alt='Loading...' style={{
    width: '70px',
    maxHeight: '70px',
    borderRadius: '50%',
    objectFit: 'cover',
    position: 'absolute',
    left: '50%',
    right: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow:'0 5px 10px rgba(0, 0, 0, 0.1)'
}}/>
export default Loading;