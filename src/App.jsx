import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChatBotPage } from './page/ChatBotPage';
import { Layout } from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/chatbot" element={<ChatBotPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
