import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.h1
          className="text-4xl font-orbitron text-gold mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading the Pibble SMP World...
        </motion.h1>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald to-magenta"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <motion.p
          className="mt-4 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress}%
        </motion.p>
      </div>
    </motion.div>
  );
}



function Navigation() {
  return (
    <motion.nav
      className="fixed top-0 w-full bg-black/60 backdrop-blur-md z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-4">
          <img src="/cute-cozy-building-smp-is-looking-for-new-members-૮-ﻌ-ა-v0-l24fv0gcyxpf1.webp" alt="Pibble SMP Logo" className="w-20 h-16 rounded-lg glow-green object-contain" />
          <span className="text-2xl font-bold text-white">Pibble SMP</span>
        </Link>
        <ul className="hidden md:flex space-x-8">
          <li>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="text-white hover:text-emerald-400 transition duration-300 relative">
                Home
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </li>
          <li>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/about" className="text-white hover:text-pink-400 transition duration-300 relative">
                About
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </li>
          <li>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/features" className="text-white hover:text-emerald-400 transition duration-300 relative">
                Features
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </li>
          <li>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/join" className="text-white hover:text-pink-400 transition duration-300 relative">
                Join
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </li>
          <li>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/community" className="text-white hover:text-emerald-400 transition duration-300 relative">
                Community
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </li>
          <li>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/rules" className="text-white hover:text-pink-400 transition duration-300 relative">
                Rules
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </li>
          <li>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/status" className="text-white hover:text-emerald-400 transition duration-300 relative">
                Status
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const [serverStatus, setServerStatus] = useState({ online: false, players: 0, loading: true });

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch('https://api.mcsrvstat.us/2/45.142.28.7:19005');
        const data = await response.json();
        setServerStatus({
          online: data.online || false,
          players: data.players ? data.players.online : 0,
          loading: false
        });
      } catch (error) {
        setServerStatus(prev => ({ ...prev, loading: false }));
      }
    };

    fetchServerStatus();
    // Refresh every 30 seconds
    const interval = setInterval(fetchServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="min-h-screen overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #10B981 0%, #EC4899 50%, #A855F7 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientMove 15s ease infinite',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >

      {/* Overlay */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6">
        <motion.div
          className="text-center max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron text-white mb-6 sm:mb-8 pulse-glow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            Welcome to <span className="text-pink-400">Pibble SMP</span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 mb-10 sm:mb-12 lg:mb-16 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
          >
            A Friendly Vanilla Survival World
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
          >
            <motion.button
              className="w-full sm:w-auto px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 text-white font-bold text-lg sm:text-xl lg:text-2xl rounded-xl sm:rounded-2xl shadow-2xl border border-emerald-300/50"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 40px rgba(16, 185, 129, 0.8), 0 0 80px rgba(16, 185, 129, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                navigate('/join');
              }}
            >
              Join Server
            </motion.button>
            <motion.button
              className="w-full sm:w-auto px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white font-bold text-lg sm:text-xl lg:text-2xl rounded-xl sm:rounded-2xl shadow-2xl border border-pink-300/50"
              whileHover={{
                scale: 1.05,
                y: [-2, 2, -2],
                boxShadow: "0 12px 40px rgba(236, 72, 153, 0.8), 0 0 80px rgba(236, 72, 153, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                transition: { duration: 0.6, ease: "easeInOut", y: { duration: 0.3, repeat: Infinity } }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.open('https://discord.gg/tQU3R4sSDS', '_blank');
              }}
            >
              Join Discord
            </motion.button>
          </motion.div>

          {/* Server Status Indicator */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="inline-flex items-center bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-600">
              <div className={`w-2 h-2 rounded-full mr-2 ${serverStatus.loading ? 'bg-yellow-400' : serverStatus.online ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
              <span className="text-sm text-gray-300">
                {serverStatus.loading ? 'Checking...' : serverStatus.online ? `🟢 Server Online – ${serverStatus.players} Players` : '🔴 Server Offline'}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Optimized floating particles */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-emerald-200' : 'bg-pink-200'} opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              willChange: 'transform, opacity',
            }}
            animate={{
              y: [-10, -40],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: Math.random() * 4 + 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-6 py-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-orbitron text-white mb-8"
              style={{ textShadow: '0 0 30px rgba(76, 175, 80, 0.9)' }}>
            About Pibble SMP
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-12">
            Pibble SMP is a small, inclusive Minecraft survival multiplayer server focused on building a friendly community.
            We emphasize vanilla gameplay with quality-of-life improvements, ensuring everyone has a fair and enjoyable experience.
            Our server is designed for players who value creativity, cooperation, and respect.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-gray-900 p-8 rounded-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(76, 175, 80, 0.5)" }}
            >
              <h3 className="text-2xl font-semibold text-emerald-400 mb-4">Vanilla Survival</h3>
              <p className="text-gray-300">Experience the pure Minecraft survival gameplay with all the classic features you love.</p>
            </motion.div>
            <motion.div
              className="bg-gray-900 p-8 rounded-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(233, 30, 99, 0.5)" }}
            >
              <h3 className="text-2xl font-semibold text-pink-400 mb-4">Community Focused</h3>
              <p className="text-gray-300">Built around friendship, collaboration, and mutual respect among all players.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeaturesPage() {
  const features = [
    { title: "Friendly Players", description: "Inclusive and welcoming community", icon: "👥", color: "emerald" },
    { title: "Regular Events", description: "Exciting competitions and gatherings", icon: "🎉", color: "pink" },
    { title: "No Griefing", description: "Safe environment for all builds", icon: "🛡️", color: "emerald" },
    { title: "Creative Builds", description: "Show off your building skills", icon: "🏗️", color: "pink" },
    { title: "24/7 Uptime", description: "Server always available", icon: "⚡", color: "emerald" },
    { title: "Active Staff", description: "Dedicated team keeping things running", icon: "👨‍💼", color: "pink" },
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-6 py-20">
        <motion.h1
          className="text-5xl font-orbitron text-center text-white mb-12"
          style={{ textShadow: '0 0 30px rgba(76, 175, 80, 0.9)' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Server Features
        </motion.h1>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-8 rounded-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{
                rotateY: 15,
                scale: 1.1,
                boxShadow: `0 0 40px rgba(${feature.color === 'emerald' ? '76, 175, 80' : '233, 30, 99'}, 0.8)`,
                transition: { duration: 0.3 }
              }}
            >
              <div className="text-7xl mb-4">{feature.icon}</div>
              <h3 className={`text-2xl font-semibold mb-2 text-${feature.color}-400`}>{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommunityPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-6 py-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-orbitron text-white mb-8"
              style={{ textShadow: '0 0 30px rgba(233, 30, 99, 0.9)' }}>
            Our Community
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-12">
            Join our vibrant Discord community where players collaborate on builds, participate in events, and form lasting friendships.
            We host regular events, building competitions, and community gatherings to keep the server alive and exciting.
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 40px rgba(233, 30, 99, 1), 0 0 80px rgba(233, 30, 99, 0.5)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Join Discord
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

function JoinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-black to-pink-900 pt-20">
      <div className="container mx-auto px-6 py-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-orbitron text-white mb-8"
              style={{ textShadow: '0 0 30px rgba(76, 175, 80, 0.9), 0 0 60px rgba(233, 30, 99, 0.6)' }}>
            Join Pibble SMP
          </h1>
          <p className="text-xl text-gray-300 mb-12">Ready to start your adventure? Join our community today!</p>

          {/* Server IP Section */}
          <motion.div
            className="bg-black/50 backdrop-blur-sm p-8 rounded-lg mb-8 border border-emerald-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-semibold text-emerald-400 mb-4">Server IP</h2>
            <div className="bg-gray-900 p-4 rounded-lg">
              <code className="text-2xl text-white font-mono">45.142.28.7:19005</code>
            </div>
            <p className="text-gray-400 mt-4">Copy this IP and paste it in your Minecraft server list!</p>
          </motion.div>

          {/* Discord Community Section */}
          <motion.div
            className="bg-black/50 backdrop-blur-sm p-8 rounded-lg mb-8 border border-pink-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-semibold text-pink-400 mb-4">Join Our Discord Community</h2>
            <p className="text-gray-300 mb-6">Connect with fellow players, participate in events, and stay updated with server news!</p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg text-xl"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 40px rgba(233, 30, 99, 1), 0 0 80px rgba(233, 30, 99, 0.5)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.open('https://discord.gg/tQU3R4sSDS', '_blank');
              }}
            >
              Join Discord Server
            </motion.button>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <motion.button
              className="px-10 py-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg text-xl"
              whileHover={{
                scale: 1.15,
                boxShadow: "0 0 50px rgba(76, 175, 80, 1), 0 0 100px rgba(76, 175, 80, 0.5)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigator.clipboard.writeText('45.142.28.7:19005');
                alert('Server IP copied to clipboard!');
              }}
            >
              Copy Server IP
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function RulesPage() {
  const rules = [
    "No griefing or stealing from other players",
    "Be respectful to all community members",
    "No spam or excessive caps in chat",
    "Keep builds appropriate and family-friendly",
    "Report any issues to staff immediately",
    "Have fun and enjoy the game!"
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-6 py-20">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-orbitron text-center text-white mb-12"
              style={{ textShadow: '0 0 30px rgba(76, 175, 80, 0.9)' }}>
            Server Rules
          </h1>
          <div className="space-y-6">
            {rules.map((rule, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 p-6 rounded-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(76, 175, 80, 0.3)",
                  transition: { duration: 0.3 }
                }}
              >
                <p className="text-lg text-gray-300 flex items-center">
                  <span className="text-emerald-400 mr-4 text-2xl">✓</span>
                  {rule}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatusPage() {
  const [serverData, setServerData] = useState({
    online: false,
    players: { online: 0, max: 0 },
    version: 'Unknown',
    motd: 'Loading...',
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch('https://api.mcsrvstat.us/2/45.142.28.7:19005');
        const data = await response.json();

        setServerData({
          online: data.online || false,
          players: data.players || { online: 0, max: 20 },
          version: data.version || '1.21.1',
          motd: data.motd ? data.motd.clean : 'Pibble SMP Server',
          loading: false,
          error: null
        });
      } catch (error) {
        setServerData(prev => ({
          ...prev,
          loading: false,
          error: 'Unable to fetch server status'
        }));
      }
    };

    fetchServerStatus();
    // Refresh every 5 minutes
    const interval = setInterval(fetchServerStatus, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-6 py-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-orbitron text-white mb-12"
              style={{ textShadow: '0 0 30px rgba(76, 175, 80, 0.9)' }}>
            Server Status
          </h1>

          {serverData.loading ? (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Checking server status...</p>
            </motion.div>
          ) : serverData.error ? (
            <motion.div
              className="bg-red-900 border border-red-700 p-8 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3 className="text-2xl font-semibold text-red-400 mb-4">Connection Error</h3>
              <p className="text-gray-300">{serverData.error}</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="bg-gray-900 p-8 rounded-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(76, 175, 80, 0.5)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-2xl font-semibold text-emerald-400 mb-4">Status</h3>
                <div className="flex items-center justify-center">
                  <div className={`w-4 h-4 rounded-full mr-3 ${serverData.online ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                  <span className="text-xl text-white capitalize">{serverData.online ? 'Online' : 'Offline'}</span>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900 p-8 rounded-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(233, 30, 99, 0.5)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold text-pink-400 mb-4">Players</h3>
                <p className="text-3xl text-white">{serverData.players.online}/{serverData.players.max}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {serverData.players.online === 0 ? 'No players online' : `${serverData.players.online} player${serverData.players.online === 1 ? '' : 's'} online`}
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-900 p-8 rounded-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(76, 175, 80, 0.5)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-semibold text-emerald-400 mb-4">Version</h3>
                <p className="text-xl text-white">{serverData.version}</p>
              </motion.div>
            </div>
          )}

          <motion.div
            className="mt-12 bg-gray-900 p-8 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Server MOTD</h3>
            <p className="text-gray-300 text-lg">{serverData.motd}</p>
          </motion.div>

          <motion.div
            className="mt-8 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Status updates every 5 minutes
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-gray-400 mb-4">&copy; 2025 Pibble SMP. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-emerald-400 transition"
              whileHover={{ scale: 1.2, textShadow: "0 0 10px rgba(76, 175, 80, 0.8)" }}
            >
              Discord
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-pink-400 transition"
              whileHover={{ scale: 1.2, textShadow: "0 0 10px rgba(233, 30, 99, 0.8)" }}
            >
              Twitter
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="App">
        <audio ref={audioRef} loop>
          <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
        </audio>

        <Navigation />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/status" element={<StatusPage />} />
        </Routes>

        <Footer />


      </div>
    </Router>
  );
}

export default App;
