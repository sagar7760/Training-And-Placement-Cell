const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const dotenv = require('dotenv');

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const adminData = {
      name: 'username',           // Change this to your name
      email: 'youremail@gmail.com',     // Change this to your email
      password: 'yourpassword',        // Change this to your preferred password
      role: 'admin',
      phone: '9876543210',         // Change this to your phone number
      active: true,
      loginAttempts: 0
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin already exists with email:', existingAdmin.email);
      process.exit(0);
    }

    // Create new admin
    const admin = await Admin.create(adminData);
    console.log('Admin created successfully:', admin.email);
    console.log('Please save these credentials:');
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();
