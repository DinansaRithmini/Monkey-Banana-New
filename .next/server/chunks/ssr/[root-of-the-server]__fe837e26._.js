module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/monkey-banana/src/components/hooks/useContinuousGame.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useContinuousGame",
    ()=>useContinuousGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
;
;
function useContinuousGame() {
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [playerName, setPlayerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Player_" + Math.floor(Math.random() * 1000));
    const [gameSessionUuid, setGameSessionUuid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ⚙️ Fetch or simulate game state
    const fetchGameState = async ()=>{
        try {
            // Example backend endpoint
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL || ""}/api/gameState`);
            if (response.data?.status && response.data?.gameState) {
                setGameState(response.data.gameState);
                setError(null);
            } else {
                // fallback to mock data if backend not ready
                setGameState(mockGameState());
            }
        } catch (err) {
            console.warn("⚠️ Backend not available — using mock state");
            setGameState(mockGameState());
        } finally{
            setLoading(false);
        }
    };
    // 🧍 Join Game
    const joinGame = async (playerName, betAmount)=>{
        try {
            // Example backend join call
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL || ""}/api/joinGame`, {
                name: playerName,
                amount: betAmount
            });
            if (response.data?.success) {
                await fetchGameState();
                return {
                    success: true
                };
            }
            return {
                success: false,
                error: response.data?.message || "Join failed"
            };
        } catch (err) {
            console.error("Join game error", err);
            return {
                success: false,
                error: "Network error joining game"
            };
        }
    };
    // 🤖 Add bots dynamically (optional)
    const addBotsToGame = async (bots)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL || ""}/api/addBots`, {
                bots
            });
            await fetchGameState();
        } catch (err) {
            console.error("Add bots failed", err);
        }
    };
    // 🌀 Poll game state every few seconds
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchGameState();
        intervalRef.current = setInterval(fetchGameState, 5000);
        return ()=>{
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);
    // 🪃 Helper mock game data (used if backend not responding)
    const mockGameState = ()=>{
        const mockPlayers = [
            {
                id: "1",
                name: "Andrew Derek",
                amount: 40,
                profileImage: "/avatars/player1.png"
            },
            {
                id: "2",
                name: "Enjella Melon",
                amount: 16,
                profileImage: "/avatars/player2.png"
            },
            {
                id: "3",
                name: "David Yomen",
                amount: 6,
                profileImage: "/avatars/player3.png"
            }
        ];
        const randomWinner = mockPlayers[Math.floor(Math.random() * mockPlayers.length)];
        return {
            phase: [
                "betting",
                "spinning",
                "finished"
            ][Math.floor(Math.random() * 3)],
            totalPot: 62,
            timeLeft: Math.floor(Math.random() * 60),
            roundNumber: Math.floor(Math.random() * 1000),
            players: mockPlayers,
            winner: randomWinner,
            rotation: Math.floor(Math.random() * 360)
        };
    };
    return {
        gameState,
        loading,
        error,
        joinGame,
        addBotsToGame,
        userId,
        playerName,
        gameSessionUuid
    };
}
}),
"[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const SlotMachine = ({ players, currentWinnerId, isSpinning })=>{
    // Select current player (winner or fallback)
    const currentPlayer = players.find((p)=>p.id === currentWinnerId) || players[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full max-w-3xl mx-auto p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex flex-col items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center gap-2 mb-3 mt-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#F7A531] flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/images/gameon_chip.png",
                                alt: "coin",
                                className: "w-5 h-5 md:w-6 md:h-6 object-contain"
                            }, void 0, false, {
                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[44px] md:text-[50px] leading-none font-bungee text-white drop-shadow-[4px_4px_0_#4E2A0B]",
                            children: "474.34"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex justify-center items-center mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 z-0 opacity-80 animate-rotate-slow",
                            style: {
                                background: "radial-gradient(circle at center, rgba(255, 216, 90, 0.35) 0%, rgba(247, 165, 49, 0.15) 40%, rgba(78, 42, 11, 0) 70%)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/images/slot_machine.png",
                            alt: "Slot Machine",
                            className: "relative drop-shadow-lg select-none pointer-events-none max-w-[538px] h-auto z-10"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `absolute inset-0 flex flex-col items-center justify-center space-y-4 z-20 ${isSpinning ? "animate-pulse" : ""}`,
                            children: players.map((player, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `px-6 py-2 text-center bg-white text-[#4E2A0B] font-bold text-lg rounded-lg border-2 border-[#F7A531] ${currentPlayer.id === player.id ? "text-[#F7A531] border-[#F7A531]" : ""}`,
                                    children: player.name.toUpperCase()
                                }, index, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center items-center gap-6 mt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "relative w-[185px] h-[50px] active:scale-95 transition-transform",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/images/dark_brown_button.png",
                                    alt: "Dark Brown Button",
                                    className: "absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative z-10 flex items-center justify-center gap-2 h-full text-[#FFD85A] font-bungee text-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/images/gameon_chip.png",
                                            alt: "coin",
                                            className: "w-5 h-5 md:w-6 md:h-6 object-contain"
                                        }, void 0, false, {
                                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "+ 1"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "relative w-[185px] h-[50px] active:scale-95 transition-transform",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/images/light_brown_button.png",
                                    alt: "Light Brown Button",
                                    className: "absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative z-10 flex items-center justify-center h-full text-[#FFFFFF] font-bungee text-lg",
                                    children: "ADD"
                                }, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center items-center mt-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-[320px] h-[190px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/images/time_holder.png",
                                alt: "Time Holder",
                                className: "absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex flex-col items-center justify-center text-center z-20 translate-x-[40px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#A35B1B] font-bungee text-sm tracking-wide leading-none mb-1",
                                        children: "TIME REMAINING"
                                    }, void 0, false, {
                                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#4E2A0B] font-bungee text-3xl leading-none",
                                        children: "59:00"
                                    }, void 0, false, {
                                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full flex justify-center mt-40",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-[380px] md:w-[420px] h-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/images/active_players_background.png",
                                            alt: "Active Players Background",
                                            className: "w-full h-full object-contain select-none pointer-events-none"
                                        }, void 0, false, {
                                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                            lineNumber: 142,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 flex flex-col items-center mt-[30px] px-4 z-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-[#FFD85A] rounded-t-xl px-5 py-1 shadow-md mb-3 border-b-4 border-[#4E2A0B]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bungee text-[#4E2A0B] text-sm md:text-base",
                                                        children: "ACTIVE PLAYERS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                        lineNumber: 152,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full flex flex-col items-center gap-3",
                                                    children: [
                                                        {
                                                            name: "ANDREW DEREK",
                                                            amount: 40.0,
                                                            avatar: "/images/avatar1.png"
                                                        },
                                                        {
                                                            name: "ENJELLA MELON",
                                                            amount: 16.0,
                                                            avatar: "/images/avatar2.png"
                                                        },
                                                        {
                                                            name: "DAVID YOMEN",
                                                            amount: 6.0,
                                                            avatar: "/images/avatar3.png"
                                                        }
                                                    ].map((player, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center w-[280px] h-[60px] bg-[#4E2A0B] rounded-xl shadow-md px-3 gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: player.avatar,
                                                                    alt: player.name,
                                                                    className: "w-[45px] h-[45px] rounded-full object-cover border-2 border-[#FFD85A]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                    lineNumber: 181,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col flex-grow",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-bungee text-white text-sm leading-tight",
                                                                            children: player.name.toUpperCase()
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                            lineNumber: 187,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                    src: "/images/gameon_chip.png",
                                                                                    alt: "coin",
                                                                                    className: "w-4 h-4 object-contain"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                                    lineNumber: 191,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[#FFD85A] font-bungee text-base",
                                                                                    children: player.amount.toFixed(2)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                                    lineNumber: 196,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                            lineNumber: 190,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                    lineNumber: 186,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, index, true, {
                                                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                            lineNumber: 177,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                            lineNumber: 149,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = SlotMachine;
}),
"[project]/monkey-banana/src/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const Button = ({ children, onClick, disabled, className = "", variant = "primary", ...props })=>{
    const base = "font-extrabold rounded-full px-5 py-2 text-base transition-all active:scale-95 focus:outline-none";
    const variants = {
        primary: "bg-gradient-to-b from-[#FFD85A] to-[#F7A531] text-[#4E2A0B] shadow-[0_3px_0_rgba(0,0,0,0.3)] hover:brightness-105",
        secondary: "bg-[#FFF5D6] text-[#8B5A2B] border-2 border-[#F7A531] hover:bg-[#FFE082]",
        outline: "border-2 border-[#F7A531] text-[#F7A531] bg-transparent hover:bg-[#FFF5D6]"
    };
    const disabledStyles = "opacity-50 cursor-not-allowed";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        className: `${base} ${variants[variant]} ${disabled ? disabledStyles : ""} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/components/ui/button.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
//import Confetti from "react-confetti";
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/ui/button.tsx [app-ssr] (ecmascript)");
"use client";
;
;
const ResultPopup = ({ show, isWinner, onClose })=>{
    if (!show) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/70 z-50 flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl p-6 text-center max-w-xs w-[90vw] shadow-[0_6px_32px_rgba(0,0,0,0.25)] relative overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-28 left-1/2 -translate-x-1/2 w-full h-60 z-0 overflow-hidden pointer-events-none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full",
                        style: {
                            background: "linear-gradient(90deg, #FFD85A, #F7A531)",
                            borderBottomLeftRadius: "100% 60%",
                            borderBottomRightRadius: "100% 60%"
                        }
                    }, void 0, false, {
                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 flex flex-col items-center pt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: isWinner ? "/images/You Won.png" : "/images/You Lose.png",
                            alt: isWinner ? "You Won" : "You Lose",
                            className: "h-14 w-auto mb-3"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: isWinner ? "/images/Gold_Star.png" : "/images/silver star.png",
                            alt: isWinner ? "Gold Star" : "Silver Star",
                            className: "h-20 w-20 mx-auto object-contain mb-3"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-700 font-medium text-sm mb-6 px-3 text-center",
                            children: isWinner ? "🎉 Your prize has been added to your wallet!" : "Didn’t win this time? Next round could be yours — keep playing!"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: onClose,
                            className: "bg-gradient-to-b from-[#FFD85A] to-[#F7A531] text-[#4E2A0B] font-extrabold px-8 py-2 rounded-full hover:brightness-105",
                            children: "Continue"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ResultPopup;
}),
"[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/ui/button.tsx [app-ssr] (ecmascript)");
"use client";
;
;
const InsufficientPopup = ({ show, onClose })=>{
    if (!show) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/70 z-50 flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl p-6 text-center max-w-xs w-[90vw] shadow-[0_6px_32px_rgba(0,0,0,0.25)] relative overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-28 left-1/2 -translate-x-1/2 w-full h-60 z-0 overflow-hidden pointer-events-none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full",
                        style: {
                            background: "linear-gradient(90deg, #FFD85A, #F7A531)",
                            borderBottomLeftRadius: "100% 60%",
                            borderBottomRightRadius: "100% 60%"
                        }
                    }, void 0, false, {
                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                        lineNumber: 20,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/images/Insufficient_balance_icon.png",
                            alt: "Insufficient Balance",
                            className: "w-20 h-20 mx-auto mb-3"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-[#4E2A0B] font-extrabold text-lg mb-2",
                            children: "Insufficient Balance"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-700 text-sm mb-6 px-3",
                            children: "You don’t have enough coins to join this round. Top up your balance and try again!"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: onClose,
                            className: "bg-gradient-to-b from-[#FFD85A] to-[#F7A531] text-[#4E2A0B] font-extrabold px-10 py-2 rounded-full hover:brightness-105",
                            children: "OK"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = InsufficientPopup;
}),
"[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/ui/button.tsx [app-ssr] (ecmascript)");
"use client";
;
;
const BetConfirmationPopup = ({ show, amount, isPlacing, onConfirm, onCancel })=>{
    if (!show || amount === null) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/70 z-50 flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl p-6 text-center max-w-sm w-[90vw] shadow-[0_6px_32px_rgba(0,0,0,0.25)] relative overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-28 left-1/2 -translate-x-1/2 w-full h-60 z-0 overflow-hidden pointer-events-none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full",
                        style: {
                            background: "linear-gradient(90deg, #FFD85A, #F7A531)",
                            borderBottomLeftRadius: "100% 60%",
                            borderBottomRightRadius: "100% 60%"
                        }
                    }, void 0, false, {
                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/images/Coin.png",
                            alt: "Coin",
                            className: "w-16 h-16 mx-auto mb-3"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-[#4E2A0B] font-extrabold text-xl mb-2",
                            children: "Confirm Wager"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-700 mb-4",
                            children: "Are you sure you want to place a wager of"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center items-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/images/Coin.png",
                                    alt: "coin",
                                    className: "inline-block w-6 h-6 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-2xl font-extrabold text-[#8B5A2B]",
                                    children: amount.toLocaleString()
                                }, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-500 mb-6",
                            children: "This amount will be deducted from your wallet balance"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: onCancel,
                                    className: "flex-1 bg-gray-300 text-[#4E2A0B] hover:bg-gray-400",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: onConfirm,
                                    disabled: isPlacing,
                                    className: "flex-1 bg-gradient-to-b from-[#FFD85A] to-[#F7A531] text-[#4E2A0B] font-extrabold hover:brightness-105",
                                    children: isPlacing ? "Placing..." : "Confirm"
                                }, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = BetConfirmationPopup;
}),
"[project]/monkey-banana/src/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const Card = ({ children, className = "", ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `
        bg-gradient-to-b from-[#FFF5C3] to-[#FFD85A]
        border-4 border-[#F7A531]
        rounded-2xl shadow-[0_4px_0_rgba(0,0,0,0.25)]
        ${className}
      `,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/components/ui/card.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const CardContent = ({ children, className = "", ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `p-4 text-[#4E2A0B] font-bold ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/components/ui/card.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PastWinners
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>");
"use client";
;
;
;
;
function PastWinners({ refreshTrigger = 0 }) {
    const [winners, setWinners] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const coinImgPath = "/images/Coin.png";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchWinners();
        const interval = setInterval(fetchWinners, 30000); // auto refresh every 30s
        return ()=>clearInterval(interval);
    }, [
        refreshTrigger
    ]);
    const fetchWinners = async ()=>{
        try {
            const response = await fetch("/api/winners");
            const data = await response.json();
            if (data.success) {
                setWinners(data.winners);
                setError(null);
            } else {
                setError("Failed to load winners");
            }
        } catch (err) {
            setError("Failed to load winners");
        } finally{
            setLoading(false);
        }
    };
    const formatNumber = (amount)=>new Intl.NumberFormat("en-IN", {
            minimumFractionDigits: 0
        }).format(amount);
    const formatDate = (dateString)=>{
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    // Loading view
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
            className: "bg-gradient-to-b from-[#FFD85A] to-[#F7A531] border-none backdrop-blur",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "p-4 text-center text-[#4E2A0B] font-semibold",
                children: "Loading past winners..."
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this);
    }
    // Error view
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
            className: "bg-gradient-to-b from-[#FFD85A] to-[#F7A531] border-none backdrop-blur",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "p-4 text-center text-red-700 font-semibold",
                children: error
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                lineNumber: 84,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
            lineNumber: 83,
            columnNumber: 7
        }, this);
    }
    // Empty state
    if (winners.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
            className: "bg-gradient-to-b from-[#FFD85A] to-[#F7A531] border-none backdrop-blur",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pb-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "flex items-center justify-center gap-2 text-[#4E2A0B] font-bold",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                className: "w-5 h-5 text-[#4E2A0B]"
                            }, void 0, false, {
                                fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this),
                            "Past Winners"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "text-center text-[#4E2A0B]/70 pb-4",
                    children: "No winners yet. Be the first!"
                }, void 0, false, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
            lineNumber: 94,
            columnNumber: 7
        }, this);
    }
    // Winners list
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        className: "bg-gradient-to-b from-[#FFD85A] to-[#F7A531] border-none rounded-2xl shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "flex items-center justify-center gap-2 text-[#4E2A0B] font-bold",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                            className: "w-5 h-5 text-[#4E2A0B]"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this),
                        "Past Winners"
                    ]
                }, void 0, true, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "p-4 pt-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3 max-h-96 overflow-y-auto scrollbar-hide",
                    children: winners.map((winner)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            className: "bg-[#FFF5C3] border border-[#F7A531]/40 rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.1)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "p-3 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: winner.profileImage || "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png",
                                                alt: winner.playerName,
                                                className: "w-12 h-12 rounded-full object-cover border-2 border-[#F7A531]/70",
                                                onError: (e)=>{
                                                    e.currentTarget.src = "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png";
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                                                lineNumber: 128,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[#4E2A0B] font-bold text-md leading-tight",
                                                        children: winner.playerName
                                                    }, void 0, false, {
                                                        fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[#4E2A0B]/70 text-xs",
                                                        children: [
                                                            "Placed ",
                                                            winner.betAmount,
                                                            " • ",
                                                            formatDate(winner.createdAt)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                                                lineNumber: 140,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                                        lineNumber: 127,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[#4E2A0B] font-bold text-sm flex items-center justify-end",
                                            children: [
                                                "WON",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: coinImgPath,
                                                    alt: "coin",
                                                    className: "w-5 h-5 mx-1 inline-block"
                                                }, void 0, false, {
                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 21
                                                }, this),
                                                formatNumber(winner.wonAmount)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                                            lineNumber: 152,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                                        lineNumber: 151,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this)
                        }, winner.winnerId, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                            lineNumber: 121,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
}),
"[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
//import Confetti from "react-confetti";
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f40$uidotdev$2f$usehooks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/@uidotdev/usehooks/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$hooks$2f$useContinuousGame$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/hooks/useContinuousGame.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$SlotMachine$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$ResultPopup$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$InsufficientPopup$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$BetConfirmationPopup$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$PastWinners$2f$PastWinners$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/UIComponents/PastWinners/PastWinners.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
const ContinuousBettingWheel = ()=>{
    const { gameState, loading, error, joinGame, userId, playerName, gameSessionUuid } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$hooks$2f$useContinuousGame$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContinuousGame"])();
    const [walletBalance, setWalletBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hasJoined, setHasJoined] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingBet, setPendingBet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showBetPopup, setShowBetPopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showInsufficient, setShowInsufficient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showResult, setShowResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isWinner, setIsWinner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { width, height } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f40$uidotdev$2f$usehooks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowSize"])();
    const coinImgPath = "/images/dark_brown_button.png";
    const quickBetAmounts = [
        1,
        5
    ];
    const fetchWalletBalance = async ()=>{
        if (!userId) return;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/getUserWalletBalance`, {
                params: {
                    userUuid: userId
                }
            });
            if (response.data.success) setWalletBalance(response.data.balance);
        } catch (err) {
            console.error("Failed to fetch wallet balance", err);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchWalletBalance();
    }, [
        userId,
        gameState
    ]);
    const handleQuickBet = (amount)=>{
        if (!playerName?.trim()) return alert("Please enter your name first");
        if ((walletBalance ?? 0) < amount) return setShowInsufficient(true);
        setPendingBet(amount);
        setShowBetPopup(true);
    };
    const confirmBet = async ()=>{
        if (!pendingBet) return;
        setShowBetPopup(false);
        try {
            const releaseResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/createUserGame`, {
                userUuid: userId,
                gameSessionUuid,
                sessionUuid: gameState?.roundNumber,
                amount: pendingBet
            });
            if (!releaseResponse.data?.status) {
                alert("Failed to place bet.");
                return;
            }
            const result = await joinGame((playerName ?? "").trim(), pendingBet);
            if (result.success) setHasJoined(true);
        } catch (err) {
            alert("Error joining game.");
        } finally{
            setPendingBet(null);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (gameState?.phase === "finished" && userId) {
            const isUserWinner = gameState.winner?.id === userId;
            setIsWinner(isUserWinner);
            setShowResult(true);
            setTimeout(()=>setShowResult(false), 6000);
        }
    }, [
        gameState?.phase
    ]);
    const formatTime = (seconds)=>{
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };
    const formatNumber = (num)=>new Intl.NumberFormat("en-IN", {
            minimumFractionDigits: 0
        }).format(num);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[#4E2A0B] font-bold text-xl",
            children: "Loading game..."
        }, void 0, false, {
            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
            lineNumber: 115,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
        lineNumber: 114,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-yellow-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
            className: "bg-[#FFF5C3] border-[#F7A531]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-500 font-bold",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                        lineNumber: 124,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>window.location.reload(),
                        className: "mt-2",
                        children: "Retry"
                    }, void 0, false, {
                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                        lineNumber: 125,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 123,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
            lineNumber: 122,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
        lineNumber: 121,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-cover bg-center bg-no-repeat bg-fixed overflow-y-auto transition-opacity duration-700",
        style: {
            backgroundImage: "url('/images/background_image.png')",
            backgroundColor: "#FFD85A"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$ResultPopup$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                show: showResult,
                isWinner: isWinner,
                onClose: ()=>setShowResult(false)
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$InsufficientPopup$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                show: showInsufficient,
                onClose: ()=>setShowInsufficient(false)
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$BetConfirmationPopup$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                show: showBetPopup,
                amount: pendingBet ?? 0,
                onConfirm: confirmBet,
                onCancel: ()=>setShowBetPopup(false),
                isPlacing: false
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full flex justify-center items-start pt-8 pb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: "/images/monkey_logo.png",
                    alt: "Monkey Banana Logo",
                    className: "w-[190px] md:w-[230px] h-auto drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
                }, void 0, false, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                    lineNumber: 167,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$SlotMachine$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    players: gameState?.players || [],
                    currentWinnerId: gameState?.winner?.id,
                    isSpinning: gameState?.phase === "spinning"
                }, void 0, false, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 mt-6 mb-10",
                children: [
                    gameState?.phase === "betting" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: hasJoined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            className: "bg-[#FFF5C3] border-[#F7A531] mt-4 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-green-700 font-bold",
                                    children: "✅ You’re in this round!"
                                }, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                                    lineNumber: 236,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                                lineNumber: 235,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                            lineNumber: 234,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false),
                    gameState?.phase === "finished" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        className: "bg-[#FFF5C3] border-[#F7A531] mt-4 text-center animate-bounce",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[#4E2A0B] font-extrabold text-lg",
                                children: [
                                    "🎉 ",
                                    gameState?.winner?.name,
                                    " won ",
                                    gameState?.totalPot,
                                    " coins! 🎉"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                                lineNumber: 248,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                            lineNumber: 247,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            gameState?.players && // Change the background here to use the image instead of a color
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-t-2xl pt-6 pb-10 px-4",
                style: {
                    backgroundImage: "url('/images/active_players_background.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center gap-2 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                className: "text-[#4E2A0B]"
                            }, void 0, false, {
                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                                lineNumber: 269,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#4E2A0B] font-bold text-lg",
                                children: "Active Players"
                            }, void 0, false, {
                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                                lineNumber: 270,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                        lineNumber: 268,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 max-h-80 overflow-y-auto scrollbar-hide",
                        children: gameState.players.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                className: "bg-[#FFF5C3] border-[#F7A531]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "flex justify-between items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: p.profileImage || "/images/default-avatar.png",
                                                    alt: p.name,
                                                    className: "w-10 h-10 rounded-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                                                    lineNumber: 281,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[#4E2A0B] font-bold",
                                                    children: p.name
                                                }, void 0, false, {
                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                                            lineNumber: 280,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 text-[#4E2A0B] font-bold",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: coinImgPath,
                                                    alt: "coin",
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                formatNumber(p.amount),
                                                " // Format and display player coin amount"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                                            lineNumber: 288,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                                    lineNumber: 279,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, p.id, false, {
                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                                lineNumber: 278,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                        lineNumber: 276,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 259,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 mt-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$PastWinners$2f$PastWinners$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    refreshTrigger: gameState?.roundNumber || 0
                }, void 0, false, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                    lineNumber: 302,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ContinuousBettingWheel;
}),
"[project]/monkey-banana/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$ContinuousBettingWheel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx [app-ssr] (ecmascript)");
"use client";
;
;
function HomePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF5C3] via-[#FFD85A] to-[#F7A531]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$ContinuousBettingWheel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/monkey-banana/src/app/page.tsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/app/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fe837e26._.js.map