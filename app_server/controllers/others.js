/* About Page */
const about = (req, res) => {
    res.render('about', { 
        title: 'About',
        content: `Locater was created for practice as I followed the book "Getting MEAN with Mongo, Express, Angular, and Node" 
        \n This is filler text 
        Locater was created for practice as I followed the book "Getting MEAN with Mongo, Express, Angular, and Node" Locater was created for practice as I followed the book "Getting MEAN with Mongo, Express, Angular, and Node"
        Locater was created for practice as I followed the book "Getting MEAN with Mongo, Express, Angular, and Node"
        Locater was created for practice as I followed the book "Getting MEAN with Mongo, Express, Angular, and Node"
        Locater was created for practice as I followed the book "Getting MEAN with Mongo, Express, Angular, and Node"`
    });
};

module.exports = {
    about
};
