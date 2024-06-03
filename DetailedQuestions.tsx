import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import OpenAI from 'openai';
import ProgressBarComponent from './ProgressBarComponent';
import './ProgressBarStyle.css';
import './ParallaxStarsStyle.css';
import { ApiKey } from '../ApiKey';
import { ReportContext } from '../ReportContext';

interface DetailedProps {
  changePage: (page: string) => void;
  onQuizComplete: () => void;
}

// DetailedQuestions.tsx

const DetailedQuestions: React.FC<DetailedProps> = ({ changePage, onQuizComplete }) => {
  const { setDetailedReport } = useContext(ReportContext);
  const detailedQuestions = [
    { questionNumber: "Question 1", question: "What ingredients do you already have that you would like to use?" },
    { questionNumber: "Question 2", question: "Do you have a budget? If so, list it here." },
    { questionNumber: "Question 3", question: "How many days would you like a plan for?" },
    { questionNumber: "Question 4", question: "How many servings do you need of each meal?" },
    { questionNumber: "Question 5", question: "Do you have any dietary restrictions?" },
    { questionNumber: "Question 6", question: "What appliances do you have access to?" },
    { questionNumber: "Question 7", question: "Do you have any other restrictions? Ex. Prep time, kid friendly" }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [detailedAnswers, setDetailedAnswers] = useState(Array(detailedQuestions.length).fill(''));
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const openai = new OpenAI({ apiKey: JSON.parse(localStorage.getItem('MYKEY') as string), dangerouslyAllowBrowser: true });

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

  // Use useCallback to prevent resetting the function reference on every render
  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setProgress(0);
    setDetailedAnswers(Array(detailedQuestions.length).fill(''));
  }, [detailedQuestions.length]);

  useEffect(() => {
    // Initialize/reset the quiz state on mount or load
    resetQuiz();
  }, [resetQuiz]);

  const handleInputChange = (text: string) => {
    const updatedAnswers = [...detailedAnswers];
    updatedAnswers[currentQuestionIndex] = text;
    setDetailedAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (detailedAnswers[currentQuestionIndex].trim() !== '') {
      if (currentQuestionIndex < detailedQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        if (progress === currentQuestionIndex) {
          setProgress(progress + 1);
        }
      } else {
        setProgress(progress + 1);
        generateReport();
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const generatePrompt = (questions: string[], answers: string[]) => {
    let QandAprompt = '';
    for (let i = 0; i < questions.length; i++) {
      QandAprompt += `${i + 1}: ${questions[i]} - ${answers[i]}\n`;
    }
  
    const promptText = `Create a career recommender report that is based on the following questions and answers. The report should have 2 different sections. One should have general information about 4 traits that the person seems to exhibit based on their answers. It should also include how these might impact their behavior in the workplace. This section should be concise and use bullet points with short sentences for descriptions. Don’t directly quote the given answers in this part, but find traits that they likely have based off of what they answered. 

    The other section should list 3 different industries and 3 specific job titles within each industry as well as their expected salary range and a brief description. The report SHOULD NOT have an introduction or conclusion or a description of the report. The report should be written like you are talking directly to the person who took the quiz. Only include the two sections described in the report and this text below them: "These recommended industries and job titles align with your strengths and interests, providing avenues for professional growth and fulfillment based on your career preferences. Consider exploring opportunities within these areas to leverage your skills effectively and achieve your career goals.
    
    This report aims to guide you towards potential career paths that resonate with your personality traits and preferences. Good luck on your career journey!"
    
    Format your response so that the following parseReport function called on your response will correctly parse the response and display it correctly on the page:
    const parseReport = (report: string): JSX.Element | null => {
        if (!report.trim()) return null;
      
        const sections = report.split('**').map((section) => section.trim());
        
        return (
          <div>
            {sections.map((section, index) => {
              if (!section) return null;
      
              const lines = section.split('\n').map((line) => line.trim());
              const title = lines[0];
              const content = lines.slice(1).filter((line) => line.trim().startsWith('-'));
      
              return (
                <div key={index}>
                  <h3>{title}</h3>
                  <ul>
                    {content.map((item, idx) => (
                      <li key={idx}>{item.trim().substring(1)}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        );
      };
    
    Here are the questions the user was asked and the answers they selected. The format of these questions is that the user selects which of the 2 options they feel most applies to them. In this list, the question number is given, followed by the question, and then the answer that was selected:`;
  
    return `${promptText}${QandAprompt}`;
  };
  

  const generateReport = async () => {
    setIsLoading(true);
    const promptContent = generatePrompt(
      detailedQuestions.map((q) => q.question),
      detailedAnswers
    );

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: promptContent }],
      max_tokens: 800,
      model: 'gpt-4-turbo',
      temperature: 0.5,
    });

    const reportContent = completion.choices[0].message.content || '';

    setDetailedReport(reportContent);
    setIsLoading(false);
    changePage('DetailedReport');

    // Reset the quiz after the report is shown
    resetQuiz();
  };

  return (
    <>
      <div className='pageTop'>
        <h2 className='styledText'>Detailed Career Questions</h2>
        <ProgressBarComponent
          progress={progress}
          total={detailedQuestions.length}
          progressText={`${progress}/${detailedQuestions.length}`}
          rocketImagePath="../assets/Rocket.png"
        />

       <div id='planet' className={`planetLayer ${isLoading ? 'spin' : ''}`}>
          {isLoading && <div className="loadingText">Loading...</div>}
        </div>


      </div>
      <div className='pageBody'>
        <div className='parallax-scrolling'>
          <div id='stars1' className="parallax-star-layer"></div>
          <div id='stars3' className="parallax-star-layer"></div>
          <div className='container1'>
            <div className="column">
              <div className="customButton1">
                <h2>{detailedQuestions[currentQuestionIndex].questionNumber}</h2>
                <p>{detailedQuestions[currentQuestionIndex].question}</p>
                <div className='form'>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={detailedAnswers[currentQuestionIndex]}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Enter your response here"
                  />
                </div>
                <div className='buttons'>
                  <button onClick={handleBack} disabled={currentQuestionIndex === 0}>Back</button>

                  {currentQuestionIndex < detailedQuestions.length - 1 ? (
                    <button onClick={handleNext} disabled={detailedAnswers[currentQuestionIndex].trim() === ''}>Next</button>
                  ) : (
                    <button onClick={handleNext} disabled={detailedAnswers[currentQuestionIndex].trim() === ''}>Submit</button>
                  )}

                </div>
              </div>
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
};

export default DetailedQuestions;
