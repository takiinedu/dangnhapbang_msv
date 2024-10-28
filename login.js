// Nhập các hàm cần thiết từ SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Cấu hình ứng dụng Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDUPrrqrwxKWUTN1MD8gFBZrWVceem_akg",
    authDomain: "login-c082a.firebaseapp.com",
    databaseURL: "https://login-c082a-default-rtdb.firebaseio.com",
    projectId: "login-c082a",
    storageBucket: "login-c082a.appspot.com",
    messagingSenderId: "782243237767",
    appId: "1:782243237767:web:6fd691f122bdd840b38d22",
    measurementId: "G-MLY60106H5"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('loginBtn').addEventListener('click', async () => {
    const msv = document.getElementById('msvInput').value;
    const password = document.getElementById('passwordInput').value;

    try {
        const usersRef = collection(db, 'users');
        let q;

        if (msv.includes('@')) {
            q = query(usersRef, where("email", "==", msv));
        } else {
            q = query(usersRef, where("msv", "==", msv));
        }

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            
            if (userData.password === password) {
                console.log('Đăng nhập thành công!');
                const userRole = userData.role !== undefined ? userData.role : 'member';

                console.log('Thông tin người dùng:', {
                    MSV: userData.msv,
                    Email: userData.email,
                    Role: userRole,
                });

                document.getElementById('userMsv').textContent = `Mã sinh viên: ${userData.msv}`;
                document.getElementById('userEmail').textContent = `Email: ${userData.email}`;
                document.getElementById('userRole').textContent = `Quyền: ${userRole}`;
                
                document.getElementById('userInfo').style.display = 'block';
                document.getElementById('loginForm').classList.add('hidden');
            } else {
                console.error('Mật khẩu không chính xác.');
            }
        } else {
            console.error('Không tìm thấy người dùng với mã sinh viên hoặc email này.');
        }
    } catch (error) {
        console.error('Lỗi khi truy cập Firestore:', error.message);
    }
});
