import React from 'react';
import { ApiKey } from '../ApiKey';


interface FooterProps {
    changePage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ changePage }) => {
    const style = {
        Footer: {
            bottom: '0',
            textAllign: 'right',
            display: 'flex',
            fontSize: '25px',
            backgroundColor: 'white',
            width: `100%`,
            height: '50px',
            color: 'black'
            
        },
        customButton: {
            backgroundColor: 'red',
            color: 'red',
        }
    };

    return (
        <div style={style.Footer}>
            <div style={style.Footer}>Contact Us | About | Legal</div>
            <ApiKey />
        </div>
    );
}

export default Footer;