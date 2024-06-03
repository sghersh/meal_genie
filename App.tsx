import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import BasicQuestions from './pages/BasicQuestions';
import DetailedQuestions from './pages/DetailedQuestions';
import BasicReport from './pages/BasicReportTemplate';
import DetailedReport from './pages/DetailedReportTemplate';
import { Header } from './pages/Header';
import { ReportProvider } from './ReportContext';


function App() {
  const [currentPage , setCurrentPage] = useState<string>('Home'); //for the current page the user is on
  const [basicQuizCompleted, setBasicQuizCompleted] = useState<boolean>(false);
  const [detailedQuizCompleted, setDetailedQuizCompleted] = useState<boolean>(false);


  /* State change to navigate to different pages */
  const renderPage = (): JSX.Element => {
    switch (currentPage) {
      case 'Basic':
        return <BasicQuestions changePage={setCurrentPage} onQuizComplete={() => setBasicQuizCompleted(true)} />;
      case 'Detailed':
        return <DetailedQuestions changePage={setCurrentPage} onQuizComplete={() => setDetailedQuizCompleted(true)} />;
      default:
        return <Home changePage = {setCurrentPage}/>;
      case 'BasicReport':
        return <BasicReport changePage={setCurrentPage} basicQuizCompleted={basicQuizCompleted} />;
      case 'DetailedReport':
        return <DetailedReport changePage={setCurrentPage} detailedQuizCompleted={detailedQuizCompleted} />;
    }
  }

  return (
    <ReportProvider>
    <div className="App">
      <Header changePage={setCurrentPage} isHome={currentPage === 'Home'}/>
      {renderPage()}
    </div>
    </ReportProvider>

  );
}

export default App;