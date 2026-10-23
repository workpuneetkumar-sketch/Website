import React from "react";
import Link from "next/link";
import { Button } from "../buttons/Button";

export const IntegrationsSection: React.FC = () => {
  const comparisonRows = [
    {
      feature: "All-in-One Business OS",
      salesforce: "No",
      zoho: "Partial",
      odoo: "Partial",
      freshsales: "No",
      zyoris: "Yes",
    },
    {
      feature: "AI Insights (Built-in, Free)",
      salesforce: "Paid Add-on",
      zoho: "Basic only",
      odoo: "Basic",
      freshsales: "Limited",
      zyoris: "Full",
    },
    {
      feature: "Sales / CRM",
      salesforce: "Yes",
      zoho: "Yes",
      odoo: "Yes",
      freshsales: "Yes",
      zyoris: "Yes",
    },
    {
      feature: "HR Module",
      salesforce: "No",
      zoho: "Yes",
      odoo: "Yes",
      freshsales: "No",
      zyoris: "Yes",
    },
    {
      feature: "Finance Module",
      salesforce: "No",
      zoho: "Yes",
      odoo: "Yes",
      freshsales: "No",
      zyoris: "Yes",
    },
    {
      feature: "India-First Design & Pricing",
      salesforce: "No",
      zoho: "Partial",
      odoo: "No",
      freshsales: "No",
      zyoris: "Yes",
    },
    {
      feature: "Non-Technical Friendly",
      salesforce: "No",
      zoho: "No",
      odoo: "Partial",
      freshsales: "Partial",
      zyoris: "Yes",
    },
    {
      feature: "Unified Dashboard",
      salesforce: "No",
      zoho: "Partial",
      odoo: "Partial",
      freshsales: "No",
      zyoris: "Yes",
    },
    {
      feature: "Starting Price / User / Month",
      salesforce: "₹15,000+",
      zoho: "₹7,500",
      odoo: "₹6,500",
      freshsales: "₹5,500",
      zyoris: "₹4,500",
      isPrice: true,
    },
  ];

  return (
    <section id="comparison" className="section_home1_integrations">
      <div className="padding-global padding-section-medium">
        <div className="container-default">
          {/* Header */}
          <div className="header is-centered">
            <div className="max-width-large">
              <div
                animate="fade-up-1"
                data-animate="fade-up-1"
                className="text-style-badge is-badge"
              >
                <div>Feature Comparison</div>
              </div>
              <div className="spacer-xsmall"></div>
              <h2 animate="title" data-animate="title">
                Zyoris vs The Market — Feature by Feature
              </h2>
              <div className="spacer-tiny"></div>
              <div className="spacer-xxsmall"></div>
              <div className="max-width-medium align-center">
                <div
                  animate="fade-up-2"
                  data-animate="fade-up-2"
                  className="text-size-medium text-style-muted"
                >
                  Same price. More features. Better support. India-first.
                </div>
              </div>
              <div className="spacer-medium"></div>
            </div>
          </div>

          {/* Comparison Table Container */}
          <div
            animate="fade-up-3"
            data-animate="fade-up-3"
            className="w-full overflow-x-auto rounded-2xl border border-black/10 p-4 my-8 "
          >
            <table className="w-full text-left min-w-[640px] font-didactGothic">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-black bg-blue-500/10">
                  <th className="py-4 px-4 font-semibold">Feature</th>
                  <th className="py-4 px-4">Salesforce</th>
                  <th className="py-4 px-4">Zoho One</th>
                  <th className="py-4 px-4">Odoo</th>
                  <th className="py-4 px-4">Freshsales</th>
                  <th className="py-4 px-4 text-blue-400 font-bold bg-blue-500/10 rounded-t-lg">Zyoris</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5">
                {comparisonRows.map((row, idx) => {
                  const renderCell = (val: string) => (
                    <td
                      className={`py-3.5 px-4 ${
                        val === "No"
                          ? "text-red-400 font-medium"
                          : "text-black/60"
                      }`}
                    >
                      {val}
                    </td>
                  );

                  return (
                    <tr
                      key={idx}
                      className={`transition-colors hover:bg-white/5 ${
                        row.isPrice ? "font-bold text-white bg-white/5" : "text-white/80"
                      }`}
                    >
                      <td className="py-3.5 px-4 font-medium text-black">{row.feature}</td>
                      {renderCell(row.salesforce)}
                      {renderCell(row.zoho)}
                      {renderCell(row.odoo)}
                      {renderCell(row.freshsales)}
                      <td className="py-3.5 px-4 font-semibold text-blue-400 bg-blue-500/10">
                        {row.zyoris}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="text-center text-xs text-black/40 mt-4">
            ~ Competitor prices approximate as of May 2026 · Zyoris prices excl. GST
          </div>
        </div>
      </div>
    </section>
  );
};