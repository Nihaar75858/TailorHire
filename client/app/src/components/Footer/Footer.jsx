export default function DashboardFooter() {
    return (
      <footer className="bg-black text-gray-400 px-6 py-12 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Logo & Tagline */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            </div>
            <p>Making the world a better place through constructing elegant hierarchies.</p>
            <div className="flex space-x-4 pt-2 text-lg">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" aria-label="X">
                <i className="fab fa-x-twitter" />
              </a>
              <a href="#" aria-label="GitHub">
                <i className="fab fa-github" />
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
  
          {/* Sections */}
          <div>
            <h3 className="text-white font-semibold mb-3">Solutions</h3>
            <ul className="space-y-2">
              <li><a href="#">Marketing</a></li>
              <li><a href="#">Analytics</a></li>
              <li><a href="#">Automation</a></li>
              <li><a href="#">Commerce</a></li>
              <li><a href="#">Insights</a></li>
            </ul>
          </div>
  
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2">
              <li><a href="#">Submit ticket</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Guides</a></li>
            </ul>
          </div>
  
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
  
          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">License</a></li>
            </ul>
          </div>
        </div>
  
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm">
          © 2024 Your Company, Inc. All rights reserved.
        </div>
      </footer>
    );
  }
  