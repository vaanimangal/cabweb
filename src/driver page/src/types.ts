export type ViewKey = 'home' | 'earnings' | 'documents' | 'ratings' | 'profile';
export type DriverStatus = 'online' | 'offline';

export interface RideRequest {
  id: string;
  passengerName: string;
  passengerRating: number;
  passengerTrips: number;
  pickupAddress: string;
  destinationAddress: string;
  distanceToPickupKm: number;
  tripDistanceKm: number;
  estimatedFare: number;
  estimatedMinutes: number;
  paymentMethod: 'cash' | 'card' | 'wallet';
  surgeMultiplier: number;
  requestedAt: number;
}

export interface ActiveTrip {
  id: string;
  passengerName: string;
  pickupAddress: string;
  destinationAddress: string;
  fare: number;
  distanceKm: number;
  etaMinutes: number;
  status: 'to_pickup' | 'in_trip';
}

export interface EarningsDay {
  date: string;
  label: string;
  earnings: number;
  trips: number;
  hours: number;
}

export interface EarningsTrip {
  id: string;
  date: string;
  time: string;
  passengerName: string;
  pickup: string;
  dropoff: string;
  fare: number;
  distanceKm: number;
  durationMin: number;
  paymentMethod: 'cash' | 'card' | 'wallet';
  rating: number;
}

export interface DocItem {
  id: string;
  name: string;
  type: 'license' | 'insurance' | 'registration' | 'background' | 'vehicle';
  status: 'verified' | 'pending' | 'expired' | 'rejected';
  expiryDate: string;
  uploadedAt: string;
}

export interface Review {
  id: string;
  passengerName: string;
  rating: number;
  comment: string;
  date: string;
  tripRoute: string;
}

export interface DriverProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  vehicleModel: string;
  vehiclePlate: string;
  vehicleYear: number;
  rating: number;
  totalTrips: number;
  memberSince: string;
  avatarUrl: string;
}
