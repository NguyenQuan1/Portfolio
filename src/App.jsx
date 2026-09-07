import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import avatar from './public/Avatar.jpg';
import dolaPreview from './public/dola-restaurant-preview.png';
import profilePreview from './public/profile-preview.png';
import {
  Github, Linkedin, Mail, Phone, MapPin,
  Download, ExternalLink, GitBranch, GraduationCap, ChevronRight,
  Files, Search, GitFork, Blocks, Settings, Wifi, CheckCircle2, Circle,
  Sun, Moon, Languages, Award, Send, Copy, Check, Sparkles,
  X, Code2, Layers, Cpu, Volume2, VolumeX, Eye, ArrowUp
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Personal Info & Social Configuration                              */
/* ------------------------------------------------------------------ */
const CONTACT_INFO = {
  name: 'Nguyễn Trọng Quân',
  role: 'Full Stack Developer',
  roleVi: 'Lập trình viên Full Stack',
  email: 'quannguyen.dev74@gmail.com',
  phoneDisplay: '0868 089 371',
  phoneTel: 'tel:0868089371',
  location: 'Đà Nẵng, Việt Nam',
  locationEn: 'Da Nang, Vietnam',
  github: 'https://github.com/NguyenTrongQuan',
  linkedin: 'https://www.linkedin.com/in/nguyentrongquan/',
  cvUrl: '/Nguyen_Trong_Quan_CV.pdf',
  school: 'FPT Polytechnic Đà Nẵng',
  schoolEn: 'FPT Polytechnic Da Nang',
  highSchool: 'THPT Hướng Hoá',
  highSchoolEn: 'Huong Hoa High School',
  gpa: '3.44 / 4.0',
};

const NAV_ITEMS = [
  { id: 'home', label: 'home.tsx' },
  { id: 'about', label: 'about.tsx' },
  { id: 'skills', label: 'skills.json' },
  { id: 'projects', label: 'projects.tsx' },
  { id: 'experience', label: 'experience.log' },
  { id: 'certificates', label: 'certs.json' },
  { id: 'contact', label: 'contact.sh' },
];

const UI = {
  en: {
    sayHi: '$ contact',
    internship: 'open to fresher opportunities',
    greeting: "Hi, I'm",
    role: 'Full Stack Developer',
    progress: 'Fresher seeking full-time role',
    intro: "I build modern web applications and learn something new every day — currently seeking a full-time fresher position where I can contribute to real-world products.",
    viewProjects: 'View Projects',
    downloadCv: 'Download CV',
    previewCv: 'Preview CV',
    years: 'years learning',
    shipped: 'projects shipped',
    technologies: 'technologies',
    commitment: 'commitment',
    about: 'About Me',
    aboutText: "I'm a Full Stack Developer graduated from FPT Polytechnic Da Nang. I enjoy crafting clean, maintainable code with intuitive user interfaces, and I am always eager to learn and conquer new challenges.",
    techStack: 'Tech Stack & Workflow',
    projects: 'Featured Projects',
    viewDetails: 'View Details',
    closeModal: 'Close',
    experience: 'Experience & Timeline',
    education: 'Education',
    certificates: 'Certificates & Honors',
    contactTitle: "Let's talk.",
    contactText: "I'm actively seeking a fresher opportunity to grow with an experienced engineering team. Feel free to reach out anytime — I reply promptly.",
    email: 'Email',
    call: 'Call',
    copy: 'Copy',
    copied: 'Copied!',
    sendMessage: 'Send Message',
    messageSent: 'Message sent successfully! Quan will get back to you soon.',
    namePlaceholder: 'Your Name or Company...',
    emailPlaceholder: 'your.email@example.com',
    messagePlaceholder: 'Tell me about your fresher opening, team or project...',
    available: 'available',
    focus: 'web products + UX/UI',
    location: 'Da Nang, VN',
    profileRole: 'full_stack_developer',
    noProblems: 'no problems',
    online: 'online',
    internReady: 'fresher-ready',
    inspectTag: 'click to inspect',
    openInMail: 'or open in Mail client',
    language: 'VI',
    liveDemo: 'Live Demo',
    sourceCode: 'Source Code',
    filterAll: 'All',
    filterFullStack: 'Full Stack',
    filterBackend: 'Backend',
    filterFrontend: 'Frontend',
    soundOn: 'Sound: ON',
    soundOff: 'Sound: OFF',
    skillGroups: { frontend: 'frontend', backend: 'backend', tools: 'tools', workflow: 'workflow' },
    aiAssistantTitle: 'Dev Assistant AI',
    aiGreeting: "Hi! I'm Quan's Portfolio Assistant. Ask me anything about his tech stack, featured projects, or fresher readiness!",
  },
  vi: {
    sayHi: '$ liên-hệ',
    internship: 'đang tìm cơ hội fresher',
    greeting: 'Xin chào, tôi là',
    role: 'Lập trình viên Full Stack',
    progress: 'Fresher tìm vị trí toàn thời gian',
    intro: 'Tôi xây dựng các sản phẩm web và luôn học thêm điều mới mỗi ngày — hiện đang tìm vị trí fresher để biến sự tò mò đó thành sản phẩm thực tế.',
    viewProjects: 'Xem dự án',
    downloadCv: 'Tải CV',
    previewCv: 'Xem nhanh CV',
    years: 'năm học tập',
    shipped: 'dự án hoàn thành',
    technologies: 'công nghệ',
    commitment: 'cam kết',
    about: 'Về tôi',
    aboutText: 'Tôi là lập trình viên Full Stack tốt nghiệp FPT Polytechnic Đà Nẵng. Tôi thích biến ý tưởng thành sản phẩm hoạt động tốt với code rõ ràng và giao diện dễ sử dụng.',
    techStack: 'Công nghệ & Phương pháp làm việc',
    projects: 'Dự án nổi bật',
    viewDetails: 'Xem chi tiết',
    closeModal: 'Đóng',
    experience: 'Kinh nghiệm & Quá trình',
    education: 'Học vấn',
    certificates: 'Chứng chỉ & Thành tích',
    contactTitle: 'Hãy cùng trao đổi.',
    contactText: 'Tôi đang tìm cơ hội fresher để học hỏi từ đội ngũ thực tế và cùng tạo ra sản phẩm. Hãy liên hệ với tôi, tôi sẽ phản hồi nhanh.',
    email: 'Email',
    call: 'Gọi điện',
    copy: 'Sao chép',
    copied: 'Đã sao chép!',
    sendMessage: 'Gửi tin nhắn',
    messageSent: 'Đã gửi lời nhắn thành công! Quân sẽ phản hồi sớm nhất.',
    namePlaceholder: 'Tên của bạn hoặc quý công ty...',
    emailPlaceholder: 'email.cua.ban@congty.com',
    messagePlaceholder: 'Nội dung trao đổi về cơ hội fresher hoặc dự án...',
    available: 'sẵn sàng',
    focus: 'sản phẩm web + UX/UI',
    location: 'Đà Nẵng, VN',
    profileRole: 'lap_trinh_vien_full_stack',
    noProblems: 'không có lỗi',
    online: 'trực tuyến',
    internReady: 'fresher sẵn sàng',
    inspectTag: 'nhấp để xem chi tiết',
    openInMail: 'hoặc mở qua ứng dụng Email',
    language: 'EN',
    liveDemo: 'Xem Demo',
    sourceCode: 'Mã nguồn GitHub',
    filterAll: 'Tất cả',
    filterFullStack: 'Full Stack',
    filterBackend: 'Backend',
    filterFrontend: 'Frontend',
    soundOn: 'Âm thanh: BẬT',
    soundOff: 'Âm thanh: TẮT',
    skillGroups: { frontend: 'giao diện', backend: 'máy chủ', tools: 'công cụ', workflow: 'quy trình' },
    aiAssistantTitle: 'Trợ lý AI Portfolio',
    aiGreeting: 'Xin chào! Tôi là Trợ lý AI của Quân. Bạn có thể hỏi tôi về kỹ năng, kinh nghiệm dự án hoặc cách thức liên hệ phỏng vấn Quân!',
  },
};

const COLOR = {
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500', bgSoft: 'bg-emerald-950', border: 'border-emerald-800', hoverBorder: 'hover:border-emerald-700', dot: 'bg-emerald-400', shadow: 'hover:shadow-emerald-500/20' },
  sky: { text: 'text-sky-400', bg: 'bg-sky-500', bgSoft: 'bg-sky-950', border: 'border-sky-800', hoverBorder: 'hover:border-sky-700', dot: 'bg-sky-400', shadow: 'hover:shadow-sky-500/20' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500', bgSoft: 'bg-amber-950', border: 'border-amber-800', hoverBorder: 'hover:border-amber-700', dot: 'bg-amber-400', shadow: 'hover:shadow-amber-500/20' },
  violet: { text: 'text-violet-400', bg: 'bg-violet-500', bgSoft: 'bg-violet-950', border: 'border-violet-800', hoverBorder: 'hover:border-violet-700', dot: 'bg-violet-400', shadow: 'hover:shadow-violet-500/20' },
  rose: { text: 'text-rose-400', bg: 'bg-rose-500', bgSoft: 'bg-rose-950', border: 'border-rose-800', hoverBorder: 'hover:border-rose-700', dot: 'bg-rose-400', shadow: 'hover:shadow-rose-500/20' },
};

const SKILLS = [
  { group: 'frontend', color: 'sky', items: [{ name: 'React', icon: 'react' }, { name: 'Vue.js', icon: 'vuejs' }, { name: 'TypeScript', icon: 'typescript' }, { name: 'JavaScript (ES6+)', icon: 'javascript' }, { name: 'Tailwind CSS', icon: 'tailwindcss' }, { name: 'HTML5/CSS3', icon: 'html5' }, { name: 'Figma UI/UX', icon: 'figma' }] },
  { group: 'backend', color: 'emerald', items: [{ name: 'NestJS', icon: 'nestjs' }, { name: 'Node.js', icon: 'nodejs' }, { name: 'Express.js', icon: 'express' }, { name: 'MySQL', icon: 'mysql' }, { name: 'PHP / Laravel', icon: 'laravel' }, { name: 'RESTful API', icon: 'fastapi' }] },
  { group: 'tools', color: 'amber', items: [{ name: 'Git & GitHub', icon: 'git' }, { name: 'Docker (Basic)', icon: 'docker' }, { name: 'Postman', icon: 'postman' }, { name: 'VS Code', icon: 'vscode' }, { name: 'Linux CLI', icon: 'linux' }, { name: 'WordPress', icon: 'wordpress' }] },
  { group: 'workflow', color: 'violet', items: [{ name: 'Clean Architecture', icon: 'unifiedmodelinglanguage' }, { name: 'Git Flow & PRs', icon: 'github' }, { name: 'Agile / Scrum', icon: 'trello' }, { name: 'Database Design', icon: 'postgresql' }] },
];

const DEVICON_CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const PROJECTS = [
  {
    id: 'personal-portfolio',
    file: 'PersonalPortfolio.tsx',
    title: 'Personal Portfolio',
    category: ['frontend', 'fullstack'],
    role: 'Frontend Developer',
    roleVi: 'Lập trình viên Frontend',
    demo: 'https://portfolio-nine-delta-8fuz89g2cp.vercel.app/',
    preview: profilePreview,
    github: 'https://github.com/NguyenQuan1/Portfolio',
    desc: 'Interactive developer portfolio with an editor-inspired interface, bilingual content, theme switching, project filters, and an AI assistant.',
    descVi: 'Portfolio cá nhân tương tác với giao diện lấy cảm hứng từ trình soạn thảo code, hỗ trợ song ngữ, đổi theme, lọc dự án và trợ lý AI.',
    features: [
      'Editor-inspired portfolio interface with animated sections',
      'Vietnamese and English language switching',
      'Dark and soft light theme modes',
      'Project category filters and detailed case-study modals',
      'Built-in portfolio AI assistant and contact form',
    ],
    featuresVi: [
      'Giao diện portfolio lấy cảm hứng từ code editor với animation',
      'Chuyển đổi ngôn ngữ Tiếng Việt và English',
      'Chế độ tối và sáng dịu mắt',
      'Bộ lọc dự án và modal xem chi tiết case study',
      'Trợ lý AI và form liên hệ tích hợp trong portfolio',
    ],
    techDetails: 'React, Vite, Tailwind CSS, Framer Motion, Lucide React',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'UX/UI'],
    color: 'violet',
  },
  {
    id: 'dola-restaurant',
    file: 'DolaRestaurant.tsx',
    title: 'Dola Restaurant',
    category: ['fullstack', 'backend', 'frontend'],
    role: 'Full Stack Developer',
    roleVi: 'Lập trình viên Full Stack',
    demo: 'https://dola-restaurant-psi.vercel.app/',
    github: 'https://github.com/NguyenQuan1/Dola-restaurant',
    preview: dolaPreview,
    desc: 'Full-stack restaurant management platform with real-time table reservation, dish ordering, and comprehensive administrative backoffice.',
    descVi: 'Hệ thống quản lý nhà hàng toàn diện: đặt bàn trực tuyến, gọi món theo danh mục và trang quản trị doanh thu, món ăn, hóa đơn.',
    features: [
      'Interactive food catalog with instant search & category filtering',
      'Table booking system with date/time picker & status tracking',
      'Admin Dashboard: Dish CRUD, reservation approvals, orders & revenue metrics',
      'JWT Authentication, Role-based Access Control (Admin/Customer)',
      'Responsive design optimized for both mobile & desktop',
    ],
    featuresVi: [
      'Danh mục thực đơn trực quan với tìm kiếm và lọc theo phân loại món ăn',
      'Đặt bàn trực tuyến chọn ngày giờ, số lượng khách và theo dõi trạng thái',
      'Trang quản trị (Admin): Quản lý món ăn, duyệt đơn đặt bàn, thống kê doanh thu',
      'Bảo mật với JWT Authentication, phân quyền người dùng (Admin / Khách hàng)',
      'Giao diện tương thích mượt mà trên cả máy tính và điện thoại',
    ],
    techDetails: 'React, Vite, NestJS, TypeORM / Prisma, MySQL, Tailwind CSS, Framer Motion',
    tags: ['React', 'NestJS', 'MySQL', 'Tailwind CSS', 'JWT', 'Socket.IO'],
    color: 'emerald',
  },
  {
    id: 'cinema-booking',
    file: 'CinemaBooking.tsx',
    title: 'Cinema Booking System',
    category: ['fullstack', 'backend', 'frontend'],
    role: 'Full Stack Developer (Backend Lead)',
    roleVi: 'Lập trình viên Full Stack (Trọng tâm Backend & DB)',
    demo: null,
    github: 'https://github.com/NguyenTrongQuan/cinema-booking-system',
    preview: null,
    desc: 'Movie ticketing web application with interactive seat selection, showtimes calendar, and simulated checkout flow.',
    descVi: 'Hệ thống đặt vé xem phim trực tuyến với sơ đồ chọn ghế theo thời gian thực, lịch chiếu theo rạp và quy trình thanh toán vé.',
    features: [
      'Dynamic cinema seat grid (Standard, VIP, Couple seats) with auto status locking',
      'Showtimes filtering by movie title, cinema branch, and screening date',
      'Snack & beverage addon bundle selection',
      'RESTful APIs with optimized MySQL indexing for high booking traffic',
      'E-ticket generation with booking code and QR simulation',
    ],
    featuresVi: [
      'Sơ đồ ghế ngồi thông minh (Ghế thường, VIP, Ghế đôi) với cơ chế giữ chỗ',
      'Tra cứu lịch chiếu linh hoạt theo tên phim, cụm rạp và khung giờ',
      'Chọn combo bắp nước đi kèm vào đơn hàng tiện lợi',
      'RESTful API với thiết kế CSDL MySQL tối ưu cho lưu lượng đặt vé',
      'Xuất mã vé điện tử và mã QR xác thực tại quầy rạp',
    ],
    techDetails: 'Vue.js / React, Node.js, Express.js, MySQL, REST API, Tailwind CSS',
    tags: ['Vue.js', 'Node.js', 'Express', 'MySQL', 'Tailwind'],
    color: 'sky',
  },
  {
    id: 'vietnam-travel',
    file: 'VietnamTravel.tsx',
    title: 'VietNam Travel Platform',
    category: ['fullstack', 'backend'],
    role: 'Full Stack Developer',
    roleVi: 'Lập trình viên Full Stack',
    demo: null,
    github: 'https://github.com/NguyenTrongQuan/vietnam-travel-platform',
    preview: null,
    desc: 'Domestic travel booking portal featuring curated destination itineraries, tour schedules, and customer review engine.',
    descVi: 'Website du lịch và đặt tour khám phá Việt Nam với danh sách hành trình phong phú, đặt chỗ nhanh và hệ thống đánh giá khách hàng.',
    features: [
      'Tour exploration catalog categorized by regions (North, Central, South)',
      'Detailed itinerary planner with cost estimation and inclusions list',
      'Booking request form with customer information validation',
      'Rating & review submission system with verified customer badges',
      'Admin management for adding tour schedules and price adjustments',
    ],
    featuresVi: [
      'Khám phá tour du lịch theo các vùng miền (Bắc, Trung, Nam) trực quan',
      'Xem chi tiết lịch trình từng ngày, bảng giá trọn gói và dịch vụ đi kèm',
      'Form đăng ký tư vấn & đặt tour với xác thực thông tin nhanh chóng',
      'Hệ thống gửi đánh giá & bình luận trải nghiệm của du khách',
      'Trang quản trị cập nhật lịch khởi hành và điều chỉnh giá tour theo mùa',
    ],
    techDetails: 'PHP, MySQL, Bootstrap 5, JavaScript, MVC Pattern',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'MVC'],
    color: 'violet',
  },
];

