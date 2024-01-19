
import React , {useState,useEffect} from 'react'

import { Doughnut } from 'react-chartjs-2';
import { PolarArea } from 'react-chartjs-2';


import { Bar } from 'react-chartjs-2';
import axios from 'axios' ; 


let today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
//January is 0! 
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = yyyy+ '/'+ mm  +'/'+ dd;



const AdminDashboard = () => {

const [projects,setProjects] = useState([])
const [pointning,setPointnings] = useState([])

useEffect(()=>{
  axios.get('http://localhost:5000/projects')
  .then(result=>{
    setProjects(result.data)
    console.log(result.data)
  })
  axios.get('http://localhost:5000/pointning')
  .then(result=>{
    setPointnings(result.data)
    console.log(result.data)
  })
  
},[])

var today_pointning = pointning.filter(item=>item.Creation_date===today)


var time= [0]
  var array = projects.map( (el) => { return el.titre; })
  var time = projects.map( (el) => { return el.estimatedTime; })
  var total = projects.map( (el) => { return el.globalTime; })
console.log(time)






const dataPointning = {
  labels: array,
  datasets: [
    {
      label:' Nombre des heures pointées/jour',
      data: [5,7,1],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
};










const dataBar = {

  

  labels: array, 
  datasets: [
    {
      label: 'Temps restant des différents projets',
      data: time,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

let somme_time = 0 

  



 somme_time=eval(time.join('+'))


 let somme_global=0
 somme_global=eval(total.join('+'))





const data = {

  
  


  labels: ['temps totale restant','temps accomplis'],
  datasets: [
    {
      label: 'Avancement des projets',
      data: [somme_time, somme_global-somme_time],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
        
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
        
      ],
      borderWidth: 1,
    },
  ],
};











const optionsBar = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};




const optionsLine = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  }
};
    return (

        
       
        <div style={{padding:"20px",flexWrap:'wrap', alignItems: "center", display:"flex",flexDirection:"row",justifyContent:"space-between"}}>




<div style={{flex:" 1 0 40%"}}>
<Doughnut data={data} />
</div>

<div style={{flex:" 1 0 40%"}}>
   <Bar data={dataBar} options={optionsBar} />
</div>

<div style={{flex:" 1 0 15%"}}>

</div>
<div style={{flex:" 1 0 15%"}}>

{/* <PolarArea data={dataPointning} /> */}
</div>
<div style={{flex:" 1 0 15%"}}>


</div>

        </div>




    )
}


    export default AdminDashboard