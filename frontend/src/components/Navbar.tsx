import { Link, useLocation } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { useTheme } from "@/contexts/ThemeContext";
import { truncateAddress } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { wallet, connect, disconnect } = useWallet();
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/leaderboard", label: "Leaderboard" },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-black">
            PT
          </span>
          <span className="text-foreground">
            Proof<span className="text-primary">Tip</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === l.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}

          <button
            onClick={toggle}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {wallet ? (
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {wallet.balance.toFixed(2)} STX
              </span>
              <Button variant="outline" size="sm" onClick={disconnect} className="gap-2">
                <Wallet className="h-3.5 w-3.5" />
                {truncateAddress(wallet.address)}
                <LogOut className="h-3 w-3 text-muted-foreground" />
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={connect} className="gap-2">
              <Wallet className="h-3.5 w-3.5" />
              Connect Wallet
            </Button>
          )}
        </div>