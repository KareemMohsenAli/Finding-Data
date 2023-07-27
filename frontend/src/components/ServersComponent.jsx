import React from 'react';

const ServersComponent = ({ data }) => {
    console.log(data,"aaaa")
  // Render the servers data
  return (
    <div className="bg-white shadow rounded-lg p-4 my-11">
    <h2 className="text-4xl font-bold mb-2">Server</h2>
    <div className="border-t border-gray-300 pt-2">
      {/* Display the data from the 'data' object */}
      <p className="text-gray-600 mb-1"><span className='font-bold'>IP Address: </span> {data.ip_address}</p>
      <p className="text-gray-600 mb-1"><span className='font-bold'>Name: </span>{data.name}</p>

      <p className="text-gray-600 mb-1"><span className='font-bold'>allowed_ports: </span>{data.allowed_ports}</p>
      <p className="text-gray-600 mb-1"><span className='font-bold'>allowed_services: </span>{data.allowed_services}</p>
      <p className="text-gray-600 mb-1"><span className='font-bold'>connected_with: </span>{data.connected_with}</p>

      <p className="text-gray-600 mb-1"><span className='font-bold'>notes: </span>{data.notes}</p>
      <p className="text-gray-600 mb-1"><span className='font-bold'>private_ip: </span>{data.private_ip}</p>
      <p className="text-gray-600 mb-1"><span className='font-bold'>public_ip: </span>{data.public_ip}</p>

      {/* Add other fields as needed */}
    </div>
  </div>
  );
};

export default ServersComponent;