import React, { useEffect, useState } from 'react';
import SolutionForm from '../../components/SolutionForm';
import IssueDetails from '../../components/IssueDeatails';
import Solution from '../../components/Solution';
import { useParams } from 'react-router-dom';

const Issue = () => {
  const { id } = useParams();
  return (
    <>
    <IssueDetails id={id}/>
    <Solution issueId={id}/>
    <SolutionForm issueId={id}/>
    </>
  )
}; 

export default Issue;
