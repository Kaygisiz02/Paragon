# CSS Kılavuzu

## 🎨 Genel Bakış

Paragon projesinde Tailwind CSS v4 ve özel admin CSS class'ları kullanılmaktadır. Bu kılavuz, projedeki CSS yapısını ve kullanım kurallarını açıklar.

## 🛠️ Tailwind CSS v4

### Kurulum
Tailwind CSS v4, projede PostCSS ile birlikte kullanılır:

```js
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
export default config
```

### Import Yapısı
Tailwind CSS v4'de layer'lar ayrı ayrı import edilir:

```css
/* src/app/globals.css */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
@import "../styles/admin.css";
```

## 🎯 Admin CSS Class'ları

Admin paneli için özel CSS class'ları oluşturulmuştur. Bu class'lar tutarlılık ve bakım kolaylığı sağlar.

### Kart Stilleri

```css
.admin-card {
  /* Ana kart container stilleri */
  @apply bg-gray-800 border-gray-700 rounded-lg shadow-sm;
}

.admin-card-header {
  /* Kart başlığı stilleri */
  @apply text-white font-semibold text-lg p-4 border-b border-gray-700;
}

.admin-card-content {
  /* Kart içeriği stilleri */
  @apply p-4;
}
```

**Kullanımı:**
```tsx
<div className="admin-card">
  <div className="admin-card-header">
    <h3>Başlık</h3>
  </div>
  <div className="admin-card-content">
    <p>İçerik</p>
  </div>
</div>
```

### Buton Stilleri

```css
.admin-btn-primary {
  /* Ana butonlar */
  @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors;
}

.admin-btn-secondary {
  /* İkincil butonlar */
  @apply bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600 px-4 py-2 rounded-md transition-colors;
}

.admin-btn-danger {
  /* Tehlike butonları */
  @apply bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors;
}
```

**Kullanımı:**
```tsx
<Button className="admin-btn-primary">Ana Buton</Button>
<Button className="admin-btn-secondary">İkincil Buton</Button>
<Button className="admin-btn-danger">Sil</Button>
```

### Form Stilleri

```css
.admin-form-input {
  /* Input alanları */
  @apply w-full bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

.admin-form-select {
  /* Select dropdown'lar */
  @apply w-full bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

.admin-form-textarea {
  /* Textarea alanlar */
  @apply w-full bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none;
}

.admin-form-checkbox {
  /* Checkbox'lar */
  @apply w-4 h-4 bg-gray-700 border-gray-600 rounded text-blue-600 focus:ring-2 focus:ring-blue-500;
}

.admin-form-label {
  /* Form etiketleri */
  @apply block text-sm font-medium text-gray-300 mb-2;
}
```

**Kullanımı:**
```tsx
<div className="space-y-4">
  <div>
    <label className="admin-form-label">Ad</label>
    <input className="admin-form-input" placeholder="Adınızı girin" />
  </div>
  
  <div>
    <label className="admin-form-label">Seçim</label>
    <select className="admin-form-select">
      <option>Seçenek 1</option>
      <option>Seçenek 2</option>
    </select>
  </div>
  
  <div>
    <label className="admin-form-label">Mesaj</label>
    <textarea className="admin-form-textarea" rows={3} />
  </div>
  
  <div className="flex items-center gap-2">
    <input type="checkbox" className="admin-form-checkbox" />
    <span className="text-gray-300">Onaylıyorum</span>
  </div>
</div>
```

### İstatistik Stilleri

```css
.admin-stats-grid {
  /* İstatistik grid'i */
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4;
}

.admin-stat-card-content {
  /* İstatistik kart içeriği */
  @apply p-4;
}

.admin-stat-label {
  /* İstatistik etiketleri */
  @apply text-gray-400 text-sm;
}

.admin-stat-value {
  /* İstatistik değerleri */
  @apply text-white text-2xl font-bold;
}
```

**Kullanımı:**
```tsx
<div className="admin-stats-grid">
  <div className="admin-card">
    <div className="admin-stat-card-content">
      <p className="admin-stat-label">Toplam Kullanıcı</p>
      <p className="admin-stat-value">1,234</p>
    </div>
  </div>
</div>
```

## 🎨 Renk Paleti

### Ana Renkler
```css
/* Blue (Primary) */
--color-blue-50: #eff6ff;
--color-blue-600: #2563eb;
--color-blue-700: #1d4ed8;

/* Gray (Background) */
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;

/* Green (Success) */
--color-green-400: #4ade80;
--color-green-600: #16a34a;

/* Red (Error) */
--color-red-400: #f87171;
--color-red-600: #dc2626;

/* Yellow (Warning) */
--color-yellow-400: #facc15;
--color-yellow-600: #ca8a04;
```

### Metin Renkleri
```css
.text-white          /* Ana metin rengi */
.text-gray-100       /* İkincil metin */
.text-gray-300       /* Yardımcı metin */
.text-gray-400       /* Pasif metin */
.text-blue-400       /* Vurgu rengi */
.text-green-400      /* Başarı rengi */
.text-red-400        /* Hata rengi */
.text-yellow-400     /* Uyarı rengi */
```

