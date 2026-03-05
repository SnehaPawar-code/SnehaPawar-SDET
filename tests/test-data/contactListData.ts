const uniqueId = Date.now();

export const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: `testuser${uniqueId}@test.com`,
  password: 'Test@1234',
};

export const contacts = [
  {
    firstName: 'Sneha',
    lastName: 'Pawar',
    birthdate: '1996-06-15',
    email: `sneha${uniqueId}@gmail.com`,
    phone: '9876543210',
    street1: '123 MG Road',
    street2: 'Apt 4B',
    city: 'Pune',
    stateProvince: 'Maharashtra',
    postalCode: '411001',
    country: 'India',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    birthdate: '1990-01-20',
    email: `john${uniqueId}@gmail.com`,
    phone: '1234567890',
    street1: '456 Oak Street',
    street2: 'Suite 100',
    city: 'New York',
    stateProvince: 'NY',
    postalCode: '10001',
    country: 'United States',
  },
];
