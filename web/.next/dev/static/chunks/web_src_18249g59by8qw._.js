(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/src/components/countdown/Countdown.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Countdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$hooks$2f$useCountdown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/hooks/useCountdown.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Countdown({ eventDate, eventLocation }) {
    _s();
    const { days, hours, minutes, seconds, done, ready } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$hooks$2f$useCountdown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(eventDate);
    const [formatted, setFormatted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Countdown.useEffect": ()=>{
            if (eventDate) {
                setFormatted(new Date(eventDate).toLocaleString([], {
                    dateStyle: 'full',
                    timeStyle: 'short'
                }));
            }
        }
    }["Countdown.useEffect"], [
        eventDate
    ]);
    if (!eventDate) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        children: [
            ready && (done ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "The exhibition is live!"
            }, void 0, false, {
                fileName: "[project]/web/src/components/countdown/Countdown.jsx",
                lineNumber: 20,
                columnNumber: 25
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "countdown",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: days
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/countdown/Countdown.jsx",
                                lineNumber: 22,
                                columnNumber: 16
                            }, this),
                            "days"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/countdown/Countdown.jsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: hours
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/countdown/Countdown.jsx",
                                lineNumber: 23,
                                columnNumber: 16
                            }, this),
                            "hours"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/countdown/Countdown.jsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: minutes
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/countdown/Countdown.jsx",
                                lineNumber: 24,
                                columnNumber: 16
                            }, this),
                            "min"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/countdown/Countdown.jsx",
                        lineNumber: 24,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: seconds
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/countdown/Countdown.jsx",
                                lineNumber: 25,
                                columnNumber: 16
                            }, this),
                            "sec"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/countdown/Countdown.jsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/countdown/Countdown.jsx",
                lineNumber: 21,
                columnNumber: 9
            }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: formatted
            }, void 0, false, {
                fileName: "[project]/web/src/components/countdown/Countdown.jsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            eventLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: eventLocation
            }, void 0, false, {
                fileName: "[project]/web/src/components/countdown/Countdown.jsx",
                lineNumber: 29,
                columnNumber: 25
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/src/components/countdown/Countdown.jsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(Countdown, "OwhkZKPnklG2kZAlPyRStFtg/Eg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$hooks$2f$useCountdown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = Countdown;
var _c;
__turbopack_context__.k.register(_c, "Countdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/hooks/useCountdown.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useCountdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const EMPTY = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
    ready: false
};
function calc(targetDate) {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (!targetDate || Number.isNaN(diff) || diff <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            done: true,
            ready: true
        };
    }
    return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor(diff / 3600000 % 24),
        minutes: Math.floor(diff / 60000 % 60),
        seconds: Math.floor(diff / 1000 % 60),
        done: false,
        ready: true
    };
}
function useCountdown(targetDate) {
    _s();
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(EMPTY);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCountdown.useEffect": ()=>{
            setTime(calc(targetDate));
            const id = setInterval({
                "useCountdown.useEffect.id": ()=>setTime(calc(targetDate))
            }["useCountdown.useEffect.id"], 1000);
            return ({
                "useCountdown.useEffect": ()=>clearInterval(id)
            })["useCountdown.useEffect"];
        }
    }["useCountdown.useEffect"], [
        targetDate
    ]);
    return time;
}
_s(useCountdown, "Hvt5KKhXXAnHiht7/iZyMS2T27I=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=web_src_18249g59by8qw._.js.map