import React from "react";
import Chart from "react-apexcharts";
import { purchaseList } from "../helpers/lists";

function MostPurchasedProductsChart() {
  // Process the purchases to aggregate purchase amounts by product
  const productPurchases = purchaseList.reduce((acc, item) => {
    if (!item.product || typeof item.amount !== "number") return acc; // Ensure valid product and amount
    acc[item.product] = (acc[item.product] || 0) + item.amount;
    return acc;
  }, {});

  // Sort products by purchase amount in descending order
  const sortedProducts = Object.entries(productPurchases).sort(
    (a, b) => b[1] - a[1]
  );

  // Separate the top 3 products and group the rest as "Others"
  const top3Products = sortedProducts.slice(0, 3);
  const otherProducts = sortedProducts.slice(3);

  const colorPalette = {
    [top3Products[0][0]]: "#0090FF",
    [top3Products[1][0]]: "#00E396",
    [top3Products[2][0]]: "#FEB019",
    Others: "#FF4560",
  };

  // Calculate "Others" total
  const othersTotal = otherProducts.reduce(
    (acc, [, amount]) => acc + amount,
    0
  );

  // Prepare labels and amounts for the chart
  const productNames = [
    ...top3Products.map(([name]) => name),
    othersTotal > 0 ? "Others" : "",
  ].filter(Boolean);

  const productAmounts = [
    ...top3Products.map(([, amount]) => amount),
    othersTotal,
  ].filter(Boolean);

  // Calculate total purchases for percentage calculations
  const totalPurchases = productAmounts.reduce((a, b) => a + b, 0);

  // Handle case when productPurchases array might be empty or undefined
  if (productNames.length === 0 || productAmounts.length === 0) {
    return <div>No product purchase data available</div>;
  }

  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: productNames,
    title: {
      text: "Most Purchased Products",
      align: "center",
      style: {
        fontFamily: "Poppins, sans-serif",
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    legend: {
      show: false,
    },
    fill: {
      type: "solid",
    },
    colors: ["#0090FF", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const seriesIndex = opts.seriesIndex;
        const percentage =
          (opts.w.globals.series[seriesIndex] / totalPurchases) * 100;
        return percentage.toFixed(1) + "%";
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `Rs. ${value}`,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => `Rs. ${totalPurchases}`,
            },
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center bg-slate-50">
      <div className="flex flex-row p-6 items-center justify-center gap-4 w-full border border-blue-500 rounded-lg">
        <Chart
          options={chartOptions}
          series={productAmounts}
          type="donut"
          height={300}
        />
        <Legend colorPalette={colorPalette} />
      </div>
    </div>
  );
}

export default MostPurchasedProductsChart;

const Legend = ({ colorPalette }) => {
  return (
    <div className="flex flex-col space-y-2">
      {Object.entries(colorPalette).map(([product, color]) => (
        <div key={product} className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
          <span className="text-xs font-semibold font-poppins">{product}</span>
        </div>
      ))}
    </div>
  );
};
