import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

const queryClient = new QueryClient();

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load Pikachu by default
    const fetchPikachu = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/pikachu');
        setSelectedPokemon(response.data);
      } catch (error) {
        console.error('Error fetching Pikachu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPikachu();
  }, []);

  const handlePokemonSelect = async (pokemonName) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      setSelectedPokemon(response.data);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
        <Header />
        
        <main className="flex-1 w-full">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] pt-24 md:pt-32">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mb-8"
            >
              <img 
                src="/pokeball.svg" 
                alt="Pokeball" 
                className="w-32 h-32 animate-bounce"
              />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              PokéSearch
            </motion.h1>
            
            <motion.div
              className="w-full max-w-[2000px] mx-auto px-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <SearchBar onPokemonSelect={handlePokemonSelect} />
            </motion.div>

            <AnimatePresence mode="wait">
              {selectedPokemon && (
                <motion.div 
                  key={selectedPokemon.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 mt-8 mb-16 md:mb-24 lg:mb-32 relative"
                >
                  {loading && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-3xl"
                    >
                      <LoadingSpinner />
                    </motion.div>
                  )}
                  <PokemonCard pokemon={selectedPokemon} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
