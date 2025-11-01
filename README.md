# Ristorino — Guía técnica del proyecto (Backend + Frontend)

> **Objetivo:** Documentar cómo está armado el sistema Ristorino (Spring Boot + Angular + Mock Node), qué hace cada archivo/carpeta y cómo correr una demo end‑to‑end.

---

## 1) Visión general

**Ristorino** es un portal que publica promociones enviadas por restaurantes externos. Registra clics de usuarios sobre esas promos y notifica asincrónicamente a los restaurantes.

**Componentes:**

* 🟢 **Backend (Spring Boot)** — expone APIs públicas del portal, guarda promociones/restaurantes y registra clics. Además ejecuta un *scheduler* para notificar clics.
* 🟠 **Restaurante Mock (Node/Express)** — simula un restaurante: envía promociones al portal y recibe notificaciones de clics.
* 🔵 **Frontend (Angular)** — lista promociones, registra clics y muestra detalle del restaurante.

---

## 2) Arquitectura funcional (flujo)

```
Restaurante Mock (Node, :9090)
   └─(POST /demo/publish-promo)→ Ristorino (Spring, :8081)
                                 ├─ guarda Restaurant + Promotion
Frontend (Angular, :4200) ──GET /api/promotions──▶
Frontend (click) ──POST /api/clicks──▶ Ristorino
Ristorino (scheduler) ──POST /demo/notify-click──▶ Restaurante Mock
```

**Paso a paso:**

1. El Mock envía una promoción a `/api/external/promotions` (vía `POST /demo/publish-promo`).
2. Backend crea/actualiza **Restaurant** y guarda **Promotion**.
3. Front consulta `GET /api/promotions` y renderiza tarjetas.
4. Usuario hace clic → front envía `POST /api/clicks {promotionId}`.
5. Backend marca el click como `PENDING`.
6. Un **scheduler** recoge pendientes y notifica a `POST /demo/notify-click` del restaurante.
7. Mock responde **OK** y el backend marca el click como `SENT`.

---

## 3) Backend (Spring Boot)

**Puertos y propiedades (ejemplo):**

```properties
server.port=8081
spring.application.name=RistorinoYa

ristorino.notification.rest.base-url=http://localhost:9090
ristorino.notification.rest.path=/demo/notify-click
ristorino.notification.rest.enabled=true
ristorino.notification.retries.max-attempts=5
ristorino.notification.retries.fixed-delay-ms=3000

spring.h2.console.enabled=true
spring.jpa.hibernate.ddl-auto=update
```

**Paquetes/Clases (resumen):**

```
com.portal.ristorinoya
├── controller
│   ├── PromotionController         // GET /api/promotions
│   ├── ClickController             // POST /api/clicks
│   ├── RestaurantController        // GET /api/restaurants/{id}
│   └── ExternalIngestController    // POST /api/external/promotions
├── dto
│   ├── PromotionDTO, RestaurantDTO, ClickCreateDTO, ExternalPromotionInDTO
├── entity
│   ├── Promotion, Restaurant, ClickEvent
├── repository
│   ├── PromotionRepository, RestaurantRepository, ClickEventRepository
├── scheduler
│   └── ClickNotifyScheduler        // notifica clics a restaurantes
└── client.restaurantnotify
    ├── RestaurantNotifyClient, RestRestaurantNotifyClient
```

**Contratos API (usados por el front):**

* `GET /api/promotions` → `{ content: Promotion[] }`
* `POST /api/clicks`    → `{ clickId: number }`
* `GET /api/restaurants/{id}` → `Restaurant`

**CORS (desarrollo):**

```java
@Bean
public WebMvcConfigurer corsConfigurer() {
  return new WebMvcConfigurer() {
    @Override public void addCorsMappings(CorsRegistry registry) {
      registry.addMapping("/**")
        .allowedOrigins("http://localhost:4200")
        .allowedMethods("GET","POST","PUT","DELETE","OPTIONS");
    }
  };
}
```

