export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <span className="text-blue-400 mr-1">AI</span>Review
            </h3>
            <p className="text-slate-400 text-sm">
              Cutting-edge AI technology for UI design analysis and optimization.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "Testimonials", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              {["Terms", "Privacy", "Cookies", "Licenses"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} AIReview. All rights reserved.</p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            {["Twitter", "LinkedIn", "GitHub", "Discord"].map((item) => (
              <a key={item} href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

