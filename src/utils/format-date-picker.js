function formatDatePicker(date = new Date()) {
  // Agar date parametri berilmagan bo'lsa, joriy sanani oladi
  const d = new Date(date);

  // Yil, oy va kunni olish
  let year = d.getFullYear();
  let month = d.getMonth() + 1; // getMonth() 0 dan 11 gacha qaytaradi, shuning uchun 1 qo'shamiz
  let day = d.getDate();

  // Oy va kunni ikki xonali qilish uchun
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  // Formatni qaytarish
  return `${year}-${month}-${day}`;
}

export default formatDatePicker;