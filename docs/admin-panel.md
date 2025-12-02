# Admin Paneli Dokümantasyonu

## 📋 Genel Bakış

Paragon admin paneli, modern ve yeniden kullanılabilir component'ler üzerine kurulmuş bir yönetim arayüzüdür. Tüm admin sayfaları ortak bir yapı kullanır ve tutarlı bir deneyim sunar.

## 🎨 Component'ler

### AdminLayout

Ana layout wrapper component'i. Tüm admin sayfaları bu component'i kullanır.

```tsx
interface AdminLayoutProps {
  title: string
  icon: LucideIcon
  currentPage: string
  searchPlaceholder?: string
  searchTerm?: string
  onSearchChange?: (value: string) => void
  actionButtons?: React.ReactNode
  children: React.ReactNode
}
```

**Örnek Kullanım:**
```tsx
<AdminLayout
  title="Dashboard"
  icon={LayoutDashboard}
  currentPage="/admin"
  searchPlaceholder="Search..."
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  actionButtons={
    <Button className="admin-btn-primary">
      <Plus className="h-4 w-4 mr-2" />
      Add New
    </Button>
  }
>
  {/* Sayfa içeriği */}
</AdminLayout>
```

### AdminStatsCard

İstatistik kartları için component. Trend göstergeleri ve icon desteği sunar.

```tsx
interface AdminStatsCardProps {
  title: string
  value: string
  change?: string
  trend?: "up" | "down" | "neutral"
  color?: string
  icon: LucideIcon
}
```

**Örnek Kullanım:**
```tsx
<AdminStatsCard
  title="Total Revenue"
  value="$45,231"
  change="+20.1%"
  trend="up"
  icon={DollarSign}
/>
```

### AdminTable

Dinamik tablo component'i. Custom render fonksiyonları ve action button'ları destekler.

```tsx
interface AdminTableProps {
  columns: Column[]
  data: any[]
  searchable?: boolean
  filterable?: boolean
  pagination?: boolean
  actions?: (item: any) => React.ReactNode
}
```

**Örnek Kullanım:**
```tsx
<AdminTable
  columns={[
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" }
  ]}
  data={users}
  actions={(user) => (
    <div className="flex gap-2">
      <Button size="sm" className="admin-btn-secondary">
        Edit
      </Button>
      <Button size="sm" variant="destructive">
        Delete
      </Button>
    </div>
  )}
/>
```

### AdminBadge

Durum ve rol badge'leri için component.

```tsx
interface AdminBadgeProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info"
  icon?: LucideIcon
}
```

**Örnek Kullanım:**
```tsx
<AdminBadge variant="success">Active</AdminBadge>
<AdminBadge variant="warning">Pending</AdminBadge>
<AdminBadge variant="error">Inactive</AdminBadge>
```

## 🎯 CSS Class'ları

### Kart Stilleri
```css
.admin-card              /* Ana kart container */
.admin-card-header       /* Kart başlığı */
.admin-card-content      /* Kart içeriği */
```

### Buton Stilleri
```css
.admin-btn-primary       /* Ana butonlar */
.admin-btn-secondary     /* İkincil butonlar */
.admin-btn-danger        /* Tehlike butonları */
```

### Form Stilleri
```css
.admin-form-input        /* Input alanları */
.admin-form-select       /* Select dropdown'lar */
.admin-form-textarea     /* Textarea alanlar */
.admin-form-checkbox     /* Checkbox'lar */
```

### İstatistik Stilleri
```css
.admin-stat-card-content /* İstatistik kart içeriği */
.admin-stat-label        /* İstatistik etiketleri */
.admin-stat-value        /* İstatistik değerleri */
```

## 📁 Sayfa Yapısı

### Dashboard (`/admin`)
- Genel istatistikler
- Grafikler ve chart'lar
- Hızlı erişim linkleri

### Users Management (`/admin/users`)
- Kullanıcı listesi
- Kullanıcı ekleme/düzenleme
- Rol ve yetki yönetimi

### Analytics (`/admin/analytics`)
- Finansal analizler
- Grafiksel raporlar
- Trend analizleri

