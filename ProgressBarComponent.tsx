import { ProgressBar } from 'react-bootstrap';
import './ProgressBarStyle.css';
import rocket from '../assets/Rocket.png';


export type ProgressBarProps= {
   progress: number; 
   total: number; 
   progressText?: string; 
   rocketImagePath: string; 
}


const ProgressBarComponent = ({ rocketImagePath, total, progress, progressText = "" }: ProgressBarProps) => {
   const percentage = (progress / total) * 100;
  
   return (
      <div className='wrapper'>
         <ProgressBar now={percentage} label={`${progressText} (${percentage.toFixed(0)}%)`} className="custom-progress-bar"/>
         {/* Rocket image that moves along with the progress */}
         <div
         id ='rocket' //matches .css file 
         style={{
            backgroundImage: `url(${rocket})`, 
            left: `calc(${percentage - 1}%)`, //-1 to ensure the image is backed up to the progress bar
            top: '-33px', //offset y
            transform: 'translateY(-20px)', 
            animation: 'idleRocket 2s ease-in-out infinite', /* Add an I to the beginning to restart animation */
         }}
         />
      </div>
   );
}

export default ProgressBarComponent;
