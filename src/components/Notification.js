
export const SuccessMessage = ({message}) => {
    if (message === null) {
        return null
    }
    const style = {
        'color': 'green',
        'background': 'lightgrey',
        'fontSize': '20px',
        'borderStyle': 'solid',
        'borderRadius': '5px',
        'padding': '10px',
        'marginBottom': '10px',
    }
    return (
    <div style={style}>
        {message}
    </div>
    )
}

export const ErrorMessage = ({message}) => {
    if (message === null) {
        return null
    }
    const style = {
        'color': 'red',
        'background': 'lightgrey',
        'fontSize': '20px',
        'borderStyle': 'solid',
        'borderRadius': '5px',
        'padding': '10px',
        'marginBottom': '10px',
    }
    return (
    <div style={style}>
        {message}
    </div>
    )
}