export const prizeTypes = {
  physical: { label: 'Physical reward', claimLabel: 'Delivery details' },
  giftCard: { label: 'Gift card', claimLabel: 'Delivery email' },
  digital: { label: 'Digital reward', claimLabel: 'Account email' },
};

export const currentGiveaway = {
  id: 'GW-2026-09-MIDNIGHT',
  title: 'The Good News Giveaway',
  eyebrow: 'September reward drop',
  status: 'active',
  endDate: '2026-09-24T18:00:00+05:30',
  participants: 8500,
  entries: 24,
  prizes: [
    { id: 'PRIZE-001', slug: 'iphone-15-pro', position: '01', name: 'iPhone 15 Pro', description: '256GB. A powerful upgrade for your everyday.', type: 'physical', winners: 1, participants: '2.3K+', image: 'phone.png', accent: 'violet', entry: { amount: 250, currency: 'VEs', balance: 350 }, eligibility: 'Active VELOOP members aged 18+.', duration: '11 Sep 2026 – 24 Sep 2026', prizeValue: 'Demo value: ₹1,29,900' },
    { id: 'PRIZE-002', slug: 'apple-watch-series-9', position: '02', name: 'Apple Watch Series 9', description: 'Smarter days, brighter health goals.', type: 'physical', winners: 3, participants: '1.8K+', image: 'watch.png', accent: 'blue', entry: { amount: 200, currency: 'VEs', balance: 180 }, eligibility: 'Active VELOOP members aged 18+.', duration: '11 Sep 2026 – 24 Sep 2026', prizeValue: 'Demo value: ₹45,900' },
    { id: 'PRIZE-003', slug: 'airpods-pro-2', position: '03', name: 'AirPods Pro 2', description: 'A little more space in every moment.', type: 'physical', winners: 5, participants: '3.1K+', image: 'airpods.png', accent: 'green', entry: { amount: 500, currency: 'SVEs', balance: 1200 }, eligibility: 'Active VELOOP members aged 18+.', duration: '11 Sep 2026 – 24 Sep 2026', prizeValue: 'Demo value: ₹24,900' },
    { id: 'PRIZE-004', slug: 'amazon-2000-voucher', position: 'Lucky draw', name: 'Amazon ₹2,000 Gift Card', description: '₹2,000 to spend on whatever feels good.', type: 'giftCard', winners: 10, participants: '1.3K+', image: '2,000 rupee gift card.png', accent: 'amber', entry: { amount: 500, currency: 'VEs', balance: 650 }, eligibility: 'Active VELOOP members aged 18+.', duration: '11 Sep 2026 – 24 Sep 2026', prizeValue: '₹2,000 gift card' },
    { id: 'PRIZE-005', slug: 'amazon-500-voucher', position: 'Lucky draw', name: 'Amazon ₹500 Gift Card', description: 'A little extra room for the things you want.', type: 'giftCard', winners: 15, participants: '2.1K+', image: '500 rupee gift card.png', accent: 'amber', entry: { amount: 300, currency: 'VEs', balance: 450 }, eligibility: 'Active VELOOP members aged 18+.', duration: '11 Sep 2026 – 24 Sep 2026', prizeValue: '₹500 gift card' },
    { id: 'PRIZE-006', slug: 'amazon-20-voucher', position: 'Lucky draw', name: 'Amazon ₹20 Gift Card', description: 'A small reward for a good day.', type: 'giftCard', winners: 25, participants: '4.6K+', image: '20 rupee gift card.png', accent: 'amber', entry: { amount: 2000, currency: 'Tokens', balance: 2400 }, eligibility: 'Active VELOOP members aged 18+.', duration: '11 Sep 2026 – 24 Sep 2026', prizeValue: '₹20 gift card' },
  ],
};

export const previousWinners = [
  { id: 'WIN-01', userId: 'VE10042', displayId: 'VE••••42', prize: 'Apple Watch Series 9', giveaway: 'August Reward Rush', date: '06 Aug 2026', category: 'Physical reward', status: 'Prize delivered' },
  { id: 'WIN-02', userId: 'VE10091', displayId: 'VE••••91', prize: 'iPhone 15 Pro', giveaway: 'August Reward Rush', date: '06 Aug 2026', category: 'Physical reward', status: 'Prize delivered' },
  { id: 'WIN-03', userId: 'VE10027', displayId: 'VE••••27', prize: 'AirPods Pro 2', giveaway: 'July Good News Drop', date: '10 Jul 2026', category: 'Physical reward', status: 'Prize delivered' },
  { id: 'WIN-04', userId: 'VE10083', displayId: 'VE••••83', prize: 'Amazon Gift Card', giveaway: 'July Good News Drop', date: '10 Jul 2026', category: 'Gift card', status: 'Prize delivered' },
];

export const currentWinners = [
  { id: 'WIN-CURRENT-01', userId: 'VE10025', displayId: 'VE••••25', prize: 'Apple Watch Series 9', prizeId: 'PRIZE-002', status: 'Winner' },
  { id: 'WIN-CURRENT-02', userId: 'VE10088', displayId: 'VE••••88', prize: 'AirPods Pro 2', prizeId: 'PRIZE-003', status: 'Winner' },
];

export const winnerMessages = [
  { user: 'VE••••21', prize: 'iPhone 15 Pro' },
  { user: 'VE••••83', prize: 'Apple Watch Series 9' },
  { user: 'VE••••54', prize: 'AirPods Pro 2' },
  { user: 'VE••••92', prize: 'Amazon Gift Card' },
];

export const participationSteps = [
  { number: '01', title: 'Sign up or login', text: 'Create your VELOOP account to get started.' },
  { number: '02', title: 'Complete activities', text: 'Explore simple, eligible tasks in Rewards.' },
  { number: '03', title: 'Collect entries', text: 'Every completed activity brings another chance.' },
  { number: '04', title: 'Win something good', text: 'Winners are selected after the giveaway ends.' },
];

export const rules = [
  ['Eligibility', 'Open to active VELOOP members aged 18 and above.'],
  ['Participation', 'Complete eligible activities during the giveaway window to earn entries.'],
  ['Winner selection', 'Winners are selected after the closing time and notified through their account.'],
  ['Claim period', 'Prize claims must be submitted within 7 days of the winner announcement.'],
  ['Fair play', 'Duplicate, automated, or abusive entries may be removed from consideration.'],
];

export const faqs = [
  ['How do I participate?', 'Sign in, complete eligible activities, and use your earned entries to join the current giveaway.'],
  ['When are winners announced?', 'Winners are announced once the countdown reaches zero and the selection process is complete.'],
  ['What happens if I win?', 'You will see a private winner card with the prize and a secure claim form tailored to its delivery type.'],
  ['Can I participate in multiple giveaways?', 'Yes. Each giveaway has its own entries and participation requirements.'],
];
