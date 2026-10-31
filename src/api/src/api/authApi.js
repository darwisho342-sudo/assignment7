export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Demo account check: student email as username & demo123456 as password
      if (password === 'demo123456' && username.trim().length > 0) {
        resolve({ username });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
}