type PageName =
    // ======================================
    // USER PAGES
    // ======================================
    // You can view the page here:
    // https://xd.adobe.com/view/f3884483-41cf-4a1a-98f9-549d87df99bc-a6db/grid

    'login'  |  // 登入
    'register' | // 註冊
    'register-success' | // 註冊成功
    'home' | // 首頁
    'book' | // 開始預約
    'book-success' | // 預約成功
    'field-list' | // 球場資訊
    'field-map' | // 附近球場
    'book__field-map' | // 開始預約>選擇球場>球場地圖
    'check-in' | // 報到
    'book__field-list' | // 開始預約>選擇球場
    'appointments' | // 我的配對
    'field-details' | // 球場詳細資訊

    // ======================================
    // PROVIDER PAGES
    // ======================================

    'provider__login' |
    'provider__home'

type BallType = '' | '籃球' | '網球' | '羽球' | '排球' | '桌球' | '棒球' | '足球'

type LayoutColors = 'primary' |
'secondary' |
'content' |
'input' |
'dark' |
'dark-2' |
'info' |
'danger' |
'warning' |
'disabled'