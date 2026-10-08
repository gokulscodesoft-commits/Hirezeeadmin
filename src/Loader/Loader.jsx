import React from "react";

export const DashboardLoader = () => {
  return (
    <div className="dashboard-container space-y-8">

      {/* Top Cards */}
      <div className="top-row flex flex-wrap gap-4">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className={`w-[250px] h-[120px] bg-gray-300 rounded-lg animate-pulse`}
          ></div>
        ))}
      </div>

      {/* Graph Box */}
      <div className="graph-box w-[350] h-[250px] bg-gray-300 rounded-lg animate-pulse"></div>

      {/* Recruiters Table */}
      <div className="dashboard-section space-y-4">
        <div className="title-button2 flex justify-between">
          <div className="w-40 h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="table-container space-y-2">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="h-10 w-full bg-gray-300 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Seekers Table */}
      <div className="dashboard-section space-y-4">
        <div className="title-button2 flex justify-between">
          <div className="w-40 h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="table-container space-y-2">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="h-10 w-full bg-gray-300 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default function SubscriptionPlanLoader() {
  return (
    <div className="subscription-container animate-pulse">
      {/* 🔹 Top Cards Loader */}
      <div className="subscription-top-row">
        <div className="subscription-small-cards">
          <div className="subscription-cards-container flex gap-4">
            {/* Card 1 */}
            <div className="subscription-card bg-gray-200 rounded-lg p-4 w-[220px] h-[100px]"></div>
            {/* Card 2 */}
            <div className="subscription-card bg-gray-200 rounded-lg p-4 w-[220px] h-[100px]"></div>
          </div>
        </div>
      </div>

      {/* 🔹 Table Loader */}
      <div className="subscription-rec-seek mt-6">
        <div className="subscription-section">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
          </div>

          {/* Table Skeleton */}
          <div className="subscription-table-container">
            <table className="subscription-table w-full border-collapse">
              <thead>
                <tr>
                  {[
                    "Plan Name",
                    "Membership",
                    "Price",
                    "Posted On",
                    "Timespan",
                    "Content",
                    "Action",
                  ].map((header, idx) => (
                    <th key={idx} className="py-2 px-3 text-left">
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(4)].map((_, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-3 px-3">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-3 flex gap-2">
                      <div className="h-6 w-6 bg-gray-200 rounded"></div>
                      <div className="h-6 w-6 bg-gray-200 rounded"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export const BannerLoader = () => {
  return (
    <div className="homebanner-container space-y-8">
      {/* 🔹 Top Banner Preview Loader */}
      <div className="homebanner-top-row grid grid-cols-4 gap-4">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="w-60 h-28 bg-gray-300 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>

      {/* 🔹 Banner Table Loader */}
      <div className="homebanner-rec-seek space-y-4">
        <div className="homebanner-section space-y-4">
          {/* Table header shimmer */}
          <div className="banner-button flex justify-between items-center">
            <div className="w-40 h-6 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-28 h-8 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Table rows shimmer */}
          <div className="homebanner-table-container space-y-2">
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="w-full h-10 bg-gray-300 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SeekerSearchLoader = () => {
  return (
    <div className="p-6 animate-pulse">
      <div className="bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        {/* <div className="flex justify-between items-center mb-6">
          <h2 className="h-6 w-48 bg-gray-300 rounded"></h2>
          <div className="h-8 w-28 bg-gray-300 rounded"></div>
        </div> */}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {[1, 2, 3, 4].map((i) => (
                  <th key={i} className="px-4 py-2">
                    <div className="h-4 w-24 bg-gray-300 rounded mx-auto"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, i) => (
                <tr key={i} className="border-t">
                  {[...Array(4)].map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 w-28 bg-gray-200 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const SeekerProfileLoader = () => {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* 🔹 Top Cards */}
      
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div>
                <div className="h-4 w-24 bg-gray-300 rounded" />
                <div className="h-3 w-16 bg-gray-200 rounded mt-2" />
              </div>
            </div>
            <div className="h-6 w-12 bg-gray-300 rounded" />
          </div>
        ))}
      </div>

      {/* 🔹 Table Section */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-48 bg-gray-300 rounded" />
          <div className="flex space-x-3">
            <div className="h-8 w-24 bg-gray-300 rounded" />
            <div className="h-8 w-32 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {[1, 2, 3, 4, 5].map((i) => (
                  <th key={i} className="px-4 py-2">
                    <div className="h-4 w-20 bg-gray-300 rounded mx-auto" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, i) => (
                <tr key={i} className="border-t">
                  {[...Array(5)].map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 w-28 bg-gray-200 rounded" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const JobPostLoader = () => {
  return (
    <div className="p-6 animate-pulse">
      <div className="bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="h-6 w-56 bg-gray-300 rounded"></h2>
          <div className="h-8 w-32 bg-gray-300 rounded"></div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["Specification", "Posted on", "Created by", "Action"].map(
                  (col, idx) => (
                    <th key={idx} className="px-4 py-2">
                      <div className="h-4 w-24 bg-gray-300 rounded mx-auto"></div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-3">
                    <div className="h-4 w-28 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                    <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const RecruiterProfileLoader = () => {
  return (
    <div className="p-6 animate-pulse space-y-8">
      {/* 🔹 Top Row Small Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 w-28 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Recruiter List Table */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        {/* Title */}
        <div className="h-6 w-64 bg-gray-300 rounded mb-6"></div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["School", "Email", "Phone", "Pincode", "Membership"].map(
                  (col, idx) => (
                    <th key={idx} className="px-4 py-2 text-left">
                      <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-28 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-5 w-24 bg-gray-200 rounded-full"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🔹 Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <div className="h-8 w-16 bg-gray-300 rounded"></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-8 bg-gray-300 rounded"></div>
          ))}
          <div className="h-8 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const EducationLoader = () => {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* 🔹 Title */}
      <div className="flex items-center space-x-3">
        <div className="h-6 w-6 bg-gray-300 rounded" />
        <div className="h-6 w-40 bg-gray-300 rounded" />
      </div>

      {/* 🔹 Table */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {[1, 2, 3, 4].map((i) => (
                  <th key={i} className="px-4 py-2">
                    <div className="h-4 w-24 bg-gray-300 rounded mx-auto" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-t">
                  {[...Array(4)].map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div
                        className={`h-4 rounded ${
                          j === 3 ? "w-10 bg-gray-300" : "w-28 bg-gray-200"
                        }`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
