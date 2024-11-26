import { motion } from 'framer-motion';
import { 
  FaTimes, FaRuler, FaWeight, FaStar, FaFistRaised, 
  FaDna, FaShieldAlt, FaRunning, FaHeart
} from 'react-icons/fa';
import { GiPunchBlast, GiMagicShield, GiFist } from 'react-icons/gi';

const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

const StatIcon = ({ statName }) => {
  switch (statName) {
    case 'hp':
      return <FaHeart className="text-red-400" />;
    case 'attack':
      return <GiFist className="text-orange-400" />;
    case 'defense':
      return <FaShieldAlt className="text-blue-400" />;
    case 'special-attack':
      return <GiPunchBlast className="text-purple-400" />;
    case 'special-defense':
      return <GiMagicShield className="text-green-400" />;
    case 'speed':
      return <FaRunning className="text-yellow-400" />;
    default:
      return null;
  }
};

const PokemonCard = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  const formatStatName = (statName) => {
    return statName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Calculate total stats
  const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
  const avgStat = totalStats / pokemon.stats.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pokemon-card w-full relative"
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        <motion.div 
          className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10 p-8 md:p-10 lg:p-12">
        {/* Column 1: Pokemon Image */}
        <motion.div
          className="flex flex-col items-center justify-start lg:border-r lg:border-gray-700/50 lg:pr-6"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
        >
          <motion.div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl 
                          group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300" />
            <motion.div className="relative">
              <motion.img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-64 h-64 object-contain relative z-10 drop-shadow-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
              
              {/* Animated Sprites */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-4">
                {pokemon.sprites.front_default && (
                  <motion.img
                    src={pokemon.sprites.front_default}
                    alt={`${pokemon.name} front`}
                    className="w-16 h-16 pixelated"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      y: [0, -10, 0]
                    }}
                    transition={{
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 }
                    }}
                  />
                )}
                {pokemon.sprites.back_default && (
                  <motion.img
                    src={pokemon.sprites.back_default}
                    alt={`${pokemon.name} back`}
                    className="w-16 h-16 pixelated"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      y: [0, -10, 0]
                    }}
                    transition={{
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      },
                      opacity: { duration: 0.3, delay: 0.2 },
                      scale: { duration: 0.3, delay: 0.2 }
                    }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold capitalize bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {pokemon.name}
            </h2>
            <p className="text-xl text-gray-400 mt-1">#{pokemon.id.toString().padStart(3, '0')}</p>
          </motion.div>
        </motion.div>

        {/* Column 2: Basic Info and Types */}
        <motion.div 
          className="lg:border-r lg:border-gray-700/50 lg:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <motion.div 
                className="flex items-center gap-2 bg-gray-800/50 px-4 py-3 rounded-xl hover:bg-gray-800/70 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <FaRuler className="text-blue-400 text-xl" />
                <div>
                  <div className="text-sm text-gray-400">Height</div>
                  <div className="font-medium">{(pokemon.height / 10).toFixed(1)}m</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-2 bg-gray-800/50 px-4 py-3 rounded-xl hover:bg-gray-800/70 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <FaWeight className="text-blue-400 text-xl" />
                <div>
                  <div className="text-sm text-gray-400">Weight</div>
                  <div className="font-medium">{(pokemon.weight / 10).toFixed(1)}kg</div>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-2 bg-gray-800/50 px-4 py-3 rounded-xl hover:bg-gray-800/70 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <FaStar className="text-blue-400 text-xl" />
                <div>
                  <div className="text-sm text-gray-400">Base Experience</div>
                  <div className="font-medium">{pokemon.base_experience} XP</div>
                </div>
              </motion.div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <FaDna className="text-blue-400" />
                  Types
                </h3>
                <div className="text-sm text-gray-400">Power: {Math.floor(avgStat)}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {pokemon.types.map(({ type }, index) => (
                  <motion.span
                    key={type.name}
                    className="px-4 py-2 rounded-full text-white font-medium capitalize flex items-center gap-2 shadow-lg"
                    style={{ 
                      backgroundColor: typeColors[type.name],
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {type.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Column 3: Stats */}
        <motion.div 
          className="lg:border-r lg:border-gray-700/50 lg:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <GiPunchBlast className="text-blue-400" />
              Base Stats
            </span>
            <span className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
              {totalStats}
            </span>
          </h3>
          <div className="space-y-3">
            {pokemon.stats.map((stat, index) => (
              <motion.div
                key={stat.stat.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/30 rounded-xl p-3 hover:bg-gray-800/40 transition-colors"
              >
                <div className="flex justify-between mb-2">
                  <span className="flex items-center gap-2 font-medium">
                    <StatIcon statName={stat.stat.name} />
                    {formatStatName(stat.stat.name)}
                  </span>
                  <span className="font-bold text-blue-400">{stat.base_stat}</span>
                </div>
                <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ 
                      backgroundColor: `hsl(${(stat.base_stat / 255) * 120}, 70%, 45%)`,
                      boxShadow: '0 0 10px rgba(0,0,0,0.3)'
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Column 4: Abilities and Moves */}
        <motion.div 
          className="lg:pl-6 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-blue-400" />
              Abilities
            </h3>
            <div className="flex flex-col gap-2">
              {pokemon.abilities.map(({ ability, is_hidden }, index) => (
                <motion.div
                  key={ability.name}
                  className={`px-4 py-3 rounded-xl text-sm font-medium relative group cursor-pointer
                    ${is_hidden 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                      : 'bg-gray-800/50 hover:bg-gray-800/70'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <span>{formatStatName(ability.name)}</span>
                    {is_hidden && (
                      <span className="text-xs bg-purple-500/30 px-2 py-0.5 rounded-full">
                        Hidden
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FaFistRaised className="text-blue-400" />
                Moves
              </span>
              <span className="text-sm text-gray-400">
                {pokemon.moves.length}
              </span>
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {pokemon.moves.slice(0, 8).map(({ move }, index) => (
                <motion.div
                  key={move.name}
                  className="px-4 py-3 bg-gray-800/50 rounded-xl text-sm
                           hover:bg-gray-800/70 transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {formatStatName(move.name)}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PokemonCard;
