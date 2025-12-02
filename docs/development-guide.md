# Geliştirme Kılavuzu

## 🚀 Projeye Başlarken

Bu kılavuz, Paragon projesine yeni katkıda bulunan geliştiriciler için temel bilgileri ve en iyi pratikleri içerir.

## 📋 Gereksinimler

### Sistem Gereksinimleri
- **Node.js** 18+ 
- **npm**, **yarn**, **pnpm** veya **bun**
- **Git**
- **VS Code** (tavsiye edilen)

### VS Code Eklentileri (Tavsiye Edilen)
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## 🛠️ Kurulum

### 1. Repository'yi Klonlayın
```bash
git clone <repository-url>
cd paragon-web
```

### 2. Dependencies'leri Yükleyin
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

### 3. Development Server'ı Başlatın
```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

### 4. Tarayıcıda Açın
[http://localhost:3000](http://localhost:3000)

## 📁 Proje Yapısı

```
paragon-web/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── admin/             # Admin panel sayfaları
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── users/          # User management
│   │   │   ├── analytics/      # Analytics
│   │   │   ├── metadata/       # Metadata management
│   │   │   └── settings/       # Settings
│   │   ├── dashboard/         # Ana dashboard
│   │   ├── globals.css        # Global stiller
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── admin/            # Admin component'leri
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminHeader.tsx
│   │   │   ├── AdminStatsCard.tsx
│   │   │   ├── AdminTable.tsx
│   │   │   └── AdminBadge.tsx
│   │   └── ui/               # UI component'leri
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   ├── lib/                  # Utility fonksiyonları
│   ├── types/                # TypeScript type'ları
│   └── styles/
│       └── admin.css         # Admin panel stilleri
├── docs/                    # Dokümantasyon
│   ├── admin-panel.md        # Admin panel dokümantasyonu
│   ├── css-guide.md          # CSS kılavuzu
│   └── development-guide.md   # Geliştirme kılavuzu
├── package.json              # Dependencies
├── postcss.config.mjs        # PostCSS config
├── tailwind.config.js        # Tailwind config
└── tsconfig.json            # TypeScript config
```

## 🎨 Teknoloji Stack

### Frontend
- **Next.js 14+** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Lucide React** - Icons
- **PostCSS** - CSS processing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 🎯 Geliştirme Akışı

### 1. Feature Branch Oluşturma
```bash
git checkout -b feature/yeni-ozellik
# veya
git checkout -b fix/bug-duzeltmesi
```

### 2. Kod Yazma Kuralları
- **TypeScript** kullan
- **Admin component'lerini** kullan
- **CSS class'larını** doğru kullan
- **Code review** için hazırlık yap

### 3. Testing
```bash
npm run test
# veya
yarn test
```

### 4. Build Kontrolü
```bash
npm run build
# veya
yarn build
```

### 5. Push ve Pull Request
```bash
git add .
git commit -m "feat: yeni özellik eklendi"
git push origin feature/yeni-ozellik
```

## 🔧 Kod Standartları

### TypeScript Kuralları

#### 1. Type Safety
```tsx
// ❌ Yanlış
function processData(data: any) {
  return data.map(item => item.name)
}

// ✅ Doğru
interface User {
  id: string
  name: string
  email: string
}

function processData(data: User[]) {
  return data.map(item => item.name)
}
```

#### 2. Interface'ler
```tsx
// Component props için interface
interface AdminStatsCardProps {
  title: string
  value: string
  change?: string
  trend?: "up" | "down" | "neutral"
  icon: LucideIcon
}

// API response için interface
interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}
```

#### 3. Generics
```tsx
// Generic component
interface AdminTableProps<T> {
  data: T[]
  columns: Column<T>[]
  renderItem: (item: T) => React.ReactNode
}

// Generic function
function createApiResponse<T>(data: T): ApiResponse<T> {
  return {
    data,
    success: true
  }
}
```

### React Kuralları

#### 1. Component Yapısı
```tsx
// ✅ Doğru component yapısı
import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin"
import { DollarSign, Users } from "lucide-react"

interface DashboardProps {
  initialData?: User[]
}

export default function Dashboard({ initialData = [] }: DashboardProps) {
  const [users, setUsers] = useState<User[]>(initialData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Side effects
  }, [])

  return (
    <AdminLayout title="Dashboard" icon={LayoutDashboard}>
      {/* Component içeriği */}
    </AdminLayout>
  )
}
```

#### 2. Hooks Kullanımı
```tsx
// Custom hook
function useApiData<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}
```

### CSS Kuralları

#### 1. Admin Class'larını Kullan
```tsx
// ❌ Yanlış
<div className="bg-gray-800 border-gray-700 rounded-lg p-4 shadow-sm">

