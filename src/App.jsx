import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChatBotPage } from './page/ChatBotPage';
import { Layout } from './components/Layout';
import { MyPage } from './page/MyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/chatbot" element={<ChatBotPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