---

## 4) Mock Restaurante (Node/Express)

**package.json** (mínimo):

```json
{
  "name": "ristorino-mock-restaurant",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": { "start": "node server.js" },
  "dependencies": { "express": "^4.19.2" }
}
```

**server.js** (endpoints):

```js
import express from 'express';
const app = express();
app.use(express.json());

// recibe notificaciones de clics
app.post('/demo/notify-click', (req, res) => {
  console.log('[MOCK] Petición recibida:', req.body);
  res.json({ ok: true });
});

// publica una promo hacia Ristorino
app.post('/demo/publish-promo', async (req, res) => {
  const target = 'http://localhost:8081/api/external/promotions';
  const resp = await fetch(target, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  });
  const data = await resp.json();
  res.status(resp.status).json({ ok: resp.ok, created: data });
});

app.listen(9090, () => console.log('[MOCK] Escuchando en http://localhost:9090'));
```

---

## 5) Frontend (Angular)

**Stack:** Angular 20 (standalone app shell) + feature module `HomeModule`.

**Estructura relevante:**

```
src/
├── app/
│   ├── app.html                       // <router-outlet />
│   ├── app.config.ts                  // provideRouter + provideHttpClient
│   ├── app.routes.ts                  // carga lazy de HomeModule
│   └── home/
│       ├── home.module.ts             // declara componentes + importa Common/HTTP/Router
│       ├── home-routing.module.ts     // rutas feature ('', 'restaurantes/:id')
│       ├── components/
│       │   ├── home/
│       │   │   ├── home.component.ts
│       │   │   ├── home.component.html
│       │   │   └── home.component.css
│       │   └── promotion-card/
│       │       ├── promotion-card.component.ts
│       │       ├── promotion-card.component.html
│       │       └── promotion-card.component.css
│       ├── pages/
│       │   └── restaurant-detail/
│       │       ├── restaurant-detail.component.ts
│       │       ├── restaurant-detail.component.html
│       │       └── restaurant-detail.component.css
│       ├── models/
│       │   ├── promotion.model.ts
│       │   └── restaurant.model.ts
│       └── services/
│           ├── promotions/promotions.service.ts
│           └── monetization/click.service.ts
└── environments/
    ├── environment.ts                 // baseUrl: ''
    └── environment.development.ts     // baseUrl: 'http://localhost:8081'
```

### 5.1 Ruteo

**`app.html`**

```html
<router-outlet></router-outlet>
```

**`app.routes.ts`**

```ts
import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: '**', redirectTo: '' }
];
```

**`home-routing.module.ts`**

```ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurantes/:id', component: RestaurantDetailComponent }
];
```

### 5.2 Modelos (alineados al backend)

**`promotion.model.ts`**

```ts
export interface Promotion {
  id: number;
  restaurantId: number;
  title: string;
  description: string;
  imageUrl: string;
  active: boolean;
}
```

**`restaurant.model.ts`**

```ts
export interface Restaurant {
  id: number;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  website?: string;
  imageUrl?: string;
}
```

### 5.3 Servicios HTTP

**`promotions.service.ts`**

```ts
@Injectable({ providedIn: 'root' })
export class PromotionsService {
  private http = inject(HttpClient);
  private base = environment.baseUrl;

  listPromotions() {
    return this.http.get<{ content: Promotion[] }>(`${this.base}/api/promotions`);
  }
  getRestaurant(id: number) {
    return this.http.get<Restaurant>(`${this.base}/api/restaurants/${id}`);
  }
}
```

**`click.service.ts`**

```ts
@Injectable({ providedIn: 'root' })
export class ClickService {
  private http = inject(HttpClient);
  private base = environment.baseUrl;

  registerClick(promotionId: number) {
    return this.http.post<{ clickId: number }>(`${this.base}/api/clicks`, { promotionId });
  }
}
```

### 5.4 Componentes

**HomeComponent (lista y clic)**

