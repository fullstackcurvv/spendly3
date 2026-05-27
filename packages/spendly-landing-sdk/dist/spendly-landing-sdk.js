import { jsx as e, jsxs as o } from "react/jsx-runtime";
import { Link as i } from "react-router-dom";
import { Moon as p, Sun as s, IndianRupee as c, Target as g, Clock as x } from "lucide-react";
import { createContext as h, useState as f, useEffect as u, useContext as y } from "react";
const n = h({
  theme: "light",
  toggleTheme: () => {
  }
});
function F({ children: t }) {
  const [r, l] = f(() => localStorage.getItem("theme") ?? "light");
  u(() => {
    r === "dark" ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark"), localStorage.setItem("theme", r);
  }, [r]);
  const a = () => l((d) => d === "light" ? "dark" : "light");
  return /* @__PURE__ */ e(n.Provider, { value: { theme: r, toggleTheme: a }, children: t });
}
function b() {
  return y(n);
}
function m() {
  const { theme: t, toggleTheme: r } = b();
  return /* @__PURE__ */ e(
    "button",
    {
      onClick: r,
      "aria-label": "Toggle theme",
      style: {
        background: "none",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "6px",
        cursor: "pointer",
        color: "var(--text-muted)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "color 0.15s ease, border-color 0.15s ease"
      },
      children: t === "light" ? /* @__PURE__ */ e(p, { size: 15 }) : /* @__PURE__ */ e(s, { size: 15 })
    }
  );
}
function v() {
  return /* @__PURE__ */ e(
    "nav",
    {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "var(--page-bg)"
      },
      children: /* @__PURE__ */ o(
        "div",
        {
          style: {
            maxWidth: "960px",
            margin: "0 auto",
            padding: "0 24px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          },
          children: [
            /* @__PURE__ */ o(
              i,
              {
                to: "/",
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  textDecoration: "none",
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  fontSize: "15px"
                },
                children: [
                  /* @__PURE__ */ e("span", { style: { color: "var(--brand-green)", fontSize: "16px" }, children: "◆" }),
                  "Spendly"
                ]
              }
            ),
            /* @__PURE__ */ o("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
              /* @__PURE__ */ e(m, {}),
              /* @__PURE__ */ e(
                i,
                {
                  to: "/login",
                  style: {
                    color: "var(--text-primary)",
                    textDecoration: "none",
                    fontSize: "13px",
                    padding: "7px 14px",
                    borderRadius: "8px"
                  },
                  children: "Sign in"
                }
              ),
              /* @__PURE__ */ e(
                i,
                {
                  to: "/register",
                  style: {
                    backgroundColor: "var(--btn-primary-bg)",
                    color: "var(--btn-primary-fg)",
                    textDecoration: "none",
                    fontSize: "13px",
                    padding: "8px 18px",
                    borderRadius: "9999px",
                    fontWeight: 500
                  },
                  children: "Get started"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function k() {
  return /* @__PURE__ */ o(
    "div",
    {
      style: {
        backgroundColor: "#ebebea",
        borderRadius: "16px",
        padding: "18px 18px 0",
        marginTop: "56px",
        boxShadow: "0 4px 32px rgba(0,0,0,0.06)"
      },
      children: [
        /* @__PURE__ */ o("div", { style: { display: "flex", gap: "6px", paddingBottom: "14px" }, children: [
          /* @__PURE__ */ e("span", { style: { width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57", display: "inline-block" } }),
          /* @__PURE__ */ e("span", { style: { width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e", display: "inline-block" } }),
          /* @__PURE__ */ e("span", { style: { width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840", display: "inline-block" } })
        ] }),
        /* @__PURE__ */ o(
          "div",
          {
            style: {
              backgroundColor: "#f5f4f2",
              borderRadius: "10px 10px 0 0",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            },
            children: [
              /* @__PURE__ */ e("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }, children: [
                { label: "This month", value: "₹18,240", sub: "+12% vs last", subColor: "#d4183d" },
                { label: "Budget left", value: "₹6,760", sub: "43% remaining", subColor: "#2ca85a" },
                { label: "Transactions", value: "34", sub: "this month", subColor: "#9a9a9a" }
              ].map((t) => /* @__PURE__ */ o(
                "div",
                {
                  style: {
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    padding: "16px 18px",
                    border: "1px solid rgba(0,0,0,0.06)"
                  },
                  children: [
                    /* @__PURE__ */ e("div", { style: { fontSize: "12px", color: "#9a9a9a", marginBottom: "8px" }, children: t.label }),
                    /* @__PURE__ */ e("div", { style: { fontSize: "26px", fontWeight: 700, color: "#111", lineHeight: 1.1 }, children: t.value }),
                    /* @__PURE__ */ e("div", { style: { fontSize: "13px", color: t.subColor, marginTop: "6px", fontWeight: 500 }, children: t.sub })
                  ]
                },
                t.label
              )) }),
              /* @__PURE__ */ e(
                "div",
                {
                  style: {
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    padding: "16px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  },
                  children: [
                    { label: "Food", color: "#e8a020", pct: 76 },
                    { label: "Travel", color: "#4b9cd3", pct: 54 },
                    { label: "Bills", color: "#7b6ae0", pct: 44 }
                  ].map((t) => /* @__PURE__ */ o("div", { style: { display: "flex", alignItems: "center", gap: "14px" }, children: [
                    /* @__PURE__ */ e("span", { style: { width: "46px", fontSize: "13px", color: "#6b6b6b", textAlign: "right", flexShrink: 0 }, children: t.label }),
                    /* @__PURE__ */ e(
                      "div",
                      {
                        style: {
                          flex: 1,
                          height: "8px",
                          backgroundColor: "#e8e6e3",
                          borderRadius: "9999px",
                          overflow: "hidden"
                        },
                        children: /* @__PURE__ */ e(
                          "div",
                          {
                            style: {
                              width: `${t.pct}%`,
                              height: "100%",
                              backgroundColor: t.color,
                              borderRadius: "9999px"
                            }
                          }
                        )
                      }
                    )
                  ] }, t.label))
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function S({ onSeeHowItWorks: t }) {
  return /* @__PURE__ */ o("section", { style: { maxWidth: "780px", margin: "0 auto", padding: "80px 24px 0", textAlign: "center" }, children: [
    /* @__PURE__ */ o(
      "div",
      {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          backgroundColor: "#e8f5ee",
          border: "1px solid #b5e0c6",
          borderRadius: "9999px",
          padding: "7px 16px",
          fontSize: "13px",
          color: "#1e6b3c",
          marginBottom: "28px"
        },
        children: [
          /* @__PURE__ */ e("span", { style: { color: "#2ca85a", fontSize: "9px", lineHeight: 1 }, children: "●" }),
          "Free to use · No credit card needed"
        ]
      }
    ),
    /* @__PURE__ */ o(
      "h1",
      {
        style: {
          fontSize: "68px",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          margin: "0 0 22px",
          color: "#0f0f0f",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif"
        },
        children: [
          "Track every rupee.",
          /* @__PURE__ */ e("br", {}),
          /* @__PURE__ */ e("span", { style: { color: "#2ca85a" }, children: "Know where it goes." })
        ]
      }
    ),
    /* @__PURE__ */ e(
      "p",
      {
        style: {
          fontSize: "17px",
          lineHeight: 1.65,
          color: "#6b6b6b",
          maxWidth: "500px",
          margin: "0 auto 36px"
        },
        children: "Spendly helps you log expenses, spot patterns, and stay on budget — without the spreadsheet headache."
      }
    ),
    /* @__PURE__ */ o("div", { style: { display: "flex", justifyContent: "center", gap: "14px" }, children: [
      /* @__PURE__ */ e(
        i,
        {
          to: "/register",
          style: {
            backgroundColor: "#111111",
            color: "#ffffff",
            padding: "13px 26px",
            borderRadius: "10px",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: 600,
            display: "inline-block"
          },
          children: "Create free account"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: t,
          style: {
            backgroundColor: "#111111",
            color: "#ffffff",
            padding: "13px 26px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: 600,
            display: "inline-block"
          },
          children: "See how it works"
        }
      )
    ] }),
    /* @__PURE__ */ e(k, {})
  ] });
}
const C = [
  { value: "2,400+", label: "Users tracking" },
  { value: "48K+", label: "Expenses logged" },
  { value: "7", label: "Categories" }
];
function z() {
  return /* @__PURE__ */ e("section", { style: { maxWidth: "960px", margin: "0 auto", padding: "56px 24px 48px" }, children: /* @__PURE__ */ e(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px"
      },
      children: C.map((t) => /* @__PURE__ */ o("div", { style: { textAlign: "center" }, children: [
        /* @__PURE__ */ e(
          "div",
          {
            style: {
              fontSize: "38px",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1
            },
            children: t.value
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            style: {
              fontSize: "13px",
              color: "var(--text-muted)",
              marginTop: "6px"
            },
            children: t.label
          }
        )
      ] }, t.label))
    }
  ) });
}
const T = [
  {
    icon: c,
    title: "Log expenses instantly",
    body: "Add any expense in seconds. Category, amount, date, description — all in one simple form."
  },
  {
    icon: g,
    title: "Understand your patterns",
    body: "See exactly where your money goes with category breakdowns and monthly summaries."
  },
  {
    icon: x,
    title: "Filter by time period",
    body: "View your spending for any date range — last week, last month, or a custom period."
  }
];
function R() {
  return /* @__PURE__ */ e("section", { style: { backgroundColor: "var(--section-alt)", padding: "72px 0" }, children: /* @__PURE__ */ e("div", { style: { maxWidth: "960px", margin: "0 auto", padding: "0 24px" }, children: /* @__PURE__ */ e(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      },
      children: T.map((t) => /* @__PURE__ */ o(
        "div",
        {
          style: {
            backgroundColor: "var(--card-bg)",
            borderRadius: "16px",
            border: "1px solid var(--border)",
            padding: "28px 24px"
          },
          children: [
            /* @__PURE__ */ e(
              t.icon,
              {
                size: 20,
                style: { color: "var(--text-muted)", marginBottom: "16px" }
              }
            ),
            /* @__PURE__ */ e(
              "h3",
              {
                style: {
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "var(--text-primary)",
                  margin: "0 0 8px"
                },
                children: t.title
              }
            ),
            /* @__PURE__ */ e(
              "p",
              {
                style: {
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  margin: 0
                },
                children: t.body
              }
            )
          ]
        },
        t.title
      ))
    }
  ) }) });
}
function w() {
  return /* @__PURE__ */ e(
    "section",
    {
      style: {
        backgroundColor: "var(--page-bg)",
        padding: "96px 24px",
        textAlign: "center"
      },
      children: /* @__PURE__ */ o("div", { style: { maxWidth: "560px", margin: "0 auto" }, children: [
        /* @__PURE__ */ e(
          "h2",
          {
            style: {
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "42px",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "0 0 12px",
              lineHeight: 1.15
            },
            children: "Ready to take control?"
          }
        ),
        /* @__PURE__ */ e(
          "p",
          {
            style: {
              color: "var(--text-muted)",
              fontSize: "15px",
              margin: "0 0 36px"
            },
            children: "Join thousands of people who track their expenses with Spendly."
          }
        ),
        /* @__PURE__ */ e(
          i,
          {
            to: "/register",
            style: {
              display: "inline-block",
              backgroundColor: "var(--btn-primary-bg)",
              color: "var(--btn-primary-fg)",
              padding: "13px 32px",
              borderRadius: "9999px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500
            },
            children: "Create free account"
          }
        )
      ] })
    }
  );
}
function W() {
  return /* @__PURE__ */ e(
    "footer",
    {
      style: {
        backgroundColor: "var(--footer-bg)",
        padding: "52px 24px",
        textAlign: "center"
      },
      children: /* @__PURE__ */ o(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px"
          },
          children: [
            /* @__PURE__ */ e("span", { style: { fontSize: "22px", color: "#e8902a" }, children: "◆" }),
            /* @__PURE__ */ e("span", { style: { color: "#ffffff", fontWeight: 600, fontSize: "15px" }, children: "Spendly" }),
            /* @__PURE__ */ e("span", { style: { color: "rgba(255,255,255,0.38)", fontSize: "13px", marginTop: "2px" }, children: "Track every rupee. Own your finances." })
          ]
        }
      )
    }
  );
}
function L({ onSeeHowItWorks: t }) {
  return /* @__PURE__ */ o("div", { style: { minHeight: "100vh", backgroundColor: "var(--page-bg)" }, children: [
    /* @__PURE__ */ e(v, {}),
    /* @__PURE__ */ o("main", { children: [
      /* @__PURE__ */ e(S, { onSeeHowItWorks: t }),
      /* @__PURE__ */ e(z, {}),
      /* @__PURE__ */ e(R, {}),
      /* @__PURE__ */ e(w, {})
    ] }),
    /* @__PURE__ */ e(W, {})
  ] });
}
export {
  w as CtaSection,
  R as FeaturesSection,
  S as HeroSection,
  W as LandingFooter,
  v as LandingNavbar,
  L as LandingPage,
  z as StatsBand,
  F as ThemeProvider,
  m as ThemeToggle,
  b as useTheme
};
