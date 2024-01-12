import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Card, Row, Col, ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import React, { useState, useEffect,PureComponent } from 'react';
import { LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, } from 'recharts';
import filter from '../../assets/filter.png'
import axios from 'axios';
import { useParams  } from 'react-router-dom';





const PatientSummaryEPTB = () => {

  const [chartData, setChartData] = useState([]); // Assume you have your data here

  const { year } = useParams()

  const [bcdResistantTotal, setBcdResistantTotal] = useState(0);
  const [bcdSensitiveTotal, setBcdSensitiveTotal] = useState(0);
  const [clinicalTotal, setClinicalTotal] = useState(0);
  const [multiTotal, setMultiTotal] = useState(0);

  const [bcdResistantJan, setBcdResistantJan] = useState(0);
  const [bcdResistantFeb, setBcdResistantFeb] = useState(0);
  const [bcdResistantMar, setBcdResistantMar] = useState(0);
  const [bcdResistantApr, setBcdResistantApr] = useState(0);
  const [bcdResistantMay, setBcdResistantMay] = useState(0);
  const [bcdResistantJun, setBcdResistantJun] = useState(0);
  const [bcdResistantJul, setBcdResistantJul] = useState(0);
  const [bcdResistantAug, setBcdResistantAug] = useState(0);
  const [bcdResistantSep, setBcdResistantSep] = useState(0);
  const [bcdResistantOct, setBcdResistantOct] = useState(0);
  const [bcdResistantNov, setBcdResistantNov] = useState(0);
  const [bcdResistantDec, setBcdResistantDec] = useState(0);

  const [bcdSensitiveJan, setBcdSensitiveJan] = useState(0);
  const [bcdSensitiveFeb, setBcdSensitiveFeb] = useState(0);
  const [bcdSensitiveMar, setBcdSensitiveMar] = useState(0);
  const [bcdSensitiveApr, setBcdSensitiveApr] = useState(0);
  const [bcdSensitiveMay, setBcdSensitiveMay] = useState(0);
  const [bcdSensitiveJun, setBcdSensitiveJun] = useState(0);
  const [bcdSensitiveJul, setBcdSensitiveJul] = useState(0);
  const [bcdSensitiveAug, setBcdSensitiveAug] = useState(0);
  const [bcdSensitiveSep, setBcdSensitiveSep] = useState(0);
  const [bcdSensitiveOct, setBcdSensitiveOct] = useState(0);
  const [bcdSensitiveNov, setBcdSensitiveNov] = useState(0);
  const [bcdSensitiveDec, setBcdSensitiveDec] = useState(0);

  const [clinicalJan, setClinicalJan] = useState(0);
  const [clinicalFeb, setClinicalFeb] = useState(0);
  const [clinicalMar, setClinicalMar] = useState(0);
  const [clinicalApr, setClinicalApr] = useState(0);
  const [clinicalMay, setClinicalMay] = useState(0);
  const [clinicalJun, setClinicalJun] = useState(0);
  const [clinicalJul, setClinicalJul] = useState(0);
  const [clinicalAug, setClinicalAug] = useState(0);
  const [clinicalSep, setClinicalSep] = useState(0);
  const [clinicalOct, setClinicalOct] = useState(0);
  const [clinicalNov, setClinicalNov] = useState(0);
  const [clinicalDec, setClinicalDec] = useState(0);

  const [multiJan, setMultiJan] = useState(0);
  const [multiFeb, setMultiFeb] = useState(0);
  const [multiMar, setMultiMar] = useState(0);
  const [multiApr, setMultiApr] = useState(0);
  const [multiMay, setMultiMay] = useState(0);
  const [multiJun, setMultiJun] = useState(0);
  const [multiJul, setMultiJul] = useState(0);
  const [multiAug, setMultiAug] = useState(0);
  const [multiSep, setMultiSep] = useState(0);
  const [multiOct, setMultiOct] = useState(0);
  const [multiNov, setMultiNov] = useState(0);
  const [multiDec, setMultiDec] = useState(0);

  const [years, setYears] = useState([]);
  const [currentYear, setCurrentYear] = useState(0);

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


  useEffect(() => {

    axios.get(`http://localhost:4000/api/chartData/${year}`)
      .then((response) => {
        setChartData(response.data);
    
        response.data.forEach((data) => {
          if (data.DiagnosisMonth === 1) {

            if(data.DiagnosisType.includes('Bacteriologically Confirmed - Drug Resistant')){
              setBcdResistantJan(data.OpenCasesWithEPTB);
              setBcdResistantFeb(data.OpenCasesWithEPTB);
              setBcdResistantMar(data.OpenCasesWithEPTB);
              setBcdResistantApr(data.OpenCasesWithEPTB);
              setBcdResistantMay(data.OpenCasesWithEPTB);
              setBcdResistantJun(data.OpenCasesWithEPTB);
              setBcdResistantJul(data.OpenCasesWithEPTB);
              setBcdResistantAug(data.OpenCasesWithEPTB);
              setBcdResistantSep(data.OpenCasesWithEPTB);
              setBcdResistantOct(data.OpenCasesWithEPTB);
              setBcdResistantNov(data.OpenCasesWithEPTB);
              setBcdResistantDec(data.OpenCasesWithEPTB);
              setBcdResistantTotal(data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Sensitive')){
              setBcdSensitiveJan(data.OpenCasesWithEPTB);
              setBcdSensitiveFeb(data.OpenCasesWithEPTB);
              setBcdSensitiveMar(data.OpenCasesWithEPTB);
              setBcdSensitiveApr(data.OpenCasesWithEPTB);
              setBcdSensitiveMay(data.OpenCasesWithEPTB);
              setBcdSensitiveJun(data.OpenCasesWithEPTB);
              setBcdSensitiveJul(data.OpenCasesWithEPTB);
              setBcdSensitiveAug(data.OpenCasesWithEPTB);
              setBcdSensitiveSep(data.OpenCasesWithEPTB);
              setBcdSensitiveOct(data.OpenCasesWithEPTB);
              setBcdSensitiveNov(data.OpenCasesWithEPTB);
              setBcdSensitiveDec(data.OpenCasesWithEPTB);
              setBcdSensitiveTotal(data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Clinically')){
              setClinicalJan(data.OpenCasesWithEPTB);
              setClinicalFeb(data.OpenCasesWithEPTB);
              setClinicalMar(data.OpenCasesWithEPTB);
              setClinicalApr(data.OpenCasesWithEPTB);
              setClinicalMay(data.OpenCasesWithEPTB);
              setClinicalJun(data.OpenCasesWithEPTB);
              setClinicalJul(data.OpenCasesWithEPTB);
              setClinicalAug(data.OpenCasesWithEPTB);
              setClinicalSep(data.OpenCasesWithEPTB);
              setClinicalOct(data.OpenCasesWithEPTB);
              setClinicalNov(data.OpenCasesWithEPTB);
              setClinicalDec(data.OpenCasesWithEPTB);
              setClinicalTotal(data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Bacteriologically Confirmed - Multi Drug Resistant')){
              setMultiJan(data.OpenCasesWithEPTB);
              setMultiFeb(data.OpenCasesWithEPTB);
              setMultiMar(data.OpenCasesWithEPTB);
              setMultiApr(data.OpenCasesWithEPTB);
              setMultiMay(data.OpenCasesWithEPTB);
              setMultiJun(data.OpenCasesWithEPTB);
              setMultiJul(data.OpenCasesWithEPTB);
              setMultiAug(data.OpenCasesWithEPTB);
              setMultiSep(data.OpenCasesWithEPTB);
              setMultiOct(data.OpenCasesWithEPTB);
              setMultiNov(data.OpenCasesWithEPTB);
              setMultiDec(data.OpenCasesWithEPTB);
              setMultiTotal(data.OpenCasesWithEPTB);
            }
          
           
          } else if (data.DiagnosisMonth === 2 ) {
           if(data.DiagnosisType.includes('Bacteriologically Confirmed - Drug Resistant')){
              setBcdResistantFeb((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantMar((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantApr((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantMay((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantJun((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantJul((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantAug((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Sensitive')){
              setBcdSensitiveFeb((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveMar((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveApr((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveMay((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveJun((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveJul((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveAug((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Clinically')){
              setClinicalFeb((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalMar((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalApr((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalMay((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalJun((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalJul((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalAug((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalSep((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalOct((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalNov((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalDec((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Bacteriologically Confirmed - Multi Drug Resistant')){
              setMultiFeb(data.OpenCasesWithEPTB);
              setMultiMar(data.OpenCasesWithEPTB);
              setMultiApr(data.OpenCasesWithEPTB);
              setMultiMay(data.OpenCasesWithEPTB);
              setMultiJun(data.OpenCasesWithEPTB);
              setMultiJul(data.OpenCasesWithEPTB);
              setMultiAug(data.OpenCasesWithEPTB);
              setMultiSep(data.OpenCasesWithEPTB);
              setMultiOct(data.OpenCasesWithEPTB);
              setMultiNov(data.OpenCasesWithEPTB);
              setMultiDec(data.OpenCasesWithEPTB);
              setMultiTotal(data.OpenCasesWithEPTB);
            }
          
          
          } else if (data.DiagnosisMonth === 3 ) {
            if(data.DiagnosisType.includes('Bacteriologically Confirmed - Drug Resistant')){
              setBcdResistantMar((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantApr((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantMay((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantJun((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantJul((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantAug((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Sensitive')){
              setBcdSensitiveMar((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveApr((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveMay((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveJun((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveJul((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveAug((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Clinically')){
              setClinicalMar((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalApr((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalMay((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalJun((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalJul((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalAug((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalSep((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalOct((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalNov((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalDec((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Bacteriologically Confirmed - Multi Drug Resistant')){
              setMultiMar(data.OpenCasesWithEPTB);
              setMultiApr(data.OpenCasesWithEPTB);
              setMultiMay(data.OpenCasesWithEPTB);
              setMultiJun(data.OpenCasesWithEPTB);
              setMultiJul(data.OpenCasesWithEPTB);
              setMultiAug(data.OpenCasesWithEPTB);
              setMultiSep(data.OpenCasesWithEPTB);
              setMultiOct(data.OpenCasesWithEPTB);
              setMultiNov(data.OpenCasesWithEPTB);
              setMultiDec(data.OpenCasesWithEPTB);
              setMultiTotal(data.OpenCasesWithEPTB);
            }
          
          } else if (data.DiagnosisMonth === 4 ) {
            if(data.DiagnosisType.includes('Bacteriologically Confirmed - Drug Resistant')){
              setBcdResistantApr((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantMay((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantJun((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantJul((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantAug((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Sensitive')){
              setBcdSensitiveApr((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveMay((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveJun((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveJul((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveAug((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Clinically')){
              setClinicalApr((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalMay((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalJun((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalJul((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalAug((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalSep((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalOct((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalNov((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalDec((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Bacteriologically Confirmed - Multi Drug Resistant')){
              setMultiApr(data.OpenCasesWithEPTB);
              setMultiMay(data.OpenCasesWithEPTB);
              setMultiJun(data.OpenCasesWithEPTB);
              setMultiJul(data.OpenCasesWithEPTB);
              setMultiAug(data.OpenCasesWithEPTB);
              setMultiSep(data.OpenCasesWithEPTB);
              setMultiOct(data.OpenCasesWithEPTB);
              setMultiNov(data.OpenCasesWithEPTB);
              setMultiDec(data.OpenCasesWithEPTB);
              setMultiTotal(data.OpenCasesWithEPTB);
            }
          
          } else if (data.DiagnosisMonth === 5 ) {
            if(data.DiagnosisType.includes('Bacteriologically Confirmed - Drug Resistant')){
              setBcdResistantMay((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantJun((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantJul((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantAug((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Sensitive')){
              setBcdSensitiveMay((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveJun((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveJul((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveAug((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Clinically')){
              setClinicalMay((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalJun((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalJul((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalAug((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalSep((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalOct((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalNov((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalDec((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Bacteriologically Confirmed - Multi Drug Resistant')){
              setMultiMay(data.OpenCasesWithEPTB);
              setMultiJun(data.OpenCasesWithEPTB);
              setMultiJul(data.OpenCasesWithEPTB);
              setMultiAug(data.OpenCasesWithEPTB);
              setMultiSep(data.OpenCasesWithEPTB);
              setMultiOct(data.OpenCasesWithEPTB);
              setMultiNov(data.OpenCasesWithEPTB);
              setMultiDec(data.OpenCasesWithEPTB);
              setMultiTotal(data.OpenCasesWithEPTB);
            }
          
          } else if (data.DiagnosisMonth === 6 ) {
            if(data.DiagnosisType.includes('Bacteriologically Confirmed - Drug Resistant')){
              setBcdResistantJun((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantJul((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantAug((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Sensitive')){
              setBcdSensitiveJun((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveJul((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveAug((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Clinically')){
              setClinicalJun((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalJul((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalAug((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalSep((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalOct((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalNov((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalDec((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Bacteriologically Confirmed - Multi Drug Resistant')){
              setMultiJun(data.OpenCasesWithEPTB);
              setMultiJul(data.OpenCasesWithEPTB);
              setMultiAug(data.OpenCasesWithEPTB);
              setMultiSep(data.OpenCasesWithEPTB);
              setMultiOct(data.OpenCasesWithEPTB);
              setMultiNov(data.OpenCasesWithEPTB);
              setMultiDec(data.OpenCasesWithEPTB);
              setMultiTotal(data.OpenCasesWithEPTB);
            }
          
          } else if (data.DiagnosisMonth === 7 ) {
            if(data.DiagnosisType.includes('Bacteriologically Confirmed - Drug Resistant')){
              setBcdResistantJul((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantAug((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Sensitive')){
              setBcdSensitiveJul((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveAug((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Clinically')){
              setClinicalJul((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalAug((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalSep((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalOct((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalNov((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalDec((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Bacteriologically Confirmed - Multi Drug Resistant')){
              setMultiJul(data.OpenCasesWithEPTB);
              setMultiAug(data.OpenCasesWithEPTB);
              setMultiSep(data.OpenCasesWithEPTB);
              setMultiOct(data.OpenCasesWithEPTB);
              setMultiNov(data.OpenCasesWithEPTB);
              setMultiDec(data.OpenCasesWithEPTB);
              setMultiTotal(data.OpenCasesWithEPTB);
            }
          
          } else if (data.DiagnosisMonth === 8 ) {
            if(data.DiagnosisType.includes('Bacteriologically Confirmed - Drug Resistant')){
              setBcdResistantAug((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Sensitive')){
              setBcdSensitiveAug((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Clinically')){
              setClinicalAug((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalSep((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalOct((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalNov((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalDec((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Bacteriologically Confirmed - Multi Drug Resistant')){
              setMultiAug(data.OpenCasesWithEPTB);
              setMultiSep(data.OpenCasesWithEPTB);
              setMultiOct(data.OpenCasesWithEPTB);
              setMultiNov(data.OpenCasesWithEPTB);
              setMultiDec(data.OpenCasesWithEPTB);
              setMultiTotal(data.OpenCasesWithEPTB);
            }
          
          } else if (data.DiagnosisMonth === 9 ) {
            if(data.DiagnosisType.includes('Bacteriologically Confirmed - Drug Resistant')){
              setBcdResistantSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Sensitive')){
              setBcdSensitiveSep((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Clinically')){
              setClinicalSep((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalOct((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalNov((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalDec((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Bacteriologically Confirmed - Multi Drug Resistant')){
              setMultiSep(data.OpenCasesWithEPTB);
              setMultiOct(data.OpenCasesWithEPTB);
              setMultiNov(data.OpenCasesWithEPTB);
              setMultiDec(data.OpenCasesWithEPTB);
              setMultiTotal(data.OpenCasesWithEPTB);
            }
          
          } else if (data.DiagnosisMonth === 10 ) {
            if(data.DiagnosisType.includes('Bacteriologically Confirmed - Drug Resistant')){
              setBcdResistantOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Sensitive')){
              setBcdSensitiveOct((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Clinically')){
              setClinicalOct((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalNov((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalDec((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Bacteriologically Confirmed - Multi Drug Resistant')){
              setMultiOct(data.OpenCasesWithEPTB);
              setMultiNov(data.OpenCasesWithEPTB);
              setMultiDec(data.OpenCasesWithEPTB);
              setMultiTotal(data.OpenCasesWithEPTB);
            }
          
          } else if (data.DiagnosisMonth === 11 ) {
            if(data.DiagnosisType.includes('Bacteriologically Confirmed - Drug Resistant')){
              setBcdResistantNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Sensitive')){
              setBcdSensitiveNov((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Clinically')){
              setClinicalNov((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalDec((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Bacteriologically Confirmed - Multi Drug Resistant')){
              setMultiNov(data.OpenCasesWithEPTB);
              setMultiDec(data.OpenCasesWithEPTB);
              setMultiTotal(data.OpenCasesWithEPTB);
            }
          
          } else if (data.DiagnosisMonth === 12 ) {
            if(data.DiagnosisType.includes('Bacteriologically Confirmed - Drug Resistant')){
              setBcdResistantDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdResistantTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Sensitive')){
              setBcdSensitiveDec((prev) => prev  + data.OpenCasesWithEPTB);
              setBcdSensitiveTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Clinically')){
              setClinicalDec((prev) => prev  + data.OpenCasesWithEPTB);
              setClinicalTotal((prev) => prev  + data.OpenCasesWithEPTB);
            } else if(data.DiagnosisType.includes('Bacteriologically Confirmed - Multi Drug Resistant')){
              setMultiDec(data.OpenCasesWithEPTB);
              setMultiTotal(data.OpenCasesWithEPTB);
            }
          
          } 


     
        });

       

        
        
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });
  }, []);

    function resetAllVariables() {
      setBcdResistantTotal(0);
      setBcdSensitiveTotal(0);
      setClinicalTotal(0);
      setMultiTotal(0);
    
      setBcdResistantJan(0);
      setBcdResistantFeb(0);
      setBcdResistantMar(0);
      setBcdResistantApr(0);
      setBcdResistantMay(0);
      setBcdResistantJun(0);
      setBcdResistantJul(0);
      setBcdResistantAug(0);
      setBcdResistantSep(0);
      setBcdResistantOct(0);
      setBcdResistantNov(0);
      setBcdResistantDec(0);
    
      setBcdSensitiveJan(0);
      setBcdSensitiveFeb(0);
      setBcdSensitiveMar(0);
      setBcdSensitiveApr(0);
      setBcdSensitiveMay(0);
      setBcdSensitiveJun(0);
      setBcdSensitiveJul(0);
      setBcdSensitiveAug(0);
      setBcdSensitiveSep(0);
      setBcdSensitiveOct(0);
      setBcdSensitiveNov(0);
      setBcdSensitiveDec(0);

      setClinicalJan(0);
      setClinicalFeb(0);
      setClinicalMar(0);
      setClinicalApr(0);
      setClinicalMay(0);
      setClinicalJun(0);
      setClinicalJul(0);
      setClinicalAug(0);
      setClinicalSep(0);
      setClinicalOct(0);
      setClinicalNov(0);
      setClinicalDec(0);

      setMultiJan(0);
      setMultiFeb(0);
      setMultiMar(0);
      setMultiApr(0);
      setMultiMay(0);
      setMultiJun(0);
      setMultiJul(0);
      setMultiAug(0);
      setMultiSep(0);
      setMultiOct(0);
      setMultiNov(0);
      setMultiDec(0);
    }

    const data01 = [
        { name: 'Bacteriologically Confirmed (Multi Drug Resistant)', value: multiTotal},
        { name: 'Bacteriologically Confirmed (Drug Resistant)', value: bcdResistantTotal },
        { name: 'Bacteriologically Confirmed (Drug Sensitive)', value: bcdSensitiveTotal },
        { name: 'Clinically Diagnosed', value: clinicalTotal}
      ];

      const data = [
        {
          name: 'JAN',
          BCDrugResistant: bcdResistantJan,
          BCDrugSensitive: bcdSensitiveJan,
          ClinicalDiagnosis: clinicalJan,
          MultiDrugResistant: multiJan
        },
        {
          name: 'FEB',
          BCDrugResistant: bcdResistantFeb,
          BCDrugSensitive: bcdSensitiveFeb,
          ClinicalDiagnosis: clinicalFeb,
          MultiDrugResistant: multiFeb
        },
        {
          name: 'MAR',
          BCDrugResistant: bcdResistantMar,
          BCDrugSensitive: bcdSensitiveMar,
          ClinicalDiagnosis: clinicalMar,
          MultiDrugResistant: multiMar
        },
        {
          name: 'APR',
          BCDrugResistant: bcdResistantApr,
          BCDrugSensitive: bcdSensitiveApr,
          ClinicalDiagnosis: clinicalApr,
          MultiDrugResistant: multiApr
        },
        {
          name: 'MAY',
          BCDrugResistant: bcdResistantMay,
          BCDrugSensitive: bcdSensitiveMay,
          ClinicalDiagnosis: clinicalMay,
          MultiDrugResistant: multiMay
        },
        {
          name: 'JUN',
          BCDrugResistant: bcdResistantJun,
          BCDrugSensitive: bcdSensitiveJun,
          ClinicalDiagnosis: clinicalJun,
          MultiDrugResistant: multiJun
        },
        {
          name: 'JUL',
          BCDrugResistant: bcdResistantJul,
          BCDrugSensitive: bcdSensitiveJul,
          ClinicalDiagnosis: clinicalJul,
          MultiDrugResistant: multiJul
        },
        {
          name: 'AUG',
          BCDrugResistant: bcdResistantAug,
          BCDrugSensitive: bcdSensitiveAug,
          ClinicalDiagnosis: clinicalAug,
          MultiDrugResistant: multiAug
        },
        {
          name: 'SEP',
          BCDrugResistant: bcdResistantSep,
          BCDrugSensitive: bcdSensitiveSep,
          ClinicalDiagnosis: clinicalSep,
          MultiDrugResistant: multiSep
        },
        {
          name: 'OCT',
          BCDrugResistant: bcdResistantOct,
          BCDrugSensitive: bcdSensitiveOct,
          ClinicalDiagnosis: clinicalOct,
          MultiDrugResistant: multiOct
        },
        {
          name: 'NOV',
          BCDrugResistant: bcdResistantNov,
          BCDrugSensitive: bcdSensitiveNov,
          ClinicalDiagnosis: clinicalNov,
          MultiDrugResistant: multiNov
        },
        {
          name: 'DEC',
          BCDrugResistant: bcdResistantDec,
          BCDrugSensitive: bcdSensitiveDec,
          ClinicalDiagnosis: clinicalDec,
          MultiDrugResistant: multiDec
        },
      ];


      const [linesVisibility, setLinesVisibility] = useState({
        BCDrugResistant: true,
        BCDrugSensitive: true,
        ClinicalDiagnosis: true,
      });
    
      const handleLegendClick = (dataKey) => {
        setLinesVisibility((prevState) => ({
          ...prevState,
          [dataKey]: !prevState[dataKey],
        }));
      };
      
    const COLORS1 = ['#5D2B02', '#7D3D07',  '#F37308', '#BC8353'];

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
  
  <Row className='row g-3 my-2 justify-content-center'>
    <div className='col-md-2 p-1'>
      <div className={`p-3 shadow-sm d-flex justify-content-around rounded summary-card`} style={{ backgroundColor: COLORS1[0], minHeight: "250px" }}>
        <div>
          <h3 className='text-light fs-1'>{data01[0].value}</h3>
          <p className='text-light fs-5'>{data01[0].name}</p>
        </div>
        <i className='bi bi-cart-plus p-3 fs-1'></i>
      </div>
    </div>
    <div className='col-md-2 p-1'>
    <div className={`p-3 shadow-sm d-flex justify-content-around rounded summary-card`} style={{ backgroundColor: COLORS1[1], minHeight: "250px" }}>
        <div>
          <h3 className='text-light fs-1'>{data01[1].value}</h3>
          <p className='text-light fs-5'>{data01[1].name}</p>
        </div>
        <i className='bi bi-cart-plus p-3 fs-1'></i>
      </div>
    </div>
    <div className='col-md-2 p-1'>
      <div className={`p-3 shadow-sm d-flex justify-content-around rounded summary-card`} style={{ backgroundColor: COLORS1[2], minHeight: "250px" }}>
        <div>
          <h3 className='text-light fs-1'>{data01[2].value}</h3>
          <p className='text-light fs-5'>{data01[2].name}</p>
        </div>
        <i className='bi bi-cart-plus p-3 fs-1'></i>
      </div>
    </div>
    <div className='col-md-2 p-1'>
      <div className={`p-3 shadow-sm d-flex justify-content-around rounded summary-card`} style={{ backgroundColor: COLORS1[3], minHeight: "250px" }}>
        <div>
          <h3 className='text-light fs-1'>{data01[3].value}</h3>
          <p className='text-light fs-5'>{data01[3].name}</p>
        </div>
        <i className='bi bi-cart-plus p-3 fs-1'></i>
      </div>
    </div>
    </Row>
    <Row className='row g-3 my-2 justify-content-center'>
   
    
                    <PieChart width={450} height={400}  className="justify-content-center me-1" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '2px', borderStyle: 'solid', borderRadius: '20px' }}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={data01}
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
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
  );
};


export default PatientSummaryEPTB;
