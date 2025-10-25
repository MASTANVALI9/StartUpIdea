const { drizzle } = require('drizzle-orm/libsql');
const { createClient } = require('@libsql/client');
const { streams, careers, colleges, courses, exams, feedback } = require('../schema');
const streamsData = require('./streams');
const careersData = require('./careers');
const collegesData = require('./colleges');
const coursesData = require('./courses');
const examsData = require('./exams');
const feedbackData = require('./feedback');
const roleModelsData = require('./role-models');

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client);

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Seed streams first (other tables depend on it)
    console.log('📚 Seeding streams...');
    for (const stream of streamsData) {
      await db.insert(streams).values(stream).onConflictDoNothing();
    }

    // Seed careers
    console.log('💼 Seeding careers...');
    for (const career of careersData) {
      await db.insert(careers).values(career).onConflictDoNothing();
    }

    // Seed colleges
    console.log('🏫 Seeding colleges...');
    for (const college of collegesData) {
      await db.insert(colleges).values(college).onConflictDoNothing();
    }

    // Seed courses
    console.log('📖 Seeding courses...');
    for (const course of coursesData) {
      await db.insert(courses).values(course).onConflictDoNothing();
    }

    // Seed exams
    console.log('📝 Seeding exams...');
    for (const exam of examsData) {
      await db.insert(exams).values(exam).onConflictDoNothing();
    }

    // Seed feedback
    console.log('💬 Seeding feedback...');
    for (const feedback of feedbackData) {
      await db.insert(feedback).values(feedback).onConflictDoNothing();
    }

    // Note: Role models are seeded within careers and streams tables

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedDatabase();
