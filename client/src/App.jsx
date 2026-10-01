import { useState } from 'react'
import './App.css';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import { Toaster } from "react-hot-toast";
import CreateNote from './pages/CreateNote.jsx';
import ReadNote from './pages/ReadNote.jsx';
import MyNotes from './pages/MyNotes.jsx';
import About from './pages/About.jsx';
import EditNote from './pages/EditNote.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

function App() {

  return (
     <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About/>} />
        
        <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes/new" element={<CreateNote />} />
          <Route path="/notes/:id" element={<ReadNote />} />
          <Route path="/mynotes" element={<MyNotes/>} /> 
          <Route path="/notes/:id/edit" element={<EditNote/>} />
        </Route>

      </Routes>
     </>
  )
}

export default App;
