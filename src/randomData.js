// Function to generate random data
export function generateRandomData() {
    const names = ['John', 'Alice', 'Bob', 'Eve']; // Add more names as needed
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Add more image URLs
    const fits = ['A', 'B', 'C'];
    const intents = ['high', 'mid', 'low'];
    const lastSeen = Math.floor(Math.random() * 28) + 1;
    const sessionMins = Math.floor(Math.random() * 61);
    const sessionPages = Math.floor(Math.random() * 21);
    const weeklyActivity = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 61)
    );
    const intentSignals = [
      'Blog Readers',
      'Content-Intent ebook',
      'Pricing Page Visitors',
    ]; // Add more options
  
    return {
      name: names[Math.floor(Math.random() * names.length)],
      img: images[Math.floor(Math.random() * images.length)],
      fit: fits[Math.floor(Math.random() * fits.length)],
      intent: intents[Math.floor(Math.random() * intents.length)],
      lastSeen,
      sessionMins,
      sessionPages,
      weeklyActivity,
      intentSignals: intentSignals.slice(
        0,
        Math.floor(Math.random() * (intentSignals.length + 1))
      ),
    };
  }