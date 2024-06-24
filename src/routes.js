import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import HomePage from './pages/HomePage';
import CoolersPage from './pages/CoolersPage';
import MyCoolersPage from './pages/MyCoolersPage';
import PublicCoolerPage from './pages/PublicCoolerPage';
import PrivateCoolerPage from './pages/PrivateCoolerPage';
import MembersPage from './pages/MembersPage';
import CreateCoolerPage from './pages/CreateCoolerPage';
import PublicCoolerJoin from './pages/PublicCoolerJoin';
import PrivateCoolerJoin from './pages/PrivateCoolerJoin';
import RegisterPage from './pages/RegisterPage';
import JoinCoolerPage from './pages/JoinCoolerPage';
import InboxPage from './pages/InboxPage';
import SettingsPage from './pages/SettingsPage';
import UploadVideoPage from './pages/UploadVideo';
import StudentPage from './pages/StudentPage';
import ReportPage from './pages/ReportPage';
import ViewStudentPage from './pages/ViewStudentPage';
import TeacherPage from './pages/TeacherPage';
import AddEditReportPage from './pages/AddEditReportPage';
import ViewExamReportPage from './pages/ViewExamReportPage';
import EditStudentPage from './pages/EditStudentPage';
import LogoutPage from './pages/LogoutPage';


export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: 'home', element: <StudentPage /> },
        { path: 'view-student', element: <ViewStudentPage /> },
        { path: 'view-exam-report', element: <ViewExamReportPage /> },
        { path: 'teachers', element: <TeacherPage /> },
        { path: 'reports', element: <ReportPage /> },
        { path: 'action-reports', element: <AddEditReportPage /> },
        { path: 'edit-student', element: <EditStudentPage /> },
        { path: 'members', element: <MembersPage /> },
        { path: 'my-cooler', element: <MyCoolersPage /> },
        { path: 'cooler', element: <CoolersPage /> },
        { path: 'join-cooler', element: <JoinCoolerPage /> },
        { path: 'chat', element: <InboxPage /> },
        { path: 'settings', element: <SettingsPage /> },
       
        // { path: 'my-cooler', element: <MyCoolersPage /> },
        { path: 'public-cooler', element: <PublicCoolerPage /> },
        { path: 'private-cooler', element: <PrivateCoolerPage /> },
        { path: 'join-public-cooler', element: <PublicCoolerJoin /> },
        { path: 'join-private-cooler', element: <PrivateCoolerJoin /> },
        { path: 'create-cooler', element: <CreateCoolerPage /> },
        { path: 'upload-video', element: <UploadVideoPage /> },
      ],
    },
    { path: 'logout', element: <LogoutPage /> },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
