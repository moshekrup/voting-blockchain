import React from 'react'
import './App.css';
import { Toolbar } from './Components/Toolbar';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import { Voter } from './voter';
import { useCandidates } from './candidates-loader';
// import { PieChart } from './pie-chart';
import {
  BarChart, Bar, XAxis, PieChart, Pie, Cell, YAxis
} from 'recharts';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20px'
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
              {/* <PieChart candidates={candidates} className={classes.pieChart} /> */}
              <div className={classes.container}>
                <BarChart width={400} height={200} data={candidates}>
                  <Bar isAnimationActive={false} dataKey="votes" fill="#8884d8" />
                  <YAxis dataKey="votes" />
                  <XAxis dataKey="name" />
                </BarChart>
                <PieChart width={200} height={250}>
                  <Pie isAnimationActive={false} data={candidates} dataKey="votes" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label>
                  {      
                    candidates.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                  }
                  </Pie>
                </PieChart>
              </div>
            </>,
          error: error => <div />,
          pending: () => <div />,
          resting: () => <div />,
        })}
      </div>
    </ThemeProvider>
  );
};
