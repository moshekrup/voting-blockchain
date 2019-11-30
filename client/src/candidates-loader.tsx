import { useState, useEffect } from 'react'
import { socket } from './webSocket';
import { Status } from './util/status';
import { Candidate } from './Model/candidate';

export function useCandidates(): [Status<Candidate[]>, (c: Candidate) => void] {
  const [candidatesStatus, setCandidatesStatus] = useState(Status.resting<Candidate[]>());

  function reload() {
    Status.followPromise(getCandidates(), setCandidatesStatus)
  }

  useEffect(() => {
    reload();

    socket.addEventListener('message', async(event: any) => {
      console.log('received new event');
      reload();
    });

    socket.addEventListener('error', (err) => {
      console.error(err);
    });
    
    socket.addEventListener('close', () => {
      console.log('closed connection');
    });
  }, []);

  return [candidatesStatus, vote];
}

async function vote(candidate: Candidate) {
  console.info(`voting for ${candidate.name}`);
  const response = await fetch('http://localhost:9000/vote', {
    method: 'POST',
    body: JSON.stringify({name: candidate.name}),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    console.info('voted successfully');
  }
  else {
    console.error(response);
    throw new Error('Failed to vote');
  }
}

async function getCandidates() {
  console.info('reloading votes');
  const response = await fetch('http://localhost:9000/candidates', {
    method: 'GET',
  });

  if (response.ok) {
    const candidates: Candidate[] = await response.json();
    console.log(candidates);
    return candidates;
  }
  else {
    console.error(response);
    throw new Error('Failed to load votes');
  }
}