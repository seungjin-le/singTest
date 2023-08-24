import React, { memo, useCallback, useEffect, useState } from 'react';

import { Document, Page, pdfjs } from 'react-pdf';
import styled from 'styled-components';
import PdfScaleSlider from '../../components/toolTips/PdfScaleSlider';
import Stamp from '../../components/dragas/Stamp';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const PdfView = ({ children, stamp, setStamp, combinedRef }) => {
  const [numPages, setNumPages] = useState([]);

  const [file, setFile] = useState({});
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

  return (
    <div className={'w-full h-full z-0 relative'} ref={combinedRef}>
      <input type="file" onChange={onChange} />
      <Stamp stamp={stamp} setStamp={setStamp} />
      {children}
      <CustomPdfView
        file={file || '/pdfs/계약서예시.pdf'}
        onLoadSuccess={onDocumentLoaded}
        className={''}>
        {numPages.map((item, index) => (
          <Page pageNumber={index} size={'A4'} key={index} />
        ))}
      </CustomPdfView>
    </div>
  );
};

export default memo(PdfView);

const CustomPdfView = styled(Document)`
  & > .react-pdf__Page {
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
