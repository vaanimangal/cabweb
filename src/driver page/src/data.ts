import type {
  RideRequest, EarningsDay, EarningsTrip, DocItem, Review, DriverProfile,
} from './types';

export const driverProfile: DriverProfile = {
  name: 'Marcus Reyes',
  email: 'marcus.reyes@driverhub.com',
  phone: '+1 (415) 555-0142',
  city: 'San Francisco, CA',
  vehicleModel: 'Toyota Camry Hybrid',
  vehiclePlate: '8XYZ 421',
  vehicleYear: 2023,
  rating: 4.92,
  totalTrips: 3428,
  memberSince: 'Mar 2022',
  avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
};

const passengers = [
  'Sarah Chen', 'James Wilson', 'Aisha Patel', 'Diego Romero', 'Emily Tran',
  "Liam O'Brien", 'Nora Kim', 'Marcus Johnson', 'Priya Sharma', 'Tom Anderson',
  'Yuki Tanaka', 'Olivia Martinez', 'Noah Williams', 'Zara Ahmed', 'Ethan Lee',
];

const sfPlaces = [
  'Union Square', 'Ferry Building', 'SFO Terminal 2', 'Mission District',
  'Golden Gate Park', 'Castro Theatre', 'Chinatown', "Fisherman's Wharf",
  'Oracle Park', 'Painted Ladies', 'Lombard Street', 'Coit Tower',
  'Presidio', 'Haight-Ashbury', 'SOMA', 'Nob Hill', 'Pacific Heights',
  'Embarcadero', 'Bayview', 'Sunset District',
];

const paymentMethods: RideRequest['paymentMethod'][] = ['cash', 'card', 'wallet'];

function pick<T>(arr: T[], i: number): T { return arr[i % arr.length]; }
function rand(seed: number, min: number, max: number): number {
  const x = Math.sin(seed * 999.13) * 10000;
  const r = x - Math.floor(x);
  return Math.round((min + r * (max - min)) * 10) / 10;
}
function randInt(seed: number, min: number, max: number): number {
  return Math.floor(rand(seed, min, max + 1));
}

export function makeRideRequest(seed: number): RideRequest {
  const fare = rand(seed + 1, 12, 48);
  const surge = [1, 1, 1, 1.2, 1.5, 1.8, 2][randInt(seed + 2, 0, 6)];
  return {
    id: `req_${seed}_${Date.now().toString(36)}`,
    passengerName: pick(passengers, seed),
    passengerRating: rand(seed + 3, 4.6, 5),
    passengerTrips: randInt(seed + 4, 12, 480),
    pickupAddress: pick(sfPlaces, seed),
    destinationAddress: pick(sfPlaces, seed + 7),
    distanceToPickupKm: rand(seed + 5, 0.4, 4.2),
    tripDistanceKm: rand(seed + 6, 1.8, 14.5),
    estimatedFare: Math.round(fare * surge * 100) / 100,
    estimatedMinutes: randInt(seed + 7, 6, 28),
    paymentMethod: pick(paymentMethods, seed + 8),
    surgeMultiplier: surge,
    requestedAt: Date.now(),
  };
}

export const weeklyEarnings: EarningsDay[] = (() => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay();
  const todayIdx = today === 0 ? 6 : today - 1;
  return days.map((label, i) => {
    const isToday = i === todayIdx;
    const isFuture = i > todayIdx;
    const base = rand(i + 10, 120, 340);
    return {
      date: new Date(Date.now() - (todayIdx - i) * 86400000).toISOString().slice(0, 10),
      label,
      earnings: isFuture ? 0 : isToday ? Math.round(base * 0.62 * 100) / 100 : Math.round(base * 100) / 100,
      trips: isFuture ? 0 : isToday ? randInt(i + 20, 6, 11) : randInt(i + 20, 9, 18),
      hours: isFuture ? 0 : isToday ? rand(i + 30, 4.5, 6.2) : rand(i + 30, 7.2, 9.8),
    };
  });
})();

export const earningsHistory: EarningsTrip[] = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(Date.now() - i * 86400000);
  const tripsThatDay = randInt(i + 40, 8, 16);
  return Array.from({ length: Math.min(tripsThatDay, 2) }, (_, j) => {
    const seed = i * 100 + j;
    return {
      id: `trip_${seed}`,
      date: d.toISOString().slice(0, 10),
      time: `${randInt(seed, 6, 22)}:${String(randInt(seed + 1, 0, 59)).padStart(2, '0')}`,
      passengerName: pick(passengers, seed),
      pickup: pick(sfPlaces, seed),
      dropoff: pick(sfPlaces, seed + 5),
      fare: Math.round(rand(seed + 2, 9, 42) * 100) / 100,
      distanceKm: rand(seed + 3, 1.2, 12.4),
      durationMin: randInt(seed + 4, 6, 34),
      paymentMethod: pick(paymentMethods, seed + 5),
      rating: rand(seed + 6, 4.4, 5),
    } satisfies EarningsTrip;
  });
}).flat();

export const documents: DocItem[] = [
  { id: 'd1', name: 'Driver License (Class C)', type: 'license', status: 'verified', expiryDate: '2028-06-14', uploadedAt: '2023-01-12' },
  { id: 'd2', name: 'Vehicle Insurance', type: 'insurance', status: 'verified', expiryDate: '2025-11-30', uploadedAt: '2024-12-02' },
  { id: 'd3', name: 'Vehicle Registration', type: 'registration', status: 'pending', expiryDate: '2026-03-18', uploadedAt: '2025-06-28' },
  { id: 'd4', name: 'Background Check', type: 'background', status: 'verified', expiryDate: '2026-09-22', uploadedAt: '2024-09-22' },
  { id: 'd5', name: 'Vehicle Inspection Certificate', type: 'vehicle', status: 'expired', expiryDate: '2025-04-10', uploadedAt: '2024-04-10' },
];

export const reviews: Review[] = [
  { id: 'r1', passengerName: 'Sarah Chen', rating: 5, comment: 'Marcus was incredibly professional and got me to the airport on time. Very smooth ride!', date: '2025-07-04', tripRoute: 'Mission District → SFO Terminal 2' },
  { id: 'r2', passengerName: 'James Wilson', rating: 5, comment: 'Great conversation, clean car, and knew all the best routes around the city.', date: '2025-07-03', tripRoute: 'Union Square → Fisherman\'s Wharf' },
  { id: 'r3', passengerName: 'Aisha Patel', rating: 4, comment: 'Friendly driver, just a bit of a detour due to traffic. Otherwise excellent.', date: '2025-07-02', tripRoute: 'Ferry Building → Golden Gate Park' },
  { id: 'r4', passengerName: 'Diego Romero', rating: 5, comment: 'Best cab ride I\'ve had in SF. Will definitely request Marcus again.', date: '2025-07-01', tripRoute: 'Castro Theatre → Oracle Park' },
  { id: 'r5', passengerName: 'Emily Tran', rating: 5, comment: 'Very safe driving, helped with luggage, and played great music. 10/10.', date: '2025-06-30', tripRoute: 'SOMA → Coit Tower' },
  { id: 'r6', passengerName: "Liam O'Brien", rating: 4, comment: 'Punctual and polite. Car was spotless. Would recommend.', date: '2025-06-29', tripRoute: 'Nob Hill → Embarcadero' },
];

export const ratingBreakdown = [
  { stars: 5, count: 2842, percent: 83 },
  { stars: 4, count: 412, percent: 12 },
  { stars: 3, count: 102, percent: 3 },
  { stars: 2, count: 51, percent: 1.5 },
  { stars: 1, count: 21, percent: 0.5 },
];
