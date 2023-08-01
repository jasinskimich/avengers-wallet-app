import { createSelector } from "@reduxjs/toolkit";

export const selectCategorySummary = (state) => state.chart.categorySummary;

export const selectIncomeSummary = (state) => state.chart.incomeSummary;

export const selectExpenseSummary = (state) => state.chart.expenseSummary;

export const selectPeriodTotal = (state) => state.chart.periodTotal;

export const selectYear = (state) => state.chart.year;

export const selectMonth = (state) => state.chart.month;

export const selectChartCategories = createSelector(
  [selectCategorySummary],
  (categorySummary) => {
    if (categorySummary) {
      return categorySummary.filter((e) => e.total > 0);
    }
    return [];
  }
);

const rainbowColors = (nr) => {
  let colors = [];
  for (let i = 0; i < nr; i++) {
    colors.push("hsl(" + (360 * i) / nr + ",80%,50%)");
  }
  return colors;
};

export const selectChartColors = createSelector(
  [selectChartCategories],
  (chartCategories) => {
    if (chartCategories.length > 0) {
      return rainbowColors(chartCategories.length);
    }
    return [];
  }
);
