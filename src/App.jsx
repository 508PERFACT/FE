import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChatBotPage } from './page/ChatBotPage';
import { Layout } from './components/Layout';
import { Login } from './page/Login';
import { MyPage } from './page/MyPage';
import { MyReports } from './page/MyReports';
import { Subscribe } from './page/Subscribe';
import { Report } from './page/Report';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/report" element={<Report />} />
          <Route path="/chatbot" element={<ChatBotPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/myreports" element={<MyReports />} />
          <Route path="/subscribe" element={<Subscribe />} />
        </Route>
        <Route>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
