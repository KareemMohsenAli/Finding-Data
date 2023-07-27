import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IocsComponent from "./IocsComponent.jsx";
import ServersComponent from "./ServersComponent.jsx";
import BlockedIpComponent from "./BlockedIpComponent.jsx";
import SearchBar from "./SearchBar.jsx";
// import ProductDetails from './ProductDetails';
function SearchFeed() {
  const navigate = useNavigate();
  const { SearchTerm } = useParams();
  const [servers, setServers] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/user/search?searchKey=${SearchTerm}`, {
        headers: { "Content-Type": "application/json", Authorization: token },
      })
      .then((response) => {
        // Handle the response data
        console.log(response.data);
        if (response.data?.results) {
          setServers(response.data.results);
        } else {
          localStorage.removeItem("token");
          navigate("/");
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  }, [SearchTerm]);

  const allServersComponents =
    servers &&
    servers.map((product, index) => {
      if (product.ip_address && product.name) {
        return <ServersComponent key={index} data={product} />;
      } else if (product.ip_address && product.incident_id) {
        return <BlockedIpComponent key={index} data={product} />;
      } else if (product.ip_address && product.month) {
        return <IocsComponent key={index} data={product} />;
      } else {
        return null;
      }
    });
  return (
    <>
      <div className="w-[50%] m-auto mt-5">
          <SearchBar />
        </div>
      <h6 class="  text-4xl py-3  font-bold tracking-tight text-slate-100  px-4 ">
        Search For Result for : {SearchTerm}
      </h6>
    

      {allServersComponents}
    </>
  );
}

export default SearchFeed;
