

import React, { useState, useEffect,PureComponent } from 'react';
import { LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, } from 'recharts';




import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import axios from 'axios';



const PatientSummary = () => {

    const [patientsData, setPatientsData] = useState([]);

    const data01 = [
        { name: 'Presumptive', value: 900 },
        { name: 'Latent', value: 300 },
        { name: 'Pulmonary', value: 300 },
        { name: 'ExtraPulmonary', value: 200 },
        { name: 'Closed', value: 278 },
      ];

      const data = [
        {
          name: 'JAN',
          presumptive: 9,
          latent: 14,
          pulmonary: 7,
          extrapulmonary: 11,
          closed: 15,
        },
        {
          name: 'FEB',
          presumptive: 5,
          latent: 7,
          pulmonary: 8,
          extrapulmonary: 3,
          closed: 12,
        },
        {
          name: 'MAR',
          presumptive: 2,
          latent: 12,
          pulmonary: 5,
          extrapulmonary: 10,
          closed: 4,
        },
        {
          name: 'APR',
          presumptive: 13,
          latent: 6,
          pulmonary: 9,
          extrapulmonary: 1,
          closed: 8,
        },
        {
          name: 'MAY',
          presumptive: 11,
          latent: 1,
          pulmonary: 4,
          extrapulmonary: 13,
          closed: 7,
        },
        {
          name: 'JUN',
          presumptive: 6,
          latent: 5,
          pulmonary: 14,
          extrapulmonary: 12,
          closed: 2,
        },
        {
          name: 'JUL',
          presumptive: 10,
          latent: 3,
          pulmonary: 15,
          extrapulmonary: 9,
          closed: 6,
        },
        {
          name: 'AUG',
          presumptive: 4,
          latent: 13,
          pulmonary: 11,
          extrapulmonary: 6,
          closed: 1,
        },
        {
          name: 'SEP',
          presumptive: 7,
          latent: 2,
          pulmonary: 10,
          extrapulmonary: 5,
          closed: 14,
        },
        {
          name: 'OCT',
          presumptive: 8,
          latent: 9,
          pulmonary: 3,
          extrapulmonary: 8,
          closed: 13,
        },
        {
          name: 'NOV',
          presumptive: 15,
          latent: 11,
          pulmonary: 12,
          extrapulmonary: 7,
          closed: 10,
        },
        {
          name: 'DEC',
          presumptive: 1,
          latent: 8,
          pulmonary: 6,
          extrapulmonary: 2,
          closed: 11,
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
  </div>
 
</div>

       


    </div>
    </div>
  );
};

export default PatientSummary;
