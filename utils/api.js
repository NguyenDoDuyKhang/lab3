import 'react-native-get-random-values';
import { v4 } from 'uuid';

// Hàm để ánh xạ dữ liệu người dùng
const mapContact = contact => {
  const {
    name, picture, phone, cell, email, location, gender
  } = contact;

  return {
    id: v4(),
    name: name.first + " " + name.last,
    avatar: picture.large,
    phone,
    cell,
    email,
    address: `${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.country}, ${location.postcode}`,
    gender, // Include gender in the mapped data
    favorite: Math.random() >= 0.5, // randomly generate favorite contacts
  };
};


// Hàm để lấy thông tin danh bạ từ API
const fetchContacts = async () => {
  const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
  const contactData = await response.json();
  return contactData.results.map(mapContact);
};

// Hàm để lấy thông tin người dùng từ API
const fetchUserContact = async () => {
  const response = await fetch('https://randomuser.me/api/?seed=fullstackio');
  const userData = await response.json();
  
  // Lấy thông tin người dùng gốc
  let user = userData.results[0];

  // Thay đổi thông tin người dùng theo ý mình
  user.name.first = "Nguyễn"; // Đổi tên người dùng thành "Nguyễn"
  user.name.last = "Đỗ Duy Khang"; // Đổi họ người dùng thành "Đỗ Duy Khang"
  user.phone = "0123-4567-89"; // Đổi số điện thoại
  user.email = "2124801030024@student.tdmu.vn"; // Thay đổi email

  // Thay đổi địa chỉ
  user.location = {
    street: { number: "", name: "Bến Cát" },
    city: "Bình Dương",
    state: "Bình Dương",
    country: "VN",
    postcode: "9999", // Thêm mã bưu chính nếu cần
  };

  // Thay đổi giới tính
  user.gender = "male"; // Đổi giới tính

  // Thay đổi ảnh đại diện
  user.picture.large = "https://www.m5s.vn/upload/images/meo-hoat-hinh-cute.jpg"; // Đổi URL ảnh
  user.picture.medium = "https://www.m5s.vn/upload/images/meo-hoat-hinh-cute.jpg"; // Đổi URL ảnh trung bình
  user.picture.thumbnail = "https://www.m5s.vn/upload/images/meo-hoat-hinh-cute.jpg"; // Đổi URL ảnh thumbnail
  
  // Trả về thông tin người dùng đã được cập nhật
  return mapContact(user);
};


// Hàm để lấy một người dùng ngẫu nhiên từ API
const fetchRandomContact = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const userData = await response.json();
  return mapContact(userData.results[0]);
};

export { fetchContacts, fetchUserContact, fetchRandomContact };
