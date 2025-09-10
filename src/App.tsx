import { useState } from 'react';
import Navigation from './components/Navigation';
import MBTITest from './components/MBTITest';
import BakeryMap from './components/BakeryMap';
import RandomPicker from './components/RandomPicker';

function App() {
  const [currentPage, setCurrentPage] = useState('mbti');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'mbti':
        return <MBTITest />;
      case 'map':
        return <BakeryMap />;
      case 'random':
        return <RandomPicker />;
      default:
        return <MBTITest />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderCurrentPage()}
    </div>
  );
}

export default App;