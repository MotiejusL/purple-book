# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(id: 1, firstname: "Test1", lastname: "Test1", email: "test1@email.com", image: "default-profile.png", birthday: Date.parse("" + "04" + " " + "12" + " " + "1995"), gender: "male", password: "testtest1", coverphoto: "default-cover-img.png", country: "Lithuania", city: "Vilnius", school: "Vilniaus gimnazija")
User.create(id: 2, firstname: "Test2", lastname: "Test2", email: "test2@email.com", image: "default-profile.png", birthday: Date.parse("" + "08" + " " + "11" + " " + "1991"), gender: "male", password: "testtest2", coverphoto: "default-cover-img.png", country: "Lithuania", city: "Vilnius", school: "Vilniaus progimnazija")
User.create(id: 3, firstname: "Test3", lastname: "Test3", email: "test3@email.com", image: "default-profile.png", birthday: Date.parse("" + "08" + " " + "11" + " " + "1985"), gender: "female", password: "testtest3", coverphoto: "default-cover-img.png", country: "Lithuania", city: "Kaunas", school: "Kauno progimnazija")
User.create(id: 4, firstname: "Test4", lastname: "Test4", email: "test4@email.com", image: "default-profile.png", birthday: Date.parse("" + "08" + " " + "11" + " " + "1984"), gender: "female", password: "testtest4", coverphoto: "default-cover-img.png", country: "Lithuania", city: "Kaunas", school: "Kauno progimnazija")

Photo.create(id: 1, image: "photos1.jpg", user_id: 1)
Photo.create(id: 2, image: "photos2.jpg", user_id: 1)
Photo.create(id: 3, image: "photos3.jpg", user_id: 1)
Photo.create(id: 4, image: "photos4.jpg", user_id: 1)
Photo.create(id: 5, image: "photos5.jpg", user_id: 1)
Photo.create(id: 6, image: "photos5.jpg", user_id: 2)
Photo.create(id: 7, image: "photos6.jpg", user_id: 2)
Photo.create(id: 8, image: "photos1.jpg", user_id: 2)
Photo.create(id: 9, image: "photos2.jpg", user_id: 2)
Photo.create(id: 10, image: "photos1.jpg", user_id: 3)
Photo.create(id: 11, image: "photos2.jpg", user_id: 3)
Photo.create(id: 12, image: "photos3.jpg", user_id: 3)
Photo.create(id: 13, image: "photos4.jpg", user_id: 3)
Photo.create(id: 14, image: "photos5.jpg", user_id: 3)
Photo.create(id: 15, image: "photos5.jpg", user_id: 3)
Photo.create(id: 16, image: "photos6.jpg", user_id: 4)
Photo.create(id: 17, image: "photos1.jpg", user_id: 4)
Photo.create(id: 18, image: "photos2.jpg", user_id: 4)
