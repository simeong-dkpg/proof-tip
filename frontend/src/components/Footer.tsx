import { Link } from "react-router-dom";
import { Github, Twitter, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card/50">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between">
        {/* Brand badge */}
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-black">
            PT
          </span>
          Built with <span className="text-primary">ProofTip</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ProofTip. On-chain tipping.
        </p>
      </div>
    </footer>
  );
}
