import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Category from "@/pages/Category";
import ProductDetail from "@/pages/ProductDetail";
import Checkout from "@/pages/Checkout";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import OurStory from "@/pages/OurStory";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Notification from "@/components/Notification";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/category/:slug" component={Category} />
            <Route path="/product/:slug" component={ProductDetail} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/profile" component={Profile} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/our-story" component={OurStory} />
            <Route path="/faq" component={NotFound} />
            <Route path="/logistics" component={NotFound} />
            <Route path="/contact" component={NotFound} />
            <Route path="/privacy" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
        <Notification />
      </div>
    </QueryClientProvider>
  );
}

export default App;
