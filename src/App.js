import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import View from './components/students/View';
import Edit from './components/students/Edit';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/edit/1" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