const EXPERIENCE = [
  {
    hash: '3',
    role: 'Full Stack Developer',
    roleVi: 'Lập trình viên Full Stack',
    place: 'Freelance & Independent Projects',
    placeVi: 'Freelance & Dự án Độc lập',
    period: '2026 — Present',
    periodVi: '2026 — Hiện tại',
    desc: 'Building and maintaining modern web products: full-stack restaurant ordering system, cinema booking platform, and scalable RESTful API services.',
    descVi: 'Xây dựng và phát triển các sản phẩm web: hệ thống đặt món nhà hàng, đặt vé trực tuyến và kiến trúc RESTful API.',
    color: 'emerald',
  },
  {
    hash: '2',
    role: 'Backend Developer Fresher (Project)',
    roleVi: 'Fresher Backend (Dự án thực tế)',
    place: 'Tech Solutions Co. / Practice Project',
    placeVi: 'Tech Solutions Co. / Dự án Thực hành',
    period: '2024 — 2025',
    periodVi: '2024 — 2025',
    desc: 'Designed RESTful APIs, optimized database schemas, and collaborated on seamless frontend integration.',
    descVi: 'Thiết kế RESTful API, tối ưu hoá cấu trúc database và phối hợp tích hợp mượt mà với frontend.',
    color: 'sky',
  },
  {
    hash: '1',
    role: 'Web Developer Student',
    roleVi: 'Sinh viên Lập trình Web',
    place: 'FPT Polytechnic Da Nang',
    placeVi: 'FPT Polytechnic Đà Nẵng',
    period: '2023 — 2024',
    periodVi: '2023 — 2024',
    desc: 'Graduated in Web Programming (GPA 3.44/4.0), mastering JavaScript, PHP, NestJS, and relational database design.',
    descVi: 'Tốt nghiệp chuyên ngành Lập trình Web tại FPT Polytechnic Đà Nẵng (GPA 3.44/4.0), làm chủ JavaScript, PHP, NestJS và CSDL.',
    color: 'amber',
  },
];

