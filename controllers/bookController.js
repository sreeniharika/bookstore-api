import Book from '../models/book';


//get all books
export const books = async (req,res)=>{
    try{
        let books = await Book.find();
        res.status(200).json(books);
    }
    catch(error)
    {
      console.log(error);
      res.status(500).json({
        error: error.message
      })
    }
    
}



//get single book

export const book = async (req,res) =>{

    let bookId = req.params.id;

    try
    {
       let books = await Book.findById(bookId);
       res.status(200).json(books);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({
          error: error.message
        })
    }

}



// post create book
export const createBook = async (req,res)=>{
    let newBook = {
        isbn: req.body.isbn,
        title: req.body.title,
        subTitle: req.body.subTitle,
        author:req.body.author,
        publisher:req.body.publisher,
        pages:req.body.pages,
        description:req.body.description
    };

    try
    {
        //verify book exists already
        let book = await Book.findOne({title: newBook.title});

        if(book)
        {
            return res.status(400).json({
                msg:"Book exists already with the given title"
            })
        }
        //save to db

        book = new Book(newBook);
        book = await book.save();

        res.status(201).json({
            result:"Book Added Successfully",
            book: book
        })
    }
    catch(error)
    {
       console.log(error);
       res.status(500).json({
        error: error.message
       })
    }
}


//put update book

export const updateBook = async (req,res) =>{

    let bookId = req.params.id;

    let updateBook = {
        isbn: req.body.isbn,
        title: req.body.title,
        subTitle: req.body.subTitle,
        author:req.body.author,
        publisher:req.body.publisher,
        pages:req.body.pages,
        description:req.body.description
        
    }

    try
    {
       let book = await Book.findById(bookId);
       if(!book)
       {
        return res.status(400).json({
            msg: "Book Does Not Exist"
        })
       }

       //update db
       book = await Book.findByIdAndUpdate(
        bookId,
        {
            $set: updateBook
        },
        {new: true}

       );

       res.status(201).json({
        result: "Book Data Updated Successfully",
        book: book
       })
    }
    catch(error)
    {
       console.log(error);
       res.status(500).json({
        error: error.message
       })
    }

}

//delete book

export const deleteBook = async (req,res) =>{

    let bookId = req.params.id;

    try
    {
        let book = await Book.findById(bookId);
        if(!book)
        {
            return res.status(400).json({
                msg: "Book Does Not Exist"
            })
        }

        // delete from db
        book = await Book.findByIdAndDelete(bookId);


        res.status(200).json({
            msg: "Book Deleted Successfully",
            bookId: bookId
        })
    }
    catch(error)
    {

      console.log(error);
      res.status(500).json({
        error: error.message
      })
    }


}

