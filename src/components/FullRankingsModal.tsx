import { X, Trophy } from "lucide-react";

interface FullRankingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userScore: number;
}

const BASE_RANKINGS = [
  { name: "SleepMaster #42", score: 99.4, change: "+2", isUser: false },
  { name: "StellarSleep #09", score: 98.1, change: "-", isUser: false },
  { name: "ZenSleeper #14", score: 97.8, change: "-1", isUser: false },
  { name: "DreamCatcher", score: 96.5, change: "+4", isUser: false },
  { name: "NightOwl_99", score: 95.2, change: "-2", isUser: false },
  { name: "RestfulMind", score: 94.8, change: "+1", isUser: false },
  { name: "DeepSleep_Pro", score: 93.9, change: "-", isUser: false },
  { name: "LucidDreamer", score: 92.4, change: "-3", isUser: false },
  { name: "SleepWalker", score: 91.1, change: "+5", isUser: false },
  { name: "SnoozeButton", score: 89.5, change: "-1", isUser: false },
];

export default function FullRankingsModal({
  isOpen,
  onClose,
  userScore,
}: FullRankingsModalProps) {
  if (!isOpen) return null;

  // Combine base rankings with user, sort, and slice to top 10
  const combinedRankings = [
    ...BASE_RANKINGS,
    { name: "You", score: userScore, change: "NEW", isUser: true },
  ]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((user, index) => ({ ...user, rank: index + 1 }));

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex justify-between items-center p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
              <Trophy className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Global Rankings</h2>
              <p className="text-xs text-slate-400">Top Sleep Performers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/50">
                <th className="py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-12">
                  Rank
                </th>
                <th className="py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Pro Name
                </th>
                <th className="py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {combinedRankings.map((user) => (
                <tr
                  key={user.name}
                  className={`border-b border-slate-800/50 hover:bg-secondary/5 transition-colors group ${
                    user.isUser ? "bg-slate-800/20" : ""
                  }`}
                >
                  <td
                    className={`py-4 font-bold ${
                      user.isUser
                        ? "text-primary"
                        : user.rank <= 3
                          ? user.rank === 1
                            ? "text-yellow-400"
                            : user.rank === 2
                              ? "text-slate-300"
                              : "text-amber-600"
                          : "text-slate-500"
                    }`}
                  >
                    {user.rank.toString().padStart(2, "0")}
                  </td>
                  <td
                    className={`py-4 font-medium transition-colors ${
                      user.isUser
                        ? "text-primary font-bold"
                        : "text-slate-300 group-hover:text-white"
                    }`}
                  >
                    {user.name}
                  </td>
                  <td
                    className={`py-4 text-right font-mono font-bold ${
                      user.isUser ? "text-primary" : "text-primary/80"
                    }`}
                  >
                    {user.score.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
