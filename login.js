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
        // Tạo truy vấn để tìm người dùng theo MSV
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where("msv", "==", msv));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Lấy thông tin người dùng
            const userData = querySnapshot.docs[0].data();
            
            // So sánh mật khẩu
            if (userData.password === password) {
                console.log('Đăng nhập thành công!');
                
                // Kiểm tra và gán giá trị role
                const userRole = userData.role !== undefined ? userData.role : 'member';

                // Hiển thị thông tin người dùng
                console.log('Thông tin người dùng:', {
                    MSV: userData.msv,
                    Email: userData.email,
                    Role: userRole,
                });

                // Cập nhật HTML với thông tin người dùng
                document.getElementById('userMsv').textContent = `Mã sinh viên: ${userData.msv}`;
                document.getElementById('userEmail').textContent = `Email: ${userData.email}`;
                document.getElementById('userRole').textContent = `Quyền: ${userRole}`;
                
                // Hiển thị phần thông tin người dùng
                document.getElementById('userInfo').style.display = 'block';

                // Ẩn form đăng nhập
                document.getElementById('loginForm').classList.add('hidden');
            } else {
                console.error('Mật khẩu không chính xác.');
            }
        } else {
            console.error('Không tìm thấy người dùng với mã sinh viên này.');
        }
    } catch (error) {
        console.error('Lỗi khi truy cập Firestore:', error.message);
    }
});
