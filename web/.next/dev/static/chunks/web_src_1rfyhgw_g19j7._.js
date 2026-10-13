(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/src/app/Countdown.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Countdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$styles$2f$Countdown$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/web/src/styles/Countdown.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const TZ = 'Africa/Johannesburg';
function remaining(target) {
    const total = Math.max(0, Math.floor((target - Date.now()) / 1000));
    return {
        days: Math.floor(total / 86400),
        hours: Math.floor(total % 86400 / 3600),
        mins: Math.floor(total % 3600 / 60),
        secs: total % 60,
        done: total === 0
    };
}
function formatEventDate(iso) {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
        timeZone: TZ,
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).formatToParts(new Date(iso)).map((p)=>[
            p.type,
            p.value
        ]));
    const time = `${parts.hour}:${parts.minute}${parts.dayPeriod.toUpperCase()}`;
    return `${parts.weekday}, ${parts.day} ${parts.month} ${parts.year} at ${time}`;
}
function Tile({ value, label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$styles$2f$Countdown$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tile,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$styles$2f$Countdown$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].num,
                "aria-hidden": "true",
                children: String(value).padStart(2, '0')
            }, void 0, false, {
                fileName: "[project]/web/src/app/Countdown.jsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$styles$2f$Countdown$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                children: label
            }, void 0, false, {
                fileName: "[project]/web/src/app/Countdown.jsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/src/app/Countdown.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c = Tile;
function Countdown({ eventDate, eventLocation }) {
    _s();
    // null until mounted, so server and client markup match
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Countdown.useEffect": ()=>{
            if (!eventDate) return;
            const target = new Date(eventDate).getTime();
            setTime(remaining(target));
            const id = setInterval({
                "Countdown.useEffect.id": ()=>setTime(remaining(target))
            }["Countdown.useEffect.id"], 1000);
            return ({
                "Countdown.useEffect": ()=>clearInterval(id)
            })["Countdown.useEffect"];
        }
    }["Countdown.useEffect"], [
        eventDate
    ]);
    const dateLine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Countdown.useMemo[dateLine]": ()=>eventDate ? formatEventDate(eventDate) : ''
    }["Countdown.useMemo[dateLine]"], [
        eventDate
    ]);
    if (!eventDate) return null;
    const t = time ?? {
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0,
        done: false
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            t.done ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$styles$2f$Countdown$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].live,
                children: "The exhibition is open."
            }, void 0, false, {
                fileName: "[project]/web/src/app/Countdown.jsx",
                lineNumber: 70,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$styles$2f$Countdown$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].countdown} ${time ? '' : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$styles$2f$Countdown$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pending}`,
                role: "timer",
                "aria-label": time ? `${t.days} days, ${t.hours} hours, ${t.mins} minutes until the exhibition` : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tile, {
                        value: t.days,
                        label: "days"
                    }, void 0, false, {
                        fileName: "[project]/web/src/app/Countdown.jsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tile, {
                        value: t.hours,
                        label: "hours"
                    }, void 0, false, {
                        fileName: "[project]/web/src/app/Countdown.jsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tile, {
                        value: t.mins,
                        label: "mins"
                    }, void 0, false, {
                        fileName: "[project]/web/src/app/Countdown.jsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tile, {
                        value: t.secs,
                        label: "secs"
                    }, void 0, false, {
                        fileName: "[project]/web/src/app/Countdown.jsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/app/Countdown.jsx",
                lineNumber: 72,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$styles$2f$Countdown$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].date,
                suppressHydrationWarning: true,
                children: dateLine
            }, void 0, false, {
                fileName: "[project]/web/src/app/Countdown.jsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            eventLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$styles$2f$Countdown$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].location,
                children: eventLocation
            }, void 0, false, {
                fileName: "[project]/web/src/app/Countdown.jsx",
                lineNumber: 89,
                columnNumber: 25
            }, this),
            !t.done && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$styles$2f$Countdown$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].save,
                children: "Save the date"
            }, void 0, false, {
                fileName: "[project]/web/src/app/Countdown.jsx",
                lineNumber: 90,
                columnNumber: 19
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/src/app/Countdown.jsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(Countdown, "VC78cfxdUL5wIVuKQhCfgpkimFw=");
_c1 = Countdown;
var _c, _c1;
__turbopack_context__.k.register(_c, "Tile");
__turbopack_context__.k.register(_c1, "Countdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/styles/Countdown.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "countdown": "Countdown-module__9jmnQW__countdown",
  "date": "Countdown-module__9jmnQW__date",
  "label": "Countdown-module__9jmnQW__label",
  "live": "Countdown-module__9jmnQW__live",
  "location": "Countdown-module__9jmnQW__location",
  "num": "Countdown-module__9jmnQW__num",
  "pending": "Countdown-module__9jmnQW__pending",
  "save": "Countdown-module__9jmnQW__save",
  "tile": "Countdown-module__9jmnQW__tile",
});
}),
]);

//# sourceMappingURL=web_src_1rfyhgw_g19j7._.js.map