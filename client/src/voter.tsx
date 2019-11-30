import React from 'react'
import { makeStyles, createStyles, WithStyles, withStyles, Theme , ButtonBase} from '@material-ui/core';
import { Candidate } from './Model/candidate';
import { joinClasses } from './util/join-classes';

const useCandidateStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    height: 200,
  },
  name: {}
});

const CandidateView = (
  { candidate, onSelected = () => null }: {
    candidate: Candidate,
    onSelected?: () => void,
  }
) => {
  const classes = useCandidateStyles();
  
  return (
    <ButtonBase className={classes.root} onClick={onSelected}>
      <img 
        className={classes.image} 
        src={candidate.imageUrl} 
        alt={candidate.name} />
      <div className={classes.name}>{candidate.name}</div>
    </ButtonBase>
  )
};

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    '& > :not(:last-child)': {
      marginRight: theme.spacing(),
    }
  }
});

export type Props = 
  {
    candidates: Candidate[],
    onSelected: (candidate: Candidate) => void
  } & 
  WithStyles<typeof styles> & 
  React.HTMLProps<HTMLDivElement>;

export const VoterUnstyled = (
  {candidates, classes, className, onSelected, ...other}: Props
) => {
  return (
    <div className={joinClasses(classes.root, className)} {...other}>
      {
        candidates.map(candidate => 
          <CandidateView 
            key={candidate.name} 
            candidate={candidate}
            onSelected={() => onSelected(candidate)} />
        )
      }
    </div>
  );
};

export const Voter = withStyles(styles)(VoterUnstyled);