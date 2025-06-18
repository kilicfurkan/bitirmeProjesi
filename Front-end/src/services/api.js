const BASE_URL = 'http://localhost:3000';
import axios from "axios";

export const addReservation = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/api/rezervasyonlar/rezervasyonYap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const contentType = res.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const datas = await res.json();

      if (!res.ok) {
        throw new Error(datas.hata || 'Bilinmeyen bir hata oluştu');
      }

      return datas;
    } else {
      const text = await res.text();
      throw new Error(`Beklenmeyen cevap: ${text}`);
    }
  } catch (error) {
    console.error('Rezervasyon eklenirken hata oluştu:', error);
    throw error;
  }
};

export const findReservation = async ({ adSoyad, telefonNo }) => {
  return await axios.get(`${BASE_URL}/api/rezervasyonlar/rezervasyonSorgula`, {
    params: { adSoyad, telefonNo }
  });
};