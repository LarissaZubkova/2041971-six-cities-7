import { User } from './index.js';

export type City = 'Москва' | 'Санкт-Петербург' | 'Новосибирск' | 'Екатеринбург' | 'Нижний Новгород' | 'Казань';
export type HousingType = 'apartment' | 'house' | 'room' | 'hotel';
export type Amenity = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export type Offer = {
    title: string;
    description: string;
    postDate: Date;
    city: City;
    previewImage: string;
    photos: string[];
    isPremium: boolean;
    isFavorite: boolean;
    rating: number;
    housingType: HousingType;
    rooms: number;
    guests: number;
    rentalCost: number;
    amenities: Amenity[];
    author: User;
    commentsCount: number;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}
