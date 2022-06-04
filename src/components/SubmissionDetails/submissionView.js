import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.parcel2';
import "../SubmissionDetails/submissionView.css"

// //import path from 'path';
// import fs from 'fs';
import axios from 'axios';

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


    useEffect(() => {
        const fetchsubmissions = async () => {
          await axios
            .get(`http://localhost:8070/fileupload/docup/629ad5f0a37ca63bf48698b3`)
            .then((res) => {
              console.log(res);
              SetStudentDetails(res.data.fileData.image);
            //   console.log(res.data.fileData.image.data)
            })
            .catch((e) => {
              console.log(e);
            });
        };
        fetchStudent();
      }, []);

    return(
        
        <div>
            <div style={{height:100}}>
        <Document style={{height:10}}
          file={StudentDetails}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page style={{height:10}} pageNumber={pageNumber} />
        </Document>
        </div>
        
        <div>
          <p>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
        </div>
      
    );




}