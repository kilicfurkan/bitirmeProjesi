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

export const deleteReservation = async (rezervasyonId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/rezervasyonlar/rezervasyonSil`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rezervasyonId }),
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
    console.error('Rezervasyon silinirken hata oluştu:', error);
    throw error;
  }
}

export const adminLogin = async (kullaniciAdi, sifre) => {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/adminGiris`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kullaniciAdi, sifre }),
    });

    const contentType = res.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.hata || 'Bilinmeyen bir hata oluştu');
      }

      return data;
    } else {
      const text = await res.text();
      throw new Error(`Beklenmeyen cevap: ${text}`);
    }
  } catch (error) {
    console.error('Admin girişi sırasında hata oluştu:', error);
    throw error;
  }
}

export const getAllReservations = async (date) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Yetkilendirme tokenı bulunamadı.');
    }

    const url = date 
      ? `${BASE_URL}/api/admin/rezervasyonlariGetir?date=${date}` 
      : `${BASE_URL}/api/admin/rezervasyonlariGetir`;
    
    console.log('getAllReservations URL:', url); // Debug: URL'yi kontrol et
    console.log('getAllReservations Date:', date); // Debug: Tarih parametresi

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      console.log('getAllReservations Response:', data); // Debug: Backend yanıtı

      if (!res.ok) {
        throw new Error(data.hata || 'Bilinmeyen bir hata oluştu.');
      }

      return data;
    } else {
      const text = await res.text();
      throw new Error(`Beklenmeyen cevap: ${text}`);
    }
  } catch (error) {
    console.error('Tüm rezervasyonlar alınırken hata oluştu:', error.message);
    throw error;
  }
};

export const acceptReservation = async (rezervasyonId) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Yetkilendirme tokenı bulunamadı.');
    }

    const res = await fetch(`${BASE_URL}/api/admin/rezervasyonKabul`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ rezervasyonId }),
    });

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.hata || 'Bilinmeyen bir hata oluştu.');
      }

      return data;
    } else {
      const text = await res.text();
      throw new Error(`Beklenmeyen cevap: ${text}`);
    }
  } catch (error) {
    console.error('Rezervasyon kabul edilirken hata oluştu:', error.message);
    throw error;
  }
};

export const cancelReservation = async (rezervasyonId) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Yetkilendirme tokenı bulunamadı.');
    }

    const res = await fetch(`${BASE_URL}/api/admin/rezervasyonIptal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ rezervasyonId }),
    });

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.hata || 'Bilinmeyen bir hata oluştu.');
      }

      return data;
    } else {
      const text = await res.text();
      throw new Error(`Beklenmeyen cevap: ${text}`);
    }
  } catch (error) {
    console.error('Rezervasyon iptal edilirken hata oluştu:', error.message);
    throw error;
  }
};