import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PageStudent from "./page/PageStudent";
import AddStudent from "./page/AddStudent";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PageStudent/>}/>
                    <Route path="/students/add" element={<AddStudent/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
