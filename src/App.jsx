import { useState, useEffect, useRef } from "react";

const APP_DATA = {
  name: "LazyFit: Entrenamiento para Principiantes",
  developer: "Next Vision Limited",
  category: "Salud y Fitness",
  rating: 4.8,
  reviewCount: "47.2K",
  price: "Gratis",
  ageRating: "4+",
  version: "3.2.1",
  size: "156.4 MB",
  // TODO: reemplazar con URL real del ícono de la app
  icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/dc/3f/09/dc3f0992-1f05-4d78-7178-3bc7084fd773/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/460x0w.webp",
  description: `¿Demasiado perezoso para ir al gimnasio? ¡LazyFit es perfectamente para ti!

LazyFit ofrece entrenamientos sencillos y efectivos diseñados especialmente para principiantes. Sin equipo, sin excusas — solo tu cuerpo y unos minutos al día.

✅ Rutinas de 5 a 30 minutos
✅ Sin equipamiento necesario
✅ Plan personalizado según tu nivel
✅ Seguimiento de progreso diario
✅ Más de 200 ejercicios en video
✅ Recordatorios personalizables

Tanto si quieres perder peso, tonificar tu cuerpo o simplemente moverte más, LazyFit se adapta a tu ritmo y te ayuda a crear el hábito del ejercicio de manera gradual y sostenible.`,
  screenshots: [
    // TODO: reemplazar con screenshots reales de la app
    "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/dc/3f/09/dc3f0992-1f05-4d78-7178-3bc7084fd773/Placeholder.mill/392x696bb.jpg",
    "https://via.placeholder.com/392x696/1a1a2e/4CAF50?text=Rutinas+Diarias",
    "https://via.placeholder.com/392x696/1a1a2e/4CAF50?text=Seguimiento",
    "https://via.placeholder.com/392x696/1a1a2e/4CAF50?text=Progreso",
    "https://via.placeholder.com/392x696/1a1a2e/4CAF50?text=Ejercicios",
  ],
  reviews: [
    {
      id: 1,
      author: "María G.",
      rating: 5,
      date: "12/06/2025",
      title: "¡Increíble para empezar!",
      body: "Llevaba años queriendo hacer ejercicio y nunca encontraba la motivación. LazyFit lo hizo muy fácil con rutinas cortas y progresivas. ¡Ya llevo 3 meses seguidos!",
    },
    {
      id: 2,
      author: "Carlos M.",
      rating: 5,
      date: "28/05/2025",
      title: "La mejor app para perezosos",
      body: "El nombre lo dice todo. Perfecta para los que no queremos complicarnos. Las rutinas son cortas pero efectivas. La recomiendo 100%.",
    },
    {
      id: 3,
      author: "Ana P.",
      rating: 4,
      date: "15/05/2025",
      title: "Muy buena pero falta contenido premium",
      body: "La aplicación es fantástica para comenzar. Quizás le faltaría más variedad en los planes avanzados sin necesidad de suscripción.",
    },
    {
      id: 4,
      author: "Pedro L.",
      rating: 5,
      date: "02/05/2025",
      title: "Resultados reales en 2 meses",
      body: "No esperaba tanto. Bajé 4kg y me siento con mucha más energía. Los videos explicativos son muy claros.",
    },
  ],
  features: [
    { icon: "🏃", title: "Entrenamientos Personalizados", desc: "Rutinas adaptadas a tu nivel y objetivos" },
    { icon: "⏱️", title: "Solo 5-30 Minutos", desc: "Sin excusas, tiempo para todos" },
    { icon: "🏠", title: "En Casa o Donde Sea", desc: "Sin equipamiento necesario" },
    { icon: "📊", title: "Seguimiento de Progreso", desc: "Ve tus logros día a día" },
    { icon: "🎯", title: "+200 Ejercicios", desc: "Con videos demostrativos HD" },
    { icon: "🔔", title: "Recordatorios", desc: "Mantén el hábito activo" },
  ],
};

function StarRating({ rating, size = 14, color = "#FF9500" }) {
  return (
    <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const partial = !filled && rating > star - 1;
        const fillPercent = partial ? (rating - (star - 1)) * 100 : 0;
        return (
          <svg key={star} width={size} height={size} viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`star-grad-${star}-${size}`}>
                <stop offset={`${filled ? 100 : fillPercent}%`} stopColor={color} />
                <stop offset={`${filled ? 100 : fillPercent}%`} stopColor="#D1D1D6" />
              </linearGradient>
            </defs>
            <polygon
              points="10,1 12.9,7 19.5,7.6 14.7,12 16.2,18.5 10,15 3.8,18.5 5.3,12 0.5,7.6 7.1,7"
              fill={filled ? color : partial ? `url(#star-grad-${star}-${size})` : "#D1D1D6"}
            />
          </svg>
        );
      })}
    </div>
  );
}

