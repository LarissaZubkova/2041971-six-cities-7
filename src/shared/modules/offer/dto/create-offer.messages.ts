export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  postDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  previewImage: {
    maxLength: 'Too short for field «image»',
  },
  rentalCost: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 200000',
  },
  amenities: {
    invalidFormat: 'Field categories must be an array',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
} as const;
