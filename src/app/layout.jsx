import React from 'react';
import '../styles/tailwind.css';
import GlobalStyled from '../styles/GlobalStyled';
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import { DndProvider } from 'react-dnd'



export const metadata = {
  title: 'React App',
  description: 'Web site created with Next.js.',
}
 

export default function RootLayout({
  children,
}) {
  return (
    <html lang="ko">
      <body>
  
        <div id="root">
        <GlobalStyled />
          {children}</div>
   
      </body>
   
    </html>
  )
}