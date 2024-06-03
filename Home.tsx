import React, { useEffect } from 'react';
import './Styles.css';
import { Button } from 'react-bootstrap';
import { ApiKey } from '../ApiKey';
import './ParallaxStarsStyle.css';

interface HomeProps {
    changePage: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ changePage }) => {

    const handleBasicClick = () => {
        changePage('Basic');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleDetailedClick = () => {
        changePage('Detailed');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    useEffect(() => {
        const handleScroll = () => {
            const yPos = window.scrollY;

            const stars1 = document.getElementById('stars1');
            const stars2 = document.getElementById('stars2');
            const stars3 = document.getElementById('stars3');
            
            if (stars1) stars1.style.transform = `translateY(-${yPos * 0.5}px)`;
            if (stars2) stars2.style.transform = `translateY(-${yPos * 0.3}px)`;
            if (stars3) stars3.style.transform = `translateY(-${yPos * 0.1}px)`;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className='logoScreen'>
                <h2 className='homePageStyledText'>Launch Pad</h2>
                <h3>Reach for the stars</h3>
            </div>
       
        <div className="pageBody">
                {/*Buttons to navigate to Basic and Detailed question pages*/}
        <div className ='parallax-scrolling'>
            <div id='stars1' className="parallax-star-layer"></div>
            <div id='stars3' className="parallax-star-layer"></div>
            <div className='container'>
                <div className="column">
                        <Button className="customButton" onClick={handleBasicClick}>
                        <h2>The Basic Quiz</h2>
                        <h3>(5 Mins)</h3>
                        {/*formatting below by ChatGPT*/}
                        <ul>
                            <h5>Kickstart your career exploration with our Basic Career Questions!</h5>
                            <li>Quickly gauge your interests, traits, and preferences.</li>
                            <li>Perfect for those at the start of their career journey.</li>
                            <li>Discover potential career paths and associated salaries</li>
                            <li>Simply choose between two given options</li>
                        </ul>                    
                        </Button>
                </div>

                <div className="column">
                    <Button className='customButton' onClick={handleDetailedClick}>
                        <h2>The Detailed Quiz</h2>
                        <h3>(10 Mins)</h3>
                        {/*formatting below by ChatGPT*/}
                        <ul>
                            <h5>Ready to dive deeper into your career exploration?</h5>
                            <li>Provides three ideal industries each with specific careers.</li>
                            <li>Results include expected salary, workplace setting possibilities, and educational requirements</li>
                            <li>Perfect for those with a general idea of their career interests.</li>
                            <li>Open ended short answer questions</li>
                        </ul>                    
                    </Button>
                </div>
            </div>
        </div>
        </div>

       <div className="footer">
            <p>© 2024 Helpi. All rights reserved.</p>
            <ApiKey />
        </div>
  
    </>

    );
}

export default Home;
