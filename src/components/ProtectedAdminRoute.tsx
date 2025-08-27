// // src/components/ProtectedAdminRoute.tsx
// import { Navigate } from "react-router-dom";

// export default function ProtectedAdminRoute({
//   children,
// }: {
//   children: JSX.Element;
// }) {
//   const token = localStorage.getItem("adminToken");
//   return token ? children : <Navigate to="/admin" replace />;
// }
