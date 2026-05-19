import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
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

const queryClient = new QueryClient();

function Router() {
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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="dark min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />
            <main>
              <Router />
            </main>
            <Toaster />
          </div>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
