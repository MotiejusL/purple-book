# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(firstname: "Test1", lastname: "Test1", email: "test1@email.com", image: "default-profile.png", birthday: Date.parse("" + "04" + " " + "12" + " " + "1995"), gender: "male", password: "testtest1", coverphoto: "default-cover-img.png", country: "Lithuania", city: "Vilnius", school: "Vilniaus gimnazija")
User.create(firstname: "Test2", lastname: "Test2", email: "test2@email.com", image: "default-profile.png", birthday: Date.parse("" + "08" + " " + "11" + " " + "1991"), gender: "male", password: "testtest2", coverphoto: "default-cover-img.png", country: "Lithuania", city: "Vilnius", school: "Vilniaus progimnazija")
User.create(firstname: "Test3", lastname: "Test3", email: "test3@email.com", image: "default-profile.png", birthday: Date.parse("" + "08" + " " + "11" + " " + "1985"), gender: "female", password: "testtest3", coverphoto: "default-cover-img.png", country: "Lithuania", city: "Kaunas", school: "Kauno progimnazija")
User.create(firstname: "Test4", lastname: "Test4", email: "test4@email.com", image: "default-profile.png", birthday: Date.parse("" + "08" + " " + "11" + " " + "1984"), gender: "female", password: "testtest4", coverphoto: "default-cover-img.png", country: "Lithuania", city: "Kaunas", school: "Kauno progimnazija")

Photo.create(image: "photos1.jpg", user_id: 1)
Photo.create(image: "photos2.jpg", user_id: 1)
Photo.create(image: "photos3.jpg", user_id: 1)
Photo.create(image: "photos4.jpg", user_id: 1)
Photo.create(image: "photos5.jpg", user_id: 1)
Photo.create(image: "photos5.jpg", user_id: 2)
Photo.create(image: "photos6.jpg", user_id: 2)
Photo.create(image: "photos1.jpg", user_id: 2)
Photo.create(image: "photos2.jpg", user_id: 2)
Photo.create(image: "photos1.jpg", user_id: 3)
Photo.create(image: "photos2.jpg", user_id: 3)
Photo.create(image: "photos3.jpg", user_id: 3)
Photo.create(image: "photos4.jpg", user_id: 3)
Photo.create(image: "photos5.jpg", user_id: 3)
Photo.create(image: "photos5.jpg", user_id: 3)
Photo.create(image: "photos6.jpg", user_id: 4)
Photo.create(image: "photos1.jpg", user_id: 4)
Photo.create(image: "photos2.jpg", user_id: 4)
