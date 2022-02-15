import './App.css';
import React, { useState } from 'react';
import DialogBox from './DialogBox';
import SegmentForm from './SegmentForm';
import Button from 'react-bootstrap/Button';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="App">
      <Button onClick={() => setShowPopup(!showPopup)} variant="outline-info">Save Segment</Button>
      <DialogBox 
        showPopup={showPopup} 
        handleClose={() => setShowPopup(false)}
        title="Saving Segment">
          <SegmentForm/>
      </DialogBox>
    </div>
  );
}

export default App;