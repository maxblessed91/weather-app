import React from 'react';

import './conditions.css';

const conditions = (props) => {
    return (
        <div className='wrapper'>

            {props.error && <div className='small'>Please enter a valid city.</div>}

            {props.loading && <div className='loader'/>}

            {props.responseObj.cod === 200 ?
                <div>
                    <p><strong>{props.responseObj.name}</strong></p>
                    <p>It is currently {Math.round(props.responseObj.main.temp)} degrees out with {props.responseObj.weather[0].description}.</p>
                </div>
            : null
            }
        </div>
    )
}
export default conditions;
