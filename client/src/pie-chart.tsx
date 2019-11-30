import React from 'react';
import { default as MinimalPieChart, ChartProps } from 'react-minimal-pie-chart';
import { Candidate } from './Model/candidate';
import Color from 'color';
import { Without } from './util/without';

export const PieChart = (
  {
    candidates, 
    ...other
  }: {
    candidates: Candidate[]
  } & Without<ChartProps, 'data'>) => {
  return (
    <MinimalPieChart 
      data={
        candidates.map((candidate, index) => (
          {
            title: candidate.name,
            value: candidate.votes,
            color: indexToColor(index, candidates.length)
          }  
        ))
      }
      {...other} />
  );
};

// https://stackoverflow.com/a/6823348/1246924
function indexToColor(index: number, count: number) {
  const base = Color('#F00').hsl();
  const hueDiff = 360 * index / count;
  return base.hue(hueDiff + base.hue()).string();
}