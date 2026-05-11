export interface Tip {
  id: string;
  sender: string;
  senderAddress: string;
  recipient: string;
  recipientAddress: string;
  amount: number;
  message: string;
  timestamp: Date;
  txHash: string;
}

export const mockTips: Tip[] = [
  { id: "proof-001", sender: "alice.btc", senderAddress: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7", recipient: "bob.btc", recipientAddress: "SP1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8Q", amount: 5.0, message: "Great thread on STX stacking! 🔥", timestamp: new Date("2026-03-19T10:30:00"), txHash: "0xabc001" },
  { id: "proof-002", sender: "charlie.btc", senderAddress: "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVT", recipient: "diana.btc", recipientAddress: "SP2C2YFP12AJZB1MAAE7W4HH33TVN7GFQ4E4F7RP", amount: 2.5, message: "Your artwork is incredible", timestamp: new Date("2026-03-19T09:15:00"), txHash: "0xabc002" },
  { id: "proof-003", sender: "eve.btc", senderAddress: "SP1P72Z3704VMT3DMHPP2CB8TGQWGDBHD3RPR9GZS", recipient: "frank.btc", recipientAddress: "SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH9S", amount: 10.0, message: "Thanks for the open-source tool", timestamp: new Date("2026-03-18T22:45:00"), txHash: "0xabc003" },
  { id: "proof-004", sender: "grace.btc", senderAddress: "SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55K", recipient: "alice.btc", recipientAddress: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7", amount: 1.0, message: "Loved your podcast episode", timestamp: new Date("2026-03-18T18:20:00"), txHash: "0xabc004" },
  { id: "proof-005", sender: "hank.btc", senderAddress: "SP3GWX3NE58KXHESRYE4LYNHX2YNS5K9E0F3AFQJ", recipient: "bob.btc", recipientAddress: "SP1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8Q", amount: 3.0, message: "Keep building!", timestamp: new Date("2026-03-18T15:10:00"), txHash: "0xabc005" },
  { id: "proof-006", sender: "bob.btc", senderAddress: "SP1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8Q", recipient: "charlie.btc", recipientAddress: "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVT", amount: 7.5, message: "Brilliant smart contract tutorial", timestamp: new Date("2026-03-18T12:00:00"), txHash: "0xabc006" },
  { id: "proof-007", sender: "diana.btc", senderAddress: "SP2C2YFP12AJZB1MAAE7W4HH33TVN7GFQ4E4F7RP", recipient: "eve.btc", recipientAddress: "SP1P72Z3704VMT3DMHPP2CB8TGQWGDBHD3RPR9GZS", amount: 0.5, message: "Nice meme 😂", timestamp: new Date("2026-03-17T20:30:00"), txHash: "0xabc007" },
  { id: "proof-008", sender: "frank.btc", senderAddress: "SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH9S", recipient: "grace.btc", recipientAddress: "SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55K", amount: 15.0, message: "For your DeFi research paper", timestamp: new Date("2026-03-17T14:45:00"), txHash: "0xabc008" },
  { id: "proof-009", sender: "alice.btc", senderAddress: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7", recipient: "hank.btc", recipientAddress: "SP3GWX3NE58KXHESRYE4LYNHX2YNS5K9E0F3AFQJ", amount: 4.0, message: "Your dashboard template saved me hours", timestamp: new Date("2026-03-17T10:15:00"), txHash: "0xabc009" },
  { id: "proof-010", sender: "charlie.btc", senderAddress: "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVT", recipient: "frank.btc", recipientAddress: "SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH9S", amount: 2.0, message: "Helpful debugging session", timestamp: new Date("2026-03-16T22:00:00"), txHash: "0xabc010" },
  { id: "proof-011", sender: "eve.btc", senderAddress: "SP1P72Z3704VMT3DMHPP2CB8TGQWGDBHD3RPR9GZS", recipient: "diana.btc", recipientAddress: "SP2C2YFP12AJZB1MAAE7W4HH33TVN7GFQ4E4F7RP", amount: 6.0, message: "Love the new NFT collection", timestamp: new Date("2026-03-16T16:30:00"), txHash: "0xabc011" },
  { id: "proof-012", sender: "grace.btc", senderAddress: "SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55K", recipient: "charlie.btc", recipientAddress: "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVT", amount: 1.5, message: "Great technical writing", timestamp: new Date("2026-03-16T11:00:00"), txHash: "0xabc012" },
  { id: "proof-013", sender: "hank.btc", senderAddress: "SP3GWX3NE58KXHESRYE4LYNHX2YNS5K9E0F3AFQJ", recipient: "alice.btc", recipientAddress: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7", amount: 8.0, message: "Your Clarity course is amazing", timestamp: new Date("2026-03-15T19:45:00"), txHash: "0xabc013" },
  { id: "proof-014", sender: "bob.btc", senderAddress: "SP1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8Q", recipient: "eve.btc", recipientAddress: "SP1P72Z3704VMT3DMHPP2CB8TGQWGDBHD3RPR9GZS", amount: 3.5, message: "Insightful market analysis", timestamp: new Date("2026-03-15T13:20:00"), txHash: "0xabc014" },
  { id: "proof-015", sender: "diana.btc", senderAddress: "SP2C2YFP12AJZB1MAAE7W4HH33TVN7GFQ4E4F7RP", recipient: "grace.btc", recipientAddress: "SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55K", amount: 12.0, message: "For your contributions to the DAO", timestamp: new Date("2026-03-15T08:00:00"), txHash: "0xabc015" },
];

export const NETWORK_FEE = 0.001;

export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function getCreatorStats(username: string) {
  const received = mockTips.filter((t) => t.recipient === username);
  const sent = mockTips.filter((t) => t.sender === username);
  const totalReceived = received.reduce((s, t) => s + t.amount, 0);
  const uniqueSupporters = new Set(received.map((t) => t.sender)).size;
  const address = received[0]?.recipientAddress ?? sent[0]?.senderAddress ?? "";
  return { received, totalReceived, tipCount: received.length, uniqueSupporters, address };
}

export interface LeaderboardEntry {
  username: string;
  address: string;
  totalSTX: number;
  tipCount: number;
}

export function getLeaderboard(type: "earners" | "tippers"): LeaderboardEntry[] {
  const map = new Map<string, { address: string; total: number; count: number }>();
  for (const tip of mockTips) {
    const key = type === "earners" ? tip.recipient : tip.sender;
    const addr = type === "earners" ? tip.recipientAddress : tip.senderAddress;
    const entry = map.get(key) ?? { address: addr, total: 0, count: 0 };
    entry.total += tip.amount;
    entry.count += 1;
    map.set(key, entry);
  }
  return Array.from(map.entries())
    .map(([username, d]) => ({ username, address: d.address, totalSTX: d.total, tipCount: d.count }))
    .sort((a, b) => b.totalSTX - a.totalSTX);
}
