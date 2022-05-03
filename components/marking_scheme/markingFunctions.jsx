import axios from 'axios';


// Add marking scheme to the database
export const createNew = newMarking => {
    return (
        axios.post('http://localhost:8070/marking-schemes/create', newMarking)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.message
        })

    )
}