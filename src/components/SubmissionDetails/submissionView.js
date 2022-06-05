import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.parcel2';
import "../SubmissionDetails/submissionView.css"
import { getOneItem } from '../../components/SubmissionDetails/api/index'

// //import path from 'path';
// import fs from 'fs';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

//const cMapsDir = path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps');

// function copyDir(from, to) {
//     // Ensure target directory exists
//     fs.mkdirSync(to, { recursive: true });
  
//     const files = fs.readdirSync(from);
//     files.forEach((file) => {
//       fs.copyFileSync(path.join(from, file), path.join(to, file));
//     });
//   }
  
//   copyDir(cMapsDir, 'dist/cmaps/');
    

export default function Submissions() {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const [StudentDetails, SetStudentDetails] = useState()
    // const idtoken=(localStorage.getItem('localToken'))
    // const id=JSON.parse(idtoken).username
    
    const {id}=useParams()
    console.log(id);
  
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
      }
    
      function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
      }
    
      function previousPage() {
        changePage(-1);
      }
    
      function nextPage() {
        changePage(1);
      }

    const [newFeedback,setnewFeedback]=useState({
      itNumber:"",
      status:"",
      feedback:"",
    })

    const onChange=(e)=>{
      setnewFeedback({
        ...newFeedback,
        [e.target.neme]:e.target.value,
      })
    }

    const options=[
      {
        value:"Approved",
        label:"Approved"
      },

      {
        value:"Rejected",
        label:"Rejected"
      }
    ];

    const handleOptions = (e) => {
      setnewFeedback({ ...newFeedback, ["status"]: e.value });
    };

    function sendData(e){
      e.preventDefault();

      const newFeedback={
        itNumber:newFeedback.itNumber,
        status:newFeedback.status,
        feedback:newFeedback.feedback
      }

      axios
      .post("http://localhost:8070/feedback/add",newFeedback,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(()=>{
        console.log(newFeedback)
        alert("Feedback successfully submitted")
      })
      .catch((e) => {
        alert(e.response.data.error);
      });




    }


    useEffect(() => {

       getOneItem(id)
            .then((res) => {
              console.log(res);
              SetStudentDetails(res.data.fileData.document);
                console.log(StudentDetails)
            })
            .catch((e) => {
              console.log(e);
            });
        // fetchsubmissions();
      }, []);

    return(

      <div>
      <div className="container-fluid overflow-hidden">
          <div className="row vh-100 overflow-auto">
              <Sidebar />

              <div className="col d-flex flex-column h-sm-100">
                  <main className="row overflow-auto">
                      <div className="col pt-4 ps-4">
                          {/* Body */}
                          <h2>Evaluvate Student Topics</h2>
                          <hr />
        
        <div class="docview">

            <div class="docview container">
        <Document 
          file={StudentDetails}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page  pageNumber={pageNumber} />
        </Document>
        </div>
        
        <div>
          <p>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>
          <button
            type="button"
            
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            
            onClick={nextPage}
          >
            Next
          </button>
        </div>
        <div class="formsubmit">
<form onSubmit={
  {sendData}
}>
    <div class="form-group">
      <label for="disabledTextInput">Leader ID</label>
      <input type="text" id="itNumber" class="form-control" value={id} placeholder={id} disabled/>
      <br/>
    </div>
    <div class="form-group">
    <label for="disabledTextInput">Select wether Approved or Rejected</label>
    {/* <Select
                                      closeMenuOnSelect={false}
                                      // components={animatedComponents}
                                      name="status"
                                      // value={panelData.panelMembers}
                                      placeholder="Select status"
                                      options={options}
                                      onChange={handleOptions}
                                      required
                                    /> */}
    <br/>
    </div>
    <div class="form-group purple-border">
        <label for="exampleFormControlTextarea4">Feedback</label>
        <textarea class="form-control" id="feedback" name="feedback" rows="3" onChange={onchange}></textarea>
        <br/>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    <br/>
</form>
</div>
        </div>
        </div>
        </main>
        <Footer />
        </div>
        </div>
        </div>
        </div>
      
    );




}