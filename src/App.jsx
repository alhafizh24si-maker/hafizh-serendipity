import React, { Suspense } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import "./assets/tailwind.css";
import Loading from "./components/Loading";

// Lazy Loading Layouts
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

// Lazy Loading Pages (Existing)
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));

// Lazy Loading Pages (New - BengkelGo)
const Mechanics = React.lazy(() => import("./pages/Mechanics"));
const CoverageArea = React.lazy(() => import("./pages/CoverageArea"));

// Auth & Error Pages
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

// 1. Data Mapping untuk Error (Disesuaikan dengan tema BengkelGo)
const errorData = {
  400: {
    code: "400",
    message: "BAD REQUEST",
    description: "Sinyal mekanik terputus. Permintaan Anda tidak valid atau rusak.",
    imageUrl: "/img/error-400.png",
  },
  401: {
    code: "401",
    message: "UNAUTHORIZED",
    description: "Eitss! Anda tidak memiliki kunci akses untuk memasuki area ini.",
    imageUrl: "/img/error-401.png",
  },
  403: {
    code: "403",
    message: "ACCESS FORBIDDEN",
    description: "Dilarang Masuk! Area ini hanya untuk teknisi senior bersertifikat.",
    imageUrl: "/img/error-403.png",
  },
  404: {
    code: "404",
    message: "PAGE NOT FOUND",
    description: "Halaman yang Anda cari sedang masuk bengkel (tidak ditemukan).",
    imageUrl: "/img/error-404.png",
  },
};

// 2. Wrapper untuk menangkap ID Error dari URL
const ErrorRouteWrapper = () => {
  const { errorCode } = useParams();
  const data = errorData[errorCode] || errorData[404]; 
  return <ErrorPage {...data} />;
};

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          
          <Route path="/mechanics" element={<Mechanics />} />
          <Route path="/locations" element={<CoverageArea />} />

      
          <Route path="/error/:errorCode" element={<ErrorRouteWrapper />} />


          <Route path="*" element={<ErrorPage {...errorData[404]} />} />
        </Route>


        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;