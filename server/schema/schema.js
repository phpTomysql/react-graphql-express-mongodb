const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// dummy data

var books = [
    {id:'1',name:'PHP',genre:'server',authorId:'1'},
    {id:'2',name:'JAVASCRIPT',genre:'client',authorId:'2'},
    {id:'3',name:'CSS',genre:'style',authorId:'3'},
    {id:'4',name:'PHP1',genre:'style',authorId:'1'},
    {id:'5',name:'JAVASCRIPT1',genre:'style',authorId:'2'},
    {id:'6',name:'CSS1',genre:'style',authorId:'3'},
];

var authors = [
    {id:'1',name:'Niraj',age:35},
    {id:'2',name:'Monam',age:31},
    {id:'3',name:'Tom',age:23}
];
const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args) {
                console.log('author id at book object:'+parent.authorId)
                //return _.find(authors,{id:parent.authorId});
                if(parent.authorId)
                    return Author.findById(parent.authorId);
                else
                return null;
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args) {
                console.log('author id at auhtor object:'+parent.id)
                //return _.filter(books,{authorId:parent.id});
                return Book.find({
                   authorId: parent.id
                });

            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book: {
            type:BookType,
            args:{
                id: {
                    type:GraphQLID
                }
            },
            resolve(parent,args) {
                console.log('bookid:'+args.id)
                //code to get data from db/ other resource
               // return _.find(books,{id:args.id});
                return Book.findById(args.id);
            }
        },
        author: {
            type:AuthorType,
            args:{
                id:{
                    type:GraphQLID
                }
            },
            resolve(parent,args) {
               // return _.find(authors,{id:args.id});
                return Author.findById(args.id)
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args) {
                //return books;
                return Book.find({});
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args) {
                //return authors;
                return Author.find({});
            }
        }
    }

});

const Mutation = new GraphQLObjectType({

    name:"Mutation",
    fields: {
        addAuthor:{
            type:AuthorType,
            args:{
                name:{ type:new GraphQLNonNull(GraphQLString) },
                age:{ type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args) {
                let author = new Author({
                    name:args.name,
                    age:args.age
                });
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args) {
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                });
                return book.save();
            }
        },
        removeBook:{
            type:BookType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args) {
                 Book.deleteOne({_id:args.id},(err)=>{
                     if(err) { 
                         return err; 
                     }else {
                        return args.id;
                     }
                 })
            }
        }
    }

})

module.exports = new  GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});