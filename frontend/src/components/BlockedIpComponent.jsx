import React from "react";

const BlockedIpComponent = ({ data }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  // Render the blocked_ip data
  console.log(data, "koki");
  return (
    <div className="bg-white shadow rounded-lg p-4 my-11">
      <h2 className="text-4xl font-bold mb-2">Blocked Ip</h2>
      <div className="border-t border-gray-300 pt-2">
        {/* Display the data from the 'data' object */}
        <p className="text-gray-600 mb-1">
          <span className="font-bold">IP Address: </span> {data.ip_address}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-bold">Date: </span>
          {formatDate(data.date)}
        </p>

        <p className="text-gray-600 mb-1">
          <span className="font-bold">incident_id: </span>
          {data.incident_id}
        </p>

        <p className="text-gray-600 mb-1">
          <span className="font-bold">Notes: </span>
          {data.notes}
        </p>
        {/* Add other fields as needed */}
      </div>
    </div>
  );
};

export default BlockedIpComponent;
