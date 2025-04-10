import React, { useEffect, useState } from 'react';
import SolutionForm from '../../components/SolutionForm';
import IssueDetails from '../../components/IssueDeatails';
import Solution from '../../components/Solution';

const Issue = () => {
  return (
    <>
    <IssueDetails/>
    <Solution />
    <SolutionForm/>
    </>
  )
};

export default Issue;
