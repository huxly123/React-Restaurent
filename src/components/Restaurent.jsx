import React, { useEffect, useState } from 'react'

import {Container,Row,Col,Button} from "react-bootstrap"
import "./restaurant.css"

function Restaurent() {

let [data,setdata]=useState([]);

const [filterData,setFilterdata]=useState([]);



useEffect(()=>{
fetch("http://localhost:3001/datas").then((d)=>d.json())
.then((res)=>{
setdata(res)
//console.log(data);
})

},[])


const handlestar=(star)=>{
    const updatedArr=data.filter(item=>{
        return +item.ratings>=star
    }).sort((a,b)=>Number(a.ratings)-Number(b.ratings))
    setFilterdata(updatedArr)
}



const handleFilter=(item)=>{
    const updArr=data.filter(el=>item==="all"?el.payment_methods.cash&&el.payment_methods.card&&el.payment_methods.upi:el.payment_methods[item])

setFilterdata(updArr)
}

const handlehl=()=>{
    const uppparr=data.sort((a,b)=>Number(b.cost_for_one)-Number(a.cost_for_one));
    setFilterdata(uppparr)
}

const handlelh=()=>{
    const uppparr=data.sort((a,b)=>Number(a.cost_for_one)-Number(b.cost_for_one));
    setFilterdata([...uppparr])
}

const handleshowall=()=>{
setFilterdata(data)

}
console.log(filterData.length);
const dataaa =filterData.length>0 ?filterData:data
    return (
        <>
        <div id='button-div'>
        <Button variant="success" onClick={()=>handlestar(4)}>4 star above</Button><Button  variant="success" onClick={()=>handlestar(3)}>3 star above</Button><Button  variant="success" onClick={()=>handlestar(2)}>2 star above</Button><Button variant="success"  onClick={()=>handlestar(1)}>1 star above</Button>
        <Button onClick={()=>handleFilter("cash")}>cash </Button><Button onClick={()=>handleFilter("card")}>card</Button><Button onClick={()=>handleFilter("upi")}>Upi </Button><Button onClick={()=>handleFilter("all")} variant="success" >All payment</Button>
        <Button onClick={()=>handlehl()}>High to low</Button><Button onClick={()=>handlelh()}>Low to high</Button>
        {/* <Button variant="success" onClick={()=>handleshowall()}>Show all</Button> */}
        </div>
        <div id="main-box">
            {
                dataaa.map((datas)=>(
                  <Container key={datas.id} className="contain">
                      
                      <Row >
                          <Col className="col-4">
                          <img  src={datas.image} className={"img-fluid","img-thumbnail","img-responsive" } alt="restaurent"/>
                          </Col>
                          <Col  className="col-5">
                          <h4 style={{color:"red",textAlign:"left"}}>{datas.title}</h4>
                          <p  style={{color:"gray",textAlign:"left"}}>{datas.type}</p>
                          <p style={{color:"gray",textAlign:"left"}}>Cost Rs.{datas.cost_for_one}  for one</p>
                          <div>
                              <p  style={{textAlign:"left"}}>Min Rs.{datas.min}   . Up to {datas.time}min</p>
                             
                          </div>
                          <p style={{color:"gray",textAlign:"left"}}>
              {datas.payment_methods.cash && "Cash "}
              {datas.payment_methods.card && "Card "}
              {datas.payment_methods.upi && "UPI"}
                        
                        </p>
                          </Col >
                          <Col className="col-3">
                          <Button variant="success" style={{margin:"0 0 1rem 0",marginLeft:"60%"}}>{datas.ratings}</Button>
                          <p style={{color:"gray",textAlign:"right"}}>{datas.totalvotes} votes</p>
                          <p style={{color:"gray",textAlign:"right"}}>{datas.reviews} reviews</p>
                          </Col>
                      </Row>
                      <Row>
                          <Col >
                          <input style={{width:"70%",margin:"2rem 0 0 0"}} type="text" placeholder="Enter here" />
                        <Button style={{width:"30%"}}>Order online</Button>
                          
                          </Col>
                      </Row>
                  </Container>
             


                ))
            }
        </div>
        </>
    )
}

export default Restaurent
