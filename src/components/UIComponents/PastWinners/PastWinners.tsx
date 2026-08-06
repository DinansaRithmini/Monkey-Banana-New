"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { useT } from "../../../i18n";
import { Money } from "../../../currency/Money";
import { useMoney } from "../../../currency";

// Type definitions
interface Winner {
  winnerId: string;
  playerName: string;
  betAmount: number;
  wonAmount: number;
  profileImage?: string;
  createdAt?: string;
}

interface PastWinnersProps {
  refreshTrigger?: number;
}

/**
 * 🏆 PastWinners Component
 * Displays recent winners with their coin amounts and avatars.
 */
export default function PastWinners({ refreshTrigger = 0 }: PastWinnersProps) {
  const t = useT();
  const fmt = useMoney();
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const coinImgPath = "/images/Coin.png";

  useEffect(() => {
    fetchWinners();
    const interval = setInterval(fetchWinners, 30000); // auto refresh every 30s
    return () => clearInterval(interval);
  }, [refreshTrigger]);

  const fetchWinners = async () => {
    try {
      const response = await fetch("/api/winners");
      const data = await response.json();

      if (data.success) {
        setWinners(data.winners);
        setError(null);
      } else {
        setError(t("error.loadWinnersFailed"));
      }
    } catch (err) {
      setError(t("error.loadWinnersFailed"));
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Loading view
  if (loading) {
    return (
      <Card className="bg-gradient-to-b from-[#FFD85A] to-[#F7A531] border-none backdrop-blur">
        <CardContent className="p-4 text-center text-[#4E2A0B] font-semibold">
          {t("loading.winners")}
        </CardContent>
      </Card>
    );
  }

  // Error view
  if (error) {
    return (
      <Card className="bg-gradient-to-b from-[#FFD85A] to-[#F7A531] border-none backdrop-blur">
        <CardContent className="p-4 text-center text-red-700 font-semibold">
          {error}
        </CardContent>
      </Card>
    );
  }

  // Empty state
  if (winners.length === 0) {
    return (
      <Card className="bg-gradient-to-b from-[#FFD85A] to-[#F7A531] border-none backdrop-blur">
        <div className="pb-3">
          <h3 className="flex items-center justify-center gap-2 text-[#4E2A0B] font-bold">
            <Trophy className="w-5 h-5 text-[#4E2A0B]" />
            {t("common.pastWinnersTitleCase")}
          </h3>
        </div>
        <CardContent className="text-center text-[#4E2A0B]/70 pb-4">
          {t("common.noWinnersYet")}
        </CardContent>
      </Card>
    );
  }

  // Winners list
  return (
    <Card className="bg-gradient-to-b from-[#FFD85A] to-[#F7A531] border-none rounded-2xl shadow-lg">
      <div className="pb-2">
        <h3 className="flex items-center justify-center gap-2 text-[#4E2A0B] font-bold">
          <Trophy className="w-5 h-5 text-[#4E2A0B]" />
          Past Winners
        </h3>
      </div>

      <CardContent className="p-4 pt-0">
        <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
          {winners.map((winner) => (
            <Card
              key={winner.winnerId}
              className="bg-[#FFF5C3] border border-[#F7A531]/40 rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
            >
              <CardContent className="p-3 flex items-center justify-between">
                {/* Left: Avatar + Name */}
                <div className="flex items-center gap-3">
                  <img
                    src={
                      winner.profileImage ||
                      "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png"
                    }
                    alt={winner.playerName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#F7A531]/70"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png";
                    }}
                  />
                  <div>
                    <p className="text-[#4E2A0B] font-bold text-md leading-tight">
                      {winner.playerName}
                    </p>
                    <p className="text-[#4E2A0B]/70 text-xs">
                      {t("pastWinners.placedLine", {
                        amount: fmt(winner.betAmount),
                        date: formatDate(winner.createdAt),
                      })}
                    </p>
                  </div>
                </div>

                {/* Right: Won Amount */}
                <div className="text-right">
                  <p className="text-[#4E2A0B] font-bold text-sm flex items-center justify-end">
                    {t("common.won")}
                    <img
                      src={coinImgPath}
                      alt="coin"
                      className="w-5 h-5 mx-1 inline-block"
                    />
                    <Money amount={winner.wonAmount} grouped />
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
