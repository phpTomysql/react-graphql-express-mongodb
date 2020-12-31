import React from 'react'
import { useQuery,useMutation } from '@apollo/client';
import { GetBooks, REMOVE_BOOK} from '../queries/query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BookList() {
    const { loading, error, data } = useQuery(GetBooks);
    const [removeBook] = useMutation(REMOVE_BOOK);
    const handleRemove = ( id )=> {
        removeBook({
            variables:{id},
            refetchQueries:[{query:GetBooks}]
        }).then(res=>{
            toast("Wow so easy !",{
                type: toast.TYPE.SUCCESS
            });
        })
    }
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <>
        <ToastContainer />
        {data.books.map((book)=>{
            return(
                <div className="col-lg-5 m-1" key={book.id}>
                    <div className="card border-secondary" >
                    <div className="card-body">
                    <div className="card-title">{book.name}</div>
                    <p className="card-text">
                    
                        <small className="text-muted">{book.author.name}</small></p>
                    </div>
                    <div className="card-footer bg-transparent border-success">
                    <FontAwesomeIcon icon={faTrash} onClick={e=>handleRemove(book.id)} />
                    </div>
                    </div>
                </div>
            )
        })}
        
        </>
    )
}
