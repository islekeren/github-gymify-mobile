// Örnek kullanıcı verileri (gerçek uygulamada bu veriler backend'den gelecek)
const MOCK_USERS = [
  {
    email: '',
    password: '',
    name: 'Test Kullanici'
  }
];

export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    // Simüle edilmiş API gecikmesi
    setTimeout(() => {
      const user = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (user) {
        resolve({ ...user, password: undefined }); // Şifreyi client'a gönderme
      } else {
        reject(new Error('E-posta veya şifre hatalı'));
      }
    }, 1000);
  });
}; 