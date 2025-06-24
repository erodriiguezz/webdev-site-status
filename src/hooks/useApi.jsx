import axios from "axios";
import { useEffect, useState } from "react";

const useApi = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios(url)
      .then((res) => setData(res.data))
      .catch(console.error);
  }, [url]);

  return data;
};
export default useApi;
