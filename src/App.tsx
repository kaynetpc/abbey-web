import React from "react";
import RouterComponent from "./Router";
import AuthProvider from "./contexts/AuthContext";

const App: React.FC = () => {
  
  return (
    <div className="app">
      <AuthProvider>
        <RouterComponent />
      </AuthProvider>
    </div>
  );
};

export default App;
