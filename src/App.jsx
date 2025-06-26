import { useEffect, useState } from "react";

import Section from "./components/Section";
import useApi from "./hooks/useApi";

function App() {
  const stovaVitals = useApi("https://stova.statuspage.io/api/v2/summary.json");
  const webflowVitals = useApi("https://status.webflow.com/api/v2/summary.json");

  const indicatorColor = {
    none: "green",
    minor: "orange",
    major: "red",
    critical: "darkred",
  };

  // const [webflowVitals, setWebflowVitals] = useState([]);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://status.webflow.com/api/v2/summary.json")
  //     .then((res) => {
  //       console.log(res.data);
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  return (
    <>
      <main className="w-full max-w-[1024px] m-auto px-[24px] py-[60px]">
        <div className="flex flex-col gap-6">
          <Section name="Stova Health" statusPageUrl="https://stova.statuspage.io/">
            {console.log(stovaVitals)}

            <div className="flex flex-col divide-y divide-gray-200">
              {stovaVitals?.components?.map((component, key) => (
                <div className="flex py-2 gap-2" key={key}>
                  <div>{component.name}</div>
                  <div className="bg-green-200 text-green-600 px-2 py-1 rounded-full leading-none">{component.status}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section name="Webflow Health" statusPageUrl="https://webflow.statuspage.io/">
            <div className="flex flex-col divide-y divide-gray-200">
              {webflowVitals?.components?.map(
                (component, key) =>
                  component.showcase && (
                    <div className="flex py-2 gap-2" key={key}>
                      <div>{component.name}</div>
                      <div className="bg-green-200 text-green-600 px-2 py-1 rounded-full leading-none">{component.status}</div>
                    </div>
                  )
              )}
            </div>
          </Section>

          <Section name="Incidents">
            {/* <div>incident table</div> */}
            {webflowVitals?.incidents?.length > 0 ? data.incidents.map((incident, index) => <div key={index}>{incident.description}</div>) : <p>No incidents</p>}
          </Section>

          <Section name="Scheduled Maintenance">
            {/* <div>maintenance calendar</div> */}
            {webflowVitals?.scheduled_maintenances?.length > 0 ? data.scheduled_maintenances.map((maintenance, index) => <div key={index}>{maintenance.description}</div>) : <p>No maintenance scheduled</p>}
          </Section>
        </div>
      </main>
    </>
  );
}

export default App;