```ts
export class HomeComponent implements OnInit {
  loading = signal(true);
  promos = signal<Promotion[]>([]);
  error = signal<string | null>(null);

  ngOnInit() {
    this.promosSvc.listPromotions().subscribe({
      next: r => { this.promos.set(r.content ?? []); this.loading.set(false); },
      error: _ => { this.error.set('No se pudieron cargar las promociones'); this.loading.set(false); }
    });
  }

  onOpenPromotion(p: Promotion) {
    this.clicksSvc.registerClick(p.id).subscribe({ error: () => {} });
    this.router.navigate(['/restaurantes', p.restaurantId]);
  }
}
```

**PromotionCard (presentacional)**

```ts
@Component({ selector: 'rs-promotion-card', ... })
export class PromotionCardComponent {
  @Input() promotion!: Promotion;
  @Output() open = new EventEmitter<void>();
}
```

**RestaurantDetail (GET restaurante)**

```ts
ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  if (id) this.promosSvc.getRestaurant(id).subscribe({ next: r => this.restaurant.set(r) });
}
```

### 5.5 Environments

**`environment.development.ts`**

```ts
export const environment = { baseUrl: 'http://localhost:8081' };
```

---

## 6) Cómo correr una demo end‑to‑end

1. **Backend** (Spring Boot) en `:8081` con CORS habilitado.
2. **Mock** (Node) en `:9090`:

   ```bash
   node server.js
   ```
3. **Sembrar una promoción** (Postman o cURL):

   ```bash
   curl -X POST http://localhost:9090/demo/publish-promo \
     -H "Content-Type: application/json" \
     -d '{
       "restaurantName": "Trattoria Roma",
       "title": "2x1 en pastas (mock)",
       "description": "Promo enviada por el mock al portal",
       "imageUrl": "https://picsum.photos/seed/roma/800/450",
       "startAt": "2025-10-30T00:00:00Z",
       "endAt": "2025-11-10T00:00:00Z",
       "active": true,
       "priority": 7
     }'
   ```
4. **Frontend** (Angular) en `:4200`:

   ```bash
   npm install
   ng serve -o
   ```
5. Verás **tarjetas** con promos (GET `/api/promotions`). Al hacer clic:

  * `POST /api/clicks` → `200 { clickId }`
  * Navega a `/restaurantes/:id` → `GET /api/restaurants/:id`
6. Opcional: verificar en consola del Mock que llegan notificaciones del scheduler.

---

## 7) Troubleshooting rápido

* **CORS error**: confirmar bean CORS con `http://localhost:4200` permitido.
* **Sin tarjetas**: verificar `GET /api/promotions` → debe devolver `{ content: [...] }`.
* **404 en `/api/restaurants/:id`**: el endpoint puede no estar implementado; la vista muestra "sin datos".
* **500 en `/api/clicks`**: revisar `promotionId` válido (uno de los devueltos por `/api/promotions`).
* **Advertencias de `*ngIf` en tests**: importar `CommonModule` y usar `RouterTestingModule`/`HttpClientTestingModule` en specs.

---

## 8) Roadmap sugerido

* **UI/UX**: Tailwind o Angular Material; placeholders para imágenes; skeletons/spinners.
* **Métricas**: contador de clics por promoción; orden por prioridad/fecha.
* **Auth (futuro)**: JWT en frontend y CORS reforzado por roles; guardas de ruta.
* **Docker**: Nginx sirviendo `dist/` en producción y perfil `dev` para Spring.

---

## 9) Glosario mínimo

* **Promotion**: Oferta publicada por el restaurante.
* **ClickEvent**: Registro de interacción del usuario con una promoción.
* **Scheduler**: Tarea programada en Spring que notifica clics a cada restaurante.
* **Mock**: Servicio Node que emula el restaurante externo.

---

> Con esta guía deberías poder: entender el flujo completo, ubicar y editar cada archivo clave, y correr una prueba end‑to‑end en minutos.