### Metadata (`/admin/metadata`)
- Sistem metadata yönetimi
- Konfigürasyon ayarları
- Veri tipleri ve şemalar

### Settings (`/admin/settings`)
- Sistem ayarları
- Güvenlik konfigürasyonu
- Bildirim ayarları

## 🔧 Geliştirme Rehberi

### Yeni Admin Sayfası Oluşturma

1. **Sayfa dosyasını oluştur:**
   ```bash
   src/app/admin/yeni-sayfa/page.tsx
   ```

2. **AdminLayout kullan:**
   ```tsx
   import { AdminLayout } from "@/components/admin"
   
   export default function YeniSayfa() {
     return (
       <AdminLayout
         title="Yeni Sayfa"
         icon={SettingsIcon}
         currentPage="/admin/yeni-sayfa"
       >
         {/* Sayfa içeriği */}
       </AdminLayout>
     )
   }
   ```

3. **Admin component'lerini kullan:**
   ```tsx
   import { AdminStatsCard, AdminTable, AdminBadge } from "@/components/admin"
   
   // Component'leri kullanarak sayfayı oluştur
   ```

### CSS Stilleri

Admin CSS class'larını kullanarak tutarlı bir görünüm sağla:

```tsx
<div className="admin-card">
  <div className="admin-card-header">
    <h3>Başlık</h3>
  </div>
  <div className="admin-card-content">
    <Button className="admin-btn-primary">Ana Buton</Button>
    <Button className="admin-btn-secondary">İkincil Buton</Button>
  </div>
</div>
```

### TypeScript Kuralları

- Tüm component'ler type-safe olmalı
- Interface'ler doğru tanımlanmalı
- LucideIcon type'ı kullanılmalı

```tsx
import { LucideIcon, Settings as SettingsIcon } from "lucide-react"

interface VeriTipi {
  id: string
  name: string
  icon: LucideIcon
}
```

## 🚀 Best Practices

### Component Kullanımı
- Her admin sayfası `AdminLayout` kullanmalı
- İstatistikler için `AdminStatsCard` kullan
- Tablolar için `AdminTable` kullan
- Durum göstergeleri için `AdminBadge` kullan

### CSS Kullanımı
- Tailwind class'ları yerine admin class'larını kullan
- Responsive tasarım için Tailwind class'ları kullanabilirsin
- Özel stiller için CSS modülleri kullan

### Performans
- Component'leri lazy load et
- Büyük veri setleri için pagination kullan
- Grafikler için memoization kullan

## 🔍 Debugging

### Yaygın Sorunlar

1. **TypeScript Hataları**
   - LucideIcon import'unu kontrol et
   - Interface'lerin doğru tanımlandığından emin ol

2. **CSS Sorunları**
   - Admin CSS class'larının doğru kullanıldığını kontrol et
   - Tailwind CSS v4 uyumluluğunu kontrol et

3. **Component Hataları**
   - Required props'ların eksik olup olmadığını kontrol et
   - Children prop'unun doğru geçildiğini kontrol et

### Geliştirme Araçları

- **React DevTools** - Component debugging
- **TypeScript Compiler** - Type checking
- **Tailwind CSS DevTools** - CSS debugging

## 📚 Örnekler

### Tam Sayfa Örneği

```tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AdminLayout, AdminStatsCard, AdminTable, AdminBadge } from "@/components/admin"
import { Users, DollarSign, TrendingUp, Settings } from "lucide-react"

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12.5%",
      trend: "up" as const,
      icon: Users
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+20.1%",
      trend: "up" as const,
      icon: DollarSign
    }
  ]

  return (
    <AdminLayout
      title="Dashboard"
      icon={Settings}
      currentPage="/admin"
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <AdminStatsCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Recent Activity</h3>
        </div>
        <div className="admin-card-content">
          <AdminTable
            columns={[
              { key: "user", label: "User" },
              { key: "action", label: "Action" },
              { key: "status", label: "Status" }
            ]}
            data={[]}
          />
        </div>
      </div>
    </AdminLayout>
  )
}
```

---

**Son Güncelleme:** 30 Kasım 2025
