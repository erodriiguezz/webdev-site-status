import { useEffect, useState } from "react";
import axios from "axios";

import Section from "./components/Section";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://status.webflow.com/api/v2/summary.json")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <main className="w-full max-w-[1024px] m-auto px-[24px] py-[60px]">
        {/* <p className="">Webflow: {data?.status?.description}</p> */}

        <div className="flex flex-col gap-6">
          <Section name="Webflow Health">
            <div className="flex flex-col divide-y divide-gray-200">
              {data?.components?.map(
                (component) =>
                  component.showcase && (
                    <div className="flex py-2 gap-2">
                      <img src="" alt="" />

                      <div>{component.name}</div>
                      <div>{component.status}</div>
                    </div>
                  )
              )}
            </div>
          </Section>

          <Section name="Incidents">
            <div>incident table</div>
          </Section>

          <Section name="Scheduled Maintenance">
            <div>maintenance calendar</div>
          </Section>
        </div>
      </main>
    </>
  );
}

export default App;
