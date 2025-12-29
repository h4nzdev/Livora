import React from "react";
import { Star, MapPin, Bed, Bath, Car } from "lucide-react";
import { amenitiesOptions } from "../data/propertyData";

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Property Image */}
      <div className="relative">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-semibold text-gray-800">
              {property.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {property.name}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>
          <p className="text-gray-600 text-sm">{property.description}</p>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              ₱{property.price.toLocaleString()}
            </span>
            <span className="text-gray-600 ml-1">/month</span>
          </div>
        </div>

        {/* Property Features */}
        <div className="mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm">📍 {property.distanceToCityCenter}</span>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-2">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {amenitiesOptions.find((a) => a.value === amenity)?.label || amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => console.log(`Contact for ${property.name}`)}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          Contact Property
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;