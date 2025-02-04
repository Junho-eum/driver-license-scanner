
import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import './OptOutButton.css';

export default function OptOutButton({ handleWithdrawSurvey }) {
    const [isSurveyOpen, setSurveyOpen] = useState(false);
  
    const handleOpenSurvey = () => {
      setSurveyOpen(true);
    };
  
    const handleCloseSurvey = () => {
      setSurveyOpen(false);
    };
  
    return (
      <>
        <button
          className="opt-out"
          onClick={handleOpenSurvey}
        >
          Opt-Out
        </button>
        
        <Dialog
          open={isSurveyOpen}
          onClose={handleCloseSurvey}
          aria-labelledby="withdrawDialogTitle"
          aria-describedby="withdrawDialogDescription"
        >
          <DialogTitle id="withdrawDialogTitle">Are you sure you want to withdraw from the survey?</DialogTitle>
          <DialogContent>
            <DialogContentText id="withdrawDialogDescription">
              If you choose to withdraw, your responses will <strong>not be saved</strong>, and any partial progress will be lost.
              This action cannot be undone, and you may <strong>not be eligible for compensation</strong> if you haven't completed the survey.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              onClick={handleCloseSurvey}
              type="button"
              className="buttonSuccess"
            >
              No, take me back
            </button>
            <button
              onClick={() => {
                handleCloseSurvey();
                handleWithdrawSurvey();
              }}
              type="button"
              className="buttonDanger"
            >
              Yes, I want to withdraw
            </button>
          </DialogActions>
        </Dialog>
      </>
    );
  }