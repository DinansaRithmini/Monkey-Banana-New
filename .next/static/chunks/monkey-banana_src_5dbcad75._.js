(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/monkey-banana/src/components/hooks/useContinuousGame.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useContinuousGame",
    ()=>useContinuousGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useContinuousGame() {
    _s();
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [playerName, setPlayerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Player_" + Math.floor(Math.random() * 1000));
    const [gameSessionUuid, setGameSessionUuid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ⚙️ Fetch or simulate game state
    const fetchGameState = async ()=>{
        try {
            var _response_data, _response_data1;
            // Example backend endpoint
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SERVER_BACKEND_URL || "", "/api/gameState"));
            if (((_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.status) && ((_response_data1 = response.data) === null || _response_data1 === void 0 ? void 0 : _response_data1.gameState)) {
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
            var _response_data, _response_data1;
            // Example backend join call
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SERVER_BACKEND_URL || "", "/api/joinGame"), {
                name: playerName,
                amount: betAmount
            });
            if ((_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.success) {
                await fetchGameState();
                return {
                    success: true
                };
            }
            return {
                success: false,
                error: ((_response_data1 = response.data) === null || _response_data1 === void 0 ? void 0 : _response_data1.message) || "Join failed"
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
            await __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SERVER_BACKEND_URL || "", "/api/addBots"), {
                bots
            });
            await fetchGameState();
        } catch (err) {
            console.error("Add bots failed", err);
        }
    };
    // 🌀 Poll game state every few seconds
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useContinuousGame.useEffect": ()=>{
            fetchGameState();
            intervalRef.current = setInterval(fetchGameState, 5000);
            return ({
                "useContinuousGame.useEffect": ()=>{
                    if (intervalRef.current) clearInterval(intervalRef.current);
                }
            })["useContinuousGame.useEffect"];
        }
    }["useContinuousGame.useEffect"], []);
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
_s(useContinuousGame, "283cdIrQLNJQZA7aavTvXIExDUE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/subcomponents/SlotMachineReel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const SlotMachineReel = (param)=>{
    let { players, isSpinning } = param;
    _s();
    const [displayPlayers, setDisplayPlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(players);
    // 🔁 Rotate the list while spinning
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SlotMachineReel.useEffect": ()=>{
            if (!isSpinning) return;
            const interval = setInterval({
                "SlotMachineReel.useEffect.interval": ()=>{
                    setDisplayPlayers({
                        "SlotMachineReel.useEffect.interval": (prev)=>{
                            const rotated = [
                                ...prev
                            ];
                            rotated.push(rotated.shift()); // move first to last
                            return rotated;
                        }
                    }["SlotMachineReel.useEffect.interval"]);
                }
            }["SlotMachineReel.useEffect.interval"], 1000);
            return ({
                "SlotMachineReel.useEffect": ()=>clearInterval(interval)
            })["SlotMachineReel.useEffect"];
        }
    }["SlotMachineReel.useEffect"], [
        isSpinning
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 flex flex-col items-center justify-center space-y-2 z-20 transition-all",
        children: displayPlayers.slice(0, 3).map((player, index)=>{
            const isMiddle = index === 1;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative transition-all duration-500 ".concat(isMiddle ? "scale-110 z-20" : "opacity-40 blur-[2px]"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/images/tile.png",
                        alt: "Name Tile",
                        className: "w-[200px] h-auto object-contain select-none pointer-events-none ml-[-3px] ".concat(isMiddle ? "brightness-110" : "brightness-90")
                    }, void 0, false, {
                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/subcomponents/SlotMachineReel.tsx",
                        lineNumber: 45,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute inset-0 flex items-center justify-center font-bungee text-[18px] md:text-[22px] text-[#4E2A0B] ".concat(isMiddle ? "text-[#B26A42]" : "opacity-70"),
                        children: player.name.toUpperCase()
                    }, void 0, false, {
                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/subcomponents/SlotMachineReel.tsx",
                        lineNumber: 54,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, index, true, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/subcomponents/SlotMachineReel.tsx",
                lineNumber: 38,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0));
        })
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/subcomponents/SlotMachineReel.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SlotMachineReel, "zCbaBqso/l+/sCgcBvdpAt6QZPE=");
_c = SlotMachineReel;
const __TURBOPACK__default__export__ = SlotMachineReel;
var _c;
__turbopack_context__.k.register(_c, "SlotMachineReel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$subcomponents$2f$SlotMachineReel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/subcomponents/SlotMachineReel.tsx [app-client] (ecmascript)");
"use client";
;
;
const SlotMachine = (param)=>{
    let { players, currentWinnerId, isSpinning } = param;
    // Select current player (winner or fallback)
    const currentPlayer = players.find((p)=>p.id === currentWinnerId) || players[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full max-w-3xl mx-auto p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex flex-col items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center gap-2 mb-3 mt-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#F7A531] flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.3)] mt-[40px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[30px] md:text-[0px] leading-none font-bungee text-white drop-shadow-[4px_4px_0_#4E2A0B] mt-[20px]",
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex justify-center items-center mb-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 z-0 opacity-80 animate-rotate-slow",
                            style: {
                                background: "radial-gradient(circle at center, rgba(255, 216, 90, 0.35) 0%, rgba(247, 165, 49, 0.15) 40%, rgba(78, 42, 11, 0) 70%)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/images/slot_machine.gif",
                            alt: "Slot Machine",
                            className: "relative drop-shadow-lg select-none pointer-events-none max-w-[538px] h-auto z-10 mt-[1px]"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$subcomponents$2f$SlotMachineReel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            players: players,
                            isSpinning: isSpinning
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                            lineNumber: 65,
                            columnNumber: 10
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center items-center gap-6 mt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "relative w-[185px] h-[50px] active:scale-95 transition-transform",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/images/dark_brown_button.png",
                                    alt: "Dark Brown Button",
                                    className: "absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative z-10 flex items-center justify-center gap-1 h-full text-[#FFD85A] font-bungee text-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/images/gameon_chip.png",
                                            alt: "coin",
                                            className: "w-5 h-5 md:w-6 md:h-6 object-contain"
                                        }, void 0, false, {
                                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                            lineNumber: 80,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "+ 1"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "relative w-[185px] h-[50px] active:scale-95 transition-transform",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/images/light_brown_button.png",
                                    alt: "Light Brown Button",
                                    className: "absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative z-10 flex items-center justify-center h-full text-[#FFFFFF] font-bungee text-lg",
                                    children: "ADD"
                                }, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center items-center mt-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-[320px] h-[190px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/images/time_holder.png",
                                alt: "Time Holder",
                                className: "absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex flex-col items-center justify-center text-center z-20 translate-x-[40px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#A35B1B] font-bungee text-sm tracking-wide leading-none mb-1",
                                        children: "TIME REMAINING"
                                    }, void 0, false, {
                                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                        lineNumber: 114,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#4E2A0B] font-bungee text-3xl leading-none",
                                        children: "59:00"
                                    }, void 0, false, {
                                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full flex justify-center mt-60",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-screen -mx-15 h-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/images/past_player_background.png",
                                            alt: "Past Winners Background",
                                            className: "absolute left-1/2 top-0 -translate-x-1/2 w-[140vw] md:w-[135vw] h-auto object-contain select-none pointer-events-none scale-110",
                                            style: {
                                                minHeight: "520px"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                            lineNumber: 125,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 flex flex-col items-center mt-[30px] px-4 z-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-5 py-8 mb-10",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bungee text-white text-lg md:text-xl drop-shadow-[2px_2px_0_#4E2A0B]",
                                                        children: "PAST WINNERS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full flex flex-col items-center gap-3",
                                                    children: [
                                                        {
                                                            name: "ALEX COOPER",
                                                            amount: 120.0,
                                                            avatar: "/images/profile.png"
                                                        },
                                                        {
                                                            name: "MARIA GREEN",
                                                            amount: 95.0,
                                                            avatar: "/images/profile.png"
                                                        },
                                                        {
                                                            name: "JOHN DOE",
                                                            amount: 80.0,
                                                            avatar: "/images/profile.png"
                                                        }
                                                    ].map((winner, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center w-[280px] h-[60px] bg-[#4E2A0B] rounded-xl shadow-md px-3 gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: winner.avatar,
                                                                    alt: winner.name,
                                                                    className: "w-[45px] h-[45px] rounded-full object-cover border-2 border-[#FFD85A]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                    lineNumber: 166,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col flex-grow",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-bungee text-white text-sm leading-tight",
                                                                            children: winner.name.toUpperCase()
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                            lineNumber: 172,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                    src: "/images/gameon_chip.png",
                                                                                    alt: "coin",
                                                                                    className: "w-4 h-4 object-contain"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                                    lineNumber: 176,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[#FFD85A] font-bungee text-base",
                                                                                    children: winner.amount.toFixed(2)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                                    lineNumber: 181,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                            lineNumber: 175,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                    lineNumber: 171,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, index, true, {
                                                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative w-full flex justify-center mt-60",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative w-screen -mx-15 h-auto",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: "/images/past_player_background.png",
                                                                alt: "Past Winners Background",
                                                                className: "absolute left-1/2 top-0 -translate-x-1/2 w-[140vw] md:w-[135vw] h-auto object-contain select-none pointer-events-none scale-110",
                                                                style: {
                                                                    minHeight: "520px"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                lineNumber: 194,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute inset-0 flex flex-col items-center mt-[30px] px-4 z-10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "px-5 py-8 mb-10",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-bungee text-white text-lg md:text-xl drop-shadow-[2px_2px_0_#4E2A0B]",
                                                                            children: "PAST WINNERS"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                            lineNumber: 207,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                        lineNumber: 206,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-full flex flex-col items-center gap-3",
                                                                        children: [
                                                                            {
                                                                                name: "ALEX COOPER",
                                                                                amount: 120.0,
                                                                                avatar: "/images/profile.png"
                                                                            },
                                                                            {
                                                                                name: "MARIA GREEN",
                                                                                amount: 95.0,
                                                                                avatar: "/images/profile.png"
                                                                            },
                                                                            {
                                                                                name: "JOHN DOE",
                                                                                amount: 80.0,
                                                                                avatar: "/images/profile.png"
                                                                            }
                                                                        ].map((winner, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center w-[280px] h-[60px] bg-[#4E2A0B] rounded-xl shadow-md px-3 gap-3",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                        src: winner.avatar,
                                                                                        alt: winner.name,
                                                                                        className: "w-[45px] h-[45px] rounded-full object-cover border-2 border-[#FFD85A]"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                                        lineNumber: 235,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex flex-col flex-grow",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "font-bungee text-white text-sm leading-tight",
                                                                                                children: winner.name.toUpperCase()
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                                                lineNumber: 241,
                                                                                                columnNumber: 33
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "flex items-center gap-1",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                        src: "/images/gameon_chip.png",
                                                                                                        alt: "coin",
                                                                                                        className: "w-4 h-4 object-contain"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                                                        lineNumber: 245,
                                                                                                        columnNumber: 35
                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        className: "text-[#FFD85A] font-bungee text-base",
                                                                                                        children: winner.amount.toFixed(2)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                                                        lineNumber: 250,
                                                                                                        columnNumber: 35
                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                                                lineNumber: 244,
                                                                                                columnNumber: 33
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                                        lineNumber: 240,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, index, true, {
                                                                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                                lineNumber: 231,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                        lineNumber: 213,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                                lineNumber: 204,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                            lineNumber: 135,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                    lineNumber: 124,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx",
                    lineNumber: 103,
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
_c = SlotMachine;
const __TURBOPACK__default__export__ = SlotMachine;
var _c;
__turbopack_context__.k.register(_c, "SlotMachine");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/monkey-banana/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const Button = (param)=>{
    let { children, onClick, disabled, className = "", variant = "primary", ...props } = param;
    const base = "font-extrabold rounded-full px-5 py-2 text-base transition-all active:scale-95 focus:outline-none";
    const variants = {
        primary: "bg-gradient-to-b from-[#FFD85A] to-[#F7A531] text-[#4E2A0B] shadow-[0_3px_0_rgba(0,0,0,0.3)] hover:brightness-105",
        secondary: "bg-[#FFF5D6] text-[#8B5A2B] border-2 border-[#F7A531] hover:bg-[#FFE082]",
        outline: "border-2 border-[#F7A531] text-[#F7A531] bg-transparent hover:bg-[#FFF5D6]"
    };
    const disabledStyles = "opacity-50 cursor-not-allowed";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        className: "".concat(base, " ").concat(variants[variant], " ").concat(disabled ? disabledStyles : "", " ").concat(className),
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/components/ui/button.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
//import Confetti from "react-confetti";
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/ui/button.tsx [app-client] (ecmascript)");
"use client";
;
;
const ResultPopup = (param)=>{
    let { show, isWinner, onClose } = param;
    if (!show) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/70 z-50 flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl p-6 text-center max-w-xs w-[90vw] shadow-[0_6px_32px_rgba(0,0,0,0.25)] relative overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-28 left-1/2 -translate-x-1/2 w-full h-60 z-0 overflow-hidden pointer-events-none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 flex flex-col items-center pt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: isWinner ? "/images/You Won.png" : "/images/You Lose.png",
                            alt: isWinner ? "You Won" : "You Lose",
                            className: "h-14 w-auto mb-3"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: isWinner ? "/images/Gold_Star.png" : "/images/silver star.png",
                            alt: isWinner ? "Gold Star" : "Silver Star",
                            className: "h-20 w-20 mx-auto object-contain mb-3"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-700 font-medium text-sm mb-6 px-3 text-center",
                            children: isWinner ? "🎉 Your prize has been added to your wallet!" : "Didn’t win this time? Next round could be yours — keep playing!"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
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
_c = ResultPopup;
const __TURBOPACK__default__export__ = ResultPopup;
var _c;
__turbopack_context__.k.register(_c, "ResultPopup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const InsufficientPopup = (param)=>{
    let { show, onClose } = param;
    if (!show) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 flex items-center justify-center bg-black/70 z-50 overflow-hidden",
        onClick: onClose,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-[420px] h-[380px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center rounded-xl shadow-lg drop-shadow-[0_0_25px_#FFD85A]",
                style: {
                    backgroundImage: "url('/images/insufficient_balance_background.png')"
                },
                onClick: (e)=>e.stopPropagation(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center justify-center h-full text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-[#A96229] text-2xl font-bungee leading-tight mb-2 mt-[80px]",
                            children: [
                                "INSUFFICIENT",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                "BALANCE"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[#5E5E5E] font-medium text-sm px-8 mb-3 mt-[20px]",
                            children: [
                                "Your Wallet doesn’t have ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                                    lineNumber: 39,
                                    columnNumber: 38
                                }, ("TURBOPACK compile-time value", void 0)),
                                "enough coins to place ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                                    lineNumber: 40,
                                    columnNumber: 35
                                }, ("TURBOPACK compile-time value", void 0)),
                                "this bet."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "relative w-[180px] h-[50px] active:scale-95 transition-transform mt-[50px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/images/light_brown_button.png",
                                    alt: "Light Brown Button",
                                    className: "absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative z-10 flex items-center justify-center h-full text-white font-bungee text-lg",
                                    children: "CONTINUE"
                                }, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            "//"
        ]
    }, void 0, true, {
        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = InsufficientPopup;
const __TURBOPACK__default__export__ = InsufficientPopup;
var _c;
__turbopack_context__.k.register(_c, "InsufficientPopup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/ui/button.tsx [app-client] (ecmascript)");
"use client";
;
;
const BetConfirmationPopup = (param)=>{
    let { show, amount, isPlacing, onConfirm, onCancel } = param;
    if (!show || amount === null) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/70 z-50 flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl p-6 text-center max-w-sm w-[90vw] shadow-[0_6px_32px_rgba(0,0,0,0.25)] relative overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-28 left-1/2 -translate-x-1/2 w-full h-60 z-0 overflow-hidden pointer-events-none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/images/Coin.png",
                            alt: "Coin",
                            className: "w-16 h-16 mx-auto mb-3"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-[#4E2A0B] font-extrabold text-xl mb-2",
                            children: "Confirm Wager"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-700 mb-4",
                            children: "Are you sure you want to place a wager of"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center items-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/images/Coin.png",
                                    alt: "coin",
                                    className: "inline-block w-6 h-6 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-500 mb-6",
                            children: "This amount will be deducted from your wallet balance"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: onCancel,
                                    className: "flex-1 bg-gray-300 text-[#4E2A0B] hover:bg-gray-400",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
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
_c = BetConfirmationPopup;
const __TURBOPACK__default__export__ = BetConfirmationPopup;
var _c;
__turbopack_context__.k.register(_c, "BetConfirmationPopup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/monkey-banana/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const Card = (param)=>{
    let { children, className = "", ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "\n        bg-gradient-to-b from-[#FFF5C3] to-[#FFD85A]\n        border-4 border-[#F7A531]\n        rounded-2xl shadow-[0_4px_0_rgba(0,0,0,0.25)]\n        ".concat(className, "\n      "),
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/components/ui/card.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Card;
const CardContent = (param)=>{
    let { children, className = "", ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 text-[#4E2A0B] font-bold ".concat(className),
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/components/ui/card.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = CardContent;
var _c, _c1;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
//import Confetti from "react-confetti";
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f40$uidotdev$2f$usehooks$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/@uidotdev/usehooks/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$hooks$2f$useContinuousGame$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/hooks/useContinuousGame.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$SlotMachine$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/SlotMachine.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$ResultPopup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/ResultPopup.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$InsufficientPopup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/InsufficientPopup.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$BetConfirmationPopup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/subcomponents/BetConfirmationPopup.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/ui/card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
const ContinuousBettingWheel = ()=>{
    var _gameState_winner;
    _s();
    const { gameState, loading, error, joinGame, userId, playerName, gameSessionUuid } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$hooks$2f$useContinuousGame$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContinuousGame"])();
    const [walletBalance, setWalletBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hasJoined, setHasJoined] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingBet, setPendingBet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showBetPopup, setShowBetPopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showInsufficient, setShowInsufficient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showResult, setShowResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isWinner, setIsWinner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPopup, setShowPopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // State for popup visibility
    const { width, height } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f40$uidotdev$2f$usehooks$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWindowSize"])();
    const coinImgPath = "/images/dark_brown_button.png";
    const quickBetAmounts = [
        1,
        5
    ];
    // Fetch user wallet balance
    const fetchWalletBalance = async ()=>{
        if (!userId) return;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SERVER_BACKEND_URL, "/api/getUserWalletBalance"), {
                params: {
                    userUuid: userId
                }
            });
            if (response.data.success) setWalletBalance(response.data.balance);
        } catch (err) {
            console.error("Failed to fetch wallet balance", err);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContinuousBettingWheel.useEffect": ()=>{
            fetchWalletBalance();
        }
    }["ContinuousBettingWheel.useEffect"], [
        userId,
        gameState
    ]);
    const handleQuickBet = (amount)=>{
        if (!(playerName === null || playerName === void 0 ? void 0 : playerName.trim())) return alert("Please enter your name first");
        if ((walletBalance !== null && walletBalance !== void 0 ? walletBalance : 0) < amount) return setShowInsufficient(true);
        setPendingBet(amount);
        setShowBetPopup(true);
    };
    const confirmBet = async ()=>{
        if (!pendingBet) return;
        setShowBetPopup(false);
        try {
            var _releaseResponse_data;
            const releaseResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SERVER_BACKEND_URL, "/api/createUserGame"), {
                userUuid: userId,
                gameSessionUuid,
                sessionUuid: gameState === null || gameState === void 0 ? void 0 : gameState.roundNumber,
                amount: pendingBet
            });
            if (!((_releaseResponse_data = releaseResponse.data) === null || _releaseResponse_data === void 0 ? void 0 : _releaseResponse_data.status)) {
                alert("Failed to place bet.");
                return;
            }
            const result = await joinGame((playerName !== null && playerName !== void 0 ? playerName : "").trim(), pendingBet);
            if (result.success) setHasJoined(true);
        } catch (err) {
            alert("Error joining game.");
        } finally{
            setPendingBet(null);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContinuousBettingWheel.useEffect": ()=>{
            if ((gameState === null || gameState === void 0 ? void 0 : gameState.phase) === "finished" && userId) {
                var _gameState_winner;
                const isUserWinner = ((_gameState_winner = gameState.winner) === null || _gameState_winner === void 0 ? void 0 : _gameState_winner.id) === userId;
                setIsWinner(isUserWinner);
                setShowResult(true);
                setTimeout({
                    "ContinuousBettingWheel.useEffect": ()=>setShowResult(false)
                }["ContinuousBettingWheel.useEffect"], 6000);
            }
        }
    }["ContinuousBettingWheel.useEffect"], [
        gameState === null || gameState === void 0 ? void 0 : gameState.phase
    ]);
    const formatTime = (seconds)=>{
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return "".concat(mins, ":").concat(secs < 10 ? "0" : "").concat(secs);
    };
    const formatNumber = (num)=>new Intl.NumberFormat("en-IN", {
            minimumFractionDigits: 0
        }).format(num);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[#4E2A0B] font-bold text-xl",
            children: "Loading game..."
        }, void 0, false, {
            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
            lineNumber: 117,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
        lineNumber: 116,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-yellow-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            className: "bg-[#FFF5C3] border-[#F7A531]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-500 font-bold",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                        lineNumber: 126,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>window.location.reload(),
                        className: "mt-2",
                        children: "Retry"
                    }, void 0, false, {
                        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                        lineNumber: 127,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 125,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
            lineNumber: 124,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
        lineNumber: 123,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
    // Show the Result Popup (if winner)
    if (showResult && isWinner) {
        setTimeout(()=>setShowResult(false), 6000); // Auto-close after 6 seconds
    }
    // Function to show the popup
    const handleShowPopup = ()=>{
        setShowPopup(true);
    };
    // Function to hide the popup
    const handleClosePopup = ()=>{
        setShowPopup(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-cover bg-center bg-no-repeat bg-fixed overflow-y-auto transition-opacity duration-700",
        style: {
            backgroundImage: "url('/images/background_image.png')",
            backgroundColor: "#FFD85A"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$ResultPopup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                show: showResult,
                isWinner: isWinner,
                onClose: ()=>setShowResult(false)
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$InsufficientPopup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                show: showInsufficient,
                onClose: ()=>setShowInsufficient(false)
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$BetConfirmationPopup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                show: showBetPopup,
                amount: pendingBet !== null && pendingBet !== void 0 ? pendingBet : 0,
                onConfirm: confirmBet,
                onCancel: ()=>setShowBetPopup(false),
                isPlacing: false
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full flex justify-center items-start pt-8 pb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex flex-col items-center text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/images/monkey_eyes.gif",
                            alt: "Monkey Eyes",
                            className: "absolute w-[115px] top-[-30px] md:top-[-30px] left-[-10%] -translate-x-1/2 rotate-[8deg] z-10"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "relative font-bungee text-[#B26A42] text-[36px] md:text-[80px] leading-[0.9] tracking-tight",
                            children: "MONKEY"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                            lineNumber: 187,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "relative font-bungee text-[#B26A42] text-[36px] md:text-[80px] leading-[0.9] tracking-tight mt-[-4px]",
                            children: "BANANA"
                        }, void 0, false, {
                            fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleShowPopup,
                className: "absolute top-4 right-4 bg-[#F7A531] text-white font-semibold text-lg py-2 px-4 rounded-lg shadow-md hover:bg-[#FFD85A]",
                children: "Test Popup"
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$InsufficientPopup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                show: showPopup,
                onClose: handleClosePopup
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$subcomponents$2f$SlotMachine$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    players: (gameState === null || gameState === void 0 ? void 0 : gameState.players) || [],
                    currentWinnerId: gameState === null || gameState === void 0 ? void 0 : (_gameState_winner = gameState.winner) === null || _gameState_winner === void 0 ? void 0 : _gameState_winner.id,
                    isSpinning: (gameState === null || gameState === void 0 ? void 0 : gameState.phase) === "spinning"
                }, void 0, false, {
                    fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                    lineNumber: 211,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ContinuousBettingWheel, "1cA86BBSgCZD772BGMx5pj8TV6Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$hooks$2f$useContinuousGame$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContinuousGame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f40$uidotdev$2f$usehooks$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWindowSize"]
    ];
});
_c = ContinuousBettingWheel;
const __TURBOPACK__default__export__ = ContinuousBettingWheel;
var _c;
__turbopack_context__.k.register(_c, "ContinuousBettingWheel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/monkey-banana/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$ContinuousBettingWheel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/monkey-banana/src/components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel.tsx [app-client] (ecmascript)");
"use client";
;
;
function HomePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF5C3] via-[#FFD85A] to-[#F7A531]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$monkey$2d$banana$2f$src$2f$components$2f$UIComponents$2f$ContinuousBettingWheel$2f$ContinuousBettingWheel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=monkey-banana_src_5dbcad75._.js.map