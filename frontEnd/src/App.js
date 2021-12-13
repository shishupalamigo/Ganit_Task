import { useEffect, useState } from "react";
import { getData, postData } from "./api/api";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    getData("/api/currentExchange").then((res) => setData(res.data.exchangeData))
  }, [])
  console.log(data, "data");

  let ratesData = [];
  if (data !== null) {
    ratesData = Object.keys(data.rates).map(key => { 
      return [(key), data.rates[key]]
     })
  }
  // console.log(ratesData, "rates");
  return (
    <div>
    { data && data !== null && (
      <>
      <h2>Base : {data.base}</h2>
      <h3>Date: {data.date}</h3>
      <h2>Exchange Rates</h2>
      {ratesData.map(elm =>  <h4 key={elm[1]}>{`${elm[0]}: ${elm[1]}`}</h4>)}
      </>
    )}
    </div>
  );
}
export default App;