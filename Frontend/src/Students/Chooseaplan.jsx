
const Chooseaplan = () => {
  return (
     <div id="chooseaplan">
         <div className="pricing-container">
        <div className="pricing-header">
            <h2>Choose YOUR Pricing Plan</h2>
            {/* <p>ALL Plans FREE for the first 30 Days</p> */}
        </div>

        <div className="plans">

            <div className="plan">
                <h2>Gold</h2>
                <div className="price">₹899<span>/month</span></div>
                <ul>
                    <li>20 jobs</li>
                    <li>Subdomain</li>
                    <li>70 email accounts</li>
                    <li>Maintenance</li>
                </ul>
                <button>CHOOSE PLAN</button>
            </div>

            <div className="plan">
                <h2>Premium</h2>
                <div className="price">₹2999<span>/Year</span></div>
                <ul>
                    <li>Full Portal Access</li>
                    <li>Unlimited Jobs Apply</li>
                    <li>.......</li>
                    <li>Maintenance</li>
                </ul>
                <button>CHOOSE PLAN</button>
            </div>
        </div>
      </div>
     </div>
  )
}

export default Chooseaplan
