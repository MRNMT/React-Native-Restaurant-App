const { seedDatabase } = require('./src/database/seedData.js');

async function runSeed() {
  try {
    console.log('Starting database seeding...');
    const result = await seedDatabase();
    console.log('Seeding completed successfully:', result);
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

runSeed();
