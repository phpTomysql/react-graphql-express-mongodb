import React,{useState} from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { GetBooks, GetAuthors, ADD_BOOK} from '../queries/query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddBook() {
    const [addBook, { book }] = useMutation(ADD_BOOK);
    const { loading, error, data } = useQuery(GetAuthors);
    const [bookFormValues, setbookFormValues] = useState({
        name:'',
        genre:'',
        authorId:''
    });
    
    const handleSubmit = (e)=> {
        e.preventDefault();
        if(bookFormValues.name === '' || bookFormValues.genre ==='' || bookFormValues.authorId ==='') {
            toast("Hey form fields should be filled!",{
                type: toast.TYPE.ERROR
            });
            return;
        }
        addBook({
            variables:bookFormValues,
            refetchQueries:[{query:GetBooks}]
        }).then((res)=>{
            toast("Wow so easy !",{
                type: toast.TYPE.SUCCESS
            });
            setbookFormValues(prev=>({...prev,name:'',genre:'',authorId:''}));
        });
    } 
    const setFormValues = (e)=> {
        setbookFormValues( prev => ({...prev,[e.target.name]:e.target.value}));
    }
    const displayOptions = () => {
       
        if(loading) {
            return(
                <option disabled>Loading...</option>
            )
        }else {
           // console.log(authorData);
            data.authors.map( author => {
                return(
                    <option value={author.id}>{author.name}</option>
                )
            })
        }
    }

    if (error) return `Error! ${error.message}`; 

    return (
        <>
        <ToastContainer />
        <div className="p-3">
            <h5>Add <span className="badge badge-secondary">Book</span></h5>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="form">
                    <div className="form-group">
                        <label>Book Name</label>
                        <input type="text" 
                        className="form-control" 
                        name="name" 
                        value={bookFormValues.name} 
                        onChange={(e)=>setFormValues(e)} />
                    </div>
                    <div className="form-group">
                        <label>Genre</label>
                        <input type="text" 
                        className="form-control" 
                        name="genre" 
                        value={bookFormValues.genre}
                        onChange={(e)=>setFormValues(e)} />
                    </div>
                    <div className="form-group">
                        <label>Auhtor</label>
                       
                        {loading ? 'Loading...' :
                        <select 
                        className="form-control" 
                        name="authorId" 
                        value={bookFormValues.authorId}
                        onChange={(e)=>setFormValues(e)}>
                            <option value=''>Choose Author</option>
                            {
                                data.authors.map( author => {
                                    return(
                                        <option value={author.id} key={author.id}>{author.name}</option>
                                    )
                                })
                            }
                        </select>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success">Save</button>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}
