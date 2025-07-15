import { useState, useEffect } from "react";
import {
  Menu,
  Home,
  Calendar as CalendarIcon,
  BookOpen,
  Bell,
  Heart,
  Shield,
  MessageCircle,
  CheckSquare,
  Sun,
  Moon,
  TextCursorInput,
  Volume2,
  MapPin,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";

// Placeholder weather widget
function WeatherWidget() {
  return (
    <Card className="w-60 shadow-lg rounded-2xl">
      <CardContent className="p-4 flex items-center space-x-3">
        <MapPin className="w-5 h-5 text-secondary" />
        <div>
          <p className="text-sm text-gray-500">Stockton, CA</p>
          <p className="text-xl font-semibold">72°F · Sunny</p>
        </div>
      </CardContent>
    </Card>
  );
}

// Placeholder calendar widget
function CalendarWidget() {
  return (
    <Card className="w-full h-96 shadow-lg rounded-2xl flex items-center justify-center">
      <CardContent className="p-8 text-2xl text-gray-400">[Calendar will render here]</CardContent>
    </Card>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [largeText, setLargeText] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    document.documentElement.style.fontSize = largeText ? "18px" : "16px";
  }, [largeText]);

  const speak = () => {
    const text = document.getElementById("main-content")?.textContent || "";
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const navItems = [
    { icon: <Home className="w-4 h-4" />, label: "Home" },
    { icon: <BookOpen className="w-4 h-4" />, label: "Guide" },
    { icon: <CalendarIcon className="w-4 h-4" />, label: "Calendar" },
    { icon: <Bell className="w-4 h-4" />, label: "Alerts" },
    { icon: <Heart className="w-4 h-4" />, label: "Donate" },
    { icon: <Shield className="w-4 h-4" />, label: "Know Your Rights" },
    { icon: <CheckSquare className="w-4 h-4" />, label: "Tasks" },
    { icon: <MessageCircle className="w-4 h-4" />, label: "Chat" },
  ];

  return (
    <div className="flex h-screen text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-black transition-colors">
      {/* Sidebar */}
      <aside
        className={\`bg-black p-6 transition-transform duration-300 fixed md:static inset-y-0 left-0 w-64 \${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}\`}
      >
        <div className="text-2xl font-bold text-secondary mb-8 select-none">
          Hope<span className="text-primary">Hub</span>
        </div>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Button
              key={item.label}
              className="w-full justify-start hover:bg-blue-100 dark:hover:bg-gray-800"
            >
              {item.icon}
              <span className="ml-3 text-lg">{item.label}</span>
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Mobile topbar */}
        <header className="flex items-center justify-between bg-black/80 backdrop-blur-md px-4 py-3 md:hidden">
          <Button onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            <Menu className="w-6 h-6 text-secondary" />
          </Button>
          <div className="text-xl font-semibold text-secondary select-none">HopeHub</div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button onClick={() => setLargeText(!largeText)} aria-label="Toggle large text">
              <TextCursorInput className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <main id="main-content" className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="flex justify-end space-x-2">
            <Button onClick={speak} className="flex items-center space-x-1">
              <Volume2 className="w-4 h-4" /> <span>Read Aloud</span>
            </Button>
            <Button className="flex items-center space-x-1">
              <Heart className="w-4 h-4" /> <span>Hotline</span>
            </Button>
          </div>

          <h1 className="text-3xl font-semibold mb-4">Welcome to HopeHub</h1>
          <div className="flex flex-wrap gap-6">
            <WeatherWidget />
            <CalendarWidget />
          </div>

          <Card className="max-w-xl shadow-md rounded-2xl">
            <CardContent className="text-lg leading-relaxed space-y-4">
              <p>
                This static preview includes an accessible layout, local JSON data scaffolds,
                toggles for dark mode and large text, and placeholders for calendars and widgets.
              </p>
              <p>
                Edit <code>public/data/eventsShelters.json</code> to add real events or shelter updates,
                then rebuild the site for offline‑first distribution.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
