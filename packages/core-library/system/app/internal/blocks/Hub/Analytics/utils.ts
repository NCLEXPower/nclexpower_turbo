export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(num);
};

export const calculateGaugeData = (
  standardUsers: number,
  fastTrackUsers: number
) => {
  const total = standardUsers + fastTrackUsers;
  if (total === 0) return { standardUsers: 0, fastTrackUsers: 0 };
  return {
    standardUsers: (standardUsers / total) * 100,
    fastTrackUsers: (fastTrackUsers / total) * 100,
  };
};
