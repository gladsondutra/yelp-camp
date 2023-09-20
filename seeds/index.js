
const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('database connected')
})

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 5; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      //default user
      author: '64fb58f551fd30350e857e66',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident sint aut repudiandae corporis veniam cum obcaecati iure ut eaque voluptates, dicta est voluptas quo placeat nesciunt nisi quas nobis hic!',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dbroi8kb4/image/upload/v1694546558/YelpCamp/z21qqavaxgue6fshal9o.jpg',
          filename: 'YelpCamp/z21qqavaxgue6fshal9o',
        },
        {
          url: 'https://res.cloudinary.com/dbroi8kb4/image/upload/v1694546568/YelpCamp/xcmeqwxcloj3tngg0g34.png',
          filename: 'YelpCamp/xcmeqwxcloj3tngg0g34',
        }
      ]
    })
    await camp.save()
  }
}

seedDB()