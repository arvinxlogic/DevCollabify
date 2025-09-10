// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

// Legal Pages
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Pricing from "./components/Pricing";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import Premium from "./components/Premium";
// import RefundPolicy from "./components/RefundPolicy";
import Chat from "./components/Chat";
// Payment Components (to be created)
// import Payment from "./components/Payment";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/premium" element={<Premium/>} />
<Route path="/chat/:targetUserId" element={<Chat/>} />
              {/* Legal Pages Routes */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              {/* <Route path="/refund" element={<RefundPolicy />} /> */}
              
              {/* Payment Routes (uncomment when ready) */}
              {/* <Route path="/payment/:plan" element={<Payment />} /> */}
              {/* <Route path="/premium" element={<Premium />} />
              <Route path="/chat/:targetUserId" element={<Chat />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;