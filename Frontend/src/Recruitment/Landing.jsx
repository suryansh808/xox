
const Landing = () => {
   
    const powerfull = [
    { 
        icons: <i className="fa fa-bullseye text-blue-400"></i>,
        title: "Smart Job Matching",
        text: "AI matches candidates to roles, reducing hiring time significantly."
    },
    { 
        icons: <i className="fa fa-bar-chart text-purple-400"></i>,
        title: "Analytics Dashboard",
        text: "Track hiring metrics and performance with real-time insights and data."
    },
    { 
        icons: <i className="fa fa-bolt text-green-400"></i>,
        title: "Automated Workflows",
        text: "Save time with automation for screening and interview scheduling tasks."
    },
    { 
        icons: <i className="fa fa-users text-orange-400"></i>,
        title: "Collaborative Hiring",
        text: "Enable teamwork between managers, recruiters, and interview panels easily."
    },
    { 
        icons: <i className="fa fa-shield text-red-400"></i>,
        title: "Compliance & Security",
        text: "Secure platform with compliance tools for GDPR, EEOC, and more."
    },
    { 
        icons: <i className="fa fa-clock-o text-cyan-400"></i>,
        title: "Quick Onboarding",
        text: "Transition hires easily with automated documents and onboarding workflows."
    },
]


  return (
    <div id="landing">
       <div className="powerful__section">
          <div className="powerful_container">
              <div className="powerful_heading">
                <span>Powerful Features</span>
              <h2>Everything You Need to Hire Smarter</h2>
              <p className="our">Our comprehensive suite of tools transforms every aspect of your recruitment process with intelligent automation and data-driven insights.</p>
              </div>
              <div className="powerfull__card__container">
                {powerfull.map((item, index) =>
                <div key={index} className="card">
                    <div className="icon_heading">
                        <span>{item.icons}</span>
                        <h3>{item.title}</h3>
                    </div>
                    <p className="text">{item.text}</p>
                 </div>
                )}
              </div>
          </div>
       </div>
    </div>
  )
}

export default Landing
