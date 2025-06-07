import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          <div className="mb-8">
            <span className="text-gray-500">$ whoami</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Hey, I'm <span className="text-cyan-400">Keshav</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            I build with logic, break with reason.
          </p>
          <p className="text-lg md:text-xl text-green-300">
            Dev by day, ethical hacker by passion.
          </p>
          <div className="mt-12">
            <span className="animate-pulse">█</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="mb-4">
              <span className="text-gray-500">$ cat about.txt</span>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">whoami</h2>
              <div className="space-y-2 text-gray-300">
                <p>Engineer | Web Hacker | Student</p>
                <p className="text-green-400">Rooted in tech, rising through code.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="mb-4">
              <span className="text-gray-500">$ ls skills/</span>
            </div>
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Skills</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Programming</h3>
                <ul className="space-y-1 text-gray-300">
                  <li>• Python</li>
                  <li>• JavaScript</li>
                  <li>• Bash</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Security Tools</h3>
                <ul className="space-y-1 text-gray-300">
                  <li>• Kali Linux</li>
                  <li>• Termux</li>
                  <li>• NetHunter</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Penetration Testing</h3>
                <ul className="space-y-1 text-gray-300">
                  <li>• Nmap</li>
                  <li>• Hydra</li>
                  <li>• SQLmap</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Web Security</h3>
                <ul className="space-y-1 text-gray-300">
                  <li>• BurpSuite</li>
                  <li>• XSS</li>
                  <li>• SQLi</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-900 rounded border border-gray-600">
              <p className="text-green-400">
                <span className="text-gray-500"># </span>
                HTML, CSS, JS — "Web is my canvas"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="mb-4">
              <span className="text-gray-500">$ ls projects/</span>
            </div>
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Projects</h2>
            <div className="space-y-6">
              <div className="bg-gray-900 p-4 rounded border border-gray-600">
                <h3 className="text-lg font-semibold text-green-400 mb-2">1. Kalash Recon</h3>
                <p className="text-gray-300">Website scanner & info grabber</p>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-gray-600">
                <h3 className="text-lg font-semibold text-green-400 mb-2">2. SQLBypasser</h3>
                <p className="text-gray-300">Admin login override tool</p>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-gray-600">
                <h3 className="text-lg font-semibold text-green-400 mb-2">3. WiFi Raider</h3>
                <p className="text-gray-300">Nearby Wi-Fi brute-forcer</p>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-gray-600">
                <h3 className="text-lg font-semibold text-green-400 mb-2">4. SocialMap</h3>
                <p className="text-gray-300">Hidden profile detector from HTML</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-900 bg-opacity-30 rounded-lg p-6 border border-yellow-600">
            <div className="mb-4">
              <span className="text-gray-500">$ cat legal_notice.txt</span>
            </div>
            <h2 className="text-xl font-bold text-yellow-400 mb-4">Legal Tagline</h2>
            <p className="text-yellow-200">
              > All actions shown are within permission & legality. This portfolio is proof of skills, not threat.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="mb-4">
              <span className="text-gray-500">$ connect --to keshav</span>
            </div>
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Contact</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-green-400">></span>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">GitHub</a>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-green-400">></span>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Email</a>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-green-400">></span>
                <span className="text-green-400">Status: <span className="text-green-300">Online</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500">
            <span className="text-green-400">$</span> echo "Thanks for visiting my digital space"
          </p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;