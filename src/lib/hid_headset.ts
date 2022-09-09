
const initialItem = (usage: number, item: HIDReportItem): HIDReportItem => {
  return {
    'hasNull': item.hasNull,
    'hasPreferredState': item.hasPreferredState,
    'isAbsolute': item.isAbsolute,
    'isArray': item.isArray,
    'isBufferedBytes': item.isBufferedBytes,
    'isConstant': item.isConstant,
    'isLinear': item.isLinear,
    'isRange': false,
    'isVolatile': item.isVolatile,
    'logicalMaximum': item.logicalMaximum,
    'logicalMinimum': item.logicalMinimum,
    'physicalMaximum': item.physicalMaximum,
    'physicalMinimum': item.physicalMinimum,
    'reportCount': 1,
    'reportSize': 1,
    'unitExponent': item.unitExponent,
    'unitFactorCurrentExponent': item.unitFactorCurrentExponent,
    'unitFactorLengthExponent': item.unitFactorLengthExponent,
    'unitFactorLuminousIntensityExponent':
        item.unitFactorLuminousIntensityExponent,
    'unitFactorMassExponent': item.unitFactorMassExponent,
    'unitFactorTemperatureExponent': item.unitFactorTemperatureExponent,
    'unitFactorTimeExponent': item.unitFactorTimeExponent,
    'unitSystem': item.unitSystem,
    'usages': [usage],
    'wrap': item.wrap,
  };
};


export const hidHeadset = async (reports: HIDReportInfo[]) => {
  for (const report of reports) {
    if (report.items === undefined || report.reportId === undefined) {
      continue;
    }

    for (const item of report.items) {
      if (!item.isRange) {
        continue;
      }

      const {usageMinimum, usageMaximum} = item;

      if (usageMaximum && usageMinimum) {
        const byteSize = usageMaximum - usageMinimum;
        for (let i=0; i<=byteSize; i++) {
          report.items[i] = initialItem(usageMinimum + i, item);
        }
      }
    }
  }
};

