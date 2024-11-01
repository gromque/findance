import React, { useState, useEffect } from 'react';
import { ChevronRight, TrendingUp, Lock, Mail, CheckCircle, DollarSign, PieChart, BarChart } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const features = [
    {
      title: "Effortless Wealth Growth",
      description: "Watch your money grow automatically with our smart investment algorithms.",
      icon: TrendingUp,
      bgColor: "bg-green-600",
      textColor: "text-green-100",
      iconColor: "text-green-200",
    },
    {
      title: "Personalized Strategies",
      description: "Get investment plans tailored to your unique financial goals and risk tolerance.",
      icon: PieChart,
      bgColor: "bg-blue-600",
      textColor: "text-blue-100",
      iconColor: "text-blue-200",
    },
    {
      title: "Real-time Optimization",
      description: "Your budget and investments are continuously optimized for maximum returns.",
      icon: BarChart,
      bgColor: "bg-orange-600",
      textColor: "text-orange-100",
      iconColor: "text-orange-200",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEmail = 'maha.98@gmail.com';
    const validPassword = '111';

    if (email === validEmail && password === validPassword) {
      setIsLoggedIn(true);
      setErrorMessage('');
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      }
      setTimeout(() => {
        window.location.href = '/home';
      }, 1000);
    } else {
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-gray-100 relative overflow-hidden">
      {/* Background SVG elements */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="#1a202c" />
        <g filter="url(#blur)" opacity="0.1">
          <path d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,144C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="#4c1d95" />
          <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,261.3C672,256,768,224,864,213.3C960,203,1056,213,1152,229.3C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="#5b21b6" />
          <path d="M0,256L48,261.3C96,267,192,277,288,277.3C384,277,480,267,576,245.3C672,224,768,192,864,181.3C960,171,1056,181,1152,192C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="#6d28d9" />
        </g>
      </svg>

      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-md bg-gray-800 bg-opacity-80 border-gray-700 rounded-lg shadow-lg p-4 backdrop-filter backdrop-blur-sm">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-purple-400 mr-2" />
            <h2 className="text-3xl font-bold text-purple-400">Findance</h2>
          </div>
          <p className="text-gray-400 text-center">Smart investing for your financial future</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-200">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-700 bg-opacity-50 border-gray-600 text-gray-100 focus:ring-purple-500 focus:border-purple-500 w-full p-2 rounded"
                  required
                  aria-label="Email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-200">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-gray-700 bg-opacity-50 border-gray-600 text-gray-100 focus:ring-purple-500 focus:border-purple-500 w-full p-2 rounded"
                  required
                  aria-label="Password"
                />
              </div>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                Remember Me
              </label>
              <a href="/forgot-password" className="text-purple-400 hover:underline">Forgot Password?</a>
            </div>
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition duration-300">
              Login to Findance
              <ChevronRight className="ml-2 h-4 w-4 inline" />
            </button>
          </form>
          {isLoggedIn && (
            <div className="flex items-center mt-4 text-green-500">
              <CheckCircle className="h-6 w-6" />
              <span className="ml-2">Welcome back!</span>
            </div>
          )}
          <div className="text-center mt-4">
            <p className="text-gray-400">Don't have an account? <a href="/signup" className="text-purple-400 hover:underline">Sign Up</a></p>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gray-800 bg-opacity-80 p-6 md:p-12 flex flex-col justify-center items-center text-center relative z-10">
        <div className="bg-gray-700 bg-opacity-50 p-8 rounded-lg shadow-lg max-w-md w-full backdrop-filter backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-purple-300 mb-4">Welcome to Findance</h2>
          <p className="text-xl text-gray-300 mb-6">
            Your smart financial companion that invests your excess money automatically based on your budget.
          </p>
          <div className="relative h-64 mb-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                  index === activeFeature ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className={`${feature.bgColor} bg-opacity-80 p-6 rounded-lg h-full flex flex-col items-center justify-center`}>
                  <feature.icon className={`h-16 w-16 ${feature.iconColor} mb-4`} />
                  <h3 className={`text-2xl font-bold ${feature.textColor} mb-2`}>{feature.title}</h3>
                  <p className={feature.textColor}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === activeFeature ? features[index].bgColor : 'bg-gray-500'}`}
                onClick={() => setActiveFeature(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}