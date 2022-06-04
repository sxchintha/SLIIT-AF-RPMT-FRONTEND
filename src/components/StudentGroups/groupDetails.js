import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getGroupDetails, getStaffMember } from "../../index.api";
import LoadingSpinner from '../../components/LoadingSpinner'

export default function StudentGroupDetailsComp() {
    const navigate = useNavigate();
    const location = useLocation()
    const { groupId } = useParams()

    const [isLoaded, setIsLoaded] = useState(false)
    const [groupDetails, setGroupDetails] = useState([])

    useEffect(() => {
        getGroupDetails(groupId)
            .then(res => {
                // console.log(res.data);
                let groupD = res.data.group
                groupD.supervisorId != 'No Supervisor Yet' ?
                    getStaffMember(groupD.supervisorId)
                        .then((member) => {
                            groupD.supervisor = member.firstname + ' ' + member.lastname
                        })
                    : groupD.supervisor = groupD.supervisorId

                setGroupDetails(groupD)


            })
            .catch(err => {
                console.log(err.message);
            })

        setIsLoaded(true)
    }, [])


    return (
        <div>
            {
                isLoaded ?
                    <div>
                        {/* <div className="d-flex justify-content-center m-5"> */}
                        <div className="sxch-container w-75 p-2">
                            <h5>Group name: {groupDetails.groupName}</h5>
                            <h5>Supervisor: {groupDetails.supervisor}</h5>
                            {/* <h5>Leader: {groupDetails.firstM}</h5> */}
                            <h5>Second Member:</h5>
                            <h5>Third Member:</h5>
                            <h5>Forth Member:</h5>



                            {/* </div> */}
                        </div>
                        {/* <Link to={{
                            pathname: `/panels/edit/${panelId}`,
                            state: {name: "sachintha"}
                        }} className="btn btn-outline-primary ms-2 me-4 mt-4"><i className="bi bi-pencil-square"></i> Edit</Link> */}
                        {/* <Link to={`/panels/edit/${panelId}`} state={{ panelDetails }} className="btn btn-outline-primary ms-2 me-4 mt-4"><i className="bi bi-pencil-square"></i> Edit</Link> */}
                        {/* <button onClick={onDelete} className="btn btn-outline-danger mt-4"><i className="bi bi-trash3-fill"></i> Delete</button> */}
                    </div>
                    : <LoadingSpinner />
            }
        </div>
    );
}