## 📱 Responsive Tasarım

### Breakpoint'ler
```css
sm  /* 640px ve üzeri */
md  /* 768px ve üzeri */
lg  /* 1024px ve üzeri */
xl  /* 1280px ve üzeri */
2xl /* 1536px ve üzeri */
```

### Grid Sistem
```css
.grid-cols-1        /* Mobil: 1 kolon */
.md:grid-cols-2     /* Tablet: 2 kolon */
.lg:grid-cols-3     /* Desktop: 3 kolon */
.xl:grid-cols-4     /* Large desktop: 4 kolon */
```

**Örnek:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="admin-card">Kart 1</div>
  <div className="admin-card">Kart 2</div>
  <div className="admin-card">Kart 3</div>
</div>
```

## 🎯 Component Stilleri

### Badge Stilleri
```css
.badge-primary {
  @apply bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium;
}

.badge-secondary {
  @apply bg-gray-600 text-gray-300 px-2 py-1 rounded-full text-xs font-medium;
}

.badge-success {
  @apply bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium;
}

.badge-warning {
  @apply bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-medium;
}

.badge-error {
  @apply bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium;
}

.badge-info {
  @apply bg-cyan-600 text-white px-2 py-1 rounded-full text-xs font-medium;
}
```

### Sidebar Stilleri
```css
.admin-sidebar {
  @apply w-64 bg-gray-900 border-r border-gray-800 h-full;
}

.admin-sidebar-item {
  @apply flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors;
}

.admin-sidebar-item.active {
  @apply bg-gray-800 text-white border-l-4 border-blue-600;
}
```

### Table Stilleri
```css
.admin-table {
  @apply w-full text-left;
}

.admin-table th {
  @apply px-4 py-3 font-medium text-gray-300 border-b border-gray-700;
}

.admin-table td {
  @apply px-4 py-3 text-gray-300 border-b border-gray-700;
}

.admin-table tr:hover {
  @apply bg-gray-800;
}
```

## 🔧 CSS Kuralları

### 1. Admin Class'larını Kullan
Tailwind class'ları yerine admin class'larını kullan:

```tsx
// ❌ Yanlış
<div className="bg-gray-800 border-gray-700 rounded-lg p-4">

// ✅ Doğru
<div className="admin-card">
```

### 2. Responsive için Tailwind Kullan
Responsive tasarımda Tailwind class'ları kullanılabilir:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### 3. Özel Stiller için CSS Modülleri
Component'e özel stiller için CSS modülleri kullan:

```tsx
// component.module.css
.customStyle {
  @apply admin-card;
  /* Özel stiller */
}

// component.tsx
import styles from "./component.module.css"
<div className={styles.customStyle}>
```

### 4. Consistency (Tutarlılık)
Aynı amaç için aynı class'ları kullan:

```tsx
// Tüm butonlar için
<Button className="admin-btn-primary">
<Button className="admin-btn-secondary">

// Tüm kartlar için
<div className="admin-card">
```

## 🎨 Animasyonlar

### Transition'lar
```css
.transition-colors {
  @apply transition-colors duration-200 ease-in-out;
}

.transition-transform {
  @apply transition-transform duration-200 ease-in-out;
}
```

### Hover Efektleri
```css
.admin-card:hover {
  @apply transform scale-105 shadow-lg;
}

.admin-btn-primary:hover {
  @apply bg-blue-700 transform scale-105;
}
```

## 🔍 Debugging

### CSS Inspector
Tarayıcı geliştirici araçları ile CSS class'larını kontrol et:

1. Element'i seç
2. Computed panel'inde stilleri gör
3. Uygulanmayan stilleri kontrol et

### Yaygın Sorunlar

1. **Class'ların çalışmaması**
   - `globals.css`'e import edildiğini kontrol et
   - Tailwind config'ini kontrol et

2. **Responsive sorunları**
   - Breakpoint'lerin doğru kullanıldığını kontrol et
   - Grid yapısını kontrol et

3. **Renk uyumsuzlukları**
   - Renk paletine uygun renkler kullan
   - Contrast oranını kontrol et

## 📚 Örnekler

### Tam Sayfa Örneği

```tsx
export default function ExamplePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="admin-sidebar">
        <div className="admin-sidebar-item active">
          <Dashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </div>
      </div>
      
      <main className="flex-1 p-6">
        <div className="admin-stats-grid mb-6">
          <div className="admin-card">
            <div className="admin-stat-card-content">
              <p className="admin-stat-label">Toplam Kullanıcı</p>
              <p className="admin-stat-value">1,234</p>
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>Kullanıcılar</h3>
          </div>
          <div className="admin-card-content">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ad</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>
                    <span className="badge-success">Active</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
```

---

**Son Güncelleme:** 30 Kasım 2025
