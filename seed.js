const bcrypt = require('bcrypt');
const sequelize = require('./config/db');
const User = require('./models/User');
const Event = require('./models/Event');
const Booking = require('./models/Booking');
const EventImage = require('./models/EventImage');
const EventReview = require('./models/EventReview');

// Small, self-contained PNG: no external image service or file is required.
const sampleImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a9S8AAAAASUVORK5CYII=';
const password = 'Eventora123!';

async function seed() {
    await sequelize.authenticate();
    const hash = await bcrypt.hash(password, 10);
    const result = await sequelize.transaction(async (transaction) => {
        const users = [];
        const names = [['Maya', 'Haddad'], ['Karim', 'Nasser'], ['Nour', 'Salem'], ['Rami', 'Khoury'], ['Lina', 'Saad']];
        for (let i = 0; i < names.length; i++) {
            const [user] = await User.findOrCreate({
                where: { email: `seed.${i + 1}@eventora.example` },
                defaults: {
                    firstName: names[i][0], lastName: names[i][1],
                    username: `eventora_seed_${i + 1}`, phoneNumber: `+9617000090${i}`,
                    password: hash, roleName: i < 2 ? 'EVENT_ORGANIZER' : 'ATTENDEE'
                }, transaction
            });
            users.push(user);
        }
        const events = [];
        const definitions = [
            ['Beirut Technology Meetup', 'Beirut', 30, '0.00', 50, 0],
            ['Byblos Music Evening', 'Byblos', 45, '25.00', 100, 1],
            ['Mountain Photography Workshop', 'Faraya', 60, '40.00', 12, 0],
            ['Community Art Exhibition', 'Beirut', -30, '10.00', 30, 1]
        ];
        for (const [title, location, days, price, capacity, organizer] of definitions) {
            const [event] = await Event.findOrCreate({
                where: { title: `[Seed] ${title}` },
                defaults: {
                    organizerId: users[organizer].userId,
                    description: `Sample event: ${title}.`, location,
                    eventDate: new Date(Date.now() + days * 86400000), price, capacity
                }, transaction
            });
            events.push(event);
            await EventImage.findOrCreate({ where: { eventId: event.eventId, imageUrl: sampleImage }, transaction });
        }
        for (const [attendee, event] of [[2, 0], [3, 0], [4, 1], [2, 3], [3, 3]]) {
            await Booking.findOrCreate({ where: { attendeeId: users[attendee].userId, eventId: events[event].eventId }, transaction });
        }
        for (const [attendee, rating, feedback] of [[2, 5, 'A lovely exhibition with a welcoming atmosphere.'], [3, 4, 'Enjoyed the artwork and the venue.']]) {
            await EventReview.findOrCreate({
                where: { attendeeId: users[attendee].userId, eventId: events[3].eventId },
                defaults: { rating, feedback }, transaction
            });
        }
        return { users: users.map(u => ({ userId: u.userId, email: u.email, role: u.roleName })), eventIds: events.map(e => e.eventId) };
    });
    console.log('Sample data ready (5 users, 4 events, 5 bookings, 4 images, 2 reviews).');
    console.log(JSON.stringify(result, null, 2));
    console.log(`Sample accounts password: ${password}`);
}

if (require.main === module) {
    seed().catch(error => {
        console.error('Seeding failed; transaction rolled back:', error.message);
        process.exitCode = 1;
    }).finally(() => sequelize.close());
}

module.exports = seed;
