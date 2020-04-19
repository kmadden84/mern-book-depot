const mongoose = require('mongoose');


const Users = mongoose.model('Users');
const Book = mongoose.model('Book');
const Schema = mongoose.Types;
const ObjectId = Schema.ObjectId;


module.exports = {
  create: async (req, res) => {

    console.log(req.params);
    var id = new ObjectId(req.params.id);

    const { _id, title, author, length, pubDate, Notes } = req.body;

    var bookArray = req.body;



    bookArray.forEach(async (item, index) => {
      //      const book = await Book.create({
      //           title: item["title"],
      //           author: item["author"],
      //           length: item["length"],
      //           pubDate: item["pubDate"],
      //           Notes: item["Notes"],
      //           user: id,
      //           _id: item["_id"]

      //       });

      // const books = {
      //     title: item["title"],
      //     author: item["author"],
      //     length: item["length"],
      //     pubDate: item["pubDate"],
      //     Notes: item["Notes"],
      //     user: id
      // };


      //   const query = {_id: _id};
     const currentUser = await Users.findById(id);


      //   let error = null;
      if (item["_id"] !== undefined) {
         await Book.findOneAndUpdate({ "_id": item["_id"] }, item, { upsert: true }, async function (err, doc) {
          if (err) return res.send(500, { error: err });
          // try {
          //   const currentUser = await Users.findById(id);
          //   await currentUser.books.push(doc);
          //   await currentUser.save();
            res.status(200).json(currentUser);
          // } catch (Err) {
          //   console.log(Err)
          // }
        });
      }
      else {
        const book = await Book.create({
          title: item["title"],
          author: item["author"],
          length: item["length"],
          pubDate: item["pubDate"],
          Notes: item["Notes"],
          user: id,
        });

        try {
          //    // await book.findOneAndUpdate();

          //     //  console.log(book)
          const userById = await Users.findById(id);
          await userById.books.push(book);
          await userById.save();
          res.status(200).json(currentUser);

        } catch (err) {
          console.log(err)
        }
      }

    })


    // const currentUser = await Users.findById(id);
    //  res.status(200).json(currentUser);



    //Book.insertMany(bookArray);



  },
  userByBook: async (req, res) => {
    var id = new ObjectId(req.params.id);
    //const userByBook = await Book.findById(id).populate('user');
    //res.status(400).json(userByBook);
    const user = await Users.findById(id).populate('books');
    console.log(user)
    res.status(200).json(user.books);
  },

  delete: async (req, res) => {
    var thisbook = req.body._id;
    console.log(thisbook)

    //var id = new ObjectId(req.params.id);
    //const user = await Users.findById(id).populate('books');
    //const currentbooks = user.books;

    Book.findOneAndDelete({_id: thisbook}, function(err, doc) {
      if (err) return res.send(500, { error: err });
      res.status(200).json(doc);

    });

  }
}