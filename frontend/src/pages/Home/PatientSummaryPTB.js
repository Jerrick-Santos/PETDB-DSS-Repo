


import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';

import React, { useState, useEffect,PureComponent } from 'react';
import { LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, } from 'recharts';








const PatientSummaryPTB = () => {


    const [patientsData, setPatientsData] = useState([]);

    const data01 = [
        { name: 'Bacteriologically Confirmed (Drug Resistant)', value: 400 },
        { name: 'Bacteriologically Confirmed (Drug Susceptible)', value: 300 },
        { name: 'Clinically Diagnosed (Drug Resistant)', value: 300 },
        { name: 'Clinically Diagnosed (Drug Susceptible)', value: 200 },
      ];

      const data = [
        {
          name: 'JAN',
          BCDrugResistant: 9,
          BCDrugSusceptible: 14,
          CDDrugResistant: 7,
          CDDrugSusceptible: 11,
        },
        {
          name: 'FEB',
          BCDrugResistant: 5,
          BCDrugSusceptible: 7,
          CDDrugResistant: 8,
          CDDrugSusceptible: 3,
        },
        {
          name: 'MAR',
          BCDrugResistant: 2,
          BCDrugSusceptible: 12,
          CDDrugResistant: 5,
          CDDrugSusceptible: 10,
        },
        {
          name: 'APR',
          BCDrugResistant: 13,
          BCDrugSusceptible: 6,
          CDDrugResistant: 9,
          CDDrugSusceptible: 1,
        },
        {
          name: 'MAY',
          BCDrugResistant: 11,
          BCDrugSusceptible: 1,
          CDDrugResistant: 4,
          CDDrugSusceptible: 13,
        },
        {
          name: 'JUN',
          BCDrugResistant: 6,
          BCDrugSusceptible: 5,
          CDDrugResistant: 14,
          CDDrugSusceptible: 12,
        },
        {
          name: 'JUL',
          BCDrugResistant: 10,
          BCDrugSusceptible: 3,
          CDDrugResistant: 15,
          CDDrugSusceptible: 9,
        },
        {
          name: 'AUG',
          BCDrugResistant: 4,
          BCDrugSusceptible: 13,
          CDDrugResistant: 11,
          CDDrugSusceptible: 6,
        },
        {
          name: 'SEP',
          BCDrugResistant: 7,
          BCDrugSusceptible: 2,
          CDDrugResistant: 10,
          CDDrugSusceptible: 5,
        },
        {
          name: 'OCT',
          BCDrugResistant: 8,
          BCDrugSusceptible: 9,
          CDDrugResistant: 3,
          CDDrugSusceptible: 8,
        },
        {
          name: 'NOV',
          BCDrugResistant: 15,
          BCDrugSusceptible: 11,
          CDDrugResistant: 12,
          CDDrugSusceptible: 7,
        },
        {
          name: 'DEC',
          BCDrugResistant: 1,
          BCDrugSusceptible: 8,
          CDDrugResistant: 6,
          CDDrugSusceptible: 2,
        },
      ];

      const [linesVisibility, setLinesVisibility] = useState({
        BCDrugResistant: true,
        BCDrugSusceptible: true,
        CDDrugResistant: true,
        CDDrugSusceptible: true,
      });
    
      const handleLegendClick = (dataKey) => {
        setLinesVisibility((prevState) => ({
          ...prevState,
          [dataKey]: !prevState[dataKey],
        }));
      };
      
    const COLORS1 = ['#56592F', '#82892C', '#BECB12', '#9EA455'];

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


export default PatientSummaryPTB;
