import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChatBotPage } from './page/ChatBotPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chatbot" element={<ChatBotPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
