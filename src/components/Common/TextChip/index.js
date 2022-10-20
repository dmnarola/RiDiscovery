import React from 'react'
import { Badge } from 'reactstrap'

const TextChip = (props) => {
    const {
        color = 'primary',
        text = ''
    } = props;
    return (
        <div >
            <Badge style={{ 'width': '70px', 'padding': '7px' }} color={color} pill>{text}</Badge>
        </div>
    )
}

export default TextChip