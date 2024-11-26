import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FaSearch, FaTimes, FaPaw } from 'react-icons/fa';

const SearchBar = ({ onPokemonSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const { data: allPokemon } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
      return response.data.results;
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (searchTerm.length > 0 && allPokemon) {
      const filtered = allPokemon
        .filter(pokemon => 
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5);
      setFilteredPokemon(filtered.map(pokemon => pokemon.name));
    } else {
      setFilteredPokemon([]);
    }
  }, [searchTerm, allPokemon]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePokemonSelect = (pokemonName) => {
    onPokemonSelect(pokemonName);
    setIsFocused(false);
    setSearchTerm('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div 
        className="relative w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            placeholder="Search for a Pokémon..."
            className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl
                     text-white placeholder-gray-400 outline-none transition-all duration-300
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {searchTerm && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="p-2 hover:bg-gray-700/50 rounded-full transition-colors"
                onClick={() => setSearchTerm('')}
              >
                <FaTimes className="text-gray-400 hover:text-white" />
              </motion.button>
            )}
            <div className="w-px h-6 bg-gray-700" />
            <FaSearch className="text-gray-400" />
          </div>
        </div>

        <AnimatePresence>
          {isFocused && filteredPokemon.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute w-full mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-2xl 
                       shadow-xl overflow-hidden z-50"
            >
              <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                {filteredPokemon.map((pokemon, index) => (
                  <motion.button
                    key={pokemon}
                    className="w-full px-6 py-3 flex items-center gap-4 hover:bg-gray-700/50 transition-colors text-left"
                    onClick={() => handlePokemonSelect(pokemon)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                      <FaPaw />
                    </div>
                    <span className="text-white capitalize">{pokemon}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SearchBar;
