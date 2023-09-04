


import React, { useState, useEffect,PureComponent } from 'react';
import { LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, } from 'recharts';
import { Navbar, Nav, Card, Row, Col, ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import filter from '../../assets/filter.png'



import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import axios from 'axios';






const PatientSummaryClosed = () => {

      const [chartData, setChartData] = useState([]); // Assume you have your data here


      const [curedTotal, setCuredTotal] = useState(0);
      const [lostTotal, setLostTotal] = useState(0);
      const [notEvalTotal, setNotEvalTotal] = useState(0);
      const [diedTotal, setDiedTotal] = useState(0);
      
      const [curedJan, setCuredJan] = useState(0);
      const [curedFeb, setCuredFeb] = useState(0);
      const [curedMar, setCuredMar] = useState(0);
      const [curedApr, setCuredApr] = useState(0);
      const [curedMay, setCuredMay] = useState(0);
      const [curedJun, setCuredJun] = useState(0);
      const [curedJul, setCuredJul] = useState(0);
      const [curedAug, setCuredAug] = useState(0);
      const [curedSep, setCuredSep] = useState(0);
      const [curedOct, setCuredOct] = useState(0);
      const [curedNov, setCuredNov] = useState(0);
      const [curedDec, setCuredDec] = useState(0);

      const [lostJan, setLostJan] = useState(0);
      const [lostFeb, setLostFeb] = useState(0);
      const [lostMar, setLostMar] = useState(0);
      const [lostApr, setLostApr] = useState(0);
      const [lostMay, setLostMay] = useState(0);
      const [lostJun, setLostJun] = useState(0);
      const [lostJul, setLostJul] = useState(0);
      const [lostAug, setLostAug] = useState(0);
      const [lostSep, setLostSep] = useState(0);
      const [lostOct, setLostOct] = useState(0);
      const [lostNov, setLostNov] = useState(0);
      const [lostDec, setLostDec] = useState(0);

      const [notEvalJan, setNotEvalJan] = useState(0);
      const [notEvalFeb, setNotEvalFeb] = useState(0);
      const [notEvalMar, setNotEvalMar] = useState(0);
      const [notEvalApr, setNotEvalApr] = useState(0);
      const [notEvalMay, setNotEvalMay] = useState(0);
      const [notEvalJun, setNotEvalJun] = useState(0);
      const [notEvalJul, setNotEvalJul] = useState(0);
      const [notEvalAug, setNotEvalAug] = useState(0);
      const [notEvalSep, setNotEvalSep] = useState(0);
      const [notEvalOct, setNotEvalOct] = useState(0);
      const [notEvalNov, setNotEvalNov] = useState(0);
      const [notEvalDec, setNotEvalDec] = useState(0);

      const [diedJan, setDiedJan] = useState(0);
      const [diedFeb, setDiedFeb] = useState(0);
      const [diedMar, setDiedMar] = useState(0);
      const [diedApr, setDiedApr] = useState(0);
      const [diedMay, setDiedMay] = useState(0);
      const [diedJun, setDiedJun] = useState(0);
      const [diedJul, setDiedJul] = useState(0);
      const [diedAug, setDiedAug] = useState(0);
      const [diedSep, setDiedSep] = useState(0);
      const [diedOct, setDiedOct] = useState(0);
      const [diedNov, setDiedNov] = useState(0);
      const [diedDec, setDiedDec] = useState(0);

      const [years, setYears] = useState([]);
      const [currentYear, setCurrentYear] = useState(0);

    const data01 = [
        { name: 'Cured', value: curedTotal },
        { name: 'Lost to Follow-up', value: lostTotal },
        { name: 'Not Evaluated', value: notEvalTotal },
        { name: 'Died', value: diedTotal},
      ];

      const data = [
        {
          name: 'JAN',
          Cured: curedJan,
          LostToFollowUp: lostJan,
          NotEvaluated: notEvalJan,
          Died: diedJan,
        },
        {
          name: 'FEB',
          Cured: curedFeb,
          LostToFollowUp: lostFeb,
          NotEvaluated: notEvalFeb,
          Died: diedFeb,
        },
        {
          name: 'MAR',
          Cured: curedMar,
          LostToFollowUp: lostMar,
          NotEvaluated: notEvalMar,
          Died: diedMar,
        },
        {
          name: 'APR',
          Cured: curedApr,
          LostToFollowUp: lostApr,
          NotEvaluated: notEvalApr,
          Died: diedApr,
        },
        {
          name: 'MAY',
          Cured: curedMay,
          LostToFollowUp: lostMay,
          NotEvaluated: notEvalMay,
          Died: diedMay,
        },
        {
          name: 'JUN',
          Cured: curedJun,
          LostToFollowUp: lostJun,
          NotEvaluated: notEvalJun,
          Died: diedJun,
        },
        {
          name: 'JUL',
          Cured: curedJul,
          LostToFollowUp: lostJul,
          NotEvaluated: notEvalJul,
          Died: diedJul,
        },
        {
          name: 'AUG',
          Cured: curedAug,
          LostToFollowUp: lostAug,
          NotEvaluated: notEvalAug,
          Died: diedAug,
        },
        {
          name: 'SEP',
          Cured: curedSep,
          LostToFollowUp: lostSep,
          NotEvaluated: notEvalSep,
          Died: diedSep,
        },
        {
          name: 'OCT',
          Cured: curedOct,
          LostToFollowUp: lostOct,
          NotEvaluated: notEvalOct,
          Died: diedOct,
        },
        {
          name: 'NOV',
          Cured: curedNov,
          LostToFollowUp: lostNov,
          NotEvaluated: notEvalNov,
          Died: diedNov,
        },
        {
          name: 'DEC',
          Cured: curedDec,
          LostToFollowUp: lostDec,
          NotEvaluated: notEvalDec,
          Died: diedDec,
        },
      ];

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
    
        axios.get(`http://localhost:4000/api/chartData/${currentYear}`)
          .then((response) => {
            setChartData(response.data);
        
            response.data.forEach((data) => {
              if (data.DiagnosisMonth === 1 ) {
                console.log(data.DiagnosisType + data.DiagnosisMonth)
                setDiedJan(data.ClosedCasesWithSRNo1);
                setDiedFeb(data.ClosedCasesWithSRNo1);
                setDiedMar(data.ClosedCasesWithSRNo1);
                setDiedApr(data.ClosedCasesWithSRNo1);
                setDiedMay(data.ClosedCasesWithSRNo1);
                setDiedJun(data.ClosedCasesWithSRNo1);
                setDiedJul(data.ClosedCasesWithSRNo1);
                setDiedAug(data.ClosedCasesWithSRNo1);
                setDiedSep(data.ClosedCasesWithSRNo1);
                setDiedOct(data.ClosedCasesWithSRNo1);
                setDiedNov(data.ClosedCasesWithSRNo1);
                setDiedDec(data.ClosedCasesWithSRNo1);
                setDiedTotal(data.ClosedCasesWithSRNo1);

                setCuredJan(data.ClosedCasesWithSRNo3);
                setCuredFeb(data.ClosedCasesWithSRNo3);
                setCuredMar(data.ClosedCasesWithSRNo3);
                setCuredApr(data.ClosedCasesWithSRNo3);
                setCuredMay(data.ClosedCasesWithSRNo3);
                setCuredJun(data.ClosedCasesWithSRNo3);
                setCuredJul(data.ClosedCasesWithSRNo3);
                setCuredAug(data.ClosedCasesWithSRNo3);
                setCuredSep(data.ClosedCasesWithSRNo3);
                setCuredOct(data.ClosedCasesWithSRNo3);
                setCuredNov(data.ClosedCasesWithSRNo3);
                setCuredDec(data.ClosedCasesWithSRNo3);
                setCuredTotal(data.ClosedCasesWithSRNo3);

                setLostJan(data.ClosedCasesWithSRNo4);
                setLostFeb(data.ClosedCasesWithSRNo4);
                setLostMar(data.ClosedCasesWithSRNo4);
                setLostApr(data.ClosedCasesWithSRNo4);
                setLostMay(data.ClosedCasesWithSRNo4);
                setLostJun(data.ClosedCasesWithSRNo4);
                setLostJul(data.ClosedCasesWithSRNo4);
                setLostAug(data.ClosedCasesWithSRNo4);
                setLostSep(data.ClosedCasesWithSRNo4);
                setLostOct(data.ClosedCasesWithSRNo4);
                setLostNov(data.ClosedCasesWithSRNo4);
                setLostDec(data.ClosedCasesWithSRNo4);
                setLostTotal(data.ClosedCasesWithSRNo4);

                setNotEvalJan(data.ClosedCasesWithSRNo5);
                setNotEvalFeb(data.ClosedCasesWithSRNo5);
                setNotEvalMar(data.ClosedCasesWithSRNo5);
                setNotEvalApr(data.ClosedCasesWithSRNo5);
                setNotEvalMay(data.ClosedCasesWithSRNo5);
                setNotEvalJun(data.ClosedCasesWithSRNo5);
                setNotEvalJul(data.ClosedCasesWithSRNo5);
                setNotEvalAug(data.ClosedCasesWithSRNo5);
                setNotEvalSep(data.ClosedCasesWithSRNo5);
                setNotEvalOct(data.ClosedCasesWithSRNo5);
                setNotEvalNov(data.ClosedCasesWithSRNo5);
                setNotEvalDec(data.ClosedCasesWithSRNo5);
                setNotEvalTotal(data.ClosedCasesWithSRNo5);
              } else if (data.DiagnosisMonth === 2 ) {
                console.log(data.DiagnosisType + data.DiagnosisMonth)
                setDiedFeb((prev) => prev + data.ClosedCasesWithSRNo1);
                setDiedMar((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedApr((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedMay((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedJun((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedJul((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedAug((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedSep((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedOct((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedNov((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedDec((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedTotal((prev) => prev  + data.ClosedCasesWithSRNo1);

                setCuredFeb((prev) => prev + data.ClosedCasesWithSRNo3);
                setCuredMar((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredApr((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredMay((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredJun((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredJul((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredAug((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredSep((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredOct((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredNov((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredDec((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredTotal((prev) => prev  + data.ClosedCasesWithSRNo3);

                setLostFeb((prev) => prev + data.ClosedCasesWithSRNo4);
                setLostMar((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostApr((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostMay((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostJun((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostJul((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostAug((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostSep((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostOct((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostNov((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostDec((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostTotal((prev) => prev  + data.ClosedCasesWithSRNo4);

                setNotEvalFeb((prev) => prev + data.ClosedCasesWithSRNo5);
                setNotEvalMar((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalApr((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalMay((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalJun((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalJul((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalAug((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalSep((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalOct((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalNov((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalDec((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalTotal((prev) => prev  + data.ClosedCasesWithSRNo5);
              } else if (data.DiagnosisMonth === 3 ) {
                console.log(data.DiagnosisType + data.DiagnosisMonth)
                setDiedMar((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedApr((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedMay((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedJun((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedJul((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedAug((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedSep((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedOct((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedNov((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedDec((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedTotal((prev) => prev  + data.ClosedCasesWithSRNo1);

                setCuredMar((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredApr((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredMay((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredJun((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredJul((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredAug((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredSep((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredOct((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredNov((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredDec((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredTotal((prev) => prev  + data.ClosedCasesWithSRNo3);

                setLostMar((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostApr((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostMay((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostJun((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostJul((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostAug((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostSep((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostOct((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostNov((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostDec((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostTotal((prev) => prev  + data.ClosedCasesWithSRNo4);

                setNotEvalMar((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalApr((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalMay((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalJun((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalJul((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalAug((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalSep((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalOct((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalNov((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalDec((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalTotal((prev) => prev  + data.ClosedCasesWithSRNo5);
              } else if (data.DiagnosisMonth === 4 ) {
                console.log(data.DiagnosisType + data.DiagnosisMonth)
                setDiedApr((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedMay((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedJun((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedJul((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedAug((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedSep((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedOct((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedNov((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedDec((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedTotal((prev) => prev  + data.ClosedCasesWithSRNo1);

                setCuredApr((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredMay((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredJun((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredJul((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredAug((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredSep((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredOct((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredNov((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredDec((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredTotal((prev) => prev  + data.ClosedCasesWithSRNo3);

                setLostApr((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostMay((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostJun((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostJul((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostAug((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostSep((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostOct((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostNov((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostDec((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostTotal((prev) => prev  + data.ClosedCasesWithSRNo4);

                setNotEvalApr((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalMay((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalJun((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalJul((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalAug((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalSep((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalOct((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalNov((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalDec((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalTotal((prev) => prev  + data.ClosedCasesWithSRNo5);
              } else if (data.DiagnosisMonth === 5 ) {
                console.log(data.DiagnosisType + data.DiagnosisMonth)
                setDiedMay((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedJun((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedJul((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedAug((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedSep((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedOct((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedNov((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedDec((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedTotal((prev) => prev  + data.ClosedCasesWithSRNo1);

                setCuredMay((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredJun((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredJul((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredAug((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredSep((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredOct((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredNov((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredDec((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredTotal((prev) => prev  + data.ClosedCasesWithSRNo3);

                setLostMay((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostJun((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostJul((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostAug((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostSep((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostOct((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostNov((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostDec((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostTotal((prev) => prev  + data.ClosedCasesWithSRNo4);

                setNotEvalMay((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalJun((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalJul((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalAug((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalSep((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalOct((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalNov((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalDec((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalTotal((prev) => prev  + data.ClosedCasesWithSRNo5);
              } else if (data.DiagnosisMonth === 6 ) {
                console.log(data.DiagnosisType + data.DiagnosisMonth)
                setDiedJun((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedJul((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedAug((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedSep((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedOct((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedNov((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedDec((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedTotal((prev) => prev  + data.ClosedCasesWithSRNo1);

                setCuredJun((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredJul((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredAug((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredSep((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredOct((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredNov((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredDec((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredTotal((prev) => prev  + data.ClosedCasesWithSRNo3);

                setLostJun((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostJul((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostAug((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostSep((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostOct((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostNov((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostDec((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostTotal((prev) => prev  + data.ClosedCasesWithSRNo4);

                setNotEvalJun((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalJul((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalAug((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalSep((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalOct((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalNov((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalDec((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalTotal((prev) => prev  + data.ClosedCasesWithSRNo5);
              } else if (data.DiagnosisMonth === 7 ) {
                console.log(data.DiagnosisType + data.DiagnosisMonth)
                setDiedJul((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedAug((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedSep((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedOct((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedNov((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedDec((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedTotal((prev) => prev  + data.ClosedCasesWithSRNo1);

                setCuredJul((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredAug((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredSep((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredOct((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredNov((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredDec((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredTotal((prev) => prev  + data.ClosedCasesWithSRNo3);

                setLostJul((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostAug((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostSep((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostOct((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostNov((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostDec((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostTotal((prev) => prev  + data.ClosedCasesWithSRNo4);

                setNotEvalJul((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalAug((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalSep((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalOct((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalNov((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalDec((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalTotal((prev) => prev  + data.ClosedCasesWithSRNo5);
              } else if (data.DiagnosisMonth === 8 ) {
                console.log(data.DiagnosisType + data.DiagnosisMonth)
                setDiedAug((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedSep((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedOct((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedNov((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedDec((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedTotal((prev) => prev  + data.ClosedCasesWithSRNo1);

                setCuredAug((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredSep((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredOct((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredNov((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredDec((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredTotal((prev) => prev  + data.ClosedCasesWithSRNo3);

                setLostAug((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostSep((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostOct((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostNov((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostDec((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostTotal((prev) => prev  + data.ClosedCasesWithSRNo4);

                setNotEvalAug((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalSep((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalOct((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalNov((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalDec((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalTotal((prev) => prev  + data.ClosedCasesWithSRNo5);
              } else if (data.DiagnosisMonth === 9 ) {
                setDiedSep((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedOct((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedNov((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedDec((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedTotal((prev) => prev  + data.ClosedCasesWithSRNo1);

                setCuredSep((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredOct((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredNov((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredDec((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredTotal((prev) => prev  + data.ClosedCasesWithSRNo3);

                setLostSep((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostOct((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostNov((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostDec((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostTotal((prev) => prev  + data.ClosedCasesWithSRNo4);

                setNotEvalSep((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalOct((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalNov((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalDec((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalTotal((prev) => prev  + data.ClosedCasesWithSRNo5);
              } else if (data.DiagnosisMonth === 10 ) {
                console.log(data.DiagnosisType + data.DiagnosisMonth)
                setDiedOct((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedNov((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedDec((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedTotal((prev) => prev  + data.ClosedCasesWithSRNo1);

                setCuredOct((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredNov((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredDec((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredTotal((prev) => prev  + data.ClosedCasesWithSRNo3);

                setLostOct((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostNov((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostDec((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostTotal((prev) => prev  + data.ClosedCasesWithSRNo4);
                
                setNotEvalOct((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalNov((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalDec((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalTotal((prev) => prev  + data.ClosedCasesWithSRNo5);
              } else if (data.DiagnosisMonth === 11 ) {
                console.log(data.DiagnosisType + data.DiagnosisMonth)
                setDiedNov((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedDec((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedTotal((prev) => prev  + data.ClosedCasesWithSRNo1);

                setCuredNov((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredDec((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredTotal((prev) => prev  + data.ClosedCasesWithSRNo3);

                setLostNov((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostDec((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostTotal((prev) => prev  + data.ClosedCasesWithSRNo4);

                setNotEvalNov((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalDec((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalTotal((prev) => prev  + data.ClosedCasesWithSRNo5);
              } else if (data.DiagnosisMonth === 12 ) {
                console.log(data.DiagnosisType + data.DiagnosisMonth)
                setDiedDec((prev) => prev  + data.ClosedCasesWithSRNo1);
                setDiedTotal((prev) => prev  + data.ClosedCasesWithSRNo1);

                setCuredDec((prev) => prev  + data.ClosedCasesWithSRNo3);
                setCuredTotal((prev) => prev  + data.ClosedCasesWithSRNo3);

                setLostDec((prev) => prev  + data.ClosedCasesWithSRNo4);
                setLostTotal((prev) => prev  + data.ClosedCasesWithSRNo4);

                setNotEvalDec((prev) => prev  + data.ClosedCasesWithSRNo5);
                setNotEvalTotal((prev) => prev  + data.ClosedCasesWithSRNo5);
              } 
    
    
         
            });
    
           
    
            
            
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
          });
      }, [currentYear]);

      function resetAllVariables() {
        setCuredTotal(0);
        setLostTotal(0);
        setNotEvalTotal(0);
        setDiedTotal(0);
      
        setCuredJan(0);
        setCuredFeb(0);
        setCuredMar(0);
        setCuredApr(0);
        setCuredMay(0);
        setCuredJun(0);
        setCuredJul(0);
        setCuredAug(0);
        setCuredSep(0);
        setCuredOct(0);
        setCuredNov(0);
        setCuredDec(0);
      
        setLostJan(0);
        setLostFeb(0);
        setLostMar(0);
        setLostApr(0);
        setLostMay(0);
        setLostJun(0);
        setLostJul(0);
        setLostAug(0);
        setLostSep(0);
        setLostOct(0);
        setLostNov(0);
        setLostDec(0);
      
        setNotEvalJan(0);
        setNotEvalFeb(0);
        setNotEvalMar(0);
        setNotEvalApr(0);
        setNotEvalMay(0);
        setNotEvalJun(0);
        setNotEvalJul(0);
        setNotEvalAug(0);
        setNotEvalSep(0);
        setNotEvalOct(0);
        setNotEvalNov(0);
        setNotEvalDec(0);
      
        setDiedJan(0);
        setDiedFeb(0);
        setDiedMar(0);
        setDiedApr(0);
        setDiedMay(0);
        setDiedJun(0);
        setDiedJul(0);
        setDiedAug(0);
        setDiedSep(0);
        setDiedOct(0);
        setDiedNov(0);
        setDiedDec(0);
      }
      


      const [linesVisibility, setLinesVisibility] = useState({
        Cured: true,
        LostToFollowUp: true,
        NotEvaluated: true,
        Died: true,
      });
    
      const handleLegendClick = (dataKey) => {
        setLinesVisibility((prevState) => ({
          ...prevState,
          [dataKey]: !prevState[dataKey],
        }));
      };
      
    const COLORS1 = ['#FF1E1E', '#872727',  '#AD4949', '#2F0C0C'];

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

  <Row >
    
            
    <Col md="2" className="mt-4 me-4">
          
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
    

</Row>
    <div className='col-md-3 p-1'>
      <div className={`p-3 shadow-sm d-flex justify-content-around align-items-center rounded summary-card`} style={{ backgroundColor: COLORS1[0], minHeight: "250px" }}>
        <div>
          <h3 className='text-light fs-1'>{data01[0].value}</h3>
          <p className='text-light fs-5'>{data01[0].name}</p>
        </div>
        <i className='bi bi-cart-plus p-3 fs-1'></i>
      </div>
    </div>
    <div className='col-md-3 p-1'>
    <div className={`p-3 shadow-sm d-flex justify-content-around align-items-center rounded summary-card`} style={{ backgroundColor: COLORS1[1], minHeight: "250px" }}>
        <div>
          <h3 className='text-light fs-1'>{data01[1].value}</h3>
          <p className='text-light fs-5'>{data01[1].name}</p>
        </div>
        <i className='bi bi-cart-plus p-3 fs-1'></i>
      </div>
    </div>
    <div className='col-md-3 p-1'>
      <div className={`p-3 shadow-sm d-flex justify-content-around align-items-center rounded summary-card`} style={{ backgroundColor: COLORS1[2], minHeight: "250px" }}>
        <div>
          <h3 className='text-light fs-1'>{data01[2].value}</h3>
          <p className='text-light fs-5'>{data01[2].name}</p>
        </div>
        <i className='bi bi-cart-plus p-3 fs-1'></i>
      </div>
    </div>
    <div className='col-md-3 p-1'>
      <div className={`p-3 shadow-sm d-flex justify-content-around align-items-center rounded summary-card`} style={{ backgroundColor: COLORS1[3], minHeight: "250px" }}>
        <div>
          <h3 className='text-light fs-1'>{data01[3].value}</h3>
          <p className='text-light fs-5'>{data01[3].name}</p>
        </div>
        <i className='bi bi-cart-plus p-3 fs-1'></i>
      </div>
    </div>
    
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
  </div>
 
</div>

       


    </div>
    </div>
  );
};


export default PatientSummaryClosed;
