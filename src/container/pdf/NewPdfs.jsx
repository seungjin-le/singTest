import React, { Fragment, memo, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styled from 'styled-components';
import Stamp from '../../components/dragas/Stamp';
import { Pagination } from '@mui/material';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const NewPdfs = ({
  stamp,
  setStamp,
  combinedRef,
  children,
  currentPage,
  setCurrentPage,
}) => {
  const [numPages, setNumPages] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [page, setPage] = useState(4);
  const [pagesRendered, setPagesRendered] = useState(0);

  const containerRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onPageRenderSuccess = () => {
    setPagesRendered((prev) => prev + 1);
    if (pagesRendered === numPages - 1) {
      setDownloading(true);
    }
  };

  const downloadPdf = async () => {
    setDownloading(true);
    const pdf = new jsPDF();
    for (let i = 1; i <= numPages; i++) {
      const input = document.getElementById(`pdf-container-page${i}`);
      if (input) {
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
        if (i < numPages) {
          pdf.addPage();
        }
      }
    }
    pdf.save('download.pdf');
    setDownloading(false);
  };

  const onChangePage = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (downloading && pagesRendered === numPages) {
      downloadPdf();
    }
  }, [downloading, pagesRendered, numPages, downloadPdf]);
  console.log(children);
  return (
    <PdfViewContainer
      id="pdf-container"
      ref={containerRef}
      className={
        'w-full h-auto overflow-scroll flex justify-center flex-col items-center p-4 z-0'
      }>
      <button onClick={downloadPdf}>Download PDF</button>
      <div className={'h-full w-full'} ref={combinedRef}>
        <Document
          file="/pdfs/계약서예시.pdf"
          className={'w-full h-full z-0'}
          onLoadSuccess={onDocumentLoadSuccess}>
          {downloading ? (
            Array.from(new Array(numPages), (el, index) => (
              <div
                key={`page_${index + 1}`}
                className={
                  'mb-4 w-full h-auto flex justify-center overflow-hidden'
                }>
                <span id={`pdf-container-page${index + 1}`}>
                  {index + 1 === children?.props?.item?.page ? children : null}
                  <Page
                    pageNumber={index + 1}
                    onRenderSuccess={onPageRenderSuccess}
                  />
                </span>
              </div>
            ))
          ) : (
            <Fragment>
              <div
                key={`page_${currentPage}`}
                className={'mb-4 w-full h-auto flex justify-center'}>
                <span id={`pdf-container-page${currentPage}`}>
                  <Page pageNumber={currentPage} />
                  {children}
                </span>
              </div>
              <Pagination
                count={numPages}
                page={currentPage}
                onChange={onChangePage}
              />
            </Fragment>
          )}
        </Document>
      </div>
      <Stamp stamp={stamp} setStamp={setStamp} />
    </PdfViewContainer>
  );
};

export default memo(NewPdfs);

const PdfViewContainer = styled.div`
  & .react-pdf__Page__annotations.annotationLayer,
  & .react-pdf__Page__textContent {
    display: none;
  }
  & .react-pdf__Page {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: inline;
    width: auto;
  }
`;
