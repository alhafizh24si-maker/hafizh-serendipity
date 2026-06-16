import React, { Suspense } from "react";
import { Route, Routes, useParams, Navigate } from "react-router-dom";
import "./assets/tailwind.css";
import Loading from "./components/Loading";

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Mechanics = React.lazy(() => import("./pages/Mechanics"));
const CoverageArea = React.lazy(() => import("./pages/CoverageArea"));
const ComponentsPage = React.lazy(() => import("./pages/Components"));

const MechanicCrmStatus = React.lazy(() => import("./components/MechanicCrmStatus"));
const dataCust = React.lazy(() => import("./pages/dataCust"));
const Promotions = React.lazy(() => import("./pages/Promotions"));
const Reviews = React.lazy(() => import("./pages/Reviews"));
const Messages = React.lazy(() => import("./pages/Messages"));

// 🟢 LAZY IMPORT HALAMAN MEMBER & DATABASE MONITOR BARU
const Member = React.lazy(() => import("./pages/Member")); // Jalur file Member.jsx Anda
const DatabaseMonitor = React.lazy(() => import("./pages/DatabaseMonitor"));

const GuestLanding = React.lazy(() => import("./pages/GuestLanding"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductsDetail = React.lazy(() => import("./pages/ProductsDetail"));

const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

const errorData = {
  400: { code: "400", message: "BAD REQUEST", description: "Sinyal mekanik terputus.", imageUrl: "/img/error-400.png" },
  401: { code: "401", message: "UNAUTHORIZED", description: "Eitss! Anda tidak memiliki kunci akses.", imageUrl: "/img/error-401.png" },
  403: { code: "403", message: "ACCESS FORBIDDEN", description: "Dilarang Masuk! Area ini khusus teknisi senior.", imageUrl: "/img/error-403.png" },
  404: { code: "404", message: "PAGE NOT FOUND", description: "Halaman masuk bengkel (tidak ditemukan).", imageUrl: "/img/error-404.png" },
};

const ErrorRouteWrapper = () => {
  const { errorCode } = useParams();
  const data = errorData[errorCode] || errorData[404]; 
  return <ErrorPage {...data} />;
};

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Halaman Landing Awal */}
        <Route path="/" element={<GuestLanding />} />

        {/* Halaman Autentikasi Mandiri */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* 🟢 HALAMAN MEMBER MANDIRI (Diletakkan di luar MainLayout) */}
        <Route path="/member" element={<Member />} />

        {/* Kelompok Halaman Utama Manajemen CRM Dashboard Bengkel */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/mechanics" element={<Mechanics />} />
          <Route path="/locations" element={<CoverageArea />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductsDetail />} />
          
          <Route path="/customers" element={<Customers />} />
          <Route path="/dataCust" element={<dataCust />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/MechanicCrmStatus" element={<MechanicCrmStatus />} />
          
          <Route path="/database-monitor" element={<DatabaseMonitor />} />
          
          <Route path="/error/:errorCode" element={<ErrorRouteWrapper />} />
          <Route path="*" element={<ErrorPage {...errorData[404]} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
export default App;