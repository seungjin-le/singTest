import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import { Document, Page, pdfjs } from 'react-pdf';
import styled from 'styled-components';
import Stamp from '../../components/dragas/Stamp';
import domtoimage from 'dom-to-image';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const PdfView = ({ children, stamp, setStamp, combinedRef }) => {
  const [numPages, setNumPages] = useState([]);
  const [file, setFile] = useState({});
  const pagesRefs = useRef(null);
  const onDocumentLoaded = ({ numPages }) => {
    const pages = new Array(numPages).fill(0);
    setNumPages(pages);
  };

  const onChange = useCallback(
    ({ target }) => {
      setFile(target?.files[0]);
    },
    [file]
  );
  const onSave = () => {
    if (!pagesRefs.current) return;
    domtoimage
      .toBlob(pagesRefs.current)
      .then((blob) => {
        console.log(blob);
        saveAs(blob, 'card.png');
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  };

  return (
    <div
      className={`w-full z-0 relative h-auto min-h-[100vh]`}
      ref={combinedRef}>
      <div>
        <input type="file" onChange={onChange} />
        <button onClick={() => onSave()}>Save</button>
      </div>
      <Stamp stamp={stamp} setStamp={setStamp} />
      {children}
      <span ref={pagesRefs}>
        <CustomPdfView
          file={file || '/pdfs/계약서예시.pdf'}
          onLoadSuccess={onDocumentLoaded}
          className={''}>
          {numPages.map((item, index) => (
            <Page pageNumber={index} size={'A4'} key={index} />
          ))}
        </CustomPdfView>
      </span>
    </div>
  );
};

export default memo(PdfView);

const CustomPdfView = styled(Document)`
  & .react-pdf__Page {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: gray !important;
    margin-bottom: 2rem;
    padding: 2rem 0;
    & > canvas {
      border: 1px solid black;
    }
    & > div {
      display: none;
    }
  }
`;
