import { useEffect, useState } from "react";

import Section from "./components/Section";
import useApi from "./hooks/useApi";

function App() {
  const webflowVitals = useApi("https://status.webflow.com/api/v2/summary.json");
  const stovaVitals = useApi("https://stova.statuspage.io/api/v2/summary.json");

  const indicator = {
    operational: { color: "green", text: "Operational" },
    under_maintenance: { color: "blue", text: "Under Maintenance" },
    degraded_performance: { color: "yellow", text: "Degraded Performance" },
    partial_outage: { color: "orange", text: "Partial Outage" },
    major_outage: { color: "red", text: "Major Outage" },
  };

  const colorVariants = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
  };

  // const [webflowVitals, setWebflowVitals] = useState([]);
  // const [data, setData] = useState([]);

  useEffect(() => {
    // axios
    //   .get("https://status.webflow.com/api/v2/summary.json")
    //   .then((res) => {
    //     console.log(res.data);
    //     setData(res.data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }, []);

  return (
    <>
      <main className="w-full max-w-[1024px] m-auto px-[24px] py-[60px]">
        <div className="flex flex-col gap-6">
          <Section name="Webflow Health" statusPageUrl="https://webflow.statuspage.io/">
            {/* {console.log(webflowVitals)} */}

            <div className="flex flex-col divide-y divide-gray-200">
              {webflowVitals?.components?.map((component, key) => (
                <div className="flex items-center py-2 gap-2" key={key}>
                  <div>{component.name}</div>
                  <div className={`${colorVariants[indicator[component.status].color]} px-4 py-1.5 rounded-full leading-none`}>{indicator[component.status].text}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section name="Stova Health" statusPageUrl="https://stova.statuspage.io/">
            {/* {console.log(stovaVitals)} */}

            <div className="flex flex-col divide-y divide-gray-200">
              {stovaVitals?.components?.map((component, key) => (
                <div className="flex py-2 gap-2" key={key}>
                  <div>{component.name}</div>
                  <div className="bg-green-200 text-green-600 px-2 py-1 rounded-full leading-none">{component.status}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section name="Incidents">
            {/* <div>incident table</div> */}
            {webflowVitals?.incidents?.length > 0 ? webflowVitals.incidents.map((incident, index) => <div key={index}>{incident.description}</div>) : <p>No incidents</p>}
          </Section>

          <Section name="Scheduled Maintenance">
            {/* <div>maintenance calendar</div> */}
            {webflowVitals?.scheduled_maintenances?.length > 0 ? webflowVitals.scheduled_maintenances.map((maintenance, index) => <div key={index}>{maintenance.description}</div>) : <p>No maintenance scheduled</p>}
          </Section>
        </div>
      </main>
    </>
  );
}

export default App;
