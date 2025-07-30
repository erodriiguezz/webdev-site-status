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

  // const [incident, setIncident] = useState("");

  // useEffect(() => {
  //   if (webflowVitals?.incidents.length) {
  //     setIncident(webflowVitals.incidents[0].name);
  //   }
  // }, [webflowVitals]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // e.g., "7/28/2025, 10:20 AM"
  };

  const toSentenceCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <>
      <main className="w-full max-w-[1024px] m-auto px-[24px] py-[60px]">
        <div className="flex flex-col gap-6">
          <section>
            {console.log(webflowVitals)}

            <div className="mb-6">
              <h2 className="mb-0">
                <a href="https://status.webflow.com/" target="_blank">
                  Webflow
                </a>
              </h2>
              <p className="text-gray-500">Status: {webflowVitals?.status?.description}</p>
            </div>

            <div className="grid grid-cols-[1fr,0.5fr] gap-6">
              {/* report */}
              <div>
                <h3 className="mb-4">Incidents</h3>

                {webflowVitals?.incidents.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {webflowVitals?.incidents?.map((incident, index) => (
                      <div key={index} className="mb-6 border rounded-lg bg-white">
                        <div className="bg-slate-200 rounded-t-lg p-4">
                          <p className="text-lg/6 font-semibold text-gray-800">{incident.name}</p>
                          <p className="text-sm text-gray-500">Created At: {formatDate(incident.created_at)}</p>
                        </div>

                        <div className="px-4 py-2 flex flex-col divide-y divide-gray-200">
                          {incident.incident_updates?.slice(0, 3).map((update, updateIndex) => (
                            <div key={updateIndex} className="py-2 text-sm text-gray-500 flex flex-col gap-2">
                              <p>
                                <span className="font-bold">Status</span>: {toSentenceCase(update.status)}
                              </p>

                              <p>
                                <span className="font-bold">Updated</span>: {formatDate(update.created_at)}
                              </p>

                              {update.affected_components?.length > 0 && (
                                <p>
                                  <span className="font-bold">Affected</span>:{" "}
                                  {update.affected_components.map((component, i) => (
                                    <span key={i}>
                                      {component.name}
                                      {i < update.affected_components.length - 1 && "; "}
                                    </span>
                                  ))}
                                </p>
                              )}

                              <p>{update.body}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No incidents reported.</p>
                )}
              </div>

              {/* vitals */}
              <div className="flex flex-col divide-y divide-gray-200">
                {webflowVitals?.components?.map((component, key) => (
                  <div className="flex items-center justify-between py-2 gap-1" key={key}>
                    <p className="text-sm text-gray-500">{component.name}</p>
                    <p className={`${colorVariants[indicator[component.status].color]} px-2 py-1 rounded-full leading-none text-xs`}>{indicator[component.status].text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

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
