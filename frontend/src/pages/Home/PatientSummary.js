

import React, { useState, useEffect,PureComponent } from 'react';
import { LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, } from 'recharts';
import { Navbar, Nav, Card, Row, Col, ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import filter from '../../assets/filter.png'



import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import axios from 'axios';



const PatientSummary = () => {

  const [chartData, setChartData] = useState([]); // Assume you have your data here

  const [presumptiveTotal, setPresumptiveTotal] = useState(0);
  const [latentTotal, setLatentTotal] = useState(0);
  const [ptbTotal, setPtbTotal] = useState(0);
  const [eptbTotal, setEptbTotal] = useState(0);
  const [closedTotal, setClosedTotal] = useState(0);
  
  const [presumptiveJan, setPresumptiveJan] = useState(0);
  const [presumptiveFeb, setPresumptiveFeb] = useState(0);
  const [presumptiveMar, setPresumptiveMar] = useState(0);
  const [presumptiveApr, setPresumptiveApr] = useState(0);
  const [presumptiveMay, setPresumptiveMay] = useState(0);
  const [presumptiveJun, setPresumptiveJun] = useState(0);
  const [presumptiveJul, setPresumptiveJul] = useState(0);
  const [presumptiveAug, setPresumptiveAug] = useState(0);
  const [presumptiveSep, setPresumptiveSep] = useState(0);
  const [presumptiveOct, setPresumptiveOct] = useState(0);
  const [presumptiveNov, setPresumptiveNov] = useState(0);
  const [presumptiveDec, setPresumptiveDec] = useState(0);

  const [latentJan, setLatentJan] = useState(0);
  const [latentFeb, setLatentFeb] = useState(0);
  const [latentMar, setLatentMar] = useState(0);
  const [latentApr, setLatentApr] = useState(0);
  const [latentMay, setLatentMay] = useState(0);
  const [latentJun, setLatentJun] = useState(0);
  const [latentJul, setLatentJul] = useState(0);
  const [latentAug, setLatentAug] = useState(0);
  const [latentSep, setLatentSep] = useState(0);
  const [latentOct, setLatentOct] = useState(0);
  const [latentNov, setLatentNov] = useState(0);
  const [latentDec, setLatentDec] = useState(0);

  const [ptbJan, setPtbJan] = useState(0);
  const [ptbFeb, setPtbFeb] = useState(0);
  const [ptbMar, setPtbMar] = useState(0);
  const [ptbApr, setPtbApr] = useState(0);
  const [ptbMay, setPtbMay] = useState(0);
  const [ptbJun, setPtbJun] = useState(0);
  const [ptbJul, setPtbJul] = useState(0);
  const [ptbAug, setPtbAug] = useState(0);
  const [ptbSep, setPtbSep] = useState(0);
  const [ptbOct, setPtbOct] = useState(0);
  const [ptbNov, setPtbNov] = useState(0);
  const [ptbDec, setPtbDec] = useState(0);

  const [eptbJan, setEptbJan] = useState(0);
  const [eptbFeb, setEptbFeb] = useState(0);
  const [eptbMar, setEptbMar] = useState(0);
  const [eptbApr, setEptbApr] = useState(0);
  const [eptbMay, setEptbMay] = useState(0);
  const [eptbJun, setEptbJun] = useState(0);
  const [eptbJul, setEptbJul] = useState(0);
  const [eptbAug, setEptbAug] = useState(0);
  const [eptbSep, setEptbSep] = useState(0);
  const [eptbOct, setEptbOct] = useState(0);
  const [eptbNov, setEptbNov] = useState(0);
  const [eptbDec, setEptbDec] = useState(0);

  const [closedJan, setClosedJan] = useState(0);
  const [closedFeb, setClosedFeb] = useState(0);
  const [closedMar, setClosedMar] = useState(0);
  const [closedApr, setClosedApr] = useState(0);
  const [closedMay, setClosedMay] = useState(0);
  const [closedJun, setClosedJun] = useState(0);
  const [closedJul, setClosedJul] = useState(0);
  const [closedAug, setClosedAug] = useState(0);
  const [closedSep, setClosedSep] = useState(0);
  const [closedOct, setClosedOct] = useState(0);
  const [closedNov, setClosedNov] = useState(0);
  const [closedDec, setClosedDec] = useState(0);

 

  const [years, setYears] = useState([]);
  const [currentYear, setCurrentYear] = useState(0);

  function resetAllVariables() {
    setPresumptiveTotal(0);
    setLatentTotal(0);
    setPtbTotal(0);
    setEptbTotal(0);
    setClosedTotal(0);
  
    setPresumptiveJan(0);
    setPresumptiveFeb(0);
    setPresumptiveMar(0);
    setPresumptiveApr(0);
    setPresumptiveMay(0);
    setPresumptiveJun(0);
    setPresumptiveJul(0);
    setPresumptiveAug(0);
    setPresumptiveSep(0);
    setPresumptiveOct(0);
    setPresumptiveNov(0);
    setPresumptiveDec(0);
  
    setLatentJan(0);
    setLatentFeb(0);
    setLatentMar(0);
    setLatentApr(0);
    setLatentMay(0);
    setLatentJun(0);
    setLatentJul(0);
    setLatentAug(0);
    setLatentSep(0);
    setLatentOct(0);
    setLatentNov(0);
    setLatentDec(0);
  
    setPtbJan(0);
    setPtbFeb(0);
    setPtbMar(0);
    setPtbApr(0);
    setPtbMay(0);
    setPtbJun(0);
    setPtbJul(0);
    setPtbAug(0);
    setPtbSep(0);
    setPtbOct(0);
    setPtbNov(0);
    setPtbDec(0);
  
    setEptbJan(0);
    setEptbFeb(0);
    setEptbMar(0);
    setEptbApr(0);
    setEptbMay(0);
    setEptbJun(0);
    setEptbJul(0);
    setEptbAug(0);
    setEptbSep(0);
    setEptbOct(0);
    setEptbNov(0);
    setEptbDec(0);
  
    setClosedJan(0);
    setClosedFeb(0);
    setClosedMar(0);
    setClosedApr(0);
    setClosedMay(0);
    setClosedJun(0);
    setClosedJul(0);
    setClosedAug(0);
    setClosedSep(0);
    setClosedOct(0);
    setClosedNov(0);
    setClosedDec(0);
  }
  

  
  useEffect(() => {
    axios.get("http://localhost:4000/api/chartyear")
      .then(response => {
        setYears(response.data);
        setCurrentYear(response.data[0].DiagnosisYear)
      })
      .catch(error => {
        console.error('Error fetching years:', error);
      });
  }, []);
  
  console.log(years)

  useEffect(() => {
    
    axios.get(`http://localhost:4000/api/chartData/${currentYear}`)
      .then((response) => {
        setChartData(response.data);
    
        response.data.forEach((data) => {
          if (data.DiagnosisMonth === 1 ) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setClosedJan(data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedFeb(data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedMar(data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedApr(data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedMay(data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedJun(data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedJul(data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedAug(data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedSep(data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedOct(data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedNov(data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedDec(data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedTotal(data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
          } else if (data.DiagnosisMonth === 2 ) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setClosedFeb((prev) => prev + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedMar((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedApr((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedMay((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedJun((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedJul((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedAug((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedSep((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedOct((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedNov((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedDec((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedTotal((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
          } else if (data.DiagnosisMonth === 3 ) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setClosedMar((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedApr((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedMay((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedJun((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedJul((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedAug((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedSep((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedOct((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedNov((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedDec((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedTotal((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
          } else if (data.DiagnosisMonth === 4 ) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setClosedApr((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedMay((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedJun((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedJul((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedAug((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedSep((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedOct((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedNov((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedDec((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedTotal((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
          } else if (data.DiagnosisMonth === 5 ) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setClosedMay((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedJun((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedJul((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedAug((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedSep((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedOct((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedNov((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedDec((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedTotal((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
          } else if (data.DiagnosisMonth === 6 ) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setClosedJun((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedJul((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedAug((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedSep((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedOct((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedNov((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedDec((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedTotal((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
          } else if (data.DiagnosisMonth === 7 ) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setClosedJul((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedAug((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedSep((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedOct((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedNov((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedDec((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedTotal((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
          } else if (data.DiagnosisMonth === 8 ) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setClosedAug((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedSep((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedOct((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedNov((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedDec((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedTotal((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
          } else if (data.DiagnosisMonth === 9 ) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setClosedSep((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedOct((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedNov((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedDec((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedTotal((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
          } else if (data.DiagnosisMonth === 10 ) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setClosedOct((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedNov((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedDec((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedTotal((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
          } else if (data.DiagnosisMonth === 11 ) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setClosedNov((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedDec((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedTotal((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
          } else if (data.DiagnosisMonth === 12 ) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setClosedDec((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
            setClosedTotal((prev) => prev  + data.ClosedCasesWithSRNo1 + data.ClosedCasesWithSRNo3 + data.ClosedCasesWithSRNo4 + data.ClosedCasesWithSRNo5);
          } 



          if (data.DiagnosisMonth === 1 && data.DiagnosisType.includes('Presumptive')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPresumptiveJan(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveFeb(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveMar(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveApr(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveMay(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveJun(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveJul(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveAug(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveSep(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveOct(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveNov(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveDec(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveTotal(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 2 && data.DiagnosisType.includes('Presumptive')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPresumptiveFeb((prev) => prev + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveMar((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveApr((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveMay((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveJun((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveJul((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveAug((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 3 && data.DiagnosisType.includes('Presumptive')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPresumptiveMar((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveApr((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveMay((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveJun((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveJul((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveAug((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 4 && data.DiagnosisType.includes('Presumptive')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPresumptiveApr((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveMay((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveJun((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveJul((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveAug((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 5 && data.DiagnosisType.includes('Presumptive')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPresumptiveMay((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveJun((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveJul((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveAug((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 6 && data.DiagnosisType.includes('Presumptive')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPresumptiveJun((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveJul((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveAug((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 7 && data.DiagnosisType.includes('Presumptive')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPresumptiveJul((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveAug((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 8 && data.DiagnosisType.includes('Presumptive')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPresumptiveAug((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 9 && data.DiagnosisType.includes('Presumptive')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPresumptiveSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 10 && data.DiagnosisType.includes('Presumptive')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPresumptiveOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 11 && data.DiagnosisType.includes('Presumptive')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPresumptiveNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 12 && data.DiagnosisType.includes('Presumptive')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPresumptiveDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setPresumptiveTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } 
          
          
          else  if (data.DiagnosisMonth === 1 && data.DiagnosisType.includes('Latent')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setLatentJan(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentFeb(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentMar(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentApr(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentMay(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentJun(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentJul(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentAug(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentSep(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentOct(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentNov(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentDec(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentTotal(data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 2 && data.DiagnosisType.includes('Latent')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setLatentFeb((prev) => prev + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentMar((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentApr((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentMay((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentJun((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentJul((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentAug((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 3 && data.DiagnosisType.includes('Latent')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setLatentMar((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentApr((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentMay((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentJun((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentJul((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentAug((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 4 && data.DiagnosisType.includes('Latent')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setLatentApr((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentMay((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentJun((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentJul((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentAug((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 5 && data.DiagnosisType.includes('Latent')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setLatentMay((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentJun((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentJul((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentAug((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 6 && data.DiagnosisType.includes('Latent')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setLatentJun((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentJul((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentAug((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 7 && data.DiagnosisType.includes('Latent')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setLatentJul((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentAug((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 8 && data.DiagnosisType.includes('Latent')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setLatentAug((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 9 && data.DiagnosisType.includes('Latent')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setLatentSep((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 10 && data.DiagnosisType.includes('Latent')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setLatentOct((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 11 && data.DiagnosisType.includes('Latent')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setLatentNov((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } else if (data.DiagnosisMonth === 12 && data.DiagnosisType.includes('Latent')) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setLatentDec((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
            setLatentTotal((prev) => prev  + data.OpenCasesWithEPTB+data.OpenCasesWithoutEPTB);
          } 

          else  if (data.DiagnosisMonth === 1 && (data.DiagnosisType.includes('Bacteriologically') || data.DiagnosisType.includes('Clinically')) ) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPtbJan(data.OpenCasesWithoutEPTB);
            setPtbFeb(data.OpenCasesWithoutEPTB);
            setPtbMar(data.OpenCasesWithoutEPTB);
            setPtbApr(data.OpenCasesWithoutEPTB);
            setPtbMay(data.OpenCasesWithoutEPTB);
            setPtbJun(data.OpenCasesWithoutEPTB);
            setPtbJul(data.OpenCasesWithoutEPTB);
            setPtbAug(data.OpenCasesWithoutEPTB);
            setPtbSep(data.OpenCasesWithoutEPTB);
            setPtbOct(data.OpenCasesWithoutEPTB);
            setPtbNov(data.OpenCasesWithoutEPTB);
            setPtbDec(data.OpenCasesWithoutEPTB);
            setPtbTotal(data.OpenCasesWithoutEPTB);

            setEptbJan( data.OpenCasesWithEPTB);
            setEptbFeb( data.OpenCasesWithEPTB);
            setEptbMar( data.OpenCasesWithEPTB);
            setEptbApr( data.OpenCasesWithEPTB);
            setEptbMay( data.OpenCasesWithEPTB);
            setEptbJun( data.OpenCasesWithEPTB);
            setEptbJul( data.OpenCasesWithEPTB);
            setEptbAug( data.OpenCasesWithEPTB);
            setEptbSep( data.OpenCasesWithEPTB);
            setEptbOct( data.OpenCasesWithEPTB);
            setEptbNov( data.OpenCasesWithEPTB);
            setEptbDec( data.OpenCasesWithEPTB);
            setEptbTotal( data.OpenCasesWithEPTB);
          } else if (data.DiagnosisMonth === 2 && (data.DiagnosisType.includes('Bacteriologically') || data.DiagnosisType.includes('Clinically'))) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPtbFeb((prev) => prev + data.OpenCasesWithoutEPTB);
            setPtbMar((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbApr((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbMay((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbJun((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbJul((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbAug((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbSep((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbOct((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbNov((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbDec((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbTotal((prev) => prev  + data.OpenCasesWithoutEPTB);

            setEptbFeb((prev) => prev +  data.OpenCasesWithEPTB);
            setEptbMar((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbApr((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbMay((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbJun((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbJul((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbAug((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbSep((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbOct((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbNov((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbDec((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbTotal((prev) => prev  +  data.OpenCasesWithEPTB);
          } else if (data.DiagnosisMonth === 3 && (data.DiagnosisType.includes('Bacteriologically') || data.DiagnosisType.includes('Clinically'))) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPtbMar((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbApr((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbMay((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbJun((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbJul((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbAug((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbSep((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbOct((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbNov((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbDec((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbTotal((prev) => prev  + data.OpenCasesWithoutEPTB);

            setEptbMar((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbApr((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbMay((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbJun((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbJul((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbAug((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbSep((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbOct((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbNov((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbDec((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbTotal((prev) => prev  +  data.OpenCasesWithEPTB);
          } else if (data.DiagnosisMonth === 4 && (data.DiagnosisType.includes('Bacteriologically') || data.DiagnosisType.includes('Clinically'))) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPtbApr((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbMay((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbJun((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbJul((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbAug((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbSep((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbOct((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbNov((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbDec((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbTotal((prev) => prev  + data.OpenCasesWithoutEPTB);

            setEptbApr((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbMay((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbJun((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbJul((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbAug((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbSep((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbOct((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbNov((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbDec((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbTotal((prev) => prev  +  data.OpenCasesWithEPTB);
          } else if (data.DiagnosisMonth === 5 && (data.DiagnosisType.includes('Bacteriologically') || data.DiagnosisType.includes('Clinically'))) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPtbMay((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbJun((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbJul((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbAug((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbSep((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbOct((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbNov((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbDec((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbTotal((prev) => prev  + data.OpenCasesWithoutEPTB);

            setEptbMay((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbJun((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbJul((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbAug((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbSep((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbOct((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbNov((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbDec((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbTotal((prev) => prev  +  data.OpenCasesWithEPTB);
          } else if (data.DiagnosisMonth === 6 && (data.DiagnosisType.includes('Bacteriologically') || data.DiagnosisType.includes('Clinically'))) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPtbJun((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbJul((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbAug((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbSep((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbOct((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbNov((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbDec((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbTotal((prev) => prev  + data.OpenCasesWithoutEPTB);

            setEptbJun((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbJul((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbAug((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbSep((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbOct((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbNov((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbDec((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbTotal((prev) => prev  +  data.OpenCasesWithEPTB);
          } else if (data.DiagnosisMonth === 7 && (data.DiagnosisType.includes('Bacteriologically') || data.DiagnosisType.includes('Clinically'))) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPtbJul((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbAug((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbSep((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbOct((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbNov((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbDec((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbTotal((prev) => prev  + data.OpenCasesWithoutEPTB);

            setEptbJul((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbAug((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbSep((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbOct((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbNov((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbDec((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbTotal((prev) => prev  +  data.OpenCasesWithEPTB);
          } else if (data.DiagnosisMonth === 8 && (data.DiagnosisType.includes('Bacteriologically') || data.DiagnosisType.includes('Clinically'))) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPtbAug((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbSep((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbOct((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbNov((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbDec((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbTotal((prev) => prev  + data.OpenCasesWithoutEPTB);

            setEptbAug((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbSep((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbOct((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbNov((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbDec((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbTotal((prev) => prev  +  data.OpenCasesWithEPTB);
          } else if (data.DiagnosisMonth === 9 && (data.DiagnosisType.includes('Bacteriologically') || data.DiagnosisType.includes('Clinically'))) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPtbSep((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbOct((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbNov((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbDec((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbTotal((prev) => prev  + data.OpenCasesWithoutEPTB);

            setEptbSep((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbOct((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbNov((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbDec((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbTotal((prev) => prev  +  data.OpenCasesWithEPTB);
          } else if (data.DiagnosisMonth === 10 && (data.DiagnosisType.includes('Bacteriologically') || data.DiagnosisType.includes('Clinically'))) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPtbOct((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbNov((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbDec((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbTotal((prev) => prev  + data.OpenCasesWithoutEPTB);

            setEptbOct((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbNov((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbDec((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbTotal((prev) => prev  +  data.OpenCasesWithEPTB);
          } else if (data.DiagnosisMonth === 11 && (data.DiagnosisType.includes('Bacteriologically') || data.DiagnosisType.includes('Clinically'))) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPtbNov((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbDec((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbTotal((prev) => prev  + data.OpenCasesWithoutEPTB);

            setEptbNov((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbDec((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbTotal((prev) => prev  +  data.OpenCasesWithEPTB);
          } else if (data.DiagnosisMonth === 12 && (data.DiagnosisType.includes('Bacteriologically') || data.DiagnosisType.includes('Clinically'))) {
            console.log(data.DiagnosisType + data.DiagnosisMonth)
            setPtbDec((prev) => prev  + data.OpenCasesWithoutEPTB);
            setPtbTotal((prev) => prev  + data.OpenCasesWithoutEPTB);

            setEptbDec((prev) => prev  +  data.OpenCasesWithEPTB);
            setEptbTotal((prev) => prev  +  data.OpenCasesWithEPTB);
          } 
          
          
          
          
     
        });

       

        
        
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });
  }, [currentYear]);
  

 
  

    const data01 = [
        { name: 'Presumptive', value: presumptiveTotal },
        { name: 'Latent', value: latentTotal },
        { name: 'Pulmonary', value: ptbTotal },
        { name: 'ExtraPulmonary', value: eptbTotal },
        { name: 'Closed', value: closedTotal},
      ];

      const data = [
        {
          name: 'JAN',
          presumptive: presumptiveJan,
          latent: latentJan,
          pulmonary: ptbJan,
          extrapulmonary: eptbJan,
          closed: closedJan,
        },
        {
          name: 'FEB',
          presumptive: presumptiveFeb,
          latent: latentFeb,
          pulmonary: ptbFeb,
          extrapulmonary: eptbFeb,
          closed: closedFeb,
        },
        {
          name: 'MAR',
          presumptive: presumptiveMar,
          latent: latentMar,
          pulmonary: ptbMar,
          extrapulmonary: eptbMar,
          closed: closedMar,
        },
        {
          name: 'APR',
          presumptive: presumptiveApr,
          latent: latentApr,
          pulmonary: ptbApr,
          extrapulmonary: eptbApr,
          closed: closedApr,
        },
        {
          name: 'MAY',
          presumptive: presumptiveMay,
          latent: latentMay,
          pulmonary: ptbMay,
          extrapulmonary: eptbMay,
          closed: closedMay,
        },
        {
          name: 'JUN',
          presumptive: presumptiveJun,
          latent: latentJun,
          pulmonary: ptbJun,
          extrapulmonary: eptbJun,
          closed: closedJun,
        },
        {
          name: 'JUL',
          presumptive: presumptiveJul,
          latent: latentJul,
          pulmonary: ptbJul,
          extrapulmonary: eptbJul,
          closed: closedJul,
        },
        {
          name: 'AUG',
          presumptive: presumptiveAug,
          latent: latentAug,
          pulmonary: ptbAug,
          extrapulmonary: eptbAug,
          closed: closedAug,
        },
        {
          name: 'SEP',
          presumptive: presumptiveSep,
          latent: latentSep,
          pulmonary: ptbSep,
          extrapulmonary: eptbSep,
          closed: closedSep,
        },
        {
          name: 'OCT',
          presumptive: presumptiveOct,
          latent: latentOct,
          pulmonary: ptbOct,
          extrapulmonary: eptbOct,
          closed: closedOct,
        },
        {
          name: 'NOV',
          presumptive: presumptiveNov,
          latent: latentNov,
          pulmonary: ptbNov,
          extrapulmonary: eptbNov,
          closed: closedNov,
        },
        {
          name: 'DEC',
          presumptive: presumptiveDec,
          latent: latentDec,
          pulmonary: ptbDec,
          extrapulmonary: eptbDec,
          closed: closedDec,
        },
      ];
      

      const [linesVisibility, setLinesVisibility] = useState({
        presumptive: true,
        latent: true,
        pulmonary: true,
        extrapulmonary: true,
        closed: true,
      });
    
      const handleLegendClick = (dataKey) => {
        setLinesVisibility((prevState) => ({
          ...prevState,
          [dataKey]: !prevState[dataKey],
        }));
      };
      
    const COLORS1 = ['#03045E', '#204C08', '#7C6C03', '#B4460E', '#7E0B0B'];

    const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
     
  return (
    <div>
    <NavBar/>
    <div className='px-3'>

    
    
     {/* Showing 4 summary cards which will have a clickable function that affects the overall patient table
        once backend has been implemented*/}
  <div className='container-fluid justify-content-center'>
 
  <div className='row g-3 my-2 justify-content-center'>

  <Row className="mb-3 mt-4 justify-content-center">
    
            
            <Col md="2" className="me-4">
                  
                  <div
            className="mt-3 input-group"
            style={{
              maxWidth: '290px',
              display: 'flex',
              backgroundColor: '#0077B6',
              borderRadius: '6px', // Adding borderRadius for rounding the outer div
              overflow: 'hidden', // Ensuring content doesn't overflow rounded corners
            }}
          >
            <div
              style={{
                backgroundColor: '#0077B6',
                width: '30px',
                height: '100%',
              }}
            >
              <img className="ms-1 mt-2" src={filter} style={{height:"20px"}}alt="" />
            </div>
            <select
              className="form-select"
              onChange={(e) => {
                resetAllVariables(); // Call the resetAllVariables function before updating currentYear
                setCurrentYear(e.target.value);
              }}
            >

              {years.map((data, index) => (
                <>
                    <option value={data.DiagnosisYear}>{data.DiagnosisYear}</option>

                    </>
                  ))}
              
          
              {/* Add more cities as needed */}
            </select>
          </div>

            </Col>
            <Col md="8">
            </Col>

    </Row>
    <Row className="mb-3 mt-4 justify-content-center">
    <div className='col-md-2 p-1'>
      <div className={`p-3 shadow-sm d-flex justify-content-around align-items-center rounded summary-card`} style={{ backgroundColor: COLORS1[0], minHeight: "250px" }}>
        <div>
          <h3 className='text-light fs-1'>{data01[0].value}</h3>
          <p className='text-light fs-5'>{data01[0].name}</p>
        </div>
        <i className='bi bi-cart-plus p-3 fs-1'></i>
      </div>
    </div>
    <div className='col-md-2 p-1'>
    <div className={`p-3 shadow-sm d-flex justify-content-around align-items-center rounded summary-card`} style={{ backgroundColor: COLORS1[1], minHeight: "250px" }}>
        <div>
          <h3 className='text-light fs-1'>{data01[1].value}</h3>
          <p className='text-light fs-5'>{data01[1].name}</p>
        </div>
        <i className='bi bi-cart-plus p-3 fs-1'></i>
      </div>
    </div>
    <div className='col-md-2 p-1'>
      <Link to={"/home1"}>
      <div className={`p-3 shadow-sm d-flex justify-content-around align-items-center rounded summary-card`} style={{ backgroundColor: COLORS1[2], minHeight: "250px" }}>
        <div>
          <h3 className='text-light fs-1'>{data01[2].value}</h3>
          <p className='text-light fs-5'>{data01[2].name}</p>
        </div>
        <i className='bi bi-cart-plus p-3 fs-1'></i>
      </div>
      </Link>
    </div>
    <div className='col-md-2 p-1'>
      <Link to={"/home2"}>
      <div className={`p-3 shadow-sm d-flex justify-content-around align-items-center rounded summary-card`} style={{ backgroundColor: COLORS1[3], minHeight: "250px" }}>
        <div>
          <h3 className='text-light fs-1'>{data01[3].value}</h3>
          <p className='text-light fs-5'>{data01[3].name}</p>
        </div>
        <i className='bi bi-cart-plus p-3 fs-1'></i>
      </div>
      </Link>
    </div>
    <div className='col-md-2 p-1'>
      <Link to={"/home3"}>
      <div className={`p-3 shadow-sm d-flex justify-content-around align-items-center rounded summary-card`} style={{ backgroundColor: COLORS1[4], minHeight: "250px" }}>
        <div>
          <h3 className='text-light fs-1'>{data01[4].value}</h3>
          <p className='text-light fs-5'>{data01[4].name}</p>
        </div>
        <i className='bi bi-cart-plus p-3 fs-1'></i>
      </div>
      </Link>
    </div>
    </Row>
    <Row className="mb-3 mt-4 justify-content-center">

                    <PieChart width={450} height={400}  className="justify-content-center me-1" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '2px', borderStyle: 'solid', borderRadius: '20px' }}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={data01}
                        cx="50%"
                        cy="50%"
                        outerRadius={160}
                        fill="#8884d8"
                        labelLine={false}
                        label={renderCustomizedLabel}
                    >
                        {data01.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend formatter={(value, entry, index) => <span style={{ color: COLORS1[index % COLORS1.length] }}>{value}</span>} />
                    </PieChart>
                
           
            <div className="justify-content-center" style={{ color:'#0077B6', borderColor: '#0077B6', maxWidth: '700px', borderWidth: '2px', borderStyle: 'solid', borderRadius: '20px' }}>
            <LineChart
          width={700}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(linesVisibility).map((key, index) => (
              linesVisibility[key] && (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={COLORS1[index]}
                />
              )
            ))}
        </LineChart>
                
            </div>
            </Row>
  </div>
 
</div>

       


    </div>
    </div>
  );
};

export default PatientSummary;
