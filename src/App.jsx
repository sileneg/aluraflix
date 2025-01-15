import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

const App = () => {
  const basename = process.env.NODE_ENV === 'production' && import.meta.env.VITE_DEPLOY_TARGET === 'github' ? '/aluraflix' : '/';

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
