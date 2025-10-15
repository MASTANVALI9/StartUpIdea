import { db } from '@/db';
import { feedback } from '@/db/schema';

async function main() {
    const sampleFeedback = [
        {
            userId: null,
            name: 'Ramesh Kumar',
            district: 'Anantapur',
            email: 'ramesh.kumar2024@gmail.com',
            message: 'I just passed 10th class with 85% marks and I am very interested in becoming an engineer. Can you please guide me about which engineering colleges are best in Anantapur district? Also, what are the entrance exams I need to prepare for?',
            createdAt: new Date('2024-12-15').toISOString(),
        },
        {
            userId: null,
            name: 'Lakshmi Devi',
            district: 'Kurnool',
            email: 'lakshmidevi.parent@yahoo.com',
            message: 'I am a parent from Kurnool. My son completed 10th this year but family situation is difficult. We want to know about ITI courses and which trades have good job opportunities. How long do ITI courses take and what are the fees?',
            createdAt: new Date('2024-12-08').toISOString(),
        },
        {
            userId: null,
            name: 'Sai Priya',
            district: 'Kadapa',
            email: 'saipriya.student@gmail.com',
            message: 'Hello sir, I want to become a doctor and help people in my village. I scored 92% in 10th class. Which subjects should I take in intermediate for NEET preparation? Are there any good coaching centers in Kadapa for medical entrance exams?',
            createdAt: new Date('2024-12-20').toISOString(),
        },
        {
            userId: null,
            name: 'Venkata Rao',
            district: 'Anantapur',
            email: 'venkat.rao89@gmail.com',
            message: 'I am interested in government jobs like railway or bank jobs. After 10th class, what course should I take to prepare for these exams? Is it better to complete degree first or can I start preparing after intermediate?',
            createdAt: new Date('2024-12-03').toISOString(),
        },
        {
            userId: null,
            name: 'Madhavi Reddy',
            district: 'Kurnool',
            email: 'madhavi.reddy.parent@gmail.com',
            message: 'I am confused about my daughter\'s future after 10th. Some people say diploma courses are better for quick jobs, others recommend degree. Can you explain the difference between diploma and degree programs? Which one gives better career opportunities in engineering field?',
            createdAt: new Date('2024-12-12').toISOString(),
        }
    ];

    await db.insert(feedback).values(sampleFeedback);
    
    console.log('✅ Feedback seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});