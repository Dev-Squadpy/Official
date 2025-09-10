import { Game, Product, BlogPost, User } from '../types';

export const mockGames: Game[] = [
  {
    id: '1',
    title: 'League of Legends',
    description: 'A competitive MOBA game featuring over 150 champions',
    fullDescription: 'League of Legends is a team-based competitive game where two teams of five powerful champions face off to destroy the others base. Choose from over 150 champions to make epic plays, secure kills, and take down towers as you battle your way to victory.',
    imageUrl: 'https://images.pexels.com/photos/7915527/pexels-photo-7915527.jpeg',
    platforms: ['PC', 'Mac'],
    characters: [
      {
        id: '101',
        name: 'Ahri',
        imageUrl: 'https://images.pexels.com/photos/7915455/pexels-photo-7915455.jpeg',
        description: 'The nine-tailed fox with charm and mobility',
        gameId: '1'
      },
      {
        id: '102',
        name: 'Yasuo',
        imageUrl: 'https://glitchproductions.store/cdn/shop/files/dpeer1.png?v=1755062508&width=840',
        description: 'The unforgiven swordsman with incredible mobility',
        gameId: '1'
      },
      {
        id: '103',
        name: 'Lux',
        imageUrl: 'https://images.pexels.com/photos/7915475/pexels-photo-7915475.jpeg',
        description: 'The Lady of Luminosity with powerful light magic',
        gameId: '1'
      },
      {
        id: '104',
        name: 'Jinx',
        imageUrl: 'https://images.pexels.com/photos/7915539/pexels-photo-7915539.jpeg',
        description: 'The Loose Cannon with explosive weaponry',
        gameId: '1'
      },
      {
        id: '105',
        name: 'Zed',
        imageUrl: 'https://images.pexels.com/photos/7915492/pexels-photo-7915492.jpeg',
        description: 'The Master of Shadows with deadly assassination potential',
        gameId: '1'
      }
    ],
    releaseDate: '2009-10-27',
    gallery: [
      'https://images.pexels.com/photos/7915527/pexels-photo-7915527.jpeg',
      'https://images.pexels.com/photos/7915455/pexels-photo-7915455.jpeg'
    ]
  },
  {
    id: '2',
    title: 'Valorant',
    description: 'Tactical shooter with unique agent abilities',
    fullDescription: 'Valorant is a free-to-play first-person tactical shooter developed and published by Riot Games. The game operates on an economy-round, objective-based format where players select from a cast of agents, each with unique abilities that they can purchase with funds gained based on their performance.',
    imageUrl: 'https://images.pexels.com/photos/7915509/pexels-photo-7915509.jpeg',
    platforms: ['PC'],
    characters: [
      {
        id: '201',
        name: 'Jett',
        imageUrl: 'https://images.pexels.com/photos/7915485/pexels-photo-7915485.jpeg',
        description: 'Agile agent with knives and dashes',
        gameId: '2'
      },
      {
        id: '202',
        name: 'Phoenix',
        imageUrl: 'https://images.pexels.com/photos/7915492/pexels-photo-7915492.jpeg',
        description: 'Fire-wielding agent with self-healing abilities',
        gameId: '2'
      },
      {
        id: '203',
        name: 'Sage',
        imageUrl: 'https://images.pexels.com/photos/7915365/pexels-photo-7915365.jpeg',
        description: 'The sentinel healer with defensive abilities',
        gameId: '2'
      },
      {
        id: '204',
        name: 'Omen',
        imageUrl: 'https://images.pexels.com/photos/7915389/pexels-photo-7915389.jpeg',
        description: 'The shadow controller with teleportation powers',
        gameId: '2'
      },
      {
        id: '205',
        name: 'Viper',
        imageUrl: 'https://images.pexels.com/photos/7915344/pexels-photo-7915344.jpeg',
        description: 'The toxic controller with chemical warfare',
        gameId: '2'
      }
    ],
    releaseDate: '2020-06-02',
    gallery: [
      'https://images.pexels.com/photos/7915509/pexels-photo-7915509.jpeg',
      'https://images.pexels.com/photos/7915485/pexels-photo-7915485.jpeg'
    ]
  }
];

