import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import Header from "./pages/Header";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import AddSite from "./pages/AddSite";
import ViewSite from "./pages/ViewSites";
import AddCompany from "./pages/AddCompany";
import ViewCompany from "./pages/ViewCompany";

function App() {
  return (
    <Container className="mt-4 justify-content-center fluid" dir="rtl">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index element={<Home />} />
                    <Route path="/add_site" element={<AddSite />} />
                    <Route path="/view_site" element={<ViewSite />} />
                    <Route path="/add_company" element={<AddCompany />} />
                    <Route path="/company" element={<ViewCompany />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </Container>
  );
}

export default App;