function RatingBar({ stars, percentage }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
      <span style={{ fontSize: "12px", color: "#8E8E93", minWidth: "8px" }}>{stars}</span>
      <div style={{ flex: 1, height: "4px", backgroundColor: "#E5E5EA", borderRadius: "2px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${percentage}%`,
            backgroundColor: "#FF9500",
            borderRadius: "2px",
            transition: "width 0.8s ease",
          }}
        />
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div
      style={{
        backgroundColor: "#1C1C1E",
        borderRadius: "16px",
        padding: "16px",
        minWidth: "280px",
        maxWidth: "280px",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
        <StarRating rating={review.rating} size={12} />
        <span style={{ fontSize: "12px", color: "#8E8E93" }}>{review.date}</span>
      </div>
      <p style={{ fontSize: "14px", fontWeight: "600", color: "#FFFFFF", marginBottom: "6px", lineHeight: "1.3" }}>
        {review.title}
      </p>
      <p style={{ fontSize: "13px", color: "#EBEBF5", opacity: 0.6, lineHeight: "1.5", marginBottom: "8px" }}>
        {review.body}
      </p>
      <span style={{ fontSize: "12px", color: "#8E8E93" }}>{review.author}</span>
    </div>
  );
}

function FeatureCard({ feature }) {
  return (
    <div
      style={{
        backgroundColor: "#1C1C1E",
        borderRadius: "16px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
      }}
    >
      <span style={{ fontSize: "28px" }}>{feature.icon}</span>
      <p style={{ fontSize: "14px", fontWeight: "600", color: "#FFFFFF", lineHeight: "1.3" }}>{feature.title}</p>
      <p style={{ fontSize: "12px", color: "#8E8E93", lineHeight: "1.4" }}>{feature.desc}</p>
    </div>
  );
}

function ScreenshotCarousel({ screenshots }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = 220 + 12;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(index);
    }
  };

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          paddingBottom: "8px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory",
        }}
      >
        {screenshots.map((src, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: "220px",
              height: "390px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              scrollSnapAlign: "start",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
          >
            <img
              src={src}
              alt={`Captura de pantalla ${i + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/392x696/1a1a2e/4CAF50?text=Pantalla+${i + 1}`;
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "10px" }}>
        {screenshots.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === activeIndex ? "16px" : "6px",
              height: "6px",
              borderRadius: "3px",
              backgroundColor: i === activeIndex ? "#4CAF50" : "#3A3A3C",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [expanded, setExpanded] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [completedWorkouts, setCompletedWorkouts] = useState(3);
  const [streak, setStreak] = useState(7);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (workoutStarted) {
      timerRef.current = setInterval(() => {
        setWorkoutTimer((t) => t + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [workoutStarted]);

  const handleDownload = () => {
    if (downloaded) return;
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
    }, 1500);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const styles = {
    app: {
      backgroundColor: "#000000",
      minHeight: "100vh",
      maxWidth: "430px",
      margin: "0 auto",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
      color: "#FFFFFF",
      position: "relative",
    },
    stickyHeader: {
      position: "fixed",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: "430px",
      backgroundColor: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      padding: "10px 16px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      zIndex: 100,
      opacity: headerVisible ? 1 : 0,
      transition: "opacity 0.3s ease",
      pointerEvents: headerVisible ? "all" : "none",
      borderBottom: "0.5px solid rgba(255,255,255,0.1)",
    },
    heroSection: {
      padding: "60px 16px 20px",
      background: "linear-gradient(180deg, #0a1628 0%, #000000 100%)",
    },
    appHeader: {
      display: "flex",
      gap: "16px",
      alignItems: "flex-start",
      marginBottom: "16px",
    },
    appIcon: {
      width: "110px",
      height: "110px",
      borderRadius: "24px",
      flexShrink: 0,
      boxShadow: "0 4px 20px rgba(76,175,80,0.3)",
    },
    appInfo: {
      flex: 1,
      paddingTop: "4px",
    },
    appName: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#FFFFFF",
      lineHeight: "1.2",
      marginBottom: "4px",
    },
    developerName: {
      fontSize: "14px",
      color: "#4CAF50",
      marginBottom: "6px",
      fontWeight: "500",
    },
    categoryBadge: {
      display: "inline-block",
      backgroundColor: "#1C1C1E",
      color: "#8E8E93",
      fontSize: "12px",
      padding: "3px 10px",
      borderRadius: "20px",
      border: "1px solid #3A3A3C",
    },
    downloadBtn: {
      width: "100%",
      padding: "16px",
      borderRadius: "14px",
      background: downloaded
        ? "linear-gradient(135deg, #2D6A30, #388E3C)"
        : "linear-gradient(135deg, #4CAF50, #66BB6A)",
      color: "#FFFFFF",
      fontSize: "17px",
      fontWeight: "700",
      border: "none",
      cursor: downloaded ? "default" : "pointer",
      marginBottom: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      letterSpacing: "0.3px",
      boxShadow: "0 4px 15px rgba(76,175,80,0.4)",
      transition: "all 0.3s ease",
      opacity: downloading ? 0.8 : 1,
    },
    statsRow: {
      display: "flex",
      justifyContent: "space-around",
      padding: "16px",
      backgroundColor: "#1C1C1E",
      borderRadius: "16px",
      marginBottom: "4px",
    },
    statItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
    },
    statValue: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#FFFFFF",
    },
    statLabel: {
      fontSize: "11px",
      color: "#8E8E93",
      textAlign: "center",
      textTransform: "uppercase",
      letterSpacing: "0.4px",
    },
    section: {
      padding: "20px 16px",
      borderTop: "0.5px solid #2C2C2E",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#FFFFFF",
      marginBottom: "14px",
    },
    description: {
      fontSize: "15px",
      color: "#EBEBF5",
      lineHeight: "1.6",
      opacity: 0.8,
    },
    showMoreBtn: {
      background: "none",
      border: "none",
      color: "#4CAF50",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      padding: "8px 0 0",
      display: "block",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "8px",
    },
    infoItem: {
      backgroundColor: "#1C1C1E",
      borderRadius: "12px",
      padding: "12px",
    },
    infoLabel: {
      fontSize: "11px",
      color: "#8E8E93",
      textTransform: "uppercase",
      letterSpacing: "0.4px",
      marginBottom: "4px",
    },
    infoValue: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#FFFFFF",
    },
    tabBar: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: "430px",
      backgroundColor: "rgba(0,0,0,0.9)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderTop: "0.5px solid rgba(255,255,255,0.1)",
      display: "flex",
      justifyContent: "space-around",
      padding: "8px 0 20px",
      zIndex: 99,
    },
    tabItem: (active) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
      padding: "6px 16px",
      cursor: "pointer",
      color: active ? "#4CAF50" : "#8E8E93",
      transition: "color 0.2s ease",
    }),
    tabIcon: {
      fontSize: "22px",
    },
    tabLabel: {
      fontSize: "10px",
      fontWeight: "500",
      letterSpacing: "0.3px",
    },
    // App screens styles
    appScreen: {
      padding: "60px 16px 100px",
      minHeight: "100vh",
    },
    workoutCard: {
      backgroundColor: "#1C1C1E",
      borderRadius: "20px",
      padding: "20px",
      marginBottom: "12px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      cursor: "pointer",
      transition: "transform 0.15s ease",
      border: "1px solid #2C2C2E",
    },
    workoutEmoji: {
      fontSize: "36px",
      width: "56px",
      height: "56px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#2C2C2E",
      borderRadius: "14px",
      flexShrink: 0,
    },
    progressBar: (pct) => ({
      height: "6px",
      backgroundColor: "#2C2C2E",
      borderRadius: "3px",
      overflow: "hidden",
      marginTop: "8px",
    }),
    progressFill: (pct) => ({
      height: "100%",
      width: `${pct}%`,
      background: "linear-gradient(90deg, #4CAF50, #66BB6A)",
      borderRadius: "3px",
      transition: "width 0.5s ease",
    }),
    badgeGreen: {
      backgroundColor: "rgba(76,175,80,0.15)",
      color: "#4CAF50",
      fontSize: "11px",
      fontWeight: "600",
      padding: "3px 10px",
      borderRadius: "20px",
      border: "1px solid rgba(76,175,80,0.3)",
    },
    badgeOrange: {
      backgroundColor: "rgba(255,149,0,0.15)",
      color: "#FF9500",
      fontSize: "11px",
      fontWeight: "600",
      padding: "3px 10px",
      borderRadius: "20px",
      border: "1px solid rgba(255,149,0,0.3)",
    },
  };

  const tabs = [
    { id: "inicio", label: "Inicio", icon: "🏠" },
    { id: "entrenar", label: "Entrenar", icon: "💪" },
    { id: "progreso", label: "Progreso", icon: "📊" },
    { id: "perfil", label: "Perfil", icon: "👤" },
  ];

  const workouts = [
    { id: 1, title: "Cardio Matutino", duration: "10 min", level: "Principiante", emoji: "🌅", progress: 100, calories: 80 },
    { id: 2, title: "Fuerza de Núcleo", duration: "15 min", level: "Principiante", emoji: "🔥", progress: 60, calories: 120 },
    { id: 3, title: "Estiramiento Total", duration: "8 min", level: "Todos", emoji: "🧘", progress: 0, calories: 40 },
    { id: 4, title: "HIIT Express", duration: "20 min", level: "Intermedio", emoji: "⚡", progress: 0, calories: 200 },
    { id: 5, title: "Yoga Relajante", duration: "12 min", level: "Principiante", emoji: "🌿", progress: 0, calories: 60 },
  ];

  const weekDays = ["L", "M", "X", "J", "V", "S", "D"];
  const completedDays = [true, true, true, true, true, true, false];

  // Pantalla de descarga (App Store listing)
  const renderStoreListing = () => (
    <div>
      {/* Sticky header */}
      <div style={styles.stickyHeader}>
        <img src={APP_DATA.icon} alt="LazyFit" style={{ width: "36px", height: "36px", borderRadius: "8px" }} onError={(e) => { e.target.src = "https://via.placeholder.com/36x36/4CAF50/FFFFFF?text=LF"; }} />
        <span style={{ fontSize: "14px", fontWeight: "600", flex: 1 }}>LazyFit</span>
        <button
          onClick={handleDownload}
          style={{
            backgroundColor: downloaded ? "#2D6A30" : "#4CAF50",
            color: "#FFFFFF",
            fontSize: "13px",
            fontWeight: "700",
            border: "none",
            borderRadius: "20px",
            padding: "6px 16px",
            cursor: "pointer",
          }}
        >
          {downloaded ? "✓ Instalada" : "Obtener"}
        </button>
      </div>

      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.appHeader}>
          <img
            src={APP_DATA.icon}
            alt="LazyFit ícono"
            style={styles.appIcon}
            onError={(e) => { e.target.src = "https://via.placeholder.com/110x110/1a3a1a/4CAF50?text=LF"; }}
          />
          <div style={styles.appInfo}>
            <h1 style={styles.appName}>LazyFit</h1>
            <p style={{ fontSize: "13px", color: "#EBEBF5", opacity: 0.7, marginBottom: "6px" }}>
              Entrenamiento para principiantes
            </p>
            <p style={styles.developerName}>{APP_DATA.developer}</p>
            <span style={styles.categoryBadge}>{APP_DATA.category}</span>
          </div>
        </div>

        <button onClick={handleDownload} style={styles.downloadBtn}>
          {downloading ? (
            <>
              <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span>
              Descargando...
            </>
          ) : downloaded ? (
            <>✓ Instalada — Abrir</>
          ) : (
            <>
              <span>↓</span> Obtener Gratis
            </>
          )}
        </button>

        <p style={{ fontSize: "11px", color: "#8E8E93", textAlign: "center", marginBottom: "16px" }}>
          Se requiere iOS 14.0 o posterior · {APP_DATA.size}
        </p>

        <div style={styles.statsRow}>
          <div style={styles.statItem}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ ...styles.statValue, color: "#FF9500" }}>{APP_DATA.rating}</span>
            </div>
            <StarRating rating={APP_DATA.rating} size={10} />
            <span style={styles.statLabel}>{APP_DATA.reviewCount} valoraciones</span>
          </div>
          <div style={{ width: "0.5px", backgroundColor: "#3A3A3C" }} />
          <div style={styles.statItem}>
            <span style={styles.statValue}>#{APP_DATA.ageRating}</span>
            <span style={styles.statLabel}>Clasificación</span>
          </div>
          <div style={{ width: "0.5px", backgroundColor: "#3A3A3C" }} />
          <div style={styles.statItem}>
            <span style={{ ...styles.statValue, color: "#4CAF50" }}>1M+</span>
            <span style={styles.statLabel}>Descargas</span>
          </div>
          <div style={{ width: "0.5px", backgroundColor: "#3A3A3C" }} />
          <div style={styles.statItem}>
            <span style={styles.statValue}>🏆</span>
            <span style={styles.statLabel}>Top en Fitness</span>
          </div>
        </div>
      </div>

      {/* Screenshots */}
      <div style={{ ...styles.section, paddingLeft: 0, paddingRight: 0 }}>
        <h2 style={{ ...styles.sectionTitle, paddingLeft: "16px" }}>Capturas de Pantalla</h2>
        <div style={{ paddingLeft: "16px" }}>
          <ScreenshotCarousel screenshots={APP_DATA.screenshots} />
        </div>
      </div>

      {/* Description */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Descripción</h2>
        <div
          style={{
            ...styles.description,
            maxHeight: expanded ? "none" : "100px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {APP_DATA.description.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </div>
        {!expanded && (
          <div
            style={{
              background: "linear-gradient(transparent, #000000)",
              height: "40px",
              marginTop: "-40px",
              position: "relative",
            }}
          />
        )}
        <button style={styles.showMoreBtn} onClick={() => setExpanded(!expanded)}>
          {expanded ? "Mostrar menos" : "Más información"}
        </button>
      </div>

      {/* Features */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Características</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {APP_DATA.features.map((f, i) => (
            <FeatureCard key={i} feature={f} />
          ))}
        </div>
      </div>

      {/* Ratings & Reviews */}
      <div style={styles.section}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}>Valoraciones y Reseñas</h2>
          <button style={{ background: "none", border: "none", color: "#4CAF50", fontSize: "14px", cursor: "pointer" }}>
            Ver todas
          </button>
        </div>

        <div style={{ display: "flex", gap: "20px", marginBottom: "20px", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "56px", fontWeight: "300", color: "#FFFFFF", lineHeight: 1 }}>{APP_DATA.rating}</div>
            <StarRating rating={APP_DATA.rating} size={14} />
            <div style={{ fontSize: "12px", color: "#8E8E93", marginTop: "4px" }}>de 5</div>
          </div>
          <div style={{ flex: 1 }}>
            <RatingBar stars={5} percentage={85} />
            <RatingBar stars={4} percentage={10} />
            <RatingBar stars={3} percentage={3} />
            <RatingBar stars={2} percentage={1} />
            <RatingBar stars={1} percentage={1} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            overflowX: "auto",
            paddingBottom: "8px",
            scrollbarWidth: "none",
          }}
        >
          {APP_DATA.reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>

      {/* App Info */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Información</h2>
        <div style={styles.infoGrid}>
          {[
            { label: "Vendedor", value: "Next Vision Ltd." },
            { label: "Tamaño", value: APP_DATA.size },
            { label: "Categoría", value: "Salud y Fitness" },
            { label: "Compatibilidad", value: "iOS 14.0+" },
            { label: "Idiomas", value: "Español, Inglés +12" },
            { label: "Precio", value: APP_DATA.price },
          ].map((item, i) => (
            <div key={i} style={styles.infoItem}>
              <p style={styles.infoLabel}>{item.label}</p>
              <p style={styles.infoValue}>{item.value}</p>
            </div>
          ))}
        </div>
        {/* TODO: Agregar sección de privacidad y términos de servicio */}
      </div>

      <div style={{ height: "100px" }} />
    </div>
  );

  // Pantalla "Entrenar"
  const renderTrainScreen = () => (
    <div style={styles.appScreen}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "4px" }}>Hoy</h2>
        <p style={{ fontSize: "14px", color: "#8E8E93" }}>¡Vamos, tú puedes! 💪</p>
      </div>

      {/* Plan del día */}
      <div
        style={{
          background: "linear-gradient(135deg, #1B4D1E, #2D6A30)",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "20px",
          border: "1px solid rgba(76,175,80,0.3)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span style={styles.badgeGreen}>Plan del Día</span>
            <h3 style={{ fontSize: "22px", fontWeight: "700", marginTop: "8px", marginBottom: "4px" }}>
              Cardio + Fuerza
            </h3>
            <p style={{ fontSize: "13px", color: "#A5D6A7" }}>3 ejercicios · 25 min · 200 kcal</p>
          </div>
          <span style={{ fontSize: "40px" }}>🔥</span>
        </div>
        <button
          onClick={() => {
            setWorkoutStarted(!workoutStarted);
            if (workoutStarted) {
              setWorkoutTimer(0);
              setCompletedWorkouts((c) => c + 1);
            }
          }}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "16px",
            borderRadius: "12px",
            background: workoutStarted
              ? "rgba(255,59,48,0.2)"
              : "rgba(255,255,255,0.15)",
            border: workoutStarted ? "1px solid rgba(255,59,48,0.5)" : "1px solid rgba(255,255,255,0.3)",
            color: "#FFFFFF",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {workoutStarted ? (
            <>⏹ Detener — {formatTime(workoutTimer)}</>
          ) : (
            <>▶ Comenzar Entrenamiento</>
          )}
        </button>
      </div>

      {/* Lista de workouts */}
      <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "14px" }}>Todos los Entrenamientos</h3>
      {workouts.map((w) => (
        <div key={w.id} style={styles.workoutCard}>
          <div style={styles.workoutEmoji}>{w.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "16px", fontWeight: "600", color: "#FFFFFF" }}>{w.title}</span>
              <span style={{ fontSize: "12px", color: "#8E8E93" }}>{w.calories} kcal</span>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "4px", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: "#8E8E93" }}>{w.duration}</span>
              <span style={{ fontSize: "12px", color: "#8E8E93" }}>·</span>
              <span
                style={{
                  fontSize: "12px",
                  color: w.level === "Intermedio" ? "#FF9500" : "#4CAF50",
                }}
              >
                {w.level}
              </span>
            </div>
            <div style={styles.progressBar(w.progress)}>
              <div style={styles.progressFill(w.progress)} />
            </div>
            {w.progress > 0 && (
              <span style={{ fontSize: "11px", color: "#4CAF50", marginTop: "4px", display: "block" }}>
                {w.progress === 100 ? "✓ Completado" : `${w.progress}% completado`}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Pantalla "Progreso"
  const renderProgressScreen = () => (
    <div style={styles.appScreen}>
      <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "4px" }}>Tu Progreso</h2>
      <p style={{ fontSize: "14px", color: "#8E8E93", marginBottom: "24px" }}>Semana actual</p>

      {/* Streak */}
      <div
        style={{
          background: "linear-gradient(135deg, #3a1a00, #5c2a00)",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "16px",
          border: "1px solid rgba(255,149,0,0.3)",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <span style={{ fontSize: "48px" }}>🔥</span>
        <div>
          <div style={{ fontSize: "36px", fontWeight: "800", color: "#FF9500" }}>{streak}</div>
          <div style={{ fontSize: "14px", color: "#FFB74D" }}>días seguidos</div>
          <div style={{ fontSize: "12px", color: "#8E8E93", marginTop: "2px" }}>¡Sigue así, campeón!</div>
        </div>
      </div>

      {/* Días de la semana */}
      <div
        style={{
          backgroundColor: "#1C1C1E",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "16px",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Esta Semana</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {weekDays.map((day, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "#8E8E93" }}>{day}</span>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: completedDays[i] ? "#4CAF50" : "#2C2C2E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  border: i === 6 ? "2px solid #3A3A3C" : "none",
                }}
              >
                {completedDays[i] ? "✓" : ""}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
        {[
          { label: "Entrenamientos", value: completedWorkouts, unit: "esta semana", icon: "💪", color: "#4CAF50" },
          { label: "Minutos Activo", value: completedWorkouts * 18, unit: "min totales", icon: "⏱️", color: "#007AFF" },
          { label: "Calorías", value: completedWorkouts * 150, unit: "kcal quemadas", icon: "🔥", color: "#FF9500" },
          { label: "Peso Perdido", value: "0.8", unit: "kg este mes", icon: "⚖️", color: "#AF52DE" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#1C1C1E",
              borderRadius: "16px",
              padding: "16px",
              border: `1px solid ${stat.color}22`,
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "4px" }}>{stat.icon}</div>
            <div style={{ fontSize: "26px", fontWeight: "700", color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: "12px", color: "#FFFFFF", fontWeight: "500" }}>{stat.label}</div>
            <div style={{ fontSize: "11px", color: "#8E8E93" }}>{stat.unit}</div>
          </div>
        ))}
      </div>

      {/* TODO: Agregar gráfica de progreso semanal/mensual con Chart.js o similar */}
      <div
        style={{
          backgroundColor: "#1C1C1E",
          borderRadius: "16px",
          padding: "16px",
          marginBottom: "16px",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px" }}>Actividad de los Últimos 7 Días</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "80px" }}>
          {[40, 65, 30, 85, 70, 90, 0].map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${h}%`,
                backgroundColor: h === 0 ? "#2C2C2E" : h > 70 ? "#4CAF50" : "#2D6A30",
                borderRadius: "4px 4px 0 0",
                transition: "height 0.5s ease",
                minHeight: "4px",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
          {weekDays.map((d, i) => (
            <span key={i} style={{ fontSize: "10px", color: "#8E8E93", flex: 1, textAlign: "center" }}>
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  // Pantalla "Perfil"
  const renderProfileScreen = () => (
    <div style={styles.appScreen}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "28px",
          paddingTop: "16px",
        }}
      >
        {/* TODO: Permitir subir foto de perfil real */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4CAF50, #66BB6A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            marginBottom: "12px",
            boxShadow: "0 4px 20px rgba(76,175,80,0.4)",
          }}
        >
          😊
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: "700" }}>Usuario LazyFit</h2>
        <p style={{ fontSize: "14px", color: "#8E8E93", marginTop: "4px" }}>Miembro desde Enero 2025</p>
        <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
          <span style={styles.badgeGreen}>Principiante</span>
          <span style={styles.badgeOrange}>🔥 {streak} días</span>
        </div>
      </div>

      {/* Nivel */}
      <div
        style={{
          backgroundColor: "#1C1C1E",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontSize: "14px", fontWeight: "600" }}>Nivel: Principiante</span>
          <span style={{ fontSize: "13px", color: "#4CAF50" }}>350 / 500 XP</span>
        </div>
        <div style={styles.progressBar(70)}>
          <div style={styles.progressFill(70)} />
        </div>
        <p style={{ fontSize: "12px", color: "#8E8E93", marginTop: "8px" }}>150 XP para llegar a Intermedio</p>
      </div>

      {/* Logros */}
      <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "14px" }}>Logros</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
        {[
          { emoji: "🏆", label: "Primera vez", unlocked: true },
          { emoji: "🔥", label: "7 días", unlocked: true },
          { emoji: "💪", label: "10 sesiones", unlocked: false },
          { emoji: "⚡", label: "HIIT pro", unlocked: false },
          { emoji: "🌟", label: "Estrella", unlocked: false },
          { emoji: "🎯", label: "Objetivo", unlocked: false },
          { emoji: "🧘", label: "Zen", unlocked: true },
          { emoji: "🏅", label: "30 días", unlocked: false },
        ].map((badge, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#1C1C1E",
              borderRadius: "14px",
              padding: "12px 8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              opacity: badge.unlocked ? 1 : 0.4,
              border: badge.unlocked ? "1px solid rgba(76,175,80,0.3)" : "1px solid #2C2C2E",
            }}
          >
            <span style={{ fontSize: "24px" }}>{badge.emoji}</span>
            <span style={{ fontSize: "10px", color: badge.unlocked ? "#FFFFFF" : "#8E8E93", textAlign: "center" }}>
              {badge.label}
            </span>
          </div>
        ))}
      </div>

      {/* Configuración */}
      <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "14px" }}>Configuración</h3>
      {[
        { icon: "🔔", label: "Recordatorios", value: "Activados" },
        { icon: "🎯", label: "Objetivo", value: "Perder peso" },
        { icon: "📏", label: "Unidades", value: "Métrico" },
        { icon: "🔒", label: "Privacidad", value: "" },
        { icon: "❓", label: "Ayuda y Soporte", value: "" },
        // TODO: Agregar opción de suscripción premium
      ].map((item, i) => (
        <div
          key={i}
          style={{
            backgroundColor: "#1C1C1E",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>{item.icon}</span>
            <span style={{ fontSize: "15px" }}>{item.label}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {item.value && <span style={{ fontSize: "13px", color: "#8E8E93" }}>{item.value}</span>}
            <span style={{ color: "#3A3A3C", fontSize: "18px" }}>›</span>
          </div>
        </div>
      ))}
    </div>
  );

  // Pantalla de inicio de la app (dentro de la experiencia)
  const renderAppHome = () => (
    <div style={styles.appScreen}>
      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontSize: "14px", color: "#8E8E93" }}>Buenos días 👋</p>
        <h2 style={{ fontSize: "28px", fontWeight: "800" }}>¡A moverse!</h2>
      </div>

      {/* Banner destacado */}
      <div
        style={{
          background: "linear-gradient(135deg, #0D2B0E, #1B5E20)",
          borderRadius: "24px",
          padding: "20px",
          marginBottom: "20px",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(76,175,80,0.4)",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-10px",
            top: "-10px",
            fontSize: "80px",
            opacity: 0.15,
          }}
        >
          🏃
        </div>
        <span style={styles.badgeGreen}>Recomendado</span>
        <h3 style={{ fontSize: "24px", fontWeight: "700", marginTop: "8px", marginBottom: "6px" }}>
          Entrenamiento del Día
        </h3>
        <p style={{ fontSize: "13px", color: "#A5D6A7", marginBottom: "16px" }}>
          Cardio + Fuerza · 25 min · 200 kcal
        </p>
        <button
          onClick={() => setActiveTab("entrenar")}
          style={{
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "12px",
            padding: "12px 24px",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Comenzar ahora →
        </button>
      </div>

      {/* Resumen rápido */}
      <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "14px" }}>Resumen de Hoy</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
        {[
          { label: "Completados", value: completedWorkouts, icon: "✅" },
          { label: "Minutos", value: completedWorkouts * 18, icon: "⏱️" },
          { label: "Calorías", value: completedWorkouts * 150, icon: "🔥" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              backgroundColor: "#1C1C1E",
              borderRadius: "16px",
              padding: "14px 10px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "22px", marginBottom: "4px" }}>{s.icon}</div>
            <div style={{ fontSize: "20px", fontWeight: "700", color: "#FFFFFF" }}>{s.value}</div>
            <div style={{ fontSize: "11px", color: "#8E8E93" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Entrenamientos recientes */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "700" }}>Entrenamientos Populares</h3>
        <button
          onClick={() => setActiveTab("entrenar")}
          style={{ background: "none", border: "none", color: "#4CAF50", fontSize: "14px", cursor: "pointer" }}
        >
          Ver todos
        </button>
      </div>
      {workouts.slice(0, 3).map((w) => (
        <div
          key={w.id}
          onClick={() => setActiveTab("entrenar")}
          style={{ ...styles.workoutCard, marginBottom: "10px" }}
        >
          <div style={styles.workoutEmoji}>{w.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "16px", fontWeight: "600" }}>{w.title}</span>
              <span
                style={{
                  fontSize: "11px",
                  color: w.progress === 100 ? "#4CAF50" : "#8E8E93",
                  fontWeight: w.progress === 100 ? "600" : "400",
                }}
              >
                {w.progress === 100 ? "✓ Hecho" : w.duration}
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
              <span style={{ fontSize: "12px", color: "#8E8E93" }}>{w.calories} kcal</span>
              <span style={{ fontSize: "12px", color: "#8E8E93" }}>·</span>
              <span style={{ fontSize: "12px", color: w.level === "Intermedio" ? "#FF9500" : "#4CAF50" }}>
                {w.level}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* CTA descargar app */}
      {!downloaded && (
        <div
          style={{
            backgroundColor: "#1C1C1E",
            borderRadius: "20px",
            padding: "20px",
            marginTop: "16px",
            border: "1px solid rgba(76,175,80,0.3)",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>
            ¿Te gusta la app?
          </p>
          <p style={{ fontSize: "13px", color: "#8E8E93", marginBottom: "16px" }}>
            Descarga LazyFit gratis en App Store
          </p>
          <button
            onClick={() => setActiveTab("tienda")}
            style={{
              backgroundColor: "#4CAF50",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "12px",
              padding: "12px 32px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Ver en App Store
          </button>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "inicio":
        return renderAppHome();
      case "entrenar":
        return renderTrainScreen();
      case "progreso":
        return renderProgressScreen();
      case "perfil":
        return renderProfileScreen();
      case "tienda":
        return renderStoreListing();
      default:
        return renderAppHome();
    }
  };

  return (
    <div style={styles.app}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background-color: #000000; }
        ::-webkit-scrollbar { display: none; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .workout-card:active { transform: scale(0.98); }
      `}</style>

      {/* Top bar with nav to store listing */}
      {activeTab !== "tienda" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "430px",
            backgroundColor: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "0.5px solid rgba(255,255,255,0.1)",
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={APP_DATA.icon}
              alt="LazyFit"
              style={{ width: "32px", height: "32px", borderRadius: "8px" }}
              onError={(e) => { e.target.src = "https://via.placeholder.com/32x32/4CAF50/FFFFFF?text=LF"; }}
            />
            <span style={{ fontSize: "16px", fontWeight: "700" }}>LazyFit</span>
          </div>
          <button
            onClick={() => setActiveTab("tienda")}
            style={{
              backgroundColor: "rgba(76,175,80,0.15)",
              border: "1px solid rgba(76,175,80,0.4)",
              color: "#4CAF50",
              fontSize: "12px",
              fontWeight: "600",
              borderRadius: "20px",
              padding: "5px 12px",
              cursor: "pointer",
            }}
          >
            App Store ↗
          </button>
        </div>
      )}

      {/* Back button for store listing */}
      {activeTab === "tienda" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "430px",
            backgroundColor: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "0.5px solid rgba(255,255,255,0.1)",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 98,
          }}
        >
          <button
            onClick={() => setActiveTab("inicio")}
            style={{
              background: "none",
              border: "none",
              color: "#4CAF50",
              fontSize: "15px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            ‹ Volver
          </button>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="70" height="14" viewBox="0 0 121 21" xmlns="http://www.w3.org/2000/svg">
              <g fill="currentColor" fillRule="nonzero" opacity=".8">
                <path d="M28.145 16.906h2.768l1.251-3.825h5.506l1.251 3.825h2.78L36.408 2.109h-2.973l-5.291 14.797Zm6.747-12.162h.061l2.05 6.296h-4.172l2.06-6.296Z" />
              </g>
            </svg>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.7)" }}>App Store</span>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ animation: "fadeIn 0.3s ease" }}>
        {renderContent()}
      </div>

      {/* Bottom Tab Bar */}
      <div style={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.tabItem(activeTab === tab.id),
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span style={styles.tabIcon}>{tab.icon}</span>
            <span style={styles.tabLabel}>{tab.label}</span>
            {activeTab === tab.id && (
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "#4CAF50",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}