export const mockProducts: Product[] = [
  // Plushies
  {
    id: '1',
    name: 'Leaue of Legends Ahri Plush',
    description: 'Adorable Ahri plush toy from League of Legends',
    price: 29.99,
    imageUrl: 'https://glitchproductions.store/cdn/shop/files/animiniz2.png?v=1738303577&width=840',
    imageUrl2: 'https://images.pexels.com/photos/7915365/pexels-photo-7915365.jpeg',
    category: 'Plushies',
    inStock: true
  },
  {
    id: '2',
    name: 'Murder Drones Animiniz: Main Character Series',
    description: 'Murder Drones Animiniz are here! We ve got the whole main cast and a very mysterious one that has a talking tail...I wonder who it could be',
    price: 24.99,
    imageUrl: 'https://glitchproductions.store/cdn/shop/files/pomp1.png?v=1745904505&width=840',
    category: 'Plushies',
    inStock: true
  },
  {
    id: '3',
    name: 'Poro Plush Bundle',
    description: 'Set of 3 adorable Poro plushies',
    price: 39.99,
    imageUrl: 'https://glitchproductions.store/cdn/shop/files/1.png?v=1750067833&width=840',
    category: 'Plushies',
    inStock: true
  },
  {
    id: '19',
    name: 'Jinx Shark Plush',
    description: 'Limited edition Jinx shark plushie',
    price: 34.99,
    imageUrl: 'https://glitchproductions.store/cdn/shop/files/dpeer1.png?v=1755062508&width=840',
    category: 'Plushies',
    inStock: true
  },
  {
    id: '20',
    name: 'Star Guardian Plush Set',
    description: 'Collection of Star Guardian themed plushies',
    price: 89.99,
    imageUrl: 'https://images.pexels.com/photos/7915325/pexels-photo-7915325.jpeg',
    category: 'Plushies',
    inStock: true
  },

  // Clothing
  {
    id: '4',
    name: 'Valorant Logo T-Shirt',
    description: 'Comfortable cotton t-shirt with the Valorant logo',
    price: 24.99,
    imageUrl: 'https://images.pexels.com/photos/5662862/pexels-photo-5662862.jpeg',
    category: 'Clothing',
    inStock: true
  },
  {
    id: '5',
    name: 'League Champions Hoodie',
    description: 'Premium hoodie featuring League champions',
    price: 59.99,
    imageUrl: 'https://images.pexels.com/photos/5662862/pexels-photo-5662862.jpeg',
    category: 'Clothing',
    inStock: true
  },
  {
    id: '6',
    name: 'Gaming Team Jersey',
    description: 'Official gaming team jersey',
    price: 69.99,
    imageUrl: 'https://images.pexels.com/photos/5662862/pexels-photo-5662862.jpeg',
    category: 'Clothing',
    inStock: true
  },
  {
    id: '21',
    name: 'K/DA All Out Jacket',
    description: 'Limited edition K/DA collection jacket',
    price: 89.99,
    imageUrl: 'https://images.pexels.com/photos/5662862/pexels-photo-5662862.jpeg',
    category: 'Clothing',
    inStock: true
  },
  {
    id: '22',
    name: 'True Damage Collection Set',
    description: 'Complete True Damage streetwear collection',
    price: 199.99,
    imageUrl: 'https://images.pexels.com/photos/5662862/pexels-photo-5662862.jpeg',
    category: 'Clothing',
    inStock: true
  },

  // Collectibles
  {
    id: '7',
    name: 'Jinx Statue',
    description: 'Detailed collectible statue of Jinx',
    price: 149.99,
    imageUrl: 'https://images.pexels.com/photos/7915325/pexels-photo-7915325.jpeg',
    category: 'Collectibles',
    inStock: true
  },
  {
    id: '8',
    name: 'Valorant Agents Collection',
    description: 'Set of 5 Valorant agent figures',
    price: 89.99,
    imageUrl: 'https://images.pexels.com/photos/7915496/pexels-photo-7915496.jpeg',
    category: 'Collectibles',
    inStock: true
  },
  {
    id: '9',
    name: 'Championship Trophy Replica',
    description: 'Limited edition championship trophy replica',
    price: 199.99,
    imageUrl: 'https://images.pexels.com/photos/7915344/pexels-photo-7915344.jpeg',
    category: 'Collectibles',
    inStock: false
  },
  {
    id: '23',
    name: 'PROJECT Series Figures',
    description: 'Complete set of PROJECT skin line figures',
    price: 299.99,
    imageUrl: 'https://images.pexels.com/photos/7915325/pexels-photo-7915325.jpeg',
    category: 'Collectibles',
    inStock: true
  },
  {
    id: '24',
    name: 'Spirit Blossom Diorama',
    description: 'Limited edition Spirit Blossom scene diorama',
    price: 249.99,
    imageUrl: 'https://images.pexels.com/photos/7915496/pexels-photo-7915496.jpeg',
    category: 'Collectibles',
    inStock: true
  },

  // Accessories
  {
    id: '10',
    name: 'Gaming Mouse Pad XL',
    description: 'Extra large gaming mouse pad with custom design',
    price: 29.99,
    imageUrl: 'https://images.pexels.com/photos/7915496/pexels-photo-7915496.jpeg',
    category: 'Accessories',
    inStock: true
  },
  {
    id: '11',
    name: 'Character Pins Set',
    description: 'Collection of 10 enamel character pins',
    price: 19.99,
    imageUrl: 'https://images.pexels.com/photos/7915441/pexels-photo-7915441.jpeg',
    category: 'Accessories',
    inStock: true
  },
  {
    id: '12',
    name: 'Gaming Backpack',
    description: 'High-quality gaming backpack with laptop compartment',
    price: 79.99,
    imageUrl: 'https://images.pexels.com/photos/7915389/pexels-photo-7915389.jpeg',
    category: 'Accessories',
    inStock: true
  },
  {
    id: '25',
    name: 'Hextech Phone Case',
    description: 'Premium Hextech-themed phone case',
    price: 24.99,
    imageUrl: 'https://images.pexels.com/photos/7915496/pexels-photo-7915496.jpeg',
    category: 'Accessories',
    inStock: true
  },
  {
    id: '26',
    name: 'Champion Keycap Set',
    description: 'Custom mechanical keyboard keycaps with champion themes',
    price: 89.99,
    imageUrl: 'https://images.pexels.com/photos/7915441/pexels-photo-7915441.jpeg',
    category: 'Accessories',
    inStock: true
  },

  // Animatez Collection
  {
    id: '13',
    name: 'Animated Series Figure Set',
    description: 'Complete set of figures from the animated series',
    price: 129.99,
    imageUrl: 'https://glitchproductions.store/cdn/shop/files/dpeer1.png?v=1755062508&width=840',
    category: 'Collectibles',
    inStock: true
  },
  {
    id: '14',
    name: 'Series Poster Collection',
    description: 'Set of 5 high-quality posters from the animated series',
    price: 49.99,
    imageUrl: 'https://images.pexels.com/photos/7915344/pexels-photo-7915344.jpeg',
    category: 'Accessories',
    inStock: true
  },
  {
    id: '15',
    name: 'Character Hoodie Bundle',
    description: 'Limited edition character hoodies from the series',
    price: 149.99,
    imageUrl: 'https://images.pexels.com/photos/5662862/pexels-photo-5662862.jpeg',
    category: 'Clothing',
    inStock: true
  },
  {
    id: '27',
    name: 'Arcane Art Book',
    description: 'Deluxe edition art book from the Arcane series',
    price: 59.99,
    imageUrl: 'https://images.pexels.com/photos/7915344/pexels-photo-7915344.jpeg',
    category: 'Collectibles',
    inStock: true
  },
  {
    id: '28',
    name: 'Animated Series Soundtrack Vinyl',
    description: 'Limited edition vinyl record of the series soundtrack',
    price: 39.99,
    imageUrl: 'https://glitchproductions.store/cdn/shop/files/dpeer1.png?v=1755062508&width=840',
    category: 'Collectibles',
    inStock: true
  },

  // Limited Edition Collection
  {
    id: '16',
    name: 'Collector\'s Edition Box Set',
    description: 'Exclusive collector\'s edition with unique items',
    price: 299.99,
    imageUrl: 'https://images.pexels.com/photos/7915325/pexels-photo-7915325.jpeg',
    category: 'Collectibles',
    inStock: false
  },
  {
    id: '17',
    name: 'Anniversary Edition Watch',
    description: 'Limited run commemorative watch',
    price: 199.99,
    imageUrl: 'https://images.pexels.com/photos/7915496/pexels-photo-7915496.jpeg',
    category: 'Accessories',
    inStock: true
  },
  {
    id: '18',
    name: 'Exclusive Event Jersey',
    description: 'Special edition jersey from gaming events',
    price: 89.99,
    imageUrl: 'https://images.pexels.com/photos/5662862/pexels-photo-5662862.jpeg',
    category: 'Clothing',
    inStock: true
  },
  {
    id: '29',
    name: 'Worlds Championship Bundle',
    description: 'Complete collection of Worlds Championship merchandise',
    price: 399.99,
    imageUrl: 'https://images.pexels.com/photos/7915325/pexels-photo-7915325.jpeg',
    category: 'Collectibles',
    inStock: true
  },
  {
    id: '30',
    name: 'Ultimate Fan Pack',
    description: 'Limited edition bundle with exclusive items',
    price: 499.99,
    imageUrl: 'https://images.pexels.com/photos/7915496/pexels-photo-7915496.jpeg',
    category: 'Collectibles',
    inStock: true
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'ARCANE: Our newest series original',
    content: 'We\'re thrilled to announce our newest animated series "Arcane", based on the universe of League of Legends. This groundbreaking series dives into the origin stories of iconic champions from the bustling utopia of Piltover and the oppressed underground of Zaun. Follow the journeys of sisters Vi and Jinx as their paths diverge amid conflict and chaos.\n\nThe series features stunning animation, deep character development, and an engaging storyline that will captivate both longtime fans and newcomers to the League of Legends universe.\n\nArcane represents our commitment to expanding the rich lore of our games into other media formats, bringing these beloved characters and their stories to life in new and exciting ways.',
    excerpt: 'Discover our groundbreaking animated series based on the universe of League of Legends.',
    imageUrl: 'https://images.pexels.com/photos/7915539/pexels-photo-7915539.jpeg',
    author: 'Content Team',
    publishedDate: '2023-09-15',
    comments: []
  }
];

export const mockUsers: User[] = [
  {
    username: 'admin',
    password: 'admin123',
    isAdmin: true
  }
];