const CERTIFICATES = [
  {
    id: 'fpt-diploma',
    title: 'Diploma in Web Application Development (GPA 3.44 / 4.0)',
    titleVi: 'Bằng Tốt Nghiệp Cao Đẳng Lập Trình Web (GPA 3.44 / 4.0)',
    issuer: 'FPT Polytechnic Đà Nẵng',
    date: '2025',
    desc: 'Major in Web Programming - Graduated with Honors with a cumulative GPA of 3.44/4.0.',
    descVi: 'Chuyên ngành Lập trình Web - Đạt thành tích Giỏi với điểm trung bình tích lũy 3.44/4.0.',
    color: 'emerald',
    icon: GraduationCap,
  },
  {
    id: 'fullstack-js',
    title: 'Full Stack JavaScript Engineering (React & Node.js)',
    titleVi: 'Kỹ sư Full Stack JavaScript (React & Node.js)',
    issuer: 'FPT Poly / Dev Training',
    date: '2023 — 2024',
    desc: 'Building responsive SPAs with React, REST APIs with Express/NestJS, JWT Authentication, and relational databases.',
    descVi: 'Xây dựng ứng dụng SPA với React, REST API với Express/NestJS, xác thực JWT và cơ sở dữ liệu quan hệ.',
    color: 'sky',
    icon: Layers,
  },
  {
    id: 'db-design',
    title: 'Relational Database Design & MySQL Optimization',
    titleVi: 'Thiết kế CSDL Quan Hệ & Tối ưu hoá MySQL',
    issuer: 'Database Course Certification',
    date: '2023',
    desc: 'Database schema normalization (3NF), index optimization, and complex querying performance tuning.',
    descVi: 'Thiết kế lược đồ CSDL chuẩn hóa (3NF), tối ưu hóa chỉ mục Indexing và câu truy vấn phức tạp.',
    color: 'amber',
    icon: Cpu,
  },
];

const STATS = [
  { label: 'years learning', value: 3, suffix: '+' },
  { label: 'projects shipped', value: 15, suffix: '+' },
  { label: 'technologies', value: 20, suffix: '+' },
  { label: 'commitment', value: 100, suffix: '%' },
];

const BOOT_LINES = [
  '$ npm run dev',
  'vite v5.3.4 building for production...',
  '✓ compiling components/Hero.tsx',
  '✓ compiling components/Projects.tsx',
  '✓ resolving 15+ project dependencies',
  'ready in 380 ms',
];

const AI_KNOWLEDGE_BASE = [
  {
    triggers: ['kỹ năng', 'tech stack', 'skill', 'công nghệ', 'ngôn ngữ'],
    answerVi: 'Quân có thế mạnh về Full Stack Development với các công nghệ chính:\n• Frontend: React, Vue.js, TypeScript, JavaScript (ES6+), Tailwind CSS, Figma.\n• Backend: NestJS, Node.js, Express.js, PHP/Laravel, RESTful APIs.\n• Database & Tools: MySQL, Git/GitHub, Docker cơ bản, Postman, Linux CLI.',
    answerEn: "Quan specializes in Full Stack Web Development with:\n• Frontend: React, Vue.js, TypeScript, JavaScript (ES6+), Tailwind CSS, Figma.\n• Backend: NestJS, Node.js, Express.js, PHP/Laravel, RESTful APIs.\n• Database & Tools: MySQL, Git/GitHub, Docker (Basic), Postman, Linux CLI.",
  },
  {
    triggers: ['dự án', 'project', 'dola', 'cinema', 'sản phẩm', 'kinh nghiệm làm'],
    answerVi: 'Các dự án nổi bật của Quân gồm có:\n1. Dola Restaurant: Hệ thống quản lý nhà hàng & đặt bàn trực tuyến full-stack (React + NestJS + MySQL).\n2. Cinema Booking System: Ứng dụng đặt vé xem phim chọn ghế thời gian thực (Vue/React + Node.js).\n3. VietNam Travel: Nền tảng đặt tour du lịch nội địa (PHP + MySQL).',
    answerEn: "Quan's featured projects include:\n1. Dola Restaurant: Full-stack restaurant reservation & ordering platform (React + NestJS + MySQL).\n2. Cinema Booking System: Real-time movie ticket seat booking system (Vue/React + Node.js).\n3. VietNam Travel: Domestic travel & itinerary booking site (PHP + MySQL).",
  },
  {
    triggers: ['liên hệ', 'contact', 'email', 'sđt', 'phone', 'phỏng vấn', 'interview'],
    answerVi: `Bạn có thể liên hệ trực tiếp với Quân qua:\n• Email: ${CONTACT_INFO.email}\n• Số điện thoại: ${CONTACT_INFO.phoneDisplay}\n• GitHub: ${CONTACT_INFO.github}\n• LinkedIn: ${CONTACT_INFO.linkedin}\nQuân phản hồi rất nhanh và sẵn sàng tham gia phỏng vấn online hoặc offline tại Đà Nẵng!`,
    answerEn: `You can reach Quan directly via:\n• Email: ${CONTACT_INFO.email}\n• Phone: ${CONTACT_INFO.phoneDisplay}\n• GitHub: ${CONTACT_INFO.github}\n• LinkedIn: ${CONTACT_INFO.linkedin}\nQuan responds promptly and is ready for online or in-person interviews!`,
  },
  {
    triggers: ['fresher', 'intern', 'thời gian', 'khi nào', 'bắt đầu', 'start'],
    answerVi: 'Quân đã tốt nghiệp tại FPT Polytechnic và hiện đang sẵn sàng (Available) để bắt đầu làm việc toàn thời gian với vai trò fresher ngay lập tức!',
    answerEn: 'Quan has graduated from FPT Polytechnic and is currently Available to start a full-time fresher position immediately!',
  },
  {
    triggers: ['học vấn', 'education', 'gpa', 'trường', 'fpt', 'bằng cấp'],
    answerVi: `Quân tốt nghiệp chuyên ngành Lập trình Web tại FPT Polytechnic Đà Nẵng với GPA ấn tượng 3.44 / 4.0 (xếp loại Giỏi).`,
    answerEn: `Quan graduated in Web Programming from FPT Polytechnic Da Nang with an outstanding GPA of 3.44 / 4.0 (Honors Degree).`,
  },
];

/* ---------------- Audio Effect Synthesizer ---------------- */
function playMechanicalClick(enabled) {
  if (!enabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340 + Math.random() * 60, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.035);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch (e) {
    // Ignore audio restrictions
  }
}

