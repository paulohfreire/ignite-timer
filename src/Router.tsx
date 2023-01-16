import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { History } from "./pages/History";
import { DefaultLayout } from "./layouts/DefaultLayout";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>

      {/* Caso tenha outros layouts é só criar um novo Route com o path indicando aqui também. apenas
      separa do Route de DefaultLayout acima */}
      {/* ex: 
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/products" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route> */}
    </Routes>
  );
}
