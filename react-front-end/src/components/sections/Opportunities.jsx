import React, { useState, useEffect } from "react";
import "./index.css";
import Separator from "../Separator";

const ListOfOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://ancient-hamlet-95801.herokuapp.com/api/opp"
        );
        const json = await res.json()
        setOpportunities(json)
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
    const repeat = setTimeout(fetchData, 60000);
    return () => {
      clearTimeout(repeat);
    };
  }, []);
  // this filter by role and sets opportunities in state
const filterRole=(event)=>{
if(event.target.value!=null){
const flteredByRole = opportunities.filter((opp)=>
  opp.role.toLowerCase().includes(event.target.value.toLowerCase()))
setOpportunities(flteredByRole)}}

  // this filter by Location and sets in opportunities state
const filterLoc=(event)=>{
const flteredByLocation = opportunities.filter((opp)=>
  opp.location.toLowerCase().includes(event.target.value.toLowerCase()))
setOpportunities(flteredByLocation)}


  async function resetFilters() {

      const res = await fetch(
        "https://ancient-hamlet-95801.herokuapp.com/api/opp"
      );
      const json = await res.json()
      setOpportunities(json)
    } 

  return (
    <section className="opportunitySection">
      <Separator category="Opportunities" />
      <div className='col-12 filters'>
      <select onChange={filterRole}  className ='col-3' >
  <option onChange={filterRole} value="front-end">front-end</option>
  <option  onChange={filterRole}  value="back-end">back-end</option>
  <option  onChange={filterRole} value="full-stack">full-stack</option>
</select>

<select className = 'col-3' id="2" name="location" onChange={filterLoc}>
  <option onChange={filterLoc} value="London">London</option>
  <option onChange={filterLoc} value="Manchester">Manchester</option>
  <option onChange={filterLoc} value="Birmingham">Birmingham</option>
  <option onChange={filterLoc}  value="Rome">Rome</option>
</select>
<button onClick={resetFilters} className="resetFilters">reset filters</button>
</div>
      {opportunities.map((opportunity) => {
        return (
          <article className="opp_article row" key={opportunity._id}>
      
              <img className='companyLogo col-1'
                src="https://github.com/AlexandruBudaca/Hackaton-sf-ldn-2020/blob/babak/Design/images%20files/opp-icon/role-frontend.gif?raw=true"
                alt=""
              />
     
              <div className='oppColumn col-3'>
                {/* <Link to="/Opportunity">
                </Link> */}
                <p>{opportunity.company}</p>
              
                <span>{opportunity.location}</span>
               
               <span>{opportunity.role}</span>
                </div>
                <div className='oppColumn col-3'>
                <span>{opportunity.description}</span>
            </div>
              

           
          </article>
        );
      })}
    </section>
  );
};

export default ListOfOpportunities;
