const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //user id pt bob
            author: '5fc7c3faeacf0200de231278',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo sint laboriosam, dolore ipsum libero maxime itaque voluptatum dolores ex quae accusantium odio. Rerum possimus facilis nulla sit aperiam illo? In adipisci veniam facere eum molestias, id temporibus saepe repudiandae pariatur perspiciatis perferendis maiores? Incidunt, nostrum nesciunt. Maiores voluptas natus laborum tenetur reiciendis vero quasi temporibus repellat eveniet sequi alias voluptate accusamus, inventore necessitatibus repellendus molestias illum a perferendis. Laboriosam tempore, dicta sequi in ipsam reprehenderit iusto sunt debitis ex unde dolorem minus quasi cum tenetur est nihil porro qui similique? Delectus exercitationem tempore quos accusantium consequatur debitis, quia aliquam molestias!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [{
                url:
                    'https://res.cloudinary.com/dvj9hzdpk/image/upload/v1607267625/YelpCamp/b6lbrgzsq6g2vddc95m4.jpg',
                filename: 'YelpCamp/b6lbrgzsq6g2vddc95m4'
            },
            {
                url:
                    'https://res.cloudinary.com/dvj9hzdpk/image/upload/v1607267625/YelpCamp/pmfcaelo0qvwlnvs9ohk.jpg',
                filename: 'YelpCamp/pmfcaelo0qvwlnvs9ohk'
            },
            {
                url:
                    'https://res.cloudinary.com/dvj9hzdpk/image/upload/v1607267625/YelpCamp/my8cesnuilybp6jmjgik.jpg',
                filename: 'YelpCamp/my8cesnuilybp6jmjgik'
            }]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})