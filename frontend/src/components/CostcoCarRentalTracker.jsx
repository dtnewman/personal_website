import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import {
  Typography, TextField, Button, Snackbar,
} from '@material-ui/core';
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  datePicker: {
    width: 100,
  },
}));

export default function CostcoCarRentalTracker() {
  const classes = useStyles();

  const [alertOpen, setAlertOpen] = React.useState(false);

  const [pickupAirport, setPickupAirport] = useState('');
  const [pickupDate, handlePickupDateChange] = useState(null);
  const [pickupTime, handlePickupTimeChange] = useState(null);

  const [dropoffAirport, setDropoffAirport] = useState('');
  const [dropoffDate, handleDropoffDateChange] = useState(null);
  const [dropoffTime, handleDropoffTimeChange] = useState(null);

  // eslint-disable-next-line react/jsx-props-no-spreading
  const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

  const pickupAirportHandler = (event) => {
    const val = event.target.value;
    setPickupAirport(val.slice(0, 3));
  };

  const dropoffAirportHandler = (event) => {
    const val = event.target.value;
    setDropoffAirport(val.slice(0, 3));
  };

  const handleSubmit = () => {
    if (!pickupAirport || !pickupDate || !pickupTime
        || !dropoffAirport || !dropoffDate || !dropoffTime) {
      setAlertOpen(true);
    } else {
      alert(123);
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <div>
      <form className={classes.root}>
        <div>
          <Typography variant="h5">Pick-Up</Typography>
          <TextField
            required
            id="pick-up-airport"
            label="Airport (e.g. FLL)"
            value={pickupAirport}
            onChange={pickupAirportHandler}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              required
              className={classes.datePicker}
              disablePast
              label="Date"
              format="MM/dd/yyyy"
              value={pickupDate}
              onChange={handlePickupDateChange}
              animateYearScrolling
            />
            <TimePicker
              required
              showTodayButton
              todayLabel="now"
              label="Time"
              value={pickupTime}
              minutesStep={30}
              onChange={handlePickupTimeChange}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <Typography variant="h5">Drop-Off</Typography>
          <TextField
            required
            id="drop-off-airport"
            label="Airport (e.g. FLL)"
            value={dropoffAirport}
            onChange={dropoffAirportHandler}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              required
              className={classes.datePicker}
              disablePast
              label="Date"
              format="MM/dd/yyyy"
              value={dropoffDate}
              onChange={handleDropoffDateChange}
              animateYearScrolling
            />
            <TimePicker
              required
              showTodayButton
              todayLabel="now"
              label="Time"
              value={dropoffTime}
              minutesStep={30}
              onChange={handleDropoffTimeChange}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Search
          </Button>
        </div>
        <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose}>
          <Alert severity="error" onClose={handleAlertClose}>
            Please fill out all fields
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
}
