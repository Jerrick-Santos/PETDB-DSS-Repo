


import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';

import React, { useState, useEffect,PureComponent } from 'react';
import { LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, } from 'recharts';







const PatientSummaryClosed = () => {


    const [patientsData, setPatientsData] = useState([]);

    const data01 = [
        { name: 'Cured', value: 400 },
        { name: 'Lost to Follow-up', value: 300 },
        { name: 'Not Evaluated', value: 300 },
        { name: 'Died', value: 200 },
      ];

      const data = [
        {
          name: 'JAN',
          Cured: 9,
          LostToFollowUp: 14,
          NotEvaluated: 7,
          Died: 11,
        },
        {
          name: 'FEB',
          Cured: 5,
          LostToFollowUp: 7,
          NotEvaluated: 8,
          Died: 3,
        },
        {
          name: 'MAR',
          Cured: 2,
          LostToFollowUp: 12,
          NotEvaluated: 5,
          Died: 10,
        },
        {
          name: 'APR',
          Cured: 13,
          LostToFollowUp: 6,
          NotEvaluated: 9,
          Died: 1,
        },
        {
          name: 'MAY',
          Cured: 11,
          LostToFollowUp: 1,
          NotEvaluated: 4,
          Died: 13,
        },
        {
          name: 'JUN',
          Cured: 6,
          LostToFollowUp: 5,
          NotEvaluated: 14,
          Died: 12,
        },
        {
          name: 'JUL',
          Cured: 10,
          LostToFollowUp: 3,
          NotEvaluated: 15,
          Died: 9,
        },
        {
          name: 'AUG',
          Cured: 4,
          LostToFollowUp: 13,
          NotEvaluated: 11,
          Died: 6,
        },
        {
          name: 'SEP',
          Cured: 7,
          LostToFollowUp: 2,
          NotEvaluated: 10,
          Died: 5,
        },
        {
          name: 'OCT',
          Cured: 8,
          LostToFollowUp: 9,
          NotEvaluated: 3,
          Died: 8,
        },
        {
          name: 'NOV',
          Cured: 15,
          LostToFollowUp: 11,
          NotEvaluated: 12,
          Died: 7,
        },
        {
          name: 'DEC',
          Cured: 1,
          LostToFollowUp: 8,
          NotEvaluated: 6,
          Died: 2,
        },
      ];

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
