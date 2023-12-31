import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Document, Page, pdfjs } from 'react-pdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styled from 'styled-components';

import { Pagination } from '@mui/material';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfView = ({ combinedRef, children, currentPage, setCurrentPage }) => {
  const [numPages, setNumPages] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [page, setPage] = useState(4);
  const [pagesRendered, setPagesRendered] = useState(1);
  const [components, setComponents] = useState([]);
  const containerRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onDown = useCallback(() => {
    const pdf = new jsPDF();
    for (let i = 0; i < components.length; i++) {
      pdf.addImage(components[i], 'JPEG', 0, 0, 210, 297);
      if (i !== components.length - 1) pdf.addPage();
    }
    pdf.save('download.pdf');
    setDownloading(false);
    setPagesRendered(1);
    setComponents([]);
  }, [components, children]);

  const onPageRenderSuccess = useCallback(async () => {
    setTimeout(async () => {
      const input = document.getElementById(
        `pdf-container-page${pagesRendered}`
      );
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png', 1);
      setComponents((prev) => [...prev, imgData]);
      if (pagesRendered !== numPages) {
        setPagesRendered((prev) => prev + 1);
      }
    }, 500);
  }, [components, pagesRendered, downloading, children]);

  const downloadPdf = async () => {
    setDownloading(true);
    onPageRenderSuccess();
  };

  const onChangePage = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (components.length === numPages) onDown();
  }, [components]);

  return (
    <PdfViewContainer
      id="pdf-container"
      ref={containerRef}
      className={
        'w-full h-auto flex justify-center flex-col items-center py-4 z-0'
      }>
      <button onClick={downloadPdf}>Download PDF</button>
      <div className={'h-full w-full'} ref={combinedRef}>
        <Document
          file="/pdfs/계약서예시.pdf"
          className={'w-full h-full z-0 relative'}
          onLoadSuccess={onDocumentLoadSuccess}>
          {downloading ? (
            <Fragment>
              <div
                key={`page_${pagesRendered}`}
                className={'mb-4 w-full h-auto flex justify-center'}>
                <span
                  id={`pdf-container-page${pagesRendered} asdfasdfasdf`}
                  className={'relative'}>
                  <Page
                    pageNumber={pagesRendered}
                    onLoadSuccess={onPageRenderSuccess}
                  />
                  {children.map(
                    (item) => item?.props?.item.page === pagesRendered && item
                  )}
                </span>
              </div>
              <Pagination
                count={page}
                page={pagesRendered}
                onChange={onChangePage}
              />
            </Fragment>
          ) : (
            <Fragment>
              <div
                key={`page_${currentPage}`}
                className={'mb-4 w-full h-auto flex justify-center'}>
                <span
                  id={`pdf-container-page${currentPage}`}
                  className={'relative'}>
                  <Page pageNumber={currentPage} />
                  {children.map(
                    (item) => item?.props?.item.page === currentPage && item
                  )}
                </span>
              </div>
              <Pagination
                key={`pagination_${currentPage}`}
                count={+numPages}
                page={currentPage}
                onChange={onChangePage}
              />
            </Fragment>
          )}
        </Document>
      </div>
    </PdfViewContainer>
  );
};

export default memo(PdfView);

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
  & .MuiPagination-text > ul {
    align-items: center;
    justify-content: center;
  }
`;
