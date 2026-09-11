import { connectDatabase, disconnectDatabase } from './config/database.js';
import { Giveaway } from './models/Giveaway.js';
import { Prize } from './models/Prize.js';
import { User } from './models/User.js';

const prizeData = [
  { id: 'PRIZE-001', slug: 'iphone-15-pro', name: 'iPhone 15 Pro', description: '256GB. A powerful upgrade for your everyday.', image: '/assets/phone.png', type: 'PHYSICAL', claimType: 'DELIVERY_DETAILS', winnerCount: 1, entry: { currency: 'VEs', amount: 250 }, valueLabel: 'Demo value: ₹1,29,900' },
  { id: 'PRIZE-002', slug: 'apple-watch-series-9', name: 'Apple Watch Series 9', description: 'Smarter days, brighter health goals.', image: '/assets/watch.png', type: 'PHYSICAL', claimType: 'DELIVERY_DETAILS', winnerCount: 3, entry: { currency: 'VEs', amount: 200 }, valueLabel: 'Demo value: ₹45,900' },
  { id: 'PRIZE-003', slug: 'airpods-pro-2', name: 'AirPods Pro 2', description: 'A little more space in every moment.', image: '/assets/airpods.png', type: 'PHYSICAL', claimType: 'DELIVERY_DETAILS', winnerCount: 5, entry: { currency: 'SVEs', amount: 500 }, valueLabel: 'Demo value: ₹24,900' },
  { id: 'PRIZE-004', slug: 'amazon-2000-voucher', name: 'Amazon ₹2,000 Voucher', description: '₹2,000 to spend on whatever feels good.', image: '/assets/2,000 rupee gift card.png', type: 'GIFT_CARD', claimType: 'EMAIL', winnerCount: 10, entry: { currency: 'VEs', amount: 500 }, valueLabel: '₹2,000 gift card' },
  { id: 'PRIZE-005', slug: 'amazon-500-voucher', name: 'Amazon ₹500 Voucher', description: 'A little extra room for the things you want.', image: '/assets/500 rupee gift card.png', type: 'GIFT_CARD', claimType: 'EMAIL', winnerCount: 15, entry: { currency: 'VEs', amount: 300 }, valueLabel: '₹500 gift card' },
  { id: 'PRIZE-006', slug: 'amazon-20-voucher', name: 'Amazon ₹20 Voucher', description: 'A small reward for a good day.', image: '/assets/20 rupee gift card.png', type: 'GIFT_CARD', claimType: 'EMAIL', winnerCount: 25, entry: { currency: 'Tokens', amount: 2000 }, valueLabel: '₹20 gift card' },
];

await connectDatabase();
const prizes = {};
for (const item of prizeData) prizes[item.id] = await Prize.findOneAndUpdate({ id: item.id }, item, { upsert: true, new: true, setDefaultsOnInsert: true });
const prizeRefs = prizeData.map((item, index) => ({ prizeId: prizes[item.id]._id, winnerCount: item.winnerCount, sortOrder: index }));
await Giveaway.findOneAndUpdate({ slug: 'the-good-news-giveaway' }, { title: 'The Good News Giveaway', slug: 'the-good-news-giveaway', description: 'Complete simple activities, collect entries, and get a chance to bring home something you will love.', status: 'ACTIVE', startAt: new Date('2026-09-01T00:00:00Z'), endAt: new Date('2026-09-24T12:30:00Z'), rules: ['Active VELOOP member aged 18+', 'One participation per user and giveaway', 'Suspicious or abusive activity may be blocked'], eligibility: 'Active VELOOP members aged 18 and above.', prizes: prizeRefs, participationSettings: { oneParticipationPerUser: true, allowAdditionalEntries: false } }, { upsert: true, new: true, setDefaultsOnInsert: true });
await User.findOneAndUpdate({ externalId: 'VE10025' }, { externalId: 'VE10025', role: 'user', balances: { VEs: 350, SVEs: 1200, Tokens: 2400 } }, { upsert: true, new: true, setDefaultsOnInsert: true });
await User.findOneAndUpdate({ externalId: 'admin-demo' }, { externalId: 'admin-demo', role: 'admin', balances: { VEs: 0, SVEs: 0, Tokens: 0 } }, { upsert: true, new: true, setDefaultsOnInsert: true });
console.log('Seed complete.');
await disconnectDatabase();
