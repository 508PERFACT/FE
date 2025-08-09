import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChatBotPage } from './page/ChatBotPage';
import { Layout } from './components/Layout';
import { Login } from './page/Login';
import { MyPage } from './page/MyPage';
import { MyReports } from './page/MyReports';
import { Subscribe } from './page/Subscribe';
import { MainPage } from './page/MainPage';
import { Report } from './page/Report';
import { AlterNative } from './page/AlterNative';
import { NaverCallback } from './page/NaverCallback';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/report" element={<Report />} />
          <Route path="/report/:id/alternative" element={<AlterNative />} />
          <Route path="/chatbot" element={<ChatBotPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/myreports" element={<MyReports />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route>
          <Route path="/login" element={<Login />} />
          {/* 네이버 리디렉트 콜백 경로: 네이버 콘솔 등록값과 동일하게 설정 */}
          <Route path="/login/oauth2/code/naver" element={<NaverCallback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