/* ---------------------------- hooks ---------------------------- */

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function useTypewriter(text, speed = 55, startDelay = 0, start = true) {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    if (!start) return;
    let i = 0;
    let timer;
    const begin = setTimeout(() => {
      timer = setInterval(() => {
        i += 1;
        setDisplay(text.slice(0, i));
        if (i >= text.length) clearInterval(timer);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(begin);
      clearInterval(timer);
    };
  }, [text, speed, startDelay, start]);
  return display;
}

function CountUp({ value, suffix = '', duration = 1.2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* ------------------------- small building blocks ------------------------- */

function LineGutter({ from, to }) {
  const lines = [];
  for (let i = from; i <= to; i++) lines.push(i);
  return (
    <div className="hidden sm:flex flex-col items-end pr-4 pt-1 select-none flex-shrink-0 w-10 text-gray-700 font-mono text-xs leading-7">
      {lines.map((n) => (
        <span key={n}>{n}</span>
      ))}
    </div>
  );
}

function Reveal({ children, delay = 0, y = 24, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ index, filename, color }) {
  const c = COLOR[color];
  return (
    <Reveal className="flex items-center gap-2 mb-8">
      <span className={`font-mono text-xs ${c.text}`}>{index}</span>
      <span className="font-mono text-xs text-gray-600">//</span>
      <span className="font-mono text-xs text-gray-400 tracking-wide">{filename}</span>
      <motion.span
        className="h-px flex-1 bg-gray-800 ml-2 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </Reveal>
  );
}

function BootScreen({ onDone }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= BOOT_LINES.length) {
      const t = setTimeout(onDone, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 200 : 220);
    return () => clearTimeout(t);
  }, [shown, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-gray-950 flex items-center justify-center px-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-md font-mono text-sm">
        {BOOT_LINES.slice(0, shown).map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className={i === 0 ? 'text-gray-400' : i === BOOT_LINES.length - 1 ? 'text-emerald-400 mt-2' : 'text-gray-600'}
          >
            {line}
          </motion.p>
        ))}
        {shown < BOOT_LINES.length && <span className="inline-block w-2 h-4 bg-emerald-400 cursor-blink align-middle ml-0.5" />}
      </div>
    </motion.div>
  );
}


/* ---------------- Floating Symbols Background Layer ---------------- */
const FLOAT_SYMBOLS = [
  { text: '</>', color: 'text-emerald-500/[0.15]', x: '4%', dur: 18, delay: 0 },
  { text: '{}', color: 'text-sky-500/[0.14]', x: '11%', dur: 22, delay: 4 },
  { text: '=>', color: 'text-violet-500/[0.16]', x: '19%', dur: 15, delay: 9 },
  { text: 'npm', color: 'text-amber-500/[0.13]', x: '27%', dur: 25, delay: 2 },
  { text: '[]', color: 'text-emerald-500/[0.14]', x: '35%', dur: 20, delay: 14 },
  { text: 'fn()', color: 'text-sky-500/[0.15]', x: '44%', dur: 17, delay: 7 },
  { text: '//', color: 'text-gray-400/[0.18]', x: '52%', dur: 23, delay: 1 },
  { text: '&&', color: 'text-rose-500/[0.14]', x: '61%', dur: 19, delay: 11 },
  { text: '===', color: 'text-violet-500/[0.15]', x: '69%', dur: 26, delay: 5 },
  { text: '=>', color: 'text-emerald-500/[0.13]', x: '77%', dur: 16, delay: 16 },
  { text: '{}', color: 'text-sky-500/[0.16]', x: '85%', dur: 21, delay: 8 },
  { text: '</>', color: 'text-amber-500/[0.14]', x: '93%', dur: 14, delay: 3 },
];

function FloatingSymbols() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {FLOAT_SYMBOLS.map((s, i) => (
        <span
          key={i}
          className={`absolute bottom-0 font-mono text-sm font-bold select-none ${s.color}`}
          style={{
            left: s.x,
            animation: `floatUp ${s.dur}s ${s.delay}s linear infinite`,
          }}
        >
          {s.text}
        </span>
      ))}
    </div>
  );
}

