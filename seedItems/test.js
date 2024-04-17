

users_admins = [
    {"username": "user1", "password": "user1password", "email":"user1@gmail.com", "role": "user"},
    {"username": "user2", "password": "user2password", "email":"user2@gmail.com","role": "user"},
    {"username": "user3", "password": "user3password", "email":"user3@gmail.com","role": "user"},
    {"username": "user4", "password": "user4password","email":"user4@gmail.com", "role": "user"},
    {"username": "user5", "password": "user5password","email":"user5@gmail.com", "role": "user"},
    {"username": "user6", "password": "user6password","email":"user6@gmail.com", "role": "user"},
    {"username": "user7", "password": "user7password","email":"user7@gmail.com", "role": "user"},
    {"username": "user8", "password": "user8password","email":"user8@gmail.com", "role": "user"},
    {"username": "admin1", "password": "admin1password","email":"admin@gmail.com", "role": "admin"},
    {"username": "admin2", "password": "admin2password","email":"admin1@gmail.com", "role": "admin"}
  ]
  const seedDB = async () => {
    await User.deleteMany({});
    await User.insertMany(users_admins);
  
  };
  seedDB().then(() => {
    mongoose.connection.close();
    console.log("Database seeded!");
  })
  