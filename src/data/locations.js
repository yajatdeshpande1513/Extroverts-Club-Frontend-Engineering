// State -> list of cities/colleges. Powers the dependent dropdown in Step 3.
export const STATE_DATA = {
  Maharashtra: [
    "Mumbai",
    "Thane",
    "Pune",
    "Nagpur",
    "Nashik",
    "A. P. Shah Institute of Technology, Thane",
  ],
  Delhi: ["New Delhi", "Dwarka", "Rohini", "Saket"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
  Punjab: ["Chandigarh", "Amritsar", "Ludhiana"],
  "Uttar Pradesh": ["Lucknow", "Noida", "Kanpur", "Varanasi"],
};

export const STATES = Object.keys(STATE_DATA);

export const PRONOUN_OPTIONS = [
  "he",
  "him",
  "his",
  "she",
  "her",
  "hers",
  "they",
  "them",
  "theirs",
  "ze",
  "zir",
  "zirs",
  "ve",
  "ver",
  "vis",
];

export const MAX_PRONOUNS = 3;
