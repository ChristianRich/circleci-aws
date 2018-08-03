use admin

db.createUser(
  {
    user: "superuser",
    pwd: "ff7e4d1a-3c2c-4f0b-840e-ad7e0fd84afe",
    roles: [{
      role: "root",
      db: "admin"
    }]
  }
)

show collections
db.getUsers()
exit