/* ---------------- Skills Ticker / Marquee Strip ---------------- */
function SkillsTicker() {
  const allSkills = SKILLS.flatMap((g) => g.items);
  const doubled = [...allSkills, ...allSkills]; // duplicate for seamless infinite loop

  return (
    <div
      className="relative overflow-hidden border-y border-gray-800/60 bg-gray-900/20 py-3 group"
      title="Hover to pause"
    >
      {/* Left + right fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-gray-950 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-gray-950 to-transparent" />

      <div
        className="flex gap-8 animate-ticker"
        style={{ width: 'max-content' }}
      >
        {doubled.map((skill, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-xs text-gray-500 whitespace-nowrap select-none"
          >
            <img
              src={`${DEVICON_CDN}/${skill.icon}/${skill.icon}-original.svg`}
              alt={skill.name}
              loading="lazy"
              className="h-4 w-4 object-contain opacity-60"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span className="font-mono">{skill.name}</span>
            <span className="ml-1 text-gray-800">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- CV Quick Preview Modal ---------------- */
function CVModal({ lang, onClose, onDownload }) {
  const isVi = lang === 'vi';
  return (
    <motion.div
      className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-gray-800 bg-gray-950 text-gray-200 shadow-2xl"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Editor Title Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900/90 px-4 py-2.5 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-xs text-gray-400">Nguyen_Trong_Quan_CV.pdf — Viewer</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500 text-gray-950 text-xs font-bold hover:bg-emerald-400 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> {isVi ? 'Tải PDF' : 'Download PDF'}
            </button>
            <button
              onClick={onClose}
              className="rounded p-1 text-gray-500 hover:bg-gray-800 hover:text-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* CV Document Body */}
        <div className="p-6 sm:p-8 space-y-6 font-sans">
          {/* CV Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-100">{CONTACT_INFO.name}</h2>
              <p className="text-emerald-400 font-mono text-sm font-semibold mt-0.5">{isVi ? CONTACT_INFO.roleVi : CONTACT_INFO.role}</p>
              <p className="text-xs text-gray-400 mt-2 flex flex-wrap gap-x-4 gap-y-1">
                <span>📍 {isVi ? CONTACT_INFO.location : CONTACT_INFO.locationEn}</span>
                <span>✉️ {CONTACT_INFO.email}</span>
                <span>📞 {CONTACT_INFO.phoneDisplay}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono border border-emerald-800 bg-emerald-950 text-emerald-300">
                ● {isVi ? 'Sẵn sàng làm việc fresher' : 'Ready as Fresher'}
              </span>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> {isVi ? 'Học vấn' : 'Education'}
            </h3>
            <div className="rounded-lg border border-gray-800/80 bg-gray-900/40 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold text-gray-100">{isVi ? CONTACT_INFO.school : CONTACT_INFO.schoolEn}</h4>
                  <p className="text-xs text-gray-400">{isVi ? 'Chuyên ngành: Lập trình Web' : 'Major: Web Programming'}</p>
                </div>
                <span className="text-xs font-mono text-gray-500">2023 — 2025</span>
              </div>
              <p className="text-xs font-semibold text-emerald-400 mt-2">
                GPA: {CONTACT_INFO.gpa} ({isVi ? 'Tốt nghiệp loại Giỏi' : 'Graduated with Honors'})
              </p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> {isVi ? 'Kỹ năng chuyên môn' : 'Technical Skills'}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-gray-800/80 bg-gray-900/40">
                <p className="font-mono text-sky-400 font-semibold mb-1">Frontend</p>
                <p className="text-gray-300">React, Vue.js, TypeScript, JavaScript (ES6+), Tailwind CSS, Figma</p>
              </div>
              <div className="p-3 rounded-lg border border-gray-800/80 bg-gray-900/40">
                <p className="font-mono text-emerald-400 font-semibold mb-1">Backend & Database</p>
                <p className="text-gray-300">NestJS, Node.js, Express.js, PHP/Laravel, MySQL, RESTful API</p>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> {isVi ? 'Dự án nổi bật' : 'Featured Projects'}
            </h3>
            <div className="space-y-3">
              {PROJECTS.map((p) => (
                <div key={p.id} className="p-4 rounded-lg border border-gray-800/80 bg-gray-900/40">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-semibold text-gray-100">{p.title}</h4>
                    <span className="text-[11px] font-mono text-emerald-400">{p.tags.slice(0, 3).join(' · ')}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{isVi ? p.descVi : p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- Project Details Modal ---------------- */
function ProjectModal({ project, lang, onClose }) {
  if (!project) return null;
  const c = COLOR[project.color];
  const isVi = lang === 'vi';

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-gray-800 bg-gray-950 text-gray-200 shadow-2xl"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Editor Title Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900/90 px-4 py-2.5 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-xs text-gray-400">{project.file} — Case Study</span>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-800 hover:text-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Banner / Preview */}
          {project.preview ? (
            <div className="rounded-lg overflow-hidden border border-gray-800 max-h-60 bg-gray-900">
              <img src={project.preview} alt={project.title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className={`h-36 rounded-lg flex flex-col items-center justify-center ${c.bgSoft} border border-gray-800 p-4 text-center`}>
              <span className={`text-4xl font-bold ${c.text} font-sans opacity-80 mb-2`}>
                {project.title.split(' ').map((w) => w[0]).join('').slice(0, 3)}
              </span>
              <span className="text-xs font-mono text-gray-400">
                {isVi ? 'Kiến trúc hệ thống & Thiết kế CSDL' : 'System Architecture & Database Design'}
              </span>
            </div>
          )}

          {/* Title & Role */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <h3 className="font-sans text-2xl font-bold text-gray-100">{project.title}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono border ${c.border} ${c.bgSoft} ${c.text}`}>
                {isVi ? project.roleVi : project.role}
              </span>
            </div>
            <p className="font-sans text-sm text-gray-400 leading-relaxed mt-2">
              {isVi ? project.descVi : project.desc}
            </p>
          </div>

          {/* Key Features */}
          <div className="rounded-lg border border-gray-800/80 bg-gray-900/40 p-4">
            <h4 className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> {isVi ? 'Tính năng cốt lõi' : 'Key Core Features'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-sans">
              {(isVi ? project.featuresVi : project.features).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Details */}
          <div>
            <h4 className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">
              {isVi ? 'Công nghệ sử dụng' : 'Technologies & Architecture'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded border border-gray-800 bg-gray-900 text-gray-300 font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-800">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-emerald-500 text-gray-950 text-xs font-bold hover:bg-emerald-400 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> {isVi ? 'Xem Live Demo' : 'View Live Demo'}
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded border border-gray-700 bg-gray-900 text-gray-200 text-xs font-mono hover:border-gray-500 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" /> {isVi ? 'Mã nguồn GitHub' : 'GitHub Repository'}
              </a>
            )}
            <button
              onClick={onClose}
              className="ml-auto px-4 py-2 rounded border border-gray-800 text-xs text-gray-400 hover:text-gray-200 transition-colors"
            >
              {isVi ? 'Đóng' : 'Close'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- AI Assistant Widget ---------------- */
function AIAssistant({ lang }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: lang === 'vi' ? UI.vi.aiGreeting : UI.en.aiGreeting,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleAsk = (queryText) => {
    const q = queryText || input;
    if (!q.trim()) return;

    const userMsg = { sender: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = q.toLowerCase();
      const match = AI_KNOWLEDGE_BASE.find((item) =>
        item.triggers.some((trigger) => lower.includes(trigger))
      );

      let reply = '';
      if (match) {
        reply = lang === 'vi' ? match.answerVi : match.answerEn;
      } else {
        reply =
          lang === 'vi'
            ? `Cảm ơn bạn đã hỏi! Quân là Lập trình viên Full Stack (React, NestJS, Node.js, MySQL). Bạn có thể xem thêm các mục Dự án hoặc liên hệ trực tiếp qua email: ${CONTACT_INFO.email} / SĐT: ${CONTACT_INFO.phoneDisplay}.`
            : `Thanks for asking! Quan is a Full Stack Developer (React, NestJS, Node.js, MySQL). You can check out his Projects section or contact him directly via email: ${CONTACT_INFO.email} / Phone: ${CONTACT_INFO.phoneDisplay}.`;
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 600);
  };

  const samplePrompts =
    lang === 'vi'
      ? ['Kỹ năng chính của Quân?', 'Dự án tiêu biểu nhất?', 'Thông tin liên hệ phỏng vấn?', 'Thời gian có thể thực tập?']
      : ["What are Quan's top skills?", 'Key featured projects?', 'Interview contact info?', 'When can Quan start?'];

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-10 right-5 z-50 flex items-center gap-2 rounded-full border border-emerald-500/50 bg-gray-900/90 px-4 py-2.5 font-mono text-xs text-emerald-400 shadow-xl backdrop-blur hover:bg-emerald-950 transition-all"
        aria-label="Open AI Assistant"
      >
        <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
        <span className="font-semibold hidden sm:inline">{lang === 'vi' ? 'Hỏi Trợ lý AI' : 'Ask AI Assistant'}</span>
      </motion.button>

      {/* Chat Drawer / Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-20 right-4 z-50 w-[92vw] sm:w-[380px] rounded-xl border border-gray-800 bg-gray-950 shadow-2xl overflow-hidden font-mono"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-semibold text-gray-200">
                  {lang === 'vi' ? UI.vi.aiAssistantTitle : UI.en.aiAssistantTitle}
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-300 p-1"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-72 overflow-y-auto p-3 space-y-3 text-xs">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-2.5 leading-relaxed whitespace-pre-line ${m.sender === 'user'
                      ? 'bg-emerald-600 text-gray-950 font-sans font-medium'
                      : 'border border-gray-800 bg-gray-900/80 text-gray-300'
                      }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-lg border border-gray-800 bg-gray-900/80 p-2 text-emerald-400 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Sample Prompt Chips */}
            <div className="border-t border-gray-800/80 bg-gray-950/60 p-2 overflow-x-auto no-scrollbar flex gap-1.5">
              {samplePrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleAsk(p)}
                  className="flex-shrink-0 text-[10px] px-2 py-1 rounded bg-gray-900 border border-gray-800 text-gray-400 hover:text-emerald-400 hover:border-emerald-800 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAsk();
              }}
              className="flex items-center border-t border-gray-800 bg-gray-900 p-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === 'vi' ? 'Hỏi thông tin về Quân...' : 'Ask about Quan...'}
                className="flex-1 bg-transparent px-2 text-xs text-gray-200 placeholder-gray-600 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded bg-emerald-500 p-1.5 text-gray-950 hover:bg-emerald-400 transition-colors"
              >
                <Send className="h-3 w-3" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------- app -------------------------------- */

export default function App() {
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));
  const [booted, setBooted] = useState(false);
  const [lang, setLang] = useState('vi');
  const [theme, setTheme] = useState('dark');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [spot, setSpot] = useState({ x: 50, y: 30 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCvModal, setShowCvModal] = useState(false);
  const [projectFilter, setProjectFilter] = useState('all');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const heroRef = useRef(null);
  const copy = UI[lang];
  const isVi = lang === 'vi';

  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setShowBackToTop(latest > 400);
    });
  }, [scrollY]);

  const heroName = useTypewriter('Nguyễn Trọng Quân', 60, 200, booted);

  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const scrollTo = (id) => {
    playMechanicalClick(soundEnabled);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCopy = (text, field) => {
    playMechanicalClick(soundEnabled);
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    playMechanicalClick(soundEnabled);
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  const filteredProjects = PROJECTS.filter((p) => {
    if (projectFilter === 'all') return true;
    return p.category && p.category.includes(projectFilter);
  });

  return (
    <div className={`${theme === 'light' ? 'light' : ''} min-h-screen bg-gray-950 text-gray-200 font-mono selection:bg-emerald-500 selection:text-gray-950 relative bg-dot-grid`}>
      <AnimatePresence>{!booted && <BootScreen onDone={() => setBooted(true)} />}</AnimatePresence>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            lang={lang}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* CV Quick View Modal */}
      <AnimatePresence>
        {showCvModal && (
          <CVModal
            lang={lang}
            onClose={() => setShowCvModal(false)}
            onDownload={() => {
              window.open(CONTACT_INFO.cvUrl, '_blank');
            }}
          />
        )}
      </AnimatePresence>

      {/* Continuous Floating Code Symbols */}
      <FloatingSymbols />

      {/* Skills Ticker — always visible between hero and about */}
      <div id="ticker-strip">
        <SkillsTicker />
      </div>

      {/* AI Assistant Chatbot */}
      <AIAssistant lang={lang} />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, y: -2 }}
            onClick={() => scrollTo('home')}
            className="fixed bottom-10 left-5 sm:left-16 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-gray-800 bg-gray-900/90 text-gray-400 shadow-xl backdrop-blur hover:border-emerald-700 hover:text-emerald-400 transition-colors"
            aria-label="Back to Top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-emerald-400 origin-left z-[60]"
        style={{ scaleX: progress }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ---------------- Title bar / nav (VS Code tab strip) ---------------- */}
        <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-900">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="ml-3 text-xs text-gray-500">quan-dev — portfolio</span>
            <span className="ml-auto hidden sm:flex items-center gap-1 text-xs text-gray-600">
              <GitFork className="w-3 h-3" /> {copy.internReady}
            </span>
          </div>
          <nav className="flex items-center overflow-x-auto no-scrollbar">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative group flex items-center gap-2 px-4 py-2.5 text-xs whitespace-nowrap border-r border-gray-900 transition-colors ${active === item.id ? 'text-gray-100' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/50'
                  }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gray-900 -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Circle className={`w-1.5 h-1.5 ${active === item.id ? 'fill-emerald-400 text-emerald-400' : 'fill-gray-700 text-gray-700'}`} />
                {item.label}
                {active === item.id && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-1 animate-pulse-dot" />}
              </button>
            ))}

            {/* Sound Effects Toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playMechanicalClick(true);
              }}
              title={soundEnabled ? copy.soundOn : copy.soundOff}
              className={`ml-auto mr-1 flex h-7 items-center gap-1 px-2 text-xs rounded border border-gray-800 transition-colors ${soundEnabled ? 'text-emerald-400 border-emerald-800 bg-emerald-950/40' : 'text-gray-500 hover:text-gray-300'}`}
              aria-label="Toggle mechanical keyboard sound"
            >
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              <span className="hidden md:inline text-[11px]">{soundEnabled ? (isVi ? 'Âm thanh: BẬT' : 'Sound: ON') : (isVi ? 'Âm thanh: TẮT' : 'Sound: OFF')}</span>
            </button>

            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex-shrink-0 mr-2 my-1.5 px-3 py-1.5 text-xs rounded border border-emerald-700 text-emerald-400 hover:bg-emerald-950 hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
            >
              {copy.sayHi}
            </a>

            <button
              onClick={() => {
                playMechanicalClick(soundEnabled);
                setLang((current) => (current === 'en' ? 'vi' : 'en'));
              }}
              className="mr-1 flex flex-shrink-0 items-center gap-1 px-2 py-1.5 text-xs text-gray-500 hover:text-emerald-400 transition-colors"
              aria-label="Change language"
            >
              <Languages className="h-3.5 w-3.5" /> {copy.language}
            </button>

            <button
              onClick={() => {
                playMechanicalClick(soundEnabled);
                setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
              }}
              className="mr-3 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded border border-gray-800 text-gray-500 hover:border-emerald-700 hover:text-emerald-400 transition-colors"
              aria-label="Change color theme"
            >
              {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </nav>
        </header>

        <div className="hidden lg:flex flex-col items-center gap-6 fixed left-0 top-1/2 -translate-y-1/2 py-6 px-3 border-r border-gray-900 bg-gray-950 z-40 text-gray-700">
          <Files className="w-4 h-4 text-gray-500" />
          <Search className="w-4 h-4" />
          <GitFork className="w-4 h-4" />
          <Blocks className="w-4 h-4" />
          <Settings className="w-4 h-4" />
        </div>

        <main className="lg:pl-12">
          {/* ---------------- Hero ---------------- */}
          <section
            id="home"
            ref={heroRef}
            onMouseMove={handleMouseMove}
            className="relative overflow-hidden max-w-6xl mx-auto px-6 sm:px-10 pt-16 pb-20 flex"
          >
            {/* mouse-tracked spotlight */}
            <div
              className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500"
              style={{
                background: `radial-gradient(600px circle at ${spot.x}% ${spot.y}%, rgba(52,211,153,0.08), transparent 60%)`,
              }}
            />
            {/* drifting ambient blobs */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl animate-float-slow" />
            <div className="pointer-events-none absolute top-40 -left-10 w-56 h-56 rounded-full bg-sky-500/10 blur-3xl animate-float" />

            <LineGutter from={1} to={17} />
            <div className="flex-1 grid lg:grid-cols-[minmax(0,1fr)_260px] gap-10">
              <div className="leading-7 relative">
                <p className="text-xs text-gray-600 mb-1">home.tsx</p>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: booted ? 1 : 0 }} transition={{ delay: 0.1 }}>
                  <span className="text-violet-400">import</span>{' '}
                  <span className="text-gray-300">{'{ Developer }'}</span>{' '}
                  <span className="text-violet-400">from</span>{' '}
                  <span className="text-amber-300">'@quan/profile'</span>
                  <span className="text-gray-500">;</span>
                </motion.p>
                <p className="mb-4">&nbsp;</p>

                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 8 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-800 bg-emerald-950 text-emerald-400 text-xs mb-4"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 cursor-blink" /> {copy.internship}
                </motion.span>

                <p className="font-sans text-3xl sm:text-5xl font-extrabold text-gray-100 leading-tight mt-2 min-h-[1.2em]">
                  {copy.greeting} <span className="text-emerald-400">{heroName}</span>
                  <span className="text-emerald-400 cursor-blink">_</span>
                </p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 10 }}
                  transition={{ delay: 1.6 }}
                  className="font-sans text-lg sm:text-xl text-gray-400 mt-3"
                >
                  {copy.role} <span className="text-gray-600">·</span> {copy.progress}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 10 }}
                  transition={{ delay: 1.8 }}
                  className="font-sans text-sm sm:text-base text-gray-500 mt-3 max-w-xl"
                >
                  {copy.intro}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 14 }}
                  transition={{ delay: 2.0 }}
                  className="flex flex-wrap gap-3 mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(52,211,153,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => scrollTo('projects')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-emerald-500 text-gray-950 text-sm font-semibold cursor-pointer"
                  >
                    {copy.viewProjects} <ChevronRight className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      playMechanicalClick(soundEnabled);
                      setShowCvModal(true);
                    }}
                    whileHover={{ scale: 1.04, borderColor: '#9ca3af' }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-gray-700 text-gray-300 text-sm hover:text-white transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-emerald-400" /> {copy.previewCv}
                  </motion.button>
                  <div className="flex items-center gap-2 ml-1">
                    {[
                      { Icon: Github, href: CONTACT_INFO.github, label: 'GitHub' },
                      { Icon: Linkedin, href: CONTACT_INFO.linkedin, label: 'LinkedIn' },
                      { Icon: Mail, href: `mailto:${CONTACT_INFO.email}`, label: 'Email' },
                    ].map(({ Icon, href, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        whileHover={{ scale: 1.15, y: -2 }}
                        className="w-9 h-9 flex items-center justify-center rounded border border-gray-800 text-gray-500 hover:text-emerald-400 hover:border-emerald-700 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 20 }}
                  transition={{ delay: 2.2 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12"
                >
                  {STATS.map((s, index) => (
                    <motion.div
                      key={s.label}
                      whileHover={{ y: -3, borderColor: '#374151' }}
                      className="border border-gray-800 rounded-lg px-4 py-3 bg-gray-900/40"
                    >
                      <p className="font-sans text-2xl font-bold text-gray-100">
                        <CountUp value={s.value} suffix={s.suffix} />
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {[copy.years, copy.shipped, copy.technologies, copy.commitment][index]}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <Reveal delay={0.45} className="relative z-10 self-start lg:mt-12">
                <motion.aside
                  whileHover={{ y: -4, borderColor: '#374151' }}
                  className="rounded-lg border border-gray-800 bg-gray-900/70 overflow-hidden shadow-2xl shadow-black/20"
                >
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-800">
                    <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    <span className="ml-2 text-xs text-gray-500">profile.json</span>
                  </div>
                  <div className="p-5">
                    <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-emerald-500/40 bg-emerald-950 text-3xl font-bold text-emerald-300 shadow-lg shadow-emerald-500/10 animate-glow-breathe">
                      <span>NQ</span>
                      <img
                        src={avatar}
                        alt="Nguyễn Trọng Quân"
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-gray-900 bg-emerald-400" />
                    </div>
                    <p className="text-center font-sans text-lg font-bold text-gray-100">{CONTACT_INFO.name}</p>
                    <p className="mt-1 text-center text-xs text-gray-500">{copy.profileRole}</p>
                    <div className="mt-5 space-y-2 border-t border-gray-800 pt-4 text-xs">
                      <p className="flex justify-between gap-3"><span className="text-gray-600">location</span><span className="text-sky-300">{copy.location}</span></p>
                      <p className="flex justify-between gap-3"><span className="text-gray-600">status</span><span className="text-emerald-400">{copy.available}</span></p>
                      <p className="flex justify-between gap-3"><span className="text-gray-600">focus</span><span className="text-amber-300">{copy.focus}</span></p>
                    </div>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="mt-5 flex items-center justify-center gap-2 rounded border border-emerald-700/80 px-3 py-2 text-xs text-emerald-400 transition-colors hover:bg-emerald-950"
                    >
                      <Mail className="h-3.5 w-3.5" /> {CONTACT_INFO.email}
                    </a>
                  </div>
                </motion.aside>
              </Reveal>
            </div>
          </section>

          {/* ---------------- About ---------------- */}
          <section id="about" className="max-w-6xl mx-auto px-6 sm:px-10 py-16 flex relative">
            {/* Drifting ambient orbs */}
            <div className="pointer-events-none absolute -top-10 right-10 w-64 h-64 rounded-full bg-sky-500/5 blur-3xl" style={{ animation: 'orb-drift 18s ease-in-out infinite' }} />
            <div className="pointer-events-none absolute bottom-10 left-20 w-48 h-48 rounded-full bg-violet-500/5 blur-3xl" style={{ animation: 'orb-drift 24s ease-in-out infinite reverse' }} />
            <LineGutter from={1} to={22} />
            <div className="flex-1">
              <SectionLabel index="02" filename="about.tsx" color="sky" />
              <div className="grid md:grid-cols-2 gap-8">
                <Reveal>
                  <p className="font-sans text-2xl font-bold text-gray-100 mb-4">{copy.about}</p>
                  <p className="font-sans text-sm text-gray-400 leading-relaxed mb-4">{copy.aboutText}</p>
                  <div className="space-y-2 text-sm">
                    {[
                      { Icon: MapPin, text: isVi ? CONTACT_INFO.location : CONTACT_INFO.locationEn },
                      { Icon: Mail, text: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
                      { Icon: Phone, text: CONTACT_INFO.phoneDisplay, href: CONTACT_INFO.phoneTel },
                      { Icon: GraduationCap, text: `${isVi ? CONTACT_INFO.school : CONTACT_INFO.schoolEn} (GPA ${CONTACT_INFO.gpa})` },
                    ].map(({ Icon, text, href }, i) => (
                      <motion.div
                        key={text}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-2 text-gray-400"
                      >
                        <Icon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        {href ? (
                          <a href={href} className="hover:text-emerald-400 transition-colors">
                            {text}
                          </a>
                        ) : (
                          <span>{text}</span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.15}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-lg border border-gray-800 bg-gray-900/60 overflow-hidden transition-shadow hover:shadow-xl hover:shadow-sky-500/10"
                  >
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-800">
                      <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                      <span className="ml-2 text-xs text-gray-500">developer_bio.ts</span>
                    </div>
                    <pre className="text-xs sm:text-sm p-4 leading-6 overflow-x-auto">
                      <span className="text-violet-400">const</span> <span className="text-sky-300">developer</span> <span className="text-gray-500">=</span> <span className="text-gray-300">{'{'}</span>{'\n'}
                      {'  '}<span className="text-rose-300">name</span><span className="text-gray-500">:</span> <span className="text-amber-300">"Nguyễn Trọng Quân"</span><span className="text-gray-500">,</span>{'\n'}
                      {'  '}<span className="text-rose-300">role</span><span className="text-gray-500">:</span> <span className="text-amber-300">"{isVi ? 'Lập trình viên Full Stack' : 'Full Stack Developer'}"</span><span className="text-gray-500">,</span>{'\n'}
                      {'  '}<span className="text-rose-300">education</span><span className="text-gray-500">:</span> <span className="text-amber-300">"FPT Polytechnic (GPA 3.44)"</span><span className="text-gray-500">,</span>{'\n'}
                      {'  '}<span className="text-rose-300">status</span><span className="text-gray-500">:</span> <span className="text-emerald-400">"{isVi ? 'sẵn sàng làm việc fresher' : 'ready for full-time fresher role'}"</span><span className="text-gray-500">,</span>{'\n'}
                      {'  '}<span className="text-rose-300">focus</span><span className="text-gray-500">:</span> <span className="text-gray-300">[</span><span className="text-amber-300">"NestJS"</span><span className="text-gray-500">,</span> <span className="text-amber-300">"React"</span><span className="text-gray-500">,</span> <span className="text-amber-300">"Clean Code"</span><span className="text-gray-300">]</span><span className="text-gray-500">,</span>{'\n'}
                      {'  '}<span className="text-rose-300">learning</span><span className="text-gray-500">:</span> <span className="text-amber-300">"{isVi ? 'học công nghệ mới mỗi ngày' : 'new tech stack everyday'}"</span><span className="text-gray-500">,</span>{'\n'}
                      {'  '}<span className="text-rose-300">goal</span><span className="text-gray-500">:</span> <span className="text-amber-300">"{isVi ? 'xây dựng sản phẩm web chất lượng' : 'build high-impact web products'}"</span>{'\n'}
                      <span className="text-gray-300">{'}'}</span><span className="text-gray-500">;</span>{'\n\n'}
                      <span className="text-sky-300">console</span><span className="text-gray-500">.</span><span className="text-violet-300">log</span><span className="text-gray-300">(</span><span className="text-sky-300">developer</span><span className="text-gray-300">)</span><span className="text-gray-500">;</span>{'\n'}
                      <span className="text-gray-600">{isVi ? '// Sẵn sàng làm việc tại Đà Nẵng & Remote' : '// Open to work in Da Nang & Remote'}</span>
                    </pre>
                  </motion.div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ---------------- Skills ---------------- */}
          <section id="skills" className="max-w-6xl mx-auto px-6 sm:px-10 py-16 flex relative">
            <div className="pointer-events-none absolute top-20 -right-10 w-56 h-56 rounded-full bg-amber-500/5 blur-3xl" style={{ animation: 'orb-drift 20s ease-in-out infinite 6s' }} />
            <LineGutter from={1} to={28} />
            <div className="flex-1">
              <SectionLabel index="03" filename="skills.json" color="amber" />
              <Reveal><p className="font-sans text-2xl font-bold text-gray-100 mb-8">{copy.techStack}</p></Reveal>
              <div className="space-y-8">
                {SKILLS.map((group, gi) => {
                  const c = COLOR[group.color];
                  return (
                    <Reveal key={group.group} delay={gi * 0.1}>
                      <p className="text-xs text-gray-500 mb-3">
                        <span className={c.text}>"{copy.skillGroups[group.group]}"</span>
                        <span className="text-gray-600">: [</span>
                      </p>
                      <div className="flex flex-wrap gap-3 pl-4">
                        {group.items.map((skill, i) => (
                          <motion.span
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.04 }}
                            whileHover={{ y: -3, scale: 1.05 }}
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded border border-gray-800 bg-gray-900/60 text-sm text-gray-300 ${c.hoverBorder} transition-colors cursor-default`}
                          >
                            <span className={`flex h-5 w-5 items-center justify-center rounded-full ${c.bgSoft}`}>
                              <img
                                src={`${DEVICON_CDN}/${skill.icon}/${skill.icon}-original.svg`}
                                alt=""
                                loading="lazy"
                                className="h-4 w-4 object-contain"
                                onError={(event) => {
                                  event.currentTarget.style.display = 'none';
                                  if (event.currentTarget.nextElementSibling) {
                                    event.currentTarget.nextElementSibling.style.display = 'block';
                                  }
                                }}
                              />
                              <span className={`hidden h-1.5 w-1.5 rounded-full ${c.dot}`} />
                            </span>
                            {skill.name}
                          </motion.span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 mt-2">]</p>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ---------------- Projects ---------------- */}
          <section id="projects" className="max-w-6xl mx-auto px-6 sm:px-10 py-16 flex">
            <LineGutter from={1} to={30} />
            <div className="flex-1">
              <SectionLabel index="04" filename="projects.tsx" color="violet" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <Reveal><p className="font-sans text-2xl font-bold text-gray-100">{copy.projects}</p></Reveal>

                {/* Project Category Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {[
                    { key: 'all', label: copy.filterAll, count: PROJECTS.length },
                    { key: 'fullstack', label: copy.filterFullStack, count: PROJECTS.filter(p => p.category.includes('fullstack')).length },
                    { key: 'backend', label: copy.filterBackend, count: PROJECTS.filter(p => p.category.includes('backend')).length },
                    { key: 'frontend', label: copy.filterFrontend, count: PROJECTS.filter(p => p.category.includes('frontend')).length },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => {
                        playMechanicalClick(soundEnabled);
                        setProjectFilter(tab.key);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors font-mono whitespace-nowrap ${projectFilter === tab.key
                        ? 'bg-emerald-950 border border-emerald-700 text-emerald-300'
                        : 'bg-gray-900/60 border border-gray-800 text-gray-400 hover:text-gray-200'
                        }`}
                    >
                      <span>{tab.label}</span>
                      <span className="text-[10px] text-gray-500">({tab.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence>
                  {filteredProjects.map((p) => {
                    const c = COLOR[p.color];
                    return (
                      <motion.div
                        layout
                        key={p.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          whileHover={{ y: -6 }}
                          className={`rounded-lg border border-gray-800 bg-gray-900/50 overflow-hidden ${c.hoverBorder} transition-colors hover:shadow-xl ${c.shadow} flex flex-col h-full cursor-pointer`}
                          onClick={() => {
                            playMechanicalClick(soundEnabled);
                            setSelectedProject(p);
                          }}
                        >
                          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-800 bg-gray-900/80">
                            <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                            <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                            <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                            <span className="ml-2 text-xs text-gray-400 truncate">{p.file}</span>
                            <span className="ml-auto text-[10px] text-gray-500 font-mono">{copy.inspectTag}</span>
                          </div>

                          {/* Card Preview Area */}
                          <div className={`h-36 flex items-center justify-center ${c.bgSoft} border-b border-gray-800 overflow-hidden relative`}>
                            {p.preview ? (
                              <img
                                src={p.preview}
                                alt={`${p.title} preview`}
                                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center gap-1">
                                <motion.span
                                  initial={{ opacity: 0.6 }}
                                  whileHover={{ scale: 1.15, opacity: 0.9 }}
                                  className={`text-3xl font-bold ${c.text} font-sans opacity-70`}
                                >
                                  {p.title.split(' ').map((w) => w[0]).join('').slice(0, 3)}
                                </motion.span>
                                <span className="text-[10px] font-mono text-gray-400">{copy.viewDetails}</span>
                              </div>
                            )}
                          </div>

                          <div className="p-4 flex flex-col flex-1">
                            <p className="font-sans font-semibold text-gray-100 mb-1.5">{p.title}</p>
                            <p className="text-xs text-gray-400 leading-relaxed mb-4 flex-1 line-clamp-3">
                              {isVi ? p.descVi : p.desc}
                            </p>

                            <div className="flex items-center gap-2 mb-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playMechanicalClick(soundEnabled);
                                  setSelectedProject(p);
                                }}
                                className="text-xs text-emerald-400 hover:text-emerald-300 font-mono inline-flex items-center gap-1"
                              >
                                {copy.viewDetails} <ChevronRight className="w-3 h-3" />
                              </button>
                              {p.demo && (
                                <a
                                  href={p.demo}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="ml-auto text-xs text-gray-400 hover:text-emerald-400 inline-flex items-center gap-1"
                                >
                                  {copy.liveDemo} <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-800/80">
                              {p.tags.map((t) => (
                                <span key={t} className="text-[11px] px-2 py-0.5 rounded border border-gray-800 text-gray-400 bg-gray-950/50">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          {/* ---------------- Experience & Education ---------------- */}
          <section id="experience" className="max-w-6xl mx-auto px-6 sm:px-10 py-16 flex">
            <LineGutter from={1} to={34} />
            <div className="flex-1">
              <SectionLabel index="05" filename="experience.log" color="rose" />
              <Reveal><p className="font-sans text-2xl font-bold text-gray-100 mb-8">{copy.experience}</p></Reveal>

              <div className="relative pl-6 mb-16">
                <motion.div
                  className="absolute left-0 top-1 bottom-1 w-px bg-gray-800 origin-top"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                <div className="space-y-8">
                  {EXPERIENCE.map((e, i) => {
                    const c = COLOR[e.color];
                    return (
                      <Reveal key={e.hash} delay={i * 0.15} y={16}>
                        <div className="relative">
                          <motion.span
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 + 0.3, type: 'spring', stiffness: 400, damping: 20 }}
                            className={`absolute -left-[27px] top-1 w-3 h-3 rounded-full ${c.bg} ring-4 ring-gray-950`}
                          />
                          <p className="text-xs text-gray-600 mb-1">
                            commit <span className={c.text}>{e.hash}</span> <span className="text-gray-700">·</span> {isVi ? e.periodVi : e.period}
                          </p>
                          <p className="font-sans font-semibold text-gray-100">{isVi ? e.roleVi : e.role}</p>
                          <p className="text-sm text-gray-500 mb-1.5">{isVi ? e.placeVi : e.place}</p>
                          <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">{isVi ? e.descVi : e.desc}</p>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>

              <Reveal>
                <p className="font-sans text-xl font-bold text-gray-100 mb-6 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-emerald-400" /> {copy.education}
                </p>
              </Reveal>
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  {
                    school: isVi ? CONTACT_INFO.school : CONTACT_INFO.schoolEn,
                    period: '2023 — 2025',
                    line1: isVi ? 'Chuyên ngành: Lập trình Web' : 'Major: Web Programming',
                    line2: isVi ? `GPA ${CONTACT_INFO.gpa} (Tốt nghiệp loại Giỏi)` : `GPA ${CONTACT_INFO.gpa} (Graduated with Honors)`,
                    color: 'text-emerald-400',
                  },
                  {
                    school: isVi ? CONTACT_INFO.highSchool : CONTACT_INFO.highSchoolEn,
                    period: null,
                    line1: isVi ? 'Tốt nghiệp Trung học Phổ thông' : 'High School Diploma',
                    line2: null,
                    color: '',
                  },
                ].map((ed, i) => (
                  <Reveal key={ed.school} delay={i * 0.1}>
                    <motion.div whileHover={{ y: -3 }} className="rounded-lg border border-gray-800 bg-gray-900/40 p-5 h-full">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-sans font-semibold text-gray-100 text-sm">{ed.school}</p>
                        {ed.period && <span className="text-xs text-gray-600">{ed.period}</span>}
                      </div>
                      <p className="text-xs text-gray-400">{ed.line1}</p>
                      {ed.line2 && <p className={`text-xs mt-1 font-semibold ${ed.color}`}>{ed.line2}</p>}
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------- Certificates ---------------- */}
          <section id="certificates" className="max-w-6xl mx-auto px-6 sm:px-10 py-16 flex">
            <LineGutter from={1} to={20} />
            <div className="flex-1">
              <SectionLabel index="06" filename="certs.json" color="emerald" />
              <Reveal>
                <p className="font-sans text-2xl font-bold text-gray-100 mb-8 flex items-center gap-2">
                  <Award className="w-6 h-6 text-emerald-400" /> {copy.certificates}
                </p>
              </Reveal>
              <div className="grid sm:grid-cols-3 gap-5">
                {CERTIFICATES.map((cert, idx) => {
                  const c = COLOR[cert.color];
                  const Icon = cert.icon;
                  return (
                    <Reveal key={cert.id} delay={idx * 0.1}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className={`rounded-lg border border-gray-800 bg-gray-900/40 p-5 flex flex-col h-full ${c.hoverBorder} transition-colors`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className={`p-2 rounded-lg ${c.bgSoft} ${c.text}`}>
                            <Icon className="w-5 h-5" />
                          </span>
                          <span className="text-xs font-mono text-gray-500">{cert.date}</span>
                        </div>
                        <h4 className="font-sans font-semibold text-gray-100 text-sm mb-1">{isVi ? cert.titleVi : cert.title}</h4>
                        <p className="text-xs text-gray-500 mb-2">{cert.issuer}</p>
                        <p className="text-xs text-gray-400 leading-relaxed flex-1">{isVi ? cert.descVi : cert.desc}</p>
                      </motion.div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ---------------- Contact ---------------- */}
          <section id="contact" className="max-w-6xl mx-auto px-6 sm:px-10 py-16 flex">
            <LineGutter from={1} to={26} />
            <div className="flex-1">
              <SectionLabel index="07" filename="contact.sh" color="emerald" />
              <Reveal>
                <motion.div
                  whileHover={{ boxShadow: '0 0 40px rgba(52,211,153,0.08)' }}
                  className="rounded-lg border border-gray-800 bg-black/70 overflow-hidden"
                >
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-800 bg-gray-900/70">
                    <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    <span className="ml-2 text-xs text-gray-400">quan@portfolio: ~/contact-terminal</span>
                  </div>

                  <div className="p-6 text-sm leading-7">
                    <p className="text-gray-500 font-mono">
                      <span className="text-emerald-400">quan@portfolio</span>:<span className="text-sky-400">~</span>$ ./send-message.sh --role "internship"
                    </p>
                    <p className="font-sans text-xl font-bold text-gray-100 mt-3 mb-1">{copy.contactTitle}</p>
                    <p className="text-gray-400 mb-6 max-w-lg font-sans text-sm">{copy.contactText}</p>

                    {/* Quick Copy Contact Bar */}
                    <div className="grid sm:grid-cols-3 gap-3 mb-8">
                      <div className="flex items-center justify-between p-3 rounded border border-gray-800 bg-gray-900/50">
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span className="truncate">{CONTACT_INFO.email}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(CONTACT_INFO.email, 'email')}
                          className="text-xs text-gray-500 hover:text-emerald-400 transition-colors p-1"
                          title={copy.copy}
                        >
                          {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded border border-gray-800 bg-gray-900/50">
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>{CONTACT_INFO.phoneDisplay}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(CONTACT_INFO.phoneDisplay, 'phone')}
                          className="text-xs text-gray-500 hover:text-emerald-400 transition-colors p-1"
                          title={copy.copy}
                        >
                          {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded border border-gray-800 bg-gray-900/50">
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>{isVi ? CONTACT_INFO.location : CONTACT_INFO.locationEn}</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Message Form */}
                    <form onSubmit={handleContactSubmit} className="space-y-4 mb-8 max-w-xl">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1 font-mono">// {isVi ? 'tên' : 'name'}</label>
                          <input
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder={copy.namePlaceholder}
                            className="w-full rounded border border-gray-800 bg-gray-900/80 px-3 py-2 text-xs text-gray-200 placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1 font-mono">// email</label>
                          <input
                            type="email"
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder={copy.emailPlaceholder}
                            className="w-full rounded border border-gray-800 bg-gray-900/80 px-3 py-2 text-xs text-gray-200 placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 font-mono">// {isVi ? 'lời nhắn' : 'message'}</label>
                        <textarea
                          required
                          rows={3}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder={copy.messagePlaceholder}
                          className="w-full rounded border border-gray-800 bg-gray-900/80 px-3 py-2 text-xs text-gray-200 placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
                        />
                      </div>

                      {contactSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                          <span>{copy.messageSent}</span>
                        </motion.div>
                      )}

                      <div className="flex items-center gap-3">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-emerald-500 text-gray-950 text-xs font-bold hover:bg-emerald-400 transition-colors cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" /> {copy.sendMessage}
                        </button>
                        <a
                          href={`mailto:${CONTACT_INFO.email}?subject=Trao đổi cơ hội phỏng vấn thực tập&body=${encodeURIComponent(contactForm.message || '')}`}
                          className="text-xs text-gray-500 hover:text-emerald-400 underline transition-colors"
                        >
                          {copy.openInMail}
                        </a>
                      </div>
                    </form>

                    {/* Social links */}
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-800/80">
                      {[
                        { Icon: Github, href: CONTACT_INFO.github, label: 'GitHub' },
                        { Icon: Linkedin, href: CONTACT_INFO.linkedin, label: 'LinkedIn' },
                        { Icon: Mail, href: `mailto:${CONTACT_INFO.email}`, label: 'Email' },
                        { Icon: Phone, href: CONTACT_INFO.phoneTel, label: 'Call' },
                      ].map(({ Icon, href, label }) => (
                        <motion.a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={label}
                          whileHover={{ scale: 1.15, y: -2 }}
                          className="w-9 h-9 flex items-center justify-center rounded border border-gray-800 text-gray-500 hover:text-emerald-400 hover:border-emerald-700 transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            </div>
          </section>
        </main>

        {/* ---------------- Status bar (VS Code style footer) ---------------- */}
        <footer className="sticky bottom-0 z-40 flex items-center gap-4 px-4 py-1.5 bg-emerald-600 text-gray-950 text-xs font-sans overflow-x-auto">
          <span className="flex items-center gap-1"><GitBranch className="w-3 h-3" /> main</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {copy.noProblems}</span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden sm:inline">LF</span>
          <span className="ml-auto hidden sm:flex items-center gap-1"><Wifi className="w-3 h-3" /> {copy.online}</span>
          <span>© 2026 {CONTACT_INFO.name}</span>
        </footer>
      </motion.div>
    </div>
  );
}
