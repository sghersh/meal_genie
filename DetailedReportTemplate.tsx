import React, { useEffect, useContext } from 'react';
import './Styles.css';
import { Button } from 'react-bootstrap';
import { ApiKey } from '../ApiKey';
import './ParallaxStarsStyle.css';
import { ReportContext } from '../ReportContext';
interface DetailedReportProps {
    changePage: (page: string) => void;
    detailedQuizCompleted: boolean;
}

const DetailedReport: React.FC<DetailedReportProps> = ({ changePage, detailedQuizCompleted}) => {
  
  
  const parseReport = (report: string): JSX.Element | null => {
    if (!report.trim()) return null;
  
    const sections = report.split('**').map((section) => section.trim());
    
    return (
      <div>
        {sections.map((section, index) => {
          if (!section) return null;
  
          const lines = section.split('\n').map((line) => line.trim());
          const title = lines[0].split('-')[0].trim();
          const content = lines.slice(0).filter((line) => line.trim().startsWith('-') && line.trim().substring(1).trim() !== '');
       

          
          return (
            <div key={index}>
              <h3>{title}</h3>
              <ul className='listItems'>
                {content.map((item, idx) => (
                  <li key={idx}>{item.trim().substring(1)}</li>
                ))}
              </ul>
            </div>
          );
        })}
        <div>
        <strong>These recommended industries and job titles align with your strengths and interests, providing avenues for professional growth and fulfillment based on your career preferences. 
    Consider exploring opportunities within these areas to leverage your skills effectively and achieve your career goals.
    This report aims to guide you towards potential career paths that resonate with your personality traits and preferences. Good luck on your career journey!</strong>
      </div>
      </div>
    );
  };

  
  



  const { detailedReport } = useContext(ReportContext);

    const handleStartDetailedQuiz = () => {
        // Navigate to the Detailed Quiz page
        changePage('Detailed');
    };



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

    return(
        <>
           <div className='pageTop'>
        <h2 className='styledText'>Detailed Report</h2>
      </div>
      <div className='pageBody'>
        <div className='parallax-scrolling'>
          <div id='stars1' className='parallax-star-layer'></div>
          <div id='stars3' className='parallax-star-layer'></div>
          <div className='container1'>
            <div className='column'>
              
              {/* Button showing the generated career report or a placeholder */}
              {!detailedReport ? (
              <Button className='customButton2' onClick={handleStartDetailedQuiz}>
              Take the Detailed Quiz to get your result!</Button>
                ) : 
                null
                }
                {detailedReport ? (
                  <div className='reportContainer' >
                    <h3>Detailed Career Report</h3>
                    <p>{parseReport(detailedReport)}</p>
                  </div>
                ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className='footer'>
        <p>© 2024 Helpi. All rights reserved.</p>
        <ApiKey />
      </div>
        </>
    );
}

export default DetailedReport;