// ✅ Doğru
<div className="admin-card">
```

#### 2. Responsive Tasarım
```tsx
// ✅ Doğru
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

#### 3. Component Stilleri
```tsx
// CSS modülleri için
import styles from "./Component.module.css"

<div className={styles.customClass}>
```

## 🎨 Component Geliştirme

### 1. Yeni Admin Component'i

#### Component Dosyası Oluştur
```tsx
// src/components/admin/AdminNewComponent.tsx
import { LucideIcon } from "lucide-react"

interface AdminNewComponentProps {
  title: string
  icon: LucideIcon
  data?: any[]
  onAction?: (item: any) => void
}

export function AdminNewComponent({
  title,
  icon: Icon,
  data = [],
  onAction
}: AdminNewComponentProps) {
  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <h3>{title}</h3>
        </div>
      </div>
      <div className="admin-card-content">
        {/* Component içeriği */}
      </div>
    </div>
  )
}
```

#### Export Ekle
```tsx
// src/components/admin/index.ts
export { AdminNewComponent } from "./AdminNewComponent"
```

### 2. Yeni Sayfa Oluşturma

#### Sayfa Dosyası
```tsx
// src/app/admin/new-page/page.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AdminLayout, AdminStatsCard } from "@/components/admin"
import { Settings, Plus } from "lucide-react"

export default function NewPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <AdminLayout
      title="New Page"
      icon={Settings}
      currentPage="/admin/new-page"
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      actionButtons={
        <Button className="admin-btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      }
    >
      <div className="admin-stats-grid">
        <AdminStatsCard
          title="Total Items"
          value="123"
          icon={Settings}
        />
      </div>
    </AdminLayout>
  )
}
```

## 🔄 Git Workflow

### Branch Stratejisi
- **main** - Production branch
- **develop** - Development branch
- **feature/*** - Yeni özellikler
- **fix/*** - Bug düzeltmeleri
- **hotfix/*** - Acil düzeltmeler

### Commit Mesajları
```
feat: yeni özellik eklendi
fix: login sorunu düzeltildi
docs: dokümantasyon güncellendi
style: kod formatı düzeltildi
refactor: kod yeniden yapılandırıldı
test: testler eklendi
chore: build süreci güncellendi
```

### Pull Request Kuralları
1. **Başlık:** Ne yaptığını özetle
2. **Açıklama:** Neden ve nasıl yaptığını anlat
3. **Test:** Testlerin çalıştığını göster
4. **Screenshot:** UI değişiklikleri için ekran görüntüsü

## 🐛 Debugging

### Yaygın Sorunlar

#### 1. TypeScript Hataları
```bash
# Type checking
npm run type-check
# veya
npx tsc --noEmit
```

#### 2. CSS Sorunları
- Tailwind class'larını kontrol et
- Admin CSS import'unu kontrol et
- PostCSS config'ini kontrol et

#### 3. Build Hataları
```bash
# Build kontrolü
npm run build
# veya
yarn build
```

### Debug Araçları
- **React DevTools** - Component debugging
- **Chrome DevTools** - General debugging
- **TypeScript Compiler** - Type checking
- **ESLint** - Code quality

## 📚 En İyi Pratikler

### 1. Component Tasarımı
- **Single Responsibility** - Her component tek bir iş yapmalı
- **Reusable** - Component'ler yeniden kullanılabilir olmalı
- **Type-safe** - Props'lar doğru type'lanmalı

### 2. State Management
- **Local state** için useState kullan
- **Global state** için Context API veya state management library
- **Server state** için React Query veya SWR

### 3. Performance
- **Memoization** için useMemo ve useCallback kullan
- **Lazy loading** için React.lazy ve Suspense kullan
- **Code splitting** için dynamic import kullan

### 4. Accessibility
- **Semantic HTML** kullan
- **ARIA labels** ekle
- **Keyboard navigation** sağla
- **Color contrast** kontrol et

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build

# Start production server
npm start
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Paragon
```

### Vercel Deployment
```bash
# Vercel CLI
npm i -g vercel
vercel --prod
```

## 📞 Yardım ve Destek

### İletişim
- **Discord:** Proje kanalı
- **Email:** dev@paragon.com
- **Documentation:** [docs](./docs/)

### Kaynaklar
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)

---

**Son Güncelleme:** 30 Kasım 2025
