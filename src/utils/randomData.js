import { faker } from '@faker-js/faker';

// Function to generate random data for accounts dashboard
export function generateRandomData() {
    const imageId = Math.floor(Math.random() * 1000);
    const fits = ['a', 'b', 'c', 'd'];
    const intents = ['high', 'mid', 'low'];
    const lastSeen = Math.floor(Math.random() * 28) + 1;
    const sessionMins = Math.floor(Math.random() * 61);
    const sessionPages = Math.floor(Math.random() * 21);
    const weeklyActivity = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 61)
    );
  
    // Create the intentSignals array with random numbers
    const intentSignals = [
      {
        'Blog Readers': lastSeen,
      },
      {
        'Content-Intent ebook': Math.floor(Math.random() * 28) + 1,
      },
      {
        'Pricing Page Visitors': Math.floor(Math.random() * 28) + 1,
      },
    ];
  
    return {
      name: faker.company.name(),
      img: `https://picsum.photos/300/200/?random=${imageId}`,
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

  export function generateRandomDataArray(count) {
    const randomDataArray = [];
    for (let i = 0; i < count; i++) {
      randomDataArray.push(generateRandomData());
    }
    return randomDataArray;
  }