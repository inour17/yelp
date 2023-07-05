const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
}
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = Campground({
            author: '64277d54b928088d53058ca7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda molestiae deserunt tempora? Expedita qui reiciendis voluptatibus enim suscipit, iste ipsa animi quos fugiat delectus tenetur, ad consectetur dolores eum necessitatibus!',
            price,      //shorthand for price: price
            images: [
                {
                    url: 'https://res.cloudinary.com/dwonriizi/image/upload/v1680486920/YelpCamp/y7kzhj7lgpocmdnavle1.jpg',
                    filename: 'YelpCamp/y7kzhj7lgpocmdnavle1'
                },
                {
                    url: 'https://res.cloudinary.com/dwonriizi/image/upload/v1680486921/YelpCamp/f57ktndejivxo2md5n7o.jpg',
                    filename: 'YelpCamp/f57ktndejivxo2md5n7o',
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})