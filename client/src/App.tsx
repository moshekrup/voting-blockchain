import React from 'react'
import './App.css';
import { Toolbar } from './Components/Toolbar';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import { Voter } from './voter';
import { useCandidates } from './candidates-loader';
import { PieChart } from './pie-chart';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  toolbar: {
    marginBottom: theme.spacing(2),
  },
  voter: {
    marginBottom: theme.spacing(2),
  },
  pieChart: {
    width: theme.spacing(60)
  }
}));

export default (props: {}) => {
  const classes = useStyles();
  const [candidatesStatus, vote] = useCandidates();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Toolbar className={classes.toolbar} />

        {candidatesStatus.switch({
          success: candidates => 
            <>
              <Voter 
                candidates={candidates} 
                className={classes.voter}
                onSelected={vote} />
              <PieChart candidates={candidates} className={classes.pieChart} />
            </>,
          error: error => <div />,
          pending: () => <div />,
          resting: () => <div />,
        })}
      </div>
    </ThemeProvider>
  );
};
