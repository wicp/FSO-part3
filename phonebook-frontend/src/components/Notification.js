import React from 'react'

const Notification = ({message, kind}) => {
    if (!message) return null
    let style
    switch (kind) {
        case 'info':
            style = {
                backgroundColor: 'rgb(180, 170, 170)',
                color: 'green',
                border: '5px solid green',
                borderRadius: '10px',
                paddingLeft: '5px',
            }
            break;
        case 'error':
            style = {
                backgroundColor: 'rgb(180, 170, 170)',
                color: 'red',
                border: '5px solid red',
                borderRadius: '10px',
                paddingLeft: '5px',
            }
            break;
        default:
            console.log(`unknown notification kind: ${kind}`)
            return null
    }
    return (
        <div style={style}>
            <p>{message}</p>
        </div>
    )
}

export default Notification