import { Switch, Route, Router as WouterRouter } from "wouter";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { useState } from "react";
  import { Toaster } from "@/components/ui/toaster";
  import { TooltipProvider } from "@/components/ui/tooltip";
  import { Navbar } from "@/components/layout/Navbar";
  import { CinematicLoader } from "@/components/CinematicLoader";
  import NotFound from "@/pages/not-found";

  import Home from "@/pages/home";
  import About from "@/pages/about";
  import Thinking from "@/pages/thinking";
  import Systems from "@/pages/systems";
  import Projects from "@/pages/projects";
  import Legacy from "@/pages/legacy";
  import Journal from "@/pages/journal";
  import InnerCircle from "@/pages/inner-circle";
  import Contact from "@/pages/contact";
  import AdminPage from "@/pages/admin";
  import MetricsTicker from "@/components/MetricsTicker";

  const queryClient = new QueryClient();
  const basePath = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

  function AppRouter() {
    return (
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/thinking" component={Thinking} />
        <Route path="/systems" component={Systems} />
        <Route path="/projects" component={Projects} />
        <Route path="/legacy" component={Legacy} />
        <Route path="/journal" component={Journal} />
        <Route path="/inner-circle" component={InnerCircle} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  export default function App() {
    const [loaded, setLoaded] = useState(false);

    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={basePath}>
            <CinematicLoader onComplete={() => setLoaded(true)} />
            {loaded && (
              <>
                <MetricsTicker />
                <Navbar />
                <AppRouter />
              </>
            )}
            <Toaster />
          </WouterRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }