export const BUSINESS = {
  name: "Strydom Creations",
  legalName: "Strydom Book Creations (Pty) Ltd",
  tagline: "Handmade learning books, written just for your child",
  email: process.env.BUSINESS_EMAIL || "strydomcreations.za@gmail.com",
  whatsappNumber: (process.env.WHATSAPP_NUMBER || "27655894577").replace(/\D/g, ""),
  phoneDisplay: process.env.WHATSAPP_DISPLAY || "+27 65 589 4577",
  location: "Sandton, South Africa",
  adminPassword: process.env.ADMIN_PASSWORD || "strydomcreations",
};

export const BANK = {
  bankName: "Standard Bank",
  accountName: "Strydom Book Creations (Pty) Ltd",
  accountNumber: "10279619837",
  accountType: "MyMoBiz Current Account",
  branch: "Sandton City",
  branchCode: "051001",
  swift: "SBZAZAJJ",
  reference: "Order number (see below)",
};

export const PRICES = {
  adventureBook: 44900, // cents (R449.00) — A5 softcover
  adventureBookHardcover: 75000, // cents (R750.00) — A4 hardcover
  occasionBook: 39900, // cents (R399.00)
  pudo: 6000, // R60
  postnetOrDoor: 11000, // R110
};

export const BOOK_FORMATS = [
  {
    id: "a5-softcover",
    label: "A5 Softcover",
    description: "Light and lovely — perfect for little hands and bedtime reading.",
    price: PRICES.adventureBook,
  },
  {
    id: "a4-hardcover",
    label: "A4 Hardcover",
    description: "A big, durable keepsake with a sturdy cover — made to last for years.",
    price: PRICES.adventureBookHardcover,
  },
] as const;

export function formatRand(cents: number): string {
  return `R${(cents / 100).toFixed(0)}`;
}

export function formatRandExact(cents: number): string {
  return `R${(cents / 100).toFixed(2)}`;
}

export const AGE_OPTIONS = [
  { id: "1", label: "Age 1", description: "First words & routines" },
  { id: "2", label: "Age 2", description: "Toddlers on the move" },
  { id: "3", label: "Age 3", description: "Big feelings & play" },
  { id: "4", label: "Age 4", description: "Growing independence" },
  { id: "5", label: "Age 5", description: "Starting big school" },
  { id: "6", label: "Age 6", description: "Reading & friendships" },
  { id: "7", label: "Age 7", description: "Curious explorers" },
  { id: "8", label: "Age 8", description: "Confidence builders" },
  { id: "9", label: "Age 9", description: "Big questions" },
  { id: "10", label: "Age 10", description: "Growing tweens" },
  { id: "11", label: "Age 11", description: "Finding their voice" },
  { id: "12", label: "Age 12", description: "Ready for teens" },
] as const;

export const THEMES = [
  {
    id: "ocean-explorer",
    name: "Ocean Explorer",
    description: "Dive into gentle sea adventures with friendly ocean friends.",
    image: "/images/ocean-theme.jpg",
  },
  {
    id: "afrika-safari",
    name: "Afrika Safari Trip",
    description: "Explore the bush with kind safari animals and warm African skies.",
    image: "/images/safari-theme.jpg",
  },
] as const;

export const PROBLEMS_BY_AGE: Record<string, { id: string; label: string; description: string }[]> = {
  "1": [
    { id: "brushing-teeth", label: "Brushing teeth", description: "Make toothbrush time calm and fun" },
    { id: "bedtime", label: "Bedtime routine", description: "Settle into sleep with a soft story" },
    { id: "bath-time", label: "Bath time", description: "Splashy baths without the tears" },
    { id: "trying-foods", label: "Trying new foods", description: "Gentle encouragement for mealtime" },
  ],
  "2": [
    { id: "potty-training", label: "Potty training", description: "Cheerful steps toward the potty" },
    { id: "brushing-teeth", label: "Brushing teeth", description: "Build a happy teeth-cleaning habit" },
    { id: "sharing", label: "Sharing", description: "Practice taking turns with friends" },
    { id: "saying-goodbye", label: "Saying goodbye", description: "Easier drop-offs and goodbyes" },
  ],
  "3": [
    { id: "manners", label: "Manners", description: "Please, thank you, and kind words" },
    { id: "sharing", label: "Sharing", description: "Learning to share toys and space" },
    { id: "big-feelings", label: "Big feelings", description: "Name and soothe strong emotions" },
    { id: "listening", label: "Listening", description: "Hearing instructions with a smile" },
  ],
  "4": [
    { id: "manners", label: "Manners", description: "Everyday kindness and courtesy" },
    { id: "sharing", label: "Sharing", description: "Fair play with siblings and friends" },
    { id: "trying-again", label: "Trying again", description: "Confidence when something is hard" },
    { id: "helping-at-home", label: "Helping at home", description: "Proud little helpers around the house" },
  ],
  "5": [
    { id: "starting-school", label: "Starting big school", description: "First days with courage and calm" },
    { id: "making-friends", label: "Making friends", description: "Kind ways to say hello and join in" },
    { id: "following-rules", label: "Following rules", description: "Classroom routines made friendly" },
    { id: "being-brave", label: "Being brave", description: "Trying new things without fear" },
  ],
  "6": [
    { id: "reading-confidence", label: "Reading confidence", description: "Loving books and letters" },
    { id: "making-friends", label: "Making friends", description: "Playground kindness and inclusion" },
    { id: "big-feelings", label: "Managing big feelings", description: "Words for anger, worry and joy" },
    { id: "responsibility", label: "Responsibility", description: "Chores and looking after belongings" },
  ],
  "7": [
    { id: "self-esteem", label: "Self-esteem", description: "Believing in who they are" },
    { id: "focus-homework", label: "Focus & homework", description: "Sitting down and getting it done" },
    { id: "handling-mistakes", label: "Handling mistakes", description: "Learning that mistakes help us grow" },
    { id: "kindness", label: "Kindness to others", description: "Empathy for friends and family" },
  ],
  "8": [
    { id: "resilience", label: "Resilience", description: "Bouncing back when things go wrong" },
    { id: "peer-pressure", label: "Peer pressure", description: "Standing up for what feels right" },
    { id: "screen-time", label: "Healthy screen time", description: "Balance between screens and play" },
    { id: "money-basics", label: "Money basics", description: "Saving, spending and sharing" },
  ],
  "9": [
    { id: "confidence", label: "Confidence", description: "Speaking up and being seen" },
    { id: "dealing-bullies", label: "Dealing with bullies", description: "Safe ways to respond and get help" },
    { id: "goal-setting", label: "Setting goals", description: "Dreaming big and taking small steps" },
    { id: "gratitude", label: "Gratitude", description: "Noticing the good in every day" },
  ],
  "10": [
    { id: "body-changes", label: "Body changes", description: "Understanding a growing body" },
    { id: "friendship-drama", label: "Friendship drama", description: "Navigating tricky group moments" },
    { id: "study-habits", label: "Study habits", description: "Learning how to learn well" },
    { id: "online-safety", label: "Online safety", description: "Smart choices on phones and games" },
  ],
  "11": [
    { id: "self-identity", label: "Self-identity", description: "Discovering who they really are" },
    { id: "emotional-regulation", label: "Emotional regulation", description: "Calming big tween feelings" },
    { id: "peer-pressure", label: "Peer pressure", description: "Choosing their own path" },
    { id: "leadership", label: "Leadership", description: "Leading with kindness and courage" },
  ],
  "12": [
    { id: "confidence-teens", label: "Confidence for teens", description: "Stepping into the teenage years" },
    { id: "healthy-relationships", label: "Healthy relationships", description: "Respect, boundaries and friendship" },
    { id: "mental-health", label: "Looking after your mind", description: "Stress, feelings and self-care" },
    { id: "future-dreams", label: "Future dreams", description: "Exploring passions and possibilities" },
  ],
};

export const LANGUAGES = [
  "English",
  "Afrikaans",
  "isiZulu",
  "isiXhosa",
  "Sesotho",
  "Bilingual English & Afrikaans",
] as const;

export const COMPANIONS = [
  { id: "dog", label: "Dog", emoji: "🐶" },
  { id: "cat", label: "Cat", emoji: "🐱" },
  { id: "bunny", label: "Bunny", emoji: "🐰" },
  { id: "lion", label: "Lion", emoji: "🦁" },
] as const;

export const COURIER_OPTIONS = [
  {
    id: "pudo",
    name: "PUDO Locker",
    description: "Collect from a convenient PUDO locker near you.",
    price: PRICES.pudo,
  },
  {
    id: "postnet",
    name: "Postnet to Postnet",
    description: "Send to your nearest Postnet branch for collection.",
    price: PRICES.postnetOrDoor,
  },
  {
    id: "door",
    name: "Door delivery",
    description: "Delivered to your home or office address.",
    price: PRICES.postnetOrDoor,
  },
] as const;

export const OCCASION_PRODUCTS = [
  {
    id: "mothers-day",
    name: "Mother's Day Storybook",
    description:
      "A heartfelt keepsake book celebrating mom — personalised with your child's name and favourite moments together.",
    price: PRICES.occasionBook,
    image: "/images/occasion-mothers-day.jpg",
    occasion: "Mother's Day",
  },
  {
    id: "fathers-day",
    name: "Father's Day Adventure Book",
    description:
      "A warm story of adventure and love between child and dad, made just for your family.",
    price: PRICES.occasionBook,
    image: "/images/occasion-fathers-day.jpg",
    occasion: "Father's Day",
  },
  {
    id: "birthday",
    name: "Birthday Celebration Book",
    description:
      "A joyful birthday story starring your child — perfect as a gift from grandparents or godparents.",
    price: PRICES.occasionBook,
    image: "/images/occasion-birthday.jpg",
    occasion: "Birthday",
  },
  {
    id: "welcome-baby",
    name: "Welcome Baby Book",
    description:
      "A gentle keepsake for a new arrival, with space for family photos and a loving message.",
    price: PRICES.occasionBook,
    image: "/images/adventure-book.jpg",
    occasion: "Welcome Baby",
  },
] as const;

export const ORDER_STATUSES = [
  "awaiting_payment",
  "payment_received",
  "photos_received",
  "in_review",
  "for_print",
  "printed",
  "shipped",
  "completed",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export function statusLabel(status: string): string {
  const map: Record<string, string> = {
    awaiting_payment: "Awaiting EFT payment",
    payment_received: "Payment received",
    photos_received: "Photos received",
    in_review: "In review",
    for_print: "For print",
    printed: "Printed",
    shipped: "Shipped",
    completed: "Completed",
    // legacy
    paid: "Payment received",
  };
  return map[status] || status;
}
