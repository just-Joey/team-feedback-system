import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import UserList from './pages/users/UserList';
import UserDetail from './pages/users/UserDetail';
import TeamList from './pages/teams/TeamList';
import TeamDetail from './pages/teams/TeamDetail';
import FeedbackList from './pages/feedback/FeedbackList';
import FeedbackForm from './pages/feedback/FeedbackForm';
import FeedbackDetail from './pages/feedback/FeedbackDetail';
import TagList from './pages/tags/TagList';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="teams" element={<TeamList />} />
          <Route path="teams/:id" element={<TeamDetail />} />
          <Route path="feedback" element={<FeedbackList />} />
          <Route path="feedback/new" element={<FeedbackForm />} />
          <Route path="feedback/:id" element={<FeedbackDetail />} />
          <Route path="tags" element={<TagList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
