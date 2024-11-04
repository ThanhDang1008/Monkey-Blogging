import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage"; // Default import
import SignInPage from "pages/SignInPage";
import HomePage from "pages/HomePage";
import PageNotFound from "pages/PageNotFound";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/sign-in" element={<SignInPage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        ;
      </AuthProvider>
    </div>
  );
}

export default App;
