export const protsent = (cash_summa, click_summa) => {
  const total = cash_summa + click_summa;
  let cash_protsent, click_protsent;
  if (total !== 0) {
    cash_protsent = ((cash_summa / total) * 100).toFixed(2);
    click_protsent = ((click_summa / total) * 100).toFixed(2);
    return { cash_protsent, click_protsent };
  } else {
    return { cash_protsent: 0, click_protsent: 0 };
  }
};
