import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "../components/Auth/Layout/AuthLayout";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import Ads from "../Pages/Ads/Ads";
import BasePage from "../Pages/BasePage/BasePage";
import RootDispatch from "../Pages/Home/RootDispatch/RootDispatch";
import ProductsPage from "../Pages/ProductsPage/ProductsPage";
import AccountPage from "../Pages/AccountPage/AccountPage";
import EditPage from "../Pages/EditPage/EditPage";

export default function RoutesService(){
    return ( 
        <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <BasePage>
                  <RootDispatch/>
                </BasePage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <BasePage>
                  <Ads />
                </BasePage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <BasePage>
                  <ProductsPage />
                </BasePage>
              </ProtectedRoute>
            }
          />
              <Route
            path="/account"
            element={
              <ProtectedRoute>
                <BasePage>
                  <AccountPage />
                </BasePage>
              </ProtectedRoute>
            }
          />
              <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <BasePage>
                  <EditPage />
                </BasePage>
              </ProtectedRoute>
            }
          />
          <Route path="/auth/*" element={<AuthLayout />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    )
}