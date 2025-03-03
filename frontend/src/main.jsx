import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { useChatStore } from "./store/useChatStore";

const Main = () => {
  const { subscribeToMessages, unsubscribeFromMessages } = useChatStore();

  React.useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [subscribeToMessages, unsubscribeFromMessages]);

  return <App />;
};

ReactDOM.createRoot(<Main/>, document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
