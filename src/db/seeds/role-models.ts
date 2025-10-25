export interface RoleModel {
  id: string;
  name: string;
  image: string;
  currentPosition: string;
  achievement: string;
  education: string;
  journeyHighlights: string[];
  quote: string;
  ageWhenStarted: number;
  yearsToSuccess: number;
  background: string;
  stream: string;
}

export const roleModels: RoleModel[] = [
  // Engineering Role Models
  {
    id: "sundar-pichai",
    name: "Sundar Pichai",
    image: "https://picsum.photos/200/200?random=1",
    currentPosition: "CEO of Google & Alphabet",
    achievement: "Led Google's transformation and became CEO of one of the world's most valuable companies",
    education: "B.Tech Metallurgical Engineering, IIT Kharagpur; MS & MBA Stanford",
    journeyHighlights: [
      "Grew up in a middle-class family in Chennai",
      "Studied engineering at IIT Kharagpur",
      "Worked at McKinsey & Company",
      "Joined Google in 2004 as Product Manager",
      "Became CEO in 2015"
    ],
    quote: "Don't be afraid to fail. It's not the opposite of success, it's part of success.",
    ageWhenStarted: 18,
    yearsToSuccess: 20,
    background: "Middle-class family",
    stream: "Engineering"
  },
  {
    id: "kalpana-chawla",
    name: "Kalpana Chawla",
    image: "https://picsum.photos/200/200?random=2",
    currentPosition: "NASA Astronaut (First Indian woman in space)",
    achievement: "First Indian woman to go to space, inspiring millions of girls to pursue STEM",
    education: "B.E. Aeronautical Engineering, Punjab Engineering College; MS & PhD Aerospace Engineering",
    journeyHighlights: [
      "Born in Karnal, Haryana",
      "Studied aeronautical engineering in India",
      "Moved to US for higher studies",
      "Joined NASA in 1995",
      "First space mission in 1997"
    ],
    quote: "The path from dreams to success does exist. May you have the vision to find it, the courage to get on to it, and the perseverance to follow it.",
    ageWhenStarted: 17,
    yearsToSuccess: 15,
    background: "Small town India",
    stream: "Engineering"
  },
  {
    id: "elon-musk",
    name: "Elon Musk",
    image: "https://picsum.photos/200/200?random=3",
    currentPosition: "CEO of Tesla & SpaceX",
    achievement: "Revolutionizing electric vehicles and space exploration",
    education: "Physics & Economics, University of Pennsylvania",
    journeyHighlights: [
      "Born in South Africa",
      "Taught himself programming at age 10",
      "Started first company at 24",
      "Founded PayPal, Tesla, SpaceX",
      "Now working on Mars colonization"
    ],
    quote: "When something is important enough, you do it even if the odds are not in your favor.",
    ageWhenStarted: 10,
    yearsToSuccess: 25,
    background: "Entrepreneurial family",
    stream: "Engineering"
  },

  // Medical Role Models
  {
    id: "apj-abdul-kalam",
    name: "Dr. APJ Abdul Kalam",
    image: "https://picsum.photos/200/200?random=4",
    currentPosition: "Former President of India & Missile Man",
    achievement: "Led India's missile program and became the People's President",
    education: "Aerospace Engineering, Madras Institute of Technology",
    journeyHighlights: [
      "Sold newspapers as a child to support family",
      "Studied aerospace engineering",
      "Joined ISRO and DRDO",
      "Led India's missile development",
      "Became President of India in 2002"
    ],
    quote: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.",
    ageWhenStarted: 15,
    yearsToSuccess: 30,
    background: "Humble family",
    stream: "Medical"
  },
  {
    id: "devi-shetty",
    name: "Dr. Devi Shetty",
    image: "https://picsum.photos/200/200?random=5",
    currentPosition: "Founder & Chairman, Narayana Health",
    achievement: "Made heart surgery affordable for millions through innovative healthcare model",
    education: "MBBS, Kasturba Medical College; MS General Surgery",
    journeyHighlights: [
      "Born in Mangalore, Karnataka",
      "Studied medicine in India",
      "Worked in UK hospitals",
      "Returned to India to serve",
      "Founded Narayana Health in 2000"
    ],
    quote: "Healthcare should be a right, not a privilege. We can make it affordable for everyone.",
    ageWhenStarted: 18,
    yearsToSuccess: 25,
    background: "Middle-class family",
    stream: "Medical"
  },
  {
    id: "florence-nightingale",
    name: "Florence Nightingale",
    image: "https://picsum.photos/200/200?random=6",
    currentPosition: "Founder of Modern Nursing",
    achievement: "Revolutionized healthcare and founded modern nursing profession",
    education: "Self-taught in nursing and statistics",
    journeyHighlights: [
      "Born in wealthy British family",
      "Defied family to pursue nursing",
      "Led nursing during Crimean War",
      "Founded first nursing school",
      "Improved hospital sanitation"
    ],
    quote: "I attribute my success to this: I never gave or took any excuse.",
    ageWhenStarted: 20,
    yearsToSuccess: 15,
    background: "Wealthy family",
    stream: "Medical"
  },

  // Arts Role Models
  {
    id: "ar-rahman",
    name: "A.R. Rahman",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/A.R._Rahman_2016.jpg/200px-A.R._Rahman_2016.jpg",
    currentPosition: "Oscar-winning Music Composer",
    achievement: "First Indian to win Academy Award for music, composed for 200+ films",
    education: "Trinity College of Music, London",
    journeyHighlights: [
      "Born in Chennai as Dileep Kumar",
      "Started playing instruments at age 4",
      "Converted to Islam and changed name",
      "Composed first film music at 25",
      "Won Oscar for Slumdog Millionaire"
    ],
    quote: "Music is a language that doesn't speak in particular words. It speaks in emotions.",
    ageWhenStarted: 4,
    yearsToSuccess: 20,
    background: "Musical family",
    stream: "Arts"
  },
  {
    id: "amitabh-bachchan",
    name: "Amitabh Bachchan",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Amitabh_Bachchan_at_KBC_2013.jpg/200px-Amitabh_Bachchan_at_KBC_2013.jpg",
    currentPosition: "Bollywood Superstar & Actor",
    achievement: "One of India's most successful actors with 200+ films over 5 decades",
    education: "BA, Kirori Mal College, Delhi University",
    journeyHighlights: [
      "Born in Allahabad",
      "Started as radio announcer",
      "First film role in 1969",
      "Became superstar in 1970s",
      "Still active in films at 80+"
    ],
    quote: "Success is not about being the best. It's about being better than you were yesterday.",
    ageWhenStarted: 20,
    yearsToSuccess: 10,
    background: "Literary family",
    stream: "Arts"
  },
  {
    id: "jk-rowling",
    name: "J.K. Rowling",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/J._K._Rowling_2010.jpg/200px-J._K._Rowling_2010.jpg",
    currentPosition: "Author of Harry Potter Series",
    achievement: "Created the most successful book series in history, inspiring millions",
    education: "BA French & Classics, University of Exeter",
    journeyHighlights: [
      "Born in England",
      "Wrote first story at age 6",
      "Was a single mother on welfare",
      "Wrote Harry Potter in cafes",
      "Became billionaire author"
    ],
    quote: "It is our choices that show what we truly are, far more than our abilities.",
    ageWhenStarted: 6,
    yearsToSuccess: 30,
    background: "Middle-class family",
    stream: "Arts"
  },

  // Commerce Role Models
  {
    id: "ratan-tata",
    name: "Ratan Tata",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Ratan_Tata_photo.jpg/200px-Ratan_Tata_photo.jpg",
    currentPosition: "Former Chairman, Tata Group",
    achievement: "Transformed Tata Group into global conglomerate, known for ethical business",
    education: "Architecture, Cornell University; Advanced Management, Harvard",
    journeyHighlights: [
      "Born into Tata family",
      "Started as floor worker at Tata Steel",
      "Became chairman in 1991",
      "Led major acquisitions globally",
      "Known for philanthropy"
    ],
    quote: "I don't believe in taking right decisions. I take decisions and then make them right.",
    ageWhenStarted: 25,
    yearsToSuccess: 20,
    background: "Business family",
    stream: "Commerce"
  },
  {
    id: "indra-nooyi",
    name: "Indra Nooyi",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Indra_Nooyi_2016.jpg/200px-Indra_Nooyi_2016.jpg",
    currentPosition: "Former CEO, PepsiCo",
    achievement: "First woman to lead PepsiCo, transformed it into healthier food company",
    education: "Physics, Chemistry, Math - Madras Christian College; MBA, IIM Calcutta; Master's Yale",
    journeyHighlights: [
      "Born in Chennai",
      "Studied in India",
      "Worked at Johnson & Johnson",
      "Joined PepsiCo in 1994",
      "Became CEO in 2006"
    ],
    quote: "Leadership is hard to define and good leadership even harder. But if you can get people to follow you to the ends of the earth, you are a great leader.",
    ageWhenStarted: 20,
    yearsToSuccess: 25,
    background: "Middle-class family",
    stream: "Commerce"
  },
  {
    id: "warren-buffett",
    name: "Warren Buffett",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Warren_Buffett_KU_Visit.jpg/200px-Warren_Buffett_KU_Visit.jpg",
    currentPosition: "CEO, Berkshire Hathaway",
    achievement: "One of world's most successful investors, known as 'Oracle of Omaha'",
    education: "Business Administration, University of Nebraska; Master's Economics, Columbia",
    journeyHighlights: [
      "Born in Omaha, Nebraska",
      "Started investing at age 11",
      "Bought first stock at 11",
      "Started partnership at 25",
      "Built Berkshire Hathaway empire"
    ],
    quote: "Rule No. 1: Never lose money. Rule No. 2: Never forget rule No. 1.",
    ageWhenStarted: 11,
    yearsToSuccess: 30,
    background: "Business family",
    stream: "Commerce"
  },

  // Government Jobs Role Models
  {
    id: "narendra-modi",
    name: "Narendra Modi",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Official_Photograph_of_Prime_Minister_Narendra_Modi_in_New_Delhi_on_August_15%2C_2022_%28cropped%29.jpg/200px-Official_Photograph_of_Prime_Minister_Narendra_Modi_in_New_Delhi_on_August_15%2C_2022_%28cropped%29.jpg",
    currentPosition: "Prime Minister of India",
    achievement: "From tea seller to Prime Minister, transformed Gujarat and India",
    education: "BA Political Science, Delhi University; MA Political Science, Gujarat University",
    journeyHighlights: [
      "Born in Vadnagar, Gujarat",
      "Sold tea at railway station",
      "Joined RSS at young age",
      "Became Gujarat CM in 2001",
      "Became PM in 2014"
    ],
    quote: "Dream big, work hard, and never give up. Success will follow.",
    ageWhenStarted: 8,
    yearsToSuccess: 40,
    background: "Humble family",
    stream: "Government Jobs"
  },
  {
    id: "arvind-kejriwal",
    name: "Arvind Kejriwal",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Arvind_Kejriwal_2015.jpg/200px-Arvind_Kejriwal_2015.jpg",
    currentPosition: "Chief Minister of Delhi",
    achievement: "From IIT engineer to IAS officer to politician, fought corruption",
    education: "B.Tech Mechanical Engineering, IIT Kharagpur",
    journeyHighlights: [
      "Born in Siwani, Haryana",
      "Studied at IIT Kharagpur",
      "Became IAS officer",
      "Left IAS to fight corruption",
      "Founded Aam Aadmi Party"
    ],
    quote: "If you want to change the system, you have to be part of the system.",
    ageWhenStarted: 18,
    yearsToSuccess: 25,
    background: "Middle-class family",
    stream: "Government Jobs"
  },
  {
    id: "kiran-bedi",
    name: "Kiran Bedi",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kiran_Bedi_2014.jpg/200px-Kiran_Bedi_2014.jpg",
    currentPosition: "Former IPS Officer & Social Activist",
    achievement: "First woman IPS officer in India, reformed Tihar Jail",
    education: "BA English, Government College for Women; MA Political Science; LLB; PhD",
    journeyHighlights: [
      "Born in Amritsar",
      "Excelled in tennis and academics",
      "Joined IPS in 1972",
      "Reformed Tihar Jail",
      "Now works for social causes"
    ],
    quote: "Don't let anyone tell you that you can't do something. You can achieve anything you set your mind to.",
    ageWhenStarted: 20,
    yearsToSuccess: 15,
    background: "Middle-class family",
    stream: "Government Jobs"
  }
];

// Helper function to get role models by stream
export const getRoleModelsByStream = (stream: string): RoleModel[] => {
  return roleModels.filter(model => model.stream === stream);
};

// Helper function to get featured role model for each stream
export const getFeaturedRoleModel = (stream: string): RoleModel | undefined => {
  const streamModels = getRoleModelsByStream(stream);
  return streamModels[0]; // Return first one as featured
